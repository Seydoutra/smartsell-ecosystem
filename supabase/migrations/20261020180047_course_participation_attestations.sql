-- Full training only: none of the existing introductory courses is eligible.
begin;
alter table public.academy_enrollments add column full_access_granted_at timestamptz;
create table private.academy_attestation_policies (
 course_slug text primary key references public.academy_courses(slug) on delete cascade,
 enabled boolean not null default false,
 required_lessons integer not null check(required_lessons between 1 and 1000),
 activated_at timestamptz not null default now()
);
alter table private.academy_attestation_policies enable row level security;
revoke all on private.academy_attestation_policies from public,anon,authenticated;
create table public.academy_attestations (
 id uuid primary key default gen_random_uuid(),
 user_id uuid not null references public.profiles(id) on delete cascade,
 course_slug text not null references public.academy_courses(slug),
 learner_name text not null check(char_length(learner_name) between 1 and 100),
 course_title jsonb not null,
 lessons_completed integer not null check(lessons_completed > 0),
 issued_at timestamptz not null default now(),
 revoked_at timestamptz,
 unique(user_id,course_slug)
);
alter table public.academy_attestations enable row level security;
revoke all on public.academy_attestations from public,anon,authenticated;
grant select on public.academy_attestations to authenticated;
create policy own_attestations on public.academy_attestations for select to authenticated
 using(user_id=(select auth.uid()) or (select private.is_owner()));

create function private.issue_attestation(learner uuid, course text) returns uuid
 language plpgsql security definer set search_path='' as $$
declare policy_record record; completed integer; display_name text; reference uuid;
begin
 if auth.uid() is null or auth.uid()<>learner then return null; end if;
 select c.title,c.lesson_count,p.required_lessons,p.activated_at,e.full_access_granted_at
 into policy_record from public.academy_courses c
 join private.academy_attestation_policies p on p.course_slug=c.slug
 join public.academy_enrollments e on e.course_slug=c.slug and e.user_id=learner
 where c.slug=course and c.published and c.access='invitation' and p.enabled
 and e.full_access_granted_at is not null
 for update of e;
 if not found or policy_record.lesson_count<>policy_record.required_lessons then return null; end if;
 if (select count(*) from private.lesson_keys where course_slug=course and lesson_index>=0 and lesson_index<policy_record.required_lessons)<>policy_record.required_lessons then return null; end if;
 select count(*) into completed from public.academy_progress progress
 join private.lesson_keys keys on keys.course_slug=progress.course_slug and keys.lesson_index=progress.lesson_index
 where progress.user_id=learner and progress.course_slug=course
 and progress.lesson_index<policy_record.required_lessons
 and progress.completed_at>=greatest(policy_record.activated_at,policy_record.full_access_granted_at);
 if completed<>policy_record.required_lessons then return null; end if;
 select btrim(p.display_name) into display_name from public.profiles p
 join auth.users u on u.id=p.id where p.id=learner and u.email_confirmed_at is not null;
 if display_name is null or display_name='' then return null; end if;
 insert into public.academy_attestations(user_id,course_slug,learner_name,course_title,lessons_completed)
 values(learner,course,display_name,policy_record.title,completed)
 on conflict(user_id,course_slug) do nothing returning id into reference;
 if reference is not null then
  insert into public.activity_log(actor_id,segment,action,resource) values(learner,'academy','participation_attestation_issued',reference::text);
 else select id into reference from public.academy_attestations where user_id=learner and course_slug=course; end if;
 return reference;
end $$;
revoke all on function private.issue_attestation(uuid,text) from public,anon,authenticated;

create function private.attestation_after_progress() returns trigger language plpgsql security definer set search_path='' as $$
begin
 perform private.issue_attestation(new.user_id,new.course_slug);
 return new;
end $$;
revoke all on function private.attestation_after_progress() from public,anon,authenticated;
create trigger academy_attestation_after_progress after insert or update of completed_at on public.academy_progress
 for each row execute function private.attestation_after_progress();

-- Serialise completions for one enrolment, including simultaneous final lessons.
create or replace function private.complete_lesson(course text, lesson integer, choice integer) returns boolean language plpgsql security definer set search_path='' as $$
declare full_started timestamptz; eligibility_started timestamptz;
begin
 if auth.uid() is null then raise exception 'Enrollment required' using errcode='42501'; end if;
 select full_access_granted_at into full_started from public.academy_enrollments where user_id=auth.uid() and course_slug=course for update;
 if not found then raise exception 'Enrollment required' using errcode='42501'; end if;
 if not exists(select 1 from private.lesson_keys where course_slug=course and lesson_index=lesson and answer=choice) then return false; end if;
 select activated_at into eligibility_started from private.academy_attestation_policies where course_slug=course and enabled;
 insert into public.academy_progress(user_id,course_slug,lesson_index) values(auth.uid(),course,lesson)
 on conflict(user_id,course_slug,lesson_index) do update set completed_at=now()
 where full_started is not null and public.academy_progress.completed_at<greatest(full_started,eligibility_started);
 if found then insert into public.activity_log(actor_id,segment,action,resource) values(auth.uid(),'academy','lesson_completed',course || '/' || lesson::text); end if;
 return true;
end $$;

create function private.claim_attestations() returns void language plpgsql security definer set search_path='' as $$
declare training record;
begin
 if auth.uid() is null then raise exception 'Authentication required' using errcode='42501'; end if;
 for training in select course_slug from public.academy_enrollments where user_id=auth.uid() and full_access_granted_at is not null order by course_slug limit 100 loop
  perform private.issue_attestation(auth.uid(),training.course_slug);
 end loop;
end $$;
create function public.ecosystem_claim_attestations() returns void language sql security invoker set search_path='' as $$select private.claim_attestations()$$;
revoke all on function private.claim_attestations(),public.ecosystem_claim_attestations() from public,anon;
grant execute on function private.claim_attestations(),public.ecosystem_claim_attestations() to authenticated;

-- A QR reference is a random UUID. There is no anonymous table/list access.
create function private.verify_attestation(reference uuid) returns jsonb language sql stable security definer set search_path='' as $$
 select jsonb_build_object('id',id,'learner_name',learner_name,'course_title',course_title,
 'issued_at',issued_at,'status',case when revoked_at is null then 'valid' else 'revoked' end,
 'issuer','Smartsell Academy','kind','participation') from public.academy_attestations where id=reference
$$;
create function public.ecosystem_verify_attestation(reference uuid) returns jsonb language sql stable security invoker set search_path='' as $$select private.verify_attestation(reference)$$;
revoke all on function private.verify_attestation(uuid),public.ecosystem_verify_attestation(uuid) from public;
grant usage on schema private to anon;
grant execute on function private.verify_attestation(uuid),public.ecosystem_verify_attestation(uuid) to anon,authenticated;

create function private.revoke_attestation(reference uuid, reason text) returns void language plpgsql security definer set search_path='' as $$
begin
 if auth.uid() is null or not private.is_owner() then raise exception 'Forbidden' using errcode='42501'; end if;
 if reason is null or char_length(btrim(reason)) not between 3 and 300 then raise exception 'Reason required'; end if;
 update public.academy_attestations set revoked_at=now() where id=reference and revoked_at is null;
 if found then insert into public.activity_log(actor_id,segment,action,resource) values(auth.uid(),'academy','participation_attestation_revoked',reference::text || ':' || btrim(reason)); end if;
end $$;
create function public.ecosystem_revoke_attestation(reference uuid, reason text) returns void language sql security invoker set search_path='' as $$select private.revoke_attestation(reference,reason)$$;
revoke all on function private.revoke_attestation(uuid,text),public.ecosystem_revoke_attestation(uuid,text) from public,anon;
grant execute on function private.revoke_attestation(uuid,text),public.ecosystem_revoke_attestation(uuid,text) to authenticated;
commit;
