-- Requested owner address change. Never confirm an email or modify credentials.
-- Refuse a silent transfer if the original reservation has already been claimed.
do $$
declare confirmed_owner uuid;
begin
 if exists(select 1 from private.owner_bootstrap where lower(email)='contact.smartsell@gmail.com' and claimed_by is not null) then
  raise exception 'Original owner already claimed; review the transfer explicitly';
 end if;
 if not exists(select 1 from private.owner_bootstrap where lower(email)='contact@smartsell.pro') then
  update private.owner_bootstrap set email='contact@smartsell.pro' where lower(email)='contact.smartsell@gmail.com' and claimed_by is null;
  if not found then raise exception 'Expected unclaimed owner reservation is missing'; end if;
 elsif exists(select 1 from private.owner_bootstrap where lower(email)='contact.smartsell@gmail.com') then
  raise exception 'Two owner reservations require review';
 end if;
 select id into confirmed_owner from auth.users where lower(email)='contact@smartsell.pro' and email_confirmed_at is not null;
 if exists(select 1 from private.owner_bootstrap where lower(email)='contact@smartsell.pro' and claimed_by is not null and claimed_by is distinct from confirmed_owner) then
  raise exception 'Owner reservation belongs to another identity';
 end if;
 if confirmed_owner is not null then
  update private.owner_bootstrap set claimed_by=confirmed_owner where lower(email)='contact@smartsell.pro' and (claimed_by is null or claimed_by=confirmed_owner);
  insert into public.profiles(id,email) select id,email from auth.users where id=confirmed_owner on conflict(id) do nothing;
  insert into public.user_roles(user_id,segment,role) values(confirmed_owner,'*','admin') on conflict do nothing;
 end if;
end $$;
