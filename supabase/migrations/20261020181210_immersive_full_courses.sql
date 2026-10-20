begin;
create table private.academy_full_courses (
 course_slug text primary key references public.academy_courses(slug),
 curriculum jsonb not null,
 self_enroll boolean not null default false,
 source_sha256 text not null check(length(source_sha256)=64)
);
alter table private.academy_full_courses enable row level security;
revoke all on private.academy_full_courses from public,anon,authenticated;
create table private.academy_quiz_attempts (
 id bigint generated always as identity primary key,
 user_id uuid not null references public.profiles(id) on delete cascade,
 course_slug text not null references private.academy_full_courses(course_slug),
 lesson_index integer not null, score integer not null, total integer not null,
 created_at timestamptz not null default now()
);
create index academy_quiz_attempts_user_course_idx on private.academy_quiz_attempts(user_id,course_slug,created_at);
alter table private.academy_quiz_attempts enable row level security;
revoke all on private.academy_quiz_attempts from public,anon,authenticated;
create table public.academy_workbooks (
 user_id uuid not null default auth.uid(),course_slug text not null,lesson_index integer not null check(lesson_index between 0 and 999),
 notes text not null default '' check(length(notes)<=20000),updated_at timestamptz not null default now(),
 primary key(user_id,course_slug,lesson_index),
 foreign key(user_id,course_slug) references public.academy_enrollments(user_id,course_slug) on delete cascade
);
alter table public.academy_workbooks enable row level security;
revoke all on public.academy_workbooks from public,anon,authenticated;
grant select,insert,update on public.academy_workbooks to authenticated;
create policy own_workbook on public.academy_workbooks for all to authenticated using(user_id=(select auth.uid())) with check(user_id=(select auth.uid()));

-- Administrative import only. The private payload is never committed to the public repository.
create function private.install_full_course(course text, title jsonb, payload jsonb, open_access boolean default false) returns void language plpgsql security definer set search_path='' as $$
declare unit jsonb; q jsonb; count_modules integer; idx integer:=0;
begin
 count_modules:=jsonb_array_length(payload->'modules');
 if payload->>'sourceSha256' is null or count_modules is null or count_modules not between 1 and 100 or length(payload->>'sourceSha256')<>64 then raise exception 'Invalid curriculum'; end if;
 if exists(select 1 from public.academy_enrollments where course_slug=course) then
  if exists(select 1 from private.academy_full_courses where course_slug=course and source_sha256=payload->>'sourceSha256') then return; end if;
  raise exception 'Enrolled curriculum is immutable; create a new version';
 end if;
 for unit in select value from jsonb_array_elements(payload->'modules') loop
  if unit->>'passScore' is null or jsonb_typeof(unit->'questions') is distinct from 'array' or jsonb_array_length(unit->'questions') not between 1 and 100 or (unit->>'passScore')::int not between 1 and jsonb_array_length(unit->'questions') then raise exception 'Invalid assessment'; end if;
  for q in select value from jsonb_array_elements(unit->'questions') loop
   if q->>'answer' is null or jsonb_typeof(q->'options') is distinct from 'array' or (q->>'answer')::int not between 0 and jsonb_array_length(q->'options')-1 or q->>'explanation' is null then raise exception 'Invalid answer key'; end if;
  end loop;
 end loop;
 insert into public.academy_courses(slug,title,published,access,lesson_count) values(course,title,true,'invitation',count_modules)
 on conflict(slug) do update set title=excluded.title,published=true,access='invitation',lesson_count=count_modules;
 insert into private.academy_full_courses values(course,payload,open_access,payload->>'sourceSha256')
 on conflict(course_slug) do update set curriculum=excluded.curriculum,self_enroll=excluded.self_enroll,source_sha256=excluded.source_sha256;
 delete from private.lesson_keys where course_slug=course;
 for unit in select value from jsonb_array_elements(payload->'modules') loop
  insert into private.lesson_keys values(course,idx,0); idx:=idx+1;
 end loop;
 insert into private.academy_attestation_policies(course_slug,enabled,required_lessons) values(course,true,count_modules)
 on conflict(course_slug) do update set enabled=true,required_lessons=count_modules,activated_at=now();
end $$;
revoke all on function private.install_full_course(text,jsonb,jsonb,boolean) from public,anon,authenticated;

create or replace function private.enroll(course text) returns void language plpgsql security definer set search_path='' as $$
begin
 if auth.uid() is null or not exists(select 1 from auth.users where id=auth.uid() and email_confirmed_at is not null) then raise exception 'Confirmed account required' using errcode='42501'; end if;
 if exists(select 1 from private.academy_full_courses f join public.academy_courses c on c.slug=f.course_slug where c.slug=course and c.published and f.self_enroll) then
  insert into public.academy_enrollments(user_id,course_slug,full_access_granted_at) values(auth.uid(),course,now()) on conflict(user_id,course_slug) do update set full_access_granted_at=coalesce(public.academy_enrollments.full_access_granted_at,excluded.full_access_granted_at);
 elsif exists(select 1 from public.academy_courses where slug=course and published and access='free_preview') then
  insert into public.academy_enrollments(user_id,course_slug) values(auth.uid(),course) on conflict do nothing;
 else raise exception 'Invitation required' using errcode='42501'; end if;
 if found then insert into public.activity_log(actor_id,segment,action,resource) values(auth.uid(),'academy','enrollment_created',course); end if;
end $$;

create function private.grant_course_access(course text, learner_email text) returns void language plpgsql security definer set search_path='' as $$
declare learner uuid;
begin
 if auth.uid() is null or not private.is_owner() then raise exception 'Forbidden' using errcode='42501'; end if;
 if not exists(select 1 from private.academy_full_courses where course_slug=course) then raise exception 'Full course unavailable'; end if;
 select id into learner from auth.users where lower(email)=lower(btrim(learner_email)) and email_confirmed_at is not null;
 if learner is null then raise exception 'Confirmed learner account required'; end if;
 insert into public.academy_enrollments(user_id,course_slug,full_access_granted_at) values(learner,course,now()) on conflict(user_id,course_slug) do update set full_access_granted_at=coalesce(public.academy_enrollments.full_access_granted_at,excluded.full_access_granted_at);
 insert into public.activity_log(actor_id,segment,action,resource) values(auth.uid(),'academy','full_course_access_granted',course||'/'||learner::text);
end $$;
create function public.ecosystem_grant_course_access(course text,learner_email text) returns void language sql security invoker set search_path='' as $$select private.grant_course_access(course,learner_email)$$;
revoke all on function private.grant_course_access(text,text),public.ecosystem_grant_course_access(text,text) from public,anon;
grant execute on function private.grant_course_access(text,text),public.ecosystem_grant_course_access(text,text) to authenticated;

create function private.read_course_module(course text, lesson integer) returns jsonb language plpgsql stable security definer set search_path='' as $$
declare payload jsonb; unit jsonb;
begin
 if auth.uid() is null or not exists(select 1 from public.academy_enrollments e join auth.users u on u.id=e.user_id join public.academy_courses c on c.slug=e.course_slug where e.user_id=auth.uid() and e.course_slug=course and e.full_access_granted_at is not null and u.email_confirmed_at is not null and c.published) then raise exception 'Full access required' using errcode='42501'; end if;
 select curriculum into payload from private.academy_full_courses where course_slug=course;
 if payload is null or lesson is null or lesson<0 or lesson>=jsonb_array_length(payload->'modules') then raise exception 'Invalid module'; end if;
 unit:=payload->'modules'->lesson;
 return jsonb_build_object('title',unit->'title','blocks',unit->'blocks','passScore',unit->'passScore','intro',payload->'intro','questions',(select jsonb_agg(value-'answer'-'explanation') from jsonb_array_elements(unit->'questions')));
end $$;
create function public.ecosystem_read_course_module(course text,lesson integer) returns jsonb language sql stable security invoker set search_path='' as $$select private.read_course_module(course,lesson)$$;
revoke all on function private.read_course_module(text,integer),public.ecosystem_read_course_module(text,integer) from public,anon;
grant execute on function private.read_course_module(text,integer),public.ecosystem_read_course_module(text,integer) to authenticated;

-- Keep old preview completion callable, but never use it for a full training course.
alter function private.complete_lesson(text,integer,integer) rename to complete_preview_lesson;
revoke all on function private.complete_preview_lesson(text,integer,integer) from public,anon,authenticated;
create function private.complete_lesson(course text,lesson integer,choice integer) returns boolean language plpgsql security definer set search_path='' as $$
begin
 if exists(select 1 from private.academy_full_courses where course_slug=course) then raise exception 'Full assessment required' using errcode='42501'; end if;
 return private.complete_preview_lesson(course,lesson,choice);
end $$;
revoke all on function private.complete_lesson(text,integer,integer) from public,anon;
grant execute on function private.complete_lesson(text,integer,integer) to authenticated;

create function private.submit_course_quiz(course text,lesson integer,answers jsonb) returns jsonb language plpgsql security definer set search_path='' as $$
declare safe_module jsonb; unit jsonb; q jsonb; idx integer:=0; score integer:=0; selected integer; feedback jsonb:='[]'; passed boolean;
begin
 safe_module:=private.read_course_module(course,lesson);
 perform 1 from public.academy_enrollments where user_id=auth.uid() and course_slug=course for update;
 if (select count(*) from public.academy_progress where user_id=auth.uid() and course_slug=course and lesson_index<lesson)<>lesson then raise exception 'Complete previous modules first'; end if;
 select curriculum->'modules'->lesson into unit from private.academy_full_courses where course_slug=course;
 if jsonb_typeof(answers) is distinct from 'array' or jsonb_array_length(answers)<>jsonb_array_length(unit->'questions') then raise exception 'Answer every question'; end if;
 if (select count(*) from private.academy_quiz_attempts where user_id=auth.uid() and course_slug=course and created_at>now()-interval '1 minute')>=30 then raise exception 'Please wait before retrying'; end if;
 for q in select value from jsonb_array_elements(unit->'questions') loop
  if jsonb_typeof(answers->idx)<>'number' or (answers->>idx)!~'^[0-9]+$' then raise exception 'Invalid answer'; end if;
  selected:=(answers->>idx)::integer;
  if selected not between 0 and jsonb_array_length(q->'options')-1 then raise exception 'Invalid answer'; end if;
  if selected=(q->>'answer')::integer then score:=score+1; end if;
  feedback:=feedback||jsonb_build_array(jsonb_build_object('correct',selected=(q->>'answer')::integer,'answer',q->'answer','explanation',q->'explanation'));
  idx:=idx+1;
 end loop;
 passed:=score>=(unit->>'passScore')::integer;
 insert into private.academy_quiz_attempts(user_id,course_slug,lesson_index,score,total) values(auth.uid(),course,lesson,score,idx);
 if passed then
  insert into public.academy_progress(user_id,course_slug,lesson_index) values(auth.uid(),course,lesson) on conflict(user_id,course_slug,lesson_index) do nothing;
  if found then insert into public.activity_log(actor_id,segment,action,resource) values(auth.uid(),'academy','lesson_completed',course||'/'||lesson::text); end if;
 end if;
 return jsonb_build_object('score',score,'total',idx,'passed',passed,'feedback',feedback);
end $$;
create function public.ecosystem_submit_course_quiz(course text,lesson integer,answers jsonb) returns jsonb language sql security invoker set search_path='' as $$select private.submit_course_quiz(course,lesson,answers)$$;
revoke all on function private.submit_course_quiz(text,integer,jsonb),public.ecosystem_submit_course_quiz(text,integer,jsonb) from public,anon;
grant execute on function private.submit_course_quiz(text,integer,jsonb),public.ecosystem_submit_course_quiz(text,integer,jsonb) to authenticated;

-- Publishing previews must not archive separately managed full courses.
create or replace function private.sync_academy_catalog() returns trigger language plpgsql security definer set search_path = '' as $$
declare row jsonb; lesson_row jsonb; lesson_position bigint;
begin
 if new.segment <> 'academy' or new.collection <> 'courses' then return new; end if;
 -- Existing enrolments keep their historical foreign keys when a course is archived.
 update public.academy_courses set published=false where access='free_preview';
 for row in select value from jsonb_array_elements(new.items) loop
  if exists(select 1 from private.academy_full_courses where course_slug=row->>'slug') then raise exception 'Full training is managed separately'; end if;
  if jsonb_typeof(row->'lessons') <> 'array' or jsonb_array_length(row->'lessons') not between 1 and 3 then raise exception 'Preview courses require 1 to 3 introductory lessons'; end if;
  if exists(select 1 from public.academy_enrollments where course_slug=row->>'slug') and exists(
   select 1 from public.published_collections prior, jsonb_array_elements(prior.items) old_course
   where prior.segment='academy' and prior.collection='courses' and old_course->>'slug'=row->>'slug' and old_course->'lessons' is distinct from row->'lessons'
  ) then raise exception 'Existing learning content requires a new course version'; end if;
  insert into public.academy_courses(slug,title,published,access,lesson_count) values(row->>'slug',row->'title',true,'free_preview',jsonb_array_length(row->'lessons'))
  on conflict(slug) do update set title=excluded.title,published=true,lesson_count=excluded.lesson_count;
  delete from private.lesson_keys where course_slug=row->>'slug';
  for lesson_row,lesson_position in select value,ordinality-1 from jsonb_array_elements(row->'lessons') with ordinality loop
   insert into private.lesson_keys(course_slug,lesson_index,answer) values(row->>'slug',lesson_position::integer,(lesson_row->>'answer')::integer);
  end loop;
 end loop;
 return new;
end $$;

commit;
