begin;
alter table public.profiles
 add column phone text not null default '' check(char_length(phone)<=40 and phone ~ '^[+0-9(). -]*$'),
 add column city text not null default '' check(char_length(city)<=120),
 add column country text not null default '' check(char_length(country)<=120),
 add column occupation text not null default '' check(char_length(occupation)<=120),
 add column learning_goal text not null default '' check(char_length(learning_goal)<=800);
-- Existing own-row RLS stays in force. Email, identity and roles remain read-only.
grant update(phone,city,country,occupation,learning_goal) on public.profiles to authenticated;
create table public.academy_game_saves(
 user_id uuid not null,
 course_slug text not null,
 lesson_index integer not null check(lesson_index between 0 and 100),
 stage integer not null check(stage between 0 and 8),
 configuration jsonb not null default '{}' check(jsonb_typeof(configuration)='object' and octet_length(configuration::text)<=8000),
 updated_at timestamptz not null default now(),
 primary key(user_id,course_slug,lesson_index),
 foreign key(user_id,course_slug) references public.academy_enrollments(user_id,course_slug) on delete cascade
);
alter table public.academy_game_saves enable row level security;
revoke all on public.academy_game_saves from anon,authenticated;
grant select on public.academy_game_saves to authenticated;
create policy own_game_read on public.academy_game_saves for select to authenticated using(user_id=(select auth.uid()));
create function private.save_training(course text,lesson integer,stage integer,configuration jsonb) returns void language plpgsql security definer set search_path='' as $$
begin
 perform private.read_course_module(course,lesson);
 if stage is null or stage<0 or stage>8 or configuration is null or jsonb_typeof(configuration)<>'object' or octet_length(configuration::text)>8000 then raise exception 'Invalid training save';end if;
 insert into public.academy_game_saves(user_id,course_slug,lesson_index,stage,configuration) values(auth.uid(),course,lesson,stage,configuration)
 on conflict(user_id,course_slug,lesson_index) do update set stage=excluded.stage,configuration=excluded.configuration,updated_at=now();
 -- Training saves never create academy_progress or attestations.
end $$;
create function public.ecosystem_save_training(course text,lesson integer,stage integer,configuration jsonb) returns void language sql security invoker set search_path='' as $$ select private.save_training(course,lesson,stage,configuration) $$;
revoke all on function private.save_training(text,integer,integer,jsonb),public.ecosystem_save_training(text,integer,integer,jsonb) from public,anon;
grant execute on function private.save_training(text,integer,integer,jsonb),public.ecosystem_save_training(text,integer,integer,jsonb) to authenticated;
commit;
