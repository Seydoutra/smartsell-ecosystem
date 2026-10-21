-- Academy commercial catalogue only. Does not alter enrolments, lesson gates or payments.
-- Existing content RLS, revision conflicts and owner publication workflow are retained.
create function private.pricing_money(value jsonb, allow_zero boolean default false)
returns boolean language sql immutable set search_path = '' as $$
 select coalesce(jsonb_typeof(value)='number' and value::text ~ '^[0-9]+$'
   and (value::text)::numeric between case when allow_zero then 0 else 1 end and 100000000,false)
$$;
create function private.pricing_name(value jsonb)
returns boolean language sql immutable set search_path = '' as $$
 select coalesce(jsonb_typeof(value)='object' and jsonb_typeof(value->'fr')='string'
 and jsonb_typeof(value->'en')='string' and length(btrim(value->>'fr')) between 1 and 120
 and length(btrim(value->>'en')) between 1 and 120,false)
$$;
create function private.validate_academy_pricing()
returns trigger language plpgsql security invoker set search_path = '' as $$
declare cfg jsonb; row jsonb; pack jsonb; member jsonb; item jsonb; tier jsonb;
 seen text[]; pack_seen text[] := '{}'; member_seen text[]; total numeric; amount numeric;
 allowed text[] := array['communication-digitale','redaction-web','canva-pro','meta-business-suite','montage-video','ia-marketing','prompt-engineering','gestion-de-crise','infographie-canva','creation-contenu-ia','motion-design-claude','garder-le-meme-visage','court-metrage-ia','court-metrage-ia-complet'];
begin
 if new.segment <> 'academy' or new.collection <> 'pricing' then return new; end if;
 if auth.uid() is not null and not private.is_owner() then raise exception 'Pricing is owner-only' using errcode='42501'; end if;
 if jsonb_typeof(new.items) is distinct from 'array' or jsonb_array_length(new.items) <> 1 then raise exception 'Pricing requires one configuration'; end if;
 item := new.items->0;
 if item->>'slug' is distinct from 'academy-pricing' or not private.pricing_name(item->'title')
 or (item ? '_admin' and coalesce(item->'_admin'->>'status','') <> 'published') then raise exception 'Invalid pricing singleton'; end if;
 cfg := item->'configuration';
 if jsonb_typeof(cfg) is distinct from 'object' or cfg->>'currency' is distinct from 'GNF'
 or cfg->'accessMonths' is distinct from '12'::jsonb then raise exception 'Pricing requires GNF and 12-month access'; end if;
 if not private.pricing_money(cfg->'studentDiscountPct',true) or (cfg->>'studentDiscountPct')::numeric > 50 then raise exception 'Invalid student discount'; end if;
 if jsonb_typeof(cfg->'tiers') is distinct from 'array' or jsonb_array_length(cfg->'tiers') <> 3 then raise exception 'Three pricing tiers required'; end if;
 seen := '{}';
 for row in select value from jsonb_array_elements(cfg->'tiers') loop
  if coalesce(row->>'id','') not in ('essential','professional','advanced') or row->>'id'=any(seen)
  or not private.pricing_name(row->'name') or not private.pricing_money(row->'price') then raise exception 'Invalid pricing tier'; end if;
  seen := array_append(seen,row->>'id');
 end loop;
 if jsonb_typeof(cfg->'courses') is distinct from 'array' or jsonb_array_length(cfg->'courses') <> cardinality(allowed) then raise exception 'Complete course price assignments required'; end if;
 seen := '{}';
 for row in select value from jsonb_array_elements(cfg->'courses') loop
  if not coalesce(row->>'slug'=any(allowed),false) or row->>'slug'=any(seen)
  or coalesce(row->>'tier','') not in ('free','essential','professional','advanced')
  or not private.pricing_money(row->'override',true) then raise exception 'Invalid course pricing'; end if;
  if row->>'tier'='free' and row->'override' <> '0'::jsonb then raise exception 'Free courses must cost zero'; end if;
  if row->>'slug' in ('court-metrage-ia','court-metrage-ia-complet')
  and (row->>'tier' <> 'free' or row->'override' <> '0'::jsonb) then raise exception 'AI short film must remain free'; end if;
  seen := array_append(seen,row->>'slug');
 end loop;
 if jsonb_typeof(cfg->'packs') is distinct from 'array' or jsonb_array_length(cfg->'packs') > 20 then raise exception 'Invalid bundles'; end if;
 for pack in select value from jsonb_array_elements(cfg->'packs') loop
  if coalesce(pack->>'slug','') !~ '^[a-z0-9]+(-[a-z0-9]+)*$' or pack->>'slug'=any(pack_seen)
  or not private.pricing_name(pack->'name') or jsonb_typeof(pack->'visible') is distinct from 'boolean'
  or not private.pricing_money(pack->'price') or coalesce(pack->>'installments','') not in ('1','2') then raise exception 'Invalid bundle'; end if;
  if (pack->>'price')::numeric % (pack->>'installments')::numeric <> 0 then raise exception 'Equal whole-GNF installments required'; end if;
  pack_seen := array_append(pack_seen,pack->>'slug');
  if jsonb_typeof(pack->'courses') is distinct from 'array' or jsonb_array_length(pack->'courses') not between 2 and 10 then raise exception 'Bundle requires 2 to 10 courses'; end if;
  member_seen := '{}'; total := 0;
  for member in select value from jsonb_array_elements(pack->'courses') loop
   if jsonb_typeof(member) is distinct from 'string' or member#>>'{}'=any(member_seen) then raise exception 'Duplicate or invalid bundle course'; end if;
   select value into row from jsonb_array_elements(cfg->'courses') where value->>'slug'=member#>>'{}';
   if row is null or row->>'tier'='free' then raise exception 'Bundle requires paid courses'; end if;
   amount := (row->>'override')::numeric;
   if amount=0 then select (value->>'price')::numeric into amount from jsonb_array_elements(cfg->'tiers') where value->>'id'=row->>'tier'; end if;
   total := total+amount; member_seen := array_append(member_seen,member#>>'{}');
  end loop;
  if (pack->>'price')::numeric > total then raise exception 'Bundle cannot exceed individual course total'; end if;
 end loop;
 if jsonb_typeof(cfg->'subscription') is distinct from 'object' or cfg->'subscription'->>'status' is distinct from 'coming_soon'
 or not private.pricing_money(cfg->'subscription'->'monthly') or not private.pricing_money(cfg->'subscription'->'quarterly')
 or not private.pricing_money(cfg->'subscription'->'yearly') then raise exception 'Subscription must remain coming soon'; end if;
 return new;
end $$;
revoke all on function private.pricing_money(jsonb,boolean), private.pricing_name(jsonb),private.validate_academy_pricing() from public,anon,authenticated;
create trigger academy_pricing_draft_guard before insert or update on public.content_collections for each row execute function private.validate_academy_pricing();
create trigger academy_pricing_published_guard before insert or update on public.published_collections for each row execute function private.validate_academy_pricing();

insert into public.content_collections(segment,collection,items) values('academy','pricing','[{"slug":"academy-pricing","title":{"fr":"Tarifs et packs","en":"Pricing and bundles"},"configuration":{"currency":"GNF","accessMonths":12,"studentDiscountPct":20,"tiers":[{"id":"essential","name":{"fr":"Essentielle","en":"Essential"},"price":100000},{"id":"professional","name":{"fr":"Professionnelle","en":"Professional"},"price":200000},{"id":"advanced","name":{"fr":"Avancée","en":"Advanced"},"price":300000}],"courses":[{"slug":"communication-digitale","tier":"professional","override":0},{"slug":"redaction-web","tier":"essential","override":0},{"slug":"canva-pro","tier":"essential","override":0},{"slug":"meta-business-suite","tier":"essential","override":0},{"slug":"montage-video","tier":"professional","override":0},{"slug":"ia-marketing","tier":"professional","override":0},{"slug":"prompt-engineering","tier":"professional","override":0},{"slug":"gestion-de-crise","tier":"advanced","override":0},{"slug":"infographie-canva","tier":"advanced","override":0},{"slug":"creation-contenu-ia","tier":"professional","override":0},{"slug":"motion-design-claude","tier":"advanced","override":0},{"slug":"garder-le-meme-visage","tier":"advanced","override":0},{"slug":"court-metrage-ia","tier":"free","override":0},{"slug":"court-metrage-ia-complet","tier":"free","override":0}],"packs":[{"slug":"visibilite","name":{"fr":"Visibilité","en":"Visibility"},"courses":["redaction-web","meta-business-suite"],"price":150000,"installments":1,"visible":true},{"slug":"createur","name":{"fr":"Créateur","en":"Creator"},"courses":["canva-pro","montage-video","creation-contenu-ia"],"price":350000,"installments":2,"visible":true},{"slug":"expert-digital","name":{"fr":"Expert digital","en":"Digital expert"},"courses":["communication-digitale","ia-marketing","motion-design-claude"],"price":500000,"installments":2,"visible":true}],"subscription":{"status":"coming_soon","monthly":75000,"quarterly":200000,"yearly":750000}}}]'::jsonb) on conflict(segment,collection) do nothing;
insert into public.published_collections(segment,collection,items,revision) select segment,collection,items,revision from public.content_collections where segment='academy' and collection='pricing' on conflict(segment,collection) do nothing;
