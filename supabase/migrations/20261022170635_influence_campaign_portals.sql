-- Influence is additive: no Management, Academy, existing CMS or account grants change.
create table public.influence_profiles (
 id uuid not null unique default gen_random_uuid(), user_id uuid primary key references auth.users(id),
 name text not null check(length(name) between 2 and 120), category text not null check(category in ('Lifestyle','Beauté','Tech','Food','Culture','Sport')),
 location text not null check(length(location) between 2 and 120), network text not null check(network in ('Instagram','TikTok','YouTube','Facebook')),
 bio text not null check(length(bio) between 30 and 2000), social_url text not null check(social_url ~ '^https://[^[:space:]]+$' and length(social_url)<=500),
 state text not null default 'pending' check(state in ('pending','published')), consent_at timestamptz not null default now()
);
-- Only reviewed public fields are copied here. No auth identifier or private contact.
create table public.influence_directory (
 id uuid primary key references public.influence_profiles(id), name text not null, category text not null,
 location text not null, network text not null, bio text not null, social_url text not null,
 avatar text not null default '/influence/creator-placeholder.svg', followers bigint check(followers between 0 and 10000000000), verified_at timestamptz not null default now()
);
create table public.influence_campaigns (
 id uuid primary key default gen_random_uuid(), client_id uuid not null references auth.users(id),
 title text not null check(length(title) between 2 and 160), brand text not null check(length(brand) between 2 and 120),
 objective text not null check(length(objective) between 2 and 250), brief text not null check(length(brief) between 30 and 6000),
 budget_gnf bigint not null check(budget_gnf between 0 and 100000000000),start_date date not null,end_date date not null check(end_date>=start_date),
 state text not null default 'requested' check(state in ('requested','planning','active','completed')),created_at timestamptz not null default now()
);
create index influence_campaign_client on public.influence_campaigns(client_id);
create table public.influence_shortlists (
 campaign_id uuid not null references public.influence_campaigns(id),creator_id uuid not null references public.influence_profiles(id), primary key(campaign_id,creator_id)
);
create index influence_shortlist_creator on public.influence_shortlists(creator_id);
create table public.influence_missions (
 id uuid primary key default gen_random_uuid(),campaign_id uuid not null references public.influence_campaigns(id),creator_id uuid not null references public.influence_profiles(id),
 title text not null check(length(title) between 2 and 250),objective text not null check(length(objective) between 2 and 250),deadline date not null,
 fee_gnf bigint not null check(fee_gnf between 0 and 100000000000),
 state text not null default 'offered' check(state in ('offered','accepted','declined','in_progress','submitted','changes_requested','approved')),
 contract_text text not null default '' check(length(contract_text)<=12000),contract_version integer not null default 1,contract_status text not null default 'draft' check(contract_status in ('draft','signed')),
 contract_reference text not null default '' check(length(contract_reference)<=250),content_url text not null default '' check(content_url='' or (content_url ~ '^https://[^[:space:]]+$' and length(content_url)<=1000)),
 feedback text not null default '' check(length(feedback)<=2000),revision bigint not null default 1,
 check(contract_status<>'signed' or (length(contract_reference)>0 and length(contract_text)>=30))
);
create index influence_mission_campaign on public.influence_missions(campaign_id);
create index influence_mission_creator on public.influence_missions(creator_id);
create table public.influence_metrics (
 id uuid primary key default gen_random_uuid(),mission_id uuid not null references public.influence_missions(id),captured_at timestamptz not null default now(),
 views bigint not null check(views between 0 and 100000000000),likes bigint not null check(likes between 0 and 100000000000),
 comments bigint not null check(comments between 0 and 100000000000),shares bigint not null check(shares between 0 and 100000000000),clicks bigint not null check(clicks between 0 and 100000000000),
 evidence_url text not null check(evidence_url ~ '^https://[^[:space:]]+$' and length(evidence_url)<=1000),source text not null default 'Relevé déclaré par le créateur'
);
create index influence_metric_mission_date on public.influence_metrics(mission_id,captured_at desc);
create table public.influence_costs (
 id uuid primary key default gen_random_uuid(),campaign_id uuid not null references public.influence_campaigns(id),mission_id uuid references public.influence_missions(id),
 amount_gnf bigint not null check(amount_gnf between 1 and 100000000000),kind text not null check(kind in ('creator_payment','production','media','other')),
 reference text not null check(length(reference) between 2 and 250),recorded_at timestamptz not null default now(),unique(campaign_id,kind,reference),
 check(kind<>'creator_payment' or mission_id is not null)
);
create index influence_cost_campaign on public.influence_costs(campaign_id);
create index influence_cost_mission on public.influence_costs(mission_id);
create table public.influence_events (
 id bigint generated always as identity primary key, actor_id uuid not null references auth.users(id),operation text not null,
 target uuid,created_at timestamptz not null default now()
);
create index influence_event_actor on public.influence_events(actor_id);

create function private.influence_can_view_campaign(c uuid) returns boolean language sql stable security definer set search_path='' as $$
 select auth.uid() is not null and (private.is_owner() or exists(select 1 from public.influence_campaigns x where x.id=c and x.client_id=auth.uid())
 or exists(select 1 from public.influence_missions m join public.influence_profiles p on p.id=m.creator_id where m.campaign_id=c and p.user_id=auth.uid()))
$$;
revoke all on function private.influence_can_view_campaign(uuid) from public,anon;
grant execute on function private.influence_can_view_campaign(uuid) to authenticated;
alter table public.influence_profiles enable row level security;
alter table public.influence_directory enable row level security;
alter table public.influence_campaigns enable row level security;
alter table public.influence_shortlists enable row level security;
alter table public.influence_missions enable row level security;
alter table public.influence_metrics enable row level security;
alter table public.influence_costs enable row level security;
alter table public.influence_events enable row level security;
revoke all on public.influence_profiles,public.influence_directory,public.influence_campaigns,public.influence_shortlists,public.influence_missions,public.influence_metrics,public.influence_costs,public.influence_events from anon,authenticated;
grant select on public.influence_directory to anon,authenticated;
grant select on public.influence_profiles,public.influence_campaigns,public.influence_shortlists,public.influence_missions,public.influence_metrics,public.influence_costs,public.influence_events to authenticated;
create policy influence_public_directory on public.influence_directory for select to anon,authenticated using(true);
create policy influence_private_profile on public.influence_profiles for select to authenticated using(user_id=(select auth.uid()) or (select private.is_owner()));
create policy influence_own_campaign on public.influence_campaigns for select to authenticated using(client_id=(select auth.uid()) or (select private.is_owner()));
create policy influence_shortlist_access on public.influence_shortlists for select to authenticated using((select private.is_owner()) or exists(select 1 from public.influence_campaigns c where c.id=campaign_id and c.client_id=(select auth.uid())));
create policy influence_mission_access on public.influence_missions for select to authenticated using((select private.is_owner()) or creator_id in (select p.id from public.influence_profiles p where p.user_id=(select auth.uid())) or exists(select 1 from public.influence_campaigns c where c.id=campaign_id and c.client_id=(select auth.uid())));
create policy influence_metric_access on public.influence_metrics for select to authenticated using(exists(select 1 from public.influence_missions m where m.id=mission_id));
create policy influence_cost_access on public.influence_costs for select to authenticated using((select private.is_owner()) or exists(select 1 from public.influence_campaigns c where c.id=campaign_id and c.client_id=(select auth.uid())) or (kind='creator_payment' and exists(select 1 from public.influence_missions m join public.influence_profiles p on p.id=m.creator_id where m.id=mission_id and p.user_id=(select auth.uid()))));
create policy influence_event_owner on public.influence_events for select to authenticated using((select private.is_owner()));

-- Mutations are bounded business commands; no caller can assign roles or ownership.
create function private.influence_command(op text,object_id uuid,input jsonb,expected bigint) returns uuid language plpgsql security definer set search_path='' as $$
declare me uuid:=auth.uid();is_admin boolean;entity uuid:=object_id;profile public.influence_profiles;mission public.influence_missions;client uuid;desired text;creator uuid;
begin
 if me is null or not exists(select 1 from auth.users u where u.id=me and u.email_confirmed_at is not null) then raise exception 'Forbidden' using errcode='42501'; end if;
 if input is null or jsonb_typeof(input)<>'object' or octet_length(input::text)>30000 then raise exception 'Invalid payload'; end if;
 is_admin:=private.is_owner();
 if op='create_campaign' then
  insert into public.influence_campaigns(client_id,title,brand,objective,brief,budget_gnf,start_date,end_date) values(me,btrim(input->>'title'),btrim(input->>'brand'),input->>'objective',btrim(input->>'brief'),(input->>'budget_gnf')::bigint,(input->>'start_date')::date,(input->>'end_date')::date) returning id into entity;
  if jsonb_typeof(coalesce(input->'creators','[]'))<>'array' or jsonb_array_length(coalesce(input->'creators','[]'))>30 then raise exception 'Invalid shortlist'; end if;
  for creator in select value::uuid from jsonb_array_elements_text(coalesce(input->'creators','[]')) loop
   if not exists(select 1 from public.influence_directory where id=creator) then raise exception 'Unknown published creator'; end if;
   insert into public.influence_shortlists values(entity,creator) on conflict do nothing;
  end loop;
 elsif op='apply_creator' then
  if input->>'consent' is distinct from 'yes' then raise exception 'Consent required';end if;
  if exists(select 1 from public.influence_profiles where user_id=me and state='published') then raise exception 'Contact Smartsell to revise a published profile';end if;
  insert into public.influence_profiles(user_id,name,category,location,network,bio,social_url) values(me,btrim(input->>'name'),input->>'category',btrim(input->>'location'),input->>'network',btrim(input->>'bio'),input->>'social_url')
  on conflict(user_id) do update set name=excluded.name,category=excluded.category,location=excluded.location,network=excluded.network,bio=excluded.bio,social_url=excluded.social_url,consent_at=now() returning id into entity;
 elsif op='review_creator' then
  if not is_admin then raise exception 'Forbidden' using errcode='42501';end if;
  select * into profile from public.influence_profiles where id=object_id for update;
  if not found then raise exception 'Unknown application';end if;
  if coalesce((input->>'publish')::boolean,false) then
   insert into public.influence_directory(id,name,category,location,network,bio,social_url,followers) values(profile.id,profile.name,profile.category,profile.location,profile.network,profile.bio,profile.social_url,nullif(input->>'followers','')::bigint)
   on conflict(id) do update set name=excluded.name,category=excluded.category,location=excluded.location,network=excluded.network,bio=excluded.bio,social_url=excluded.social_url,followers=excluded.followers,verified_at=now();
   update public.influence_profiles set state='published' where id=object_id;
  else
   delete from public.influence_directory where id=object_id;
   update public.influence_profiles set state='pending' where id=object_id;
  end if;
 elsif op='configure_campaign' then
  if not is_admin then raise exception 'Forbidden' using errcode='42501';end if;
  update public.influence_campaigns set state=input->>'state' where id=object_id;
  if not found then raise exception 'Unknown campaign';end if;
 elsif op='assign_creator' then
  if not is_admin then raise exception 'Forbidden' using errcode='42501';end if;
  if not exists(select 1 from public.influence_directory where id=(input->>'creator_id')::uuid) then raise exception 'Creator must be reviewed';end if;
  if not exists(select 1 from public.influence_campaigns where id=object_id and (input->>'deadline')::date between start_date and end_date) then raise exception 'Deadline outside campaign';end if;
  insert into public.influence_missions(campaign_id,creator_id,title,objective,deadline,fee_gnf) values(object_id,(input->>'creator_id')::uuid,input->>'title',input->>'objective',(input->>'deadline')::date,(input->>'fee_gnf')::bigint) returning id into entity;
 elsif op in ('mission_action','configure_mission','record_metric') then
  select * into mission from public.influence_missions where id=object_id for update;
  if not found then raise exception 'Unknown mission';end if;
  select client_id into client from public.influence_campaigns where id=mission.campaign_id;
  select * into profile from public.influence_profiles where id=mission.creator_id;
  if op='record_metric' then
   if me<>profile.user_id and not is_admin then raise exception 'Forbidden' using errcode='42501';end if;
   if mission.state not in ('submitted','approved') then raise exception 'A publication must be submitted first';end if;
   insert into public.influence_metrics(mission_id,views,likes,comments,shares,clicks,evidence_url) values(object_id,(input->>'views')::bigint,(input->>'likes')::bigint,(input->>'comments')::bigint,(input->>'shares')::bigint,(input->>'clicks')::bigint,input->>'evidence_url') returning id into entity;
  else
   if expected is null or expected<>mission.revision then raise exception 'Conflict: reload mission' using errcode='40001';end if;
   if op='configure_mission' then
    if not is_admin then raise exception 'Forbidden' using errcode='42501';end if;
    if mission.contract_status='signed' then raise exception 'Signed contract snapshot is immutable';end if;
    update public.influence_missions set contract_text=input->>'contract_text',contract_status=input->>'contract_status',contract_reference=input->>'contract_reference',contract_version=contract_version+1,revision=revision+1 where id=object_id;
   else
    desired:=input->>'state';
    if is_admin then
     if mission.state<>'submitted' or desired not in ('approved','changes_requested') then raise exception 'Invalid review transition';end if;
    elsif me=profile.user_id then
     if not ((mission.state='offered' and desired in ('accepted','declined')) or (mission.state in ('accepted','in_progress','changes_requested') and desired='submitted')) then raise exception 'Invalid creator transition';end if;
    elsif me=client then
     if mission.state<>'submitted' or desired<>'changes_requested' then raise exception 'Only Smartsell may approve';end if;
    else raise exception 'Forbidden' using errcode='42501';end if;
    if desired='submitted' and coalesce(input->>'content_url','')='' then raise exception 'Content URL required';end if;
    if desired in ('approved','changes_requested') and length(coalesce(input->>'feedback',''))<5 then raise exception 'Feedback required';end if;
    update public.influence_missions set state=desired,content_url=coalesce(input->>'content_url',content_url),feedback=coalesce(input->>'feedback',feedback),revision=revision+1 where id=object_id;
   end if;
  end if;
 elsif op='record_cost' then
  if not is_admin then raise exception 'Forbidden' using errcode='42501';end if;
  if nullif(input->>'mission_id','') is not null and not exists(select 1 from public.influence_missions where id=(input->>'mission_id')::uuid and campaign_id=object_id) then raise exception 'Mission belongs to another campaign';end if;
  insert into public.influence_costs(campaign_id,mission_id,amount_gnf,kind,reference) values(object_id,nullif(input->>'mission_id','')::uuid,(input->>'amount_gnf')::bigint,input->>'kind',input->>'reference') returning id into entity;
 else raise exception 'Unknown command';end if;
 insert into public.influence_events(actor_id,operation,target) values(me,op,entity);
 return entity;
end $$;
revoke all on function private.influence_command(text,uuid,jsonb,bigint) from public,anon;
grant execute on function private.influence_command(text,uuid,jsonb,bigint) to authenticated;
create function public.influence_command(operation text,target uuid,payload jsonb,expected_revision bigint default null) returns uuid language sql security invoker set search_path='' as $$select private.influence_command(operation,target,payload,expected_revision)$$;
revoke all on function public.influence_command(text,uuid,jsonb,bigint) from public,anon;
grant execute on function public.influence_command(text,uuid,jsonb,bigint) to authenticated;
create function private.influence_campaign_summaries() returns jsonb language sql stable security definer set search_path='' as $$
 select coalesce(jsonb_agg((to_jsonb(c)-'client_id')||jsonb_build_object('budget_gnf',case when private.is_owner() or c.client_id=auth.uid() then c.budget_gnf else 0 end) order by c.created_at desc),'[]') from public.influence_campaigns c where private.influence_can_view_campaign(c.id)
$$;
revoke all on function private.influence_campaign_summaries() from public,anon;
grant execute on function private.influence_campaign_summaries() to authenticated;
create function public.influence_workspace() returns jsonb language sql stable security invoker set search_path='' as $$
 select jsonb_build_object('owner',private.is_owner(),
 'campaigns',private.influence_campaign_summaries(),
 'missions',coalesce((select jsonb_agg(x order by x.deadline) from public.influence_missions x),'[]'),
 'metrics',coalesce((select jsonb_agg(x order by x.captured_at desc) from public.influence_metrics x),'[]'),
 'costs',coalesce((select jsonb_agg(x order by x.recorded_at desc) from public.influence_costs x),'[]'),
 'creators',coalesce((select jsonb_agg(x order by x.name) from public.influence_directory x),'[]'),
 'applications',coalesce((select jsonb_agg(to_jsonb(x)-'user_id' order by x.name) from public.influence_profiles x),'[]'))
$$;
revoke all on function public.influence_workspace() from public,anon;
grant execute on function public.influence_workspace() to authenticated;
