begin;
create or replace function private.read_course_module(course text, lesson integer) returns jsonb language plpgsql stable security definer set search_path='' as $$
declare payload jsonb; unit jsonb;
begin
 if auth.uid() is null or not exists(select 1 from public.academy_enrollments e join auth.users u on u.id=e.user_id join public.academy_courses c on c.slug=e.course_slug where e.user_id=auth.uid() and e.course_slug=course and e.full_access_granted_at is not null and u.email_confirmed_at is not null and c.published) then raise exception 'Full access required' using errcode='42501'; end if;
 select curriculum into payload from private.academy_full_courses where course_slug=course;
 if payload is null or lesson is null or lesson<0 or lesson>=jsonb_array_length(payload->'modules') then raise exception 'Invalid module'; end if;
 if (select count(*) from public.academy_progress where user_id=auth.uid() and course_slug=course and lesson_index<lesson)<>lesson then raise exception 'Complete previous modules first' using errcode='42501'; end if;
 unit:=payload->'modules'->lesson;
 return jsonb_build_object('title',unit->'title','blocks',unit->'blocks','passScore',unit->'passScore','intro',payload->'intro','questions',(select jsonb_agg(value-'answer'-'explanation') from jsonb_array_elements(unit->'questions')));
end $$;

create function private.answer_course_question(course text,lesson integer,question integer,choice integer) returns jsonb language plpgsql security definer set search_path='' as $$
declare accessible jsonb; assessment jsonb;
begin
 accessible:=private.read_course_module(course,lesson);
 select curriculum->'modules'->lesson->'questions'->question into assessment from private.academy_full_courses where course_slug=course;
 if question is null or question<0 or assessment is null or choice is null or choice<0 or choice>=jsonb_array_length(assessment->'options') then raise exception 'Invalid question or choice'; end if;
 return jsonb_build_object('correct',choice=(assessment->>'answer')::integer,'answer',assessment->'answer','explanation',assessment->'explanation');
end $$;
create function public.ecosystem_answer_course_question(course text,lesson integer,question integer,choice integer) returns jsonb language sql security invoker set search_path='' as $$select private.answer_course_question(course,lesson,question,choice)$$;
revoke all on function private.answer_course_question(text,integer,integer,integer),public.ecosystem_answer_course_question(text,integer,integer,integer) from public,anon;
grant execute on function private.answer_course_question(text,integer,integer,integer),public.ecosystem_answer_course_question(text,integer,integer,integer) to authenticated;
commit;
