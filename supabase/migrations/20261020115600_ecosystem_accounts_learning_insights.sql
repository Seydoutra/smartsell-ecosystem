-- Smartsell Ecosystem only. No Management schema, account or database changes.
begin;
create schema if not exists private;
revoke all on schema private from public, anon;
grant usage on schema private to authenticated;

create table public.profiles (
 id uuid primary key references auth.users(id) on delete cascade,
 email text not null default '',
 display_name text not null default '' check (char_length(display_name) <= 100),
 created_at timestamptz not null default now()
);
create table public.user_roles (
 user_id uuid not null references public.profiles(id) on delete cascade,
 segment text not null check (segment in ('*','agency','academy','media','studio','labs')),
 role text not null check (role in ('admin','editor','analyst')),
 primary key (user_id,segment,role)
);
create table private.owner_bootstrap (
 email text primary key,
 claimed_by uuid unique references auth.users(id) on delete restrict
);
insert into private.owner_bootstrap(email) values ('contact.smartsell@gmail.com');

create function private.can_read(scope text) returns boolean language sql stable security definer set search_path = '' as $$
 select auth.uid() is not null and exists(select 1 from public.user_roles r where r.user_id = (select auth.uid()) and r.segment in ('*',scope))
$$;
create function private.can_edit(scope text) returns boolean language sql stable security definer set search_path = '' as $$
 select auth.uid() is not null and exists(select 1 from public.user_roles r where r.user_id = (select auth.uid()) and r.segment in ('*',scope) and r.role in ('admin','editor'))
$$;
create function private.is_owner() returns boolean language sql stable security definer set search_path = '' as $$
 select auth.uid() is not null and exists(select 1 from public.user_roles r where r.user_id = (select auth.uid()) and r.segment = '*' and r.role = 'admin')
$$;
revoke all on function private.can_read(text), private.can_edit(text), private.is_owner() from public, anon;
grant execute on function private.can_read(text), private.can_edit(text), private.is_owner() to authenticated;

create function private.provision_account() returns trigger language plpgsql security definer set search_path = '' as $$
begin
 insert into public.profiles(id,email,display_name) values(new.id,coalesce(new.email,''),left(coalesce(new.raw_user_meta_data->>'display_name',''),100)) on conflict(id) do update set email=excluded.email;
 -- A confirmed, exact email match is required. Metadata never grants a role.
 if new.email_confirmed_at is not null then
  with claim as (
   update private.owner_bootstrap set claimed_by = new.id where lower(email) = lower(new.email) and (claimed_by is null or claimed_by = new.id) returning email
  ) insert into public.user_roles(user_id,segment,role) select new.id,'*','admin' from claim on conflict do nothing;
 end if;
 return new;
end $$;
revoke all on function private.provision_account() from public, anon, authenticated;
create trigger ecosystem_account after insert or update of email_confirmed_at,email on auth.users for each row execute function private.provision_account();

create table public.content_collections (
 segment text not null check (segment in ('agency','academy','media','studio','labs')),
 collection text not null check (collection ~ '^[a-z][a-z0-9_-]{0,50}$'),
 items jsonb not null check (jsonb_typeof(items) = 'array' and jsonb_array_length(items) <= 500),
 revision bigint not null default 1,
 updated_at timestamptz not null default now(),
 primary key(segment,collection)
);
create table public.content_versions (
 id bigint generated always as identity primary key,
 segment text not null, collection text not null, revision bigint not null,
 items jsonb not null, actor_id uuid references public.profiles(id) on delete set null,
 created_at timestamptz not null default now(),
 unique(segment,collection,revision)
);
create index content_versions_actor_idx on public.content_versions(actor_id);
create table public.academy_courses (
 slug text primary key check(slug ~ '^[a-z0-9-]{1,100}$'),
 title jsonb not null, published boolean not null default true,
 access text not null default 'free_preview' check(access in ('free_preview','invitation')),
 lesson_count integer not null check(lesson_count between 1 and 1000)
);
create table private.lesson_keys (
 course_slug text not null references public.academy_courses(slug) on delete cascade,
 lesson_index integer not null check(lesson_index >= 0), answer integer not null check(answer >= 0),
 primary key(course_slug,lesson_index)
);
create table public.academy_enrollments (
 user_id uuid not null references public.profiles(id) on delete cascade,
 course_slug text not null references public.academy_courses(slug),
 created_at timestamptz not null default now(),
 primary key(user_id,course_slug)
);
create index academy_enrollments_course_idx on public.academy_enrollments(course_slug,created_at);
create table public.academy_progress (
 user_id uuid not null,
 course_slug text not null,
 lesson_index integer not null check(lesson_index >= 0),
 completed_at timestamptz not null default now(),
 primary key(user_id,course_slug,lesson_index),
 foreign key(user_id,course_slug) references public.academy_enrollments(user_id,course_slug) on delete cascade
);
create index academy_progress_course_idx on public.academy_progress(course_slug,completed_at);
create table public.activity_log (
 id bigint generated always as identity primary key,
 actor_id uuid references public.profiles(id) on delete set null,
 segment text not null check(segment in ('*','agency','academy','media','studio','labs')),
 action text not null, resource text not null,
 created_at timestamptz not null default now()
);
create index activity_scope_time_idx on public.activity_log(segment,created_at desc);
create index activity_actor_idx on public.activity_log(actor_id,created_at desc);
create table public.requests (
 id uuid primary key default gen_random_uuid(),
 user_id uuid not null references public.profiles(id) on delete cascade,
 segment text not null check(segment in ('agency','academy','media','studio','labs')),
 subject text not null check(char_length(subject) between 3 and 200),
 message text not null check(char_length(message) between 5 and 4000),
 state text not null default 'new' check(state in ('new','in_progress','closed')),
 created_at timestamptz not null default now()
);
create index requests_user_idx on public.requests(user_id);
create index requests_scope_time_idx on public.requests(segment,created_at desc);
create table public.site_routes (
 path text primary key,
 segment text not null check(segment in ('main','agency','academy','media','studio','labs'))
);
create table public.visit_events (
 id bigint generated always as identity primary key,
 session_id uuid not null,
 segment text not null check(segment in ('main','agency','academy','media','studio','labs')),
 path text not null references public.site_routes(path),
 event text not null check(event in ('page_view','contact_click','course_open','article_open','booking_open')),
 created_at timestamptz not null default now()
);
create index visit_scope_time_idx on public.visit_events(segment,created_at desc);
create index visit_session_time_idx on public.visit_events(session_id,created_at);
create index visit_path_idx on public.visit_events(path);
create table private.visit_limits (
 day date primary key default current_date,
 events integer not null default 0
);

-- Explicit privileges: no direct write to progress, role assignments or visits.
alter table public.profiles enable row level security;
alter table public.user_roles enable row level security;
alter table public.content_collections enable row level security;
alter table public.content_versions enable row level security;
alter table public.academy_courses enable row level security;
alter table public.academy_enrollments enable row level security;
alter table public.academy_progress enable row level security;
alter table public.activity_log enable row level security;
alter table public.requests enable row level security;
alter table public.site_routes enable row level security;
alter table public.visit_events enable row level security;
alter table private.lesson_keys enable row level security;
alter table private.owner_bootstrap enable row level security;
alter table private.visit_limits enable row level security;
revoke all on public.profiles,public.user_roles,public.content_collections,public.content_versions,public.academy_courses,public.academy_enrollments,public.academy_progress,public.activity_log,public.requests,public.site_routes,public.visit_events from anon,authenticated;
grant select on public.profiles,public.user_roles,public.content_collections,public.content_versions,public.academy_courses,public.academy_enrollments,public.academy_progress,public.activity_log,public.requests,public.visit_events to authenticated;
grant select on public.academy_courses to anon;
grant update(display_name) on public.profiles to authenticated;
grant insert(user_id,segment,subject,message) on public.requests to authenticated;
grant update(state) on public.requests to authenticated;
create policy own_profile_read on public.profiles for select to authenticated using(id = (select auth.uid()) or (select private.is_owner()));
create policy own_profile_update on public.profiles for update to authenticated using(id = (select auth.uid())) with check(id = (select auth.uid()));
create policy own_roles on public.user_roles for select to authenticated using(user_id = (select auth.uid()) or (select private.is_owner()));
create policy scoped_content on public.content_collections for select to authenticated using(private.can_read(segment));
create policy scoped_versions on public.content_versions for select to authenticated using(private.can_read(segment));
create policy published_courses on public.academy_courses for select to anon,authenticated using(published);
create policy scoped_enrollments on public.academy_enrollments for select to authenticated using(user_id = (select auth.uid()) or (select private.can_read('academy')));
create policy scoped_progress on public.academy_progress for select to authenticated using(user_id = (select auth.uid()) or (select private.can_read('academy')));
create policy scoped_activity on public.activity_log for select to authenticated using(private.can_read(segment) or actor_id = (select auth.uid()));
create policy scoped_requests on public.requests for select to authenticated using(user_id = (select auth.uid()) or private.can_read(segment));
create policy submit_request on public.requests for insert to authenticated with check(user_id = (select auth.uid()) and state = 'new');
create policy manage_requests on public.requests for update to authenticated using(private.can_edit(segment)) with check(private.can_edit(segment));
create policy scoped_visits on public.visit_events for select to authenticated using(private.can_read(segment));

create function private.enroll(course text) returns void language plpgsql security definer set search_path = '' as $$
begin
 if auth.uid() is null then raise exception 'Authentication required' using errcode='42501'; end if;
 if not exists(select 1 from public.academy_courses where slug=course and published and access='free_preview') then raise exception 'Course unavailable'; end if;
 insert into public.academy_enrollments(user_id,course_slug) values(auth.uid(),course) on conflict do nothing;
 if found then insert into public.activity_log(actor_id,segment,action,resource) values(auth.uid(),'academy','enrollment_created',course); end if;
end $$;
create function public.ecosystem_enroll(course text) returns void language sql security invoker set search_path = '' as $$ select private.enroll(course) $$;
revoke all on function private.enroll(text), public.ecosystem_enroll(text) from public,anon;
grant execute on function private.enroll(text), public.ecosystem_enroll(text) to authenticated;

create function private.complete_lesson(course text, lesson integer, choice integer) returns boolean language plpgsql security definer set search_path = '' as $$
begin
 if auth.uid() is null or not exists(select 1 from public.academy_enrollments where user_id=auth.uid() and course_slug=course) then raise exception 'Enrollment required' using errcode='42501'; end if;
 if not exists(select 1 from private.lesson_keys where course_slug=course and lesson_index=lesson and answer=choice) then return false; end if;
 insert into public.academy_progress(user_id,course_slug,lesson_index) values(auth.uid(),course,lesson) on conflict do nothing;
 if found then insert into public.activity_log(actor_id,segment,action,resource) values(auth.uid(),'academy','lesson_completed',course || '/' || lesson::text); end if;
 return true;
end $$;
create function public.ecosystem_complete_lesson(course text, lesson integer, choice integer) returns boolean language sql security invoker set search_path = '' as $$ select private.complete_lesson(course,lesson,choice) $$;
revoke all on function private.complete_lesson(text,integer,integer),public.ecosystem_complete_lesson(text,integer,integer) from public,anon;
grant execute on function private.complete_lesson(text,integer,integer),public.ecosystem_complete_lesson(text,integer,integer) to authenticated;

create function private.save_collection(scope text, name text, content jsonb, expected_revision bigint) returns bigint language plpgsql security definer set search_path = '' as $$
declare current_revision bigint; next_revision bigint;
begin
 if auth.uid() is null or not private.can_edit(scope) then raise exception 'Forbidden' using errcode='42501'; end if;
 if jsonb_typeof(content) <> 'array' or jsonb_array_length(content)>500 or octet_length(content::text)>3000000 then raise exception 'Invalid collection'; end if;
 select revision into current_revision from public.content_collections where segment=scope and collection=name for update;
 if not found then raise exception 'Unknown collection'; end if;
 if current_revision <> expected_revision then raise exception 'Conflict: reload the collection before saving' using errcode='40001'; end if;
 next_revision := current_revision+1;
 update public.content_collections set items=content,revision=next_revision,updated_at=now() where segment=scope and collection=name;
 insert into public.content_versions(segment,collection,revision,items,actor_id) values(scope,name,next_revision,content,auth.uid());
 insert into public.activity_log(actor_id,segment,action,resource) values(auth.uid(),scope,'content_saved',name);
 return next_revision;
end $$;
create function public.ecosystem_save_collection(scope text,name text,content jsonb,expected_revision bigint) returns bigint language sql security invoker set search_path = '' as $$ select private.save_collection(scope,name,content,expected_revision) $$;
revoke all on function private.save_collection(text,text,jsonb,bigint),public.ecosystem_save_collection(text,text,jsonb,bigint) from public,anon;
grant execute on function private.save_collection(text,text,jsonb,bigint),public.ecosystem_save_collection(text,text,jsonb,bigint) to authenticated;

-- Public ingestion has no access to account data. Only catalogued paths and a
-- fixed event vocabulary are accepted. It measures approximate visits, never sales.
create function private.track_visit(visit uuid, page text, kind text) returns void language plpgsql security definer set search_path = '' as $$
declare scope text; allowance integer;
begin
 select segment into scope from public.site_routes where path=page;
 if scope is null or kind not in ('page_view','contact_click','course_open','article_open','booking_open') or visit is null then raise exception 'Invalid event'; end if;
 perform pg_advisory_xact_lock(hashtextextended(visit::text,0));
 if (select count(*) from public.visit_events where session_id=visit and created_at>now()-interval '30 minutes')>=100 then return; end if;
 if exists(select 1 from public.visit_events where session_id=visit and path=page and event=kind and created_at>now()-interval '5 seconds') then return; end if;
 insert into private.visit_limits(day,events) values(current_date,1) on conflict(day) do update set events=private.visit_limits.events+1 where private.visit_limits.events<10000 returning events into allowance;
 if allowance is null then return; end if;
 insert into public.visit_events(session_id,segment,path,event) values(visit,scope,page,kind);
 delete from public.visit_events where created_at < now()-interval '90 days';
 delete from private.visit_limits where day<current_date-90;
end $$;
create function public.ecosystem_track_visit(visit uuid,page text,kind text) returns void language sql security invoker set search_path = '' as $$ select private.track_visit(visit,page,kind) $$;
revoke all on function private.track_visit(uuid,text,text),public.ecosystem_track_visit(uuid,text,text) from public;
grant usage on schema private to anon;
grant execute on function private.track_visit(uuid,text,text),public.ecosystem_track_visit(uuid,text,text) to anon,authenticated;

create function public.ecosystem_statistics(since timestamptz, until_at timestamptz) returns jsonb language plpgsql security invoker set search_path = '' as $$
declare result jsonb;
begin
 if auth.uid() is null or not exists(select 1 from public.user_roles where user_id=auth.uid()) then raise exception 'Forbidden' using errcode='42501'; end if;
 if until_at <= since or until_at-since > interval '367 days' then raise exception 'Invalid period'; end if;
 select jsonb_build_object(
 'segments',(select jsonb_agg(row_to_json(s)) from (
  select segment,
   (select count(*) from public.visit_events v where v.segment=x.segment and v.event='page_view' and v.created_at>=since and v.created_at<until_at) as page_views,
   (select count(distinct session_id) from public.visit_events v where v.segment=x.segment and v.created_at>=since and v.created_at<until_at) as sessions,
   (select count(*) from public.visit_events v where v.segment=x.segment and v.event='contact_click' and v.created_at>=since and v.created_at<until_at) as contact_clicks,
   (select count(*) from public.requests r where r.segment=x.segment and r.created_at>=since and r.created_at<until_at) as requests,
   (select count(*) from public.content_collections c where c.segment=x.segment) as collections
  from (values('agency'),('academy'),('media'),('studio')) x(segment)
 ) s),
 'enrollments',(select count(*) from public.academy_enrollments where created_at>=since and created_at<until_at),
 'learners',(select count(distinct user_id) from public.academy_enrollments where created_at>=since and created_at<until_at),
 'lessons_completed',(select count(*) from public.academy_progress where completed_at>=since and completed_at<until_at),
 'days',(select coalesce(jsonb_agg(row_to_json(d)),'[]'::jsonb) from (
  select date_trunc('day',created_at) as day, count(*) as views from public.visit_events where event='page_view' and created_at>=since and created_at<until_at group by 1 order by 1
 ) d),
 'journeys',(select coalesce(jsonb_agg(row_to_json(j)),'[]'::jsonb) from (
  select session_id, min(created_at) as started_at, jsonb_agg(jsonb_build_object('path',path,'event',event,'at',created_at) order by created_at,id) as steps
  from public.visit_events where created_at>=since and created_at<until_at and session_id in (
   select session_id from public.visit_events where created_at>=since and created_at<until_at group by session_id order by max(created_at) desc limit 30
  ) group by session_id order by max(created_at) desc
 ) j)
 ) into result;
 return result;
end $$;
revoke all on function public.ecosystem_statistics(timestamptz,timestamptz) from public,anon;
grant execute on function public.ecosystem_statistics(timestamptz,timestamptz) to authenticated;
create table public.published_collections (
 segment text not null, collection text not null, items jsonb not null,
 revision bigint not null, published_at timestamptz not null default now(),
 primary key(segment,collection)
);
alter table public.published_collections enable row level security;
revoke all on public.published_collections from anon,authenticated;
grant select on public.published_collections to anon,authenticated;
create policy approved_public_catalog on public.published_collections for select to anon,authenticated using(true);
create function private.publish_content() returns timestamptz language plpgsql security definer set search_path = '' as $$
declare release_time timestamptz := now();
begin
 if auth.uid() is null or not private.is_owner() then raise exception 'Forbidden' using errcode='42501'; end if;
 perform 1 from public.content_collections order by segment,collection for update;
 insert into public.published_collections(segment,collection,items,revision,published_at)
 select segment,collection,items,revision,release_time from public.content_collections
 on conflict(segment,collection) do update set items=excluded.items,revision=excluded.revision,published_at=excluded.published_at;
 insert into public.activity_log(actor_id,segment,action,resource) values(auth.uid(),'*','publication_prepared',release_time::text);
 return release_time;
end $$;
create function public.ecosystem_publish_content() returns timestamptz language sql security invoker set search_path = '' as $$ select private.publish_content() $$;
revoke all on function private.publish_content(),public.ecosystem_publish_content() from public,anon;
grant execute on function private.publish_content(),public.ecosystem_publish_content() to authenticated;
create function private.sync_academy_catalog() returns trigger language plpgsql security definer set search_path = '' as $$
declare row jsonb; lesson_row jsonb; lesson_position bigint;
begin
 if new.segment <> 'academy' or new.collection <> 'courses' then return new; end if;
 -- Existing enrolments keep their historical foreign keys when a course is archived.
 update public.academy_courses set published=false;
 for row in select value from jsonb_array_elements(new.items) loop
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
revoke all on function private.sync_academy_catalog() from public,anon,authenticated;
create trigger ecosystem_academy_publication before insert or update on public.published_collections for each row execute function private.sync_academy_catalog();
create function private.limit_requests() returns trigger language plpgsql security definer set search_path = '' as $$
begin
 if auth.uid() is null or new.user_id <> auth.uid() then raise exception 'Authentication required' using errcode='42501'; end if;
 perform pg_advisory_xact_lock(hashtextextended(auth.uid()::text,1));
 if (select count(*) from public.requests where user_id=auth.uid() and created_at>now()-interval '1 day') >= 10 then raise exception 'Daily request limit reached'; end if;
 return new;
end $$;
revoke all on function private.limit_requests() from public,anon,authenticated;
create trigger ecosystem_request_limit before insert on public.requests for each row execute function private.limit_requests();
create function private.audit_request() returns trigger language plpgsql security definer set search_path = '' as $$
begin
 insert into public.activity_log(actor_id,segment,action,resource) values(auth.uid(),new.segment,case when tg_op='INSERT' then 'request_created' else 'request_updated' end,new.id::text);
 return new;
end $$;
revoke all on function private.audit_request() from public,anon,authenticated;
create trigger ecosystem_request_audit after insert or update of state on public.requests for each row execute function private.audit_request();
-- Existing verified accounts are provisioned without changing their credentials.
insert into public.profiles(id,email,display_name) select id,coalesce(email,''),left(coalesce(raw_user_meta_data->>'display_name',''),100) from auth.users on conflict do nothing;
with claim as (
 update private.owner_bootstrap b set claimed_by=u.id from auth.users u where lower(b.email)=lower(u.email) and u.email_confirmed_at is not null and b.claimed_by is null returning b.claimed_by
) insert into public.user_roles(user_id,segment,role) select claimed_by,'*','admin' from claim on conflict do nothing;
commit;
