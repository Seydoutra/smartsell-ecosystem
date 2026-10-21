-- Replaces the unpublished tier-grid design with individually priced modules.
-- All modules start free. Payments and subscriptions remain inactive.
create or replace function private.validate_academy_pricing()
returns trigger language plpgsql security invoker set search_path = '' as $$
declare cfg jsonb; row jsonb; promo jsonb; plan jsonb; item jsonb;
 seen text[] := '{}'; plan_seen text[] := '{}'; start_at timestamptz; end_at timestamptz;
 allowed text[] := array['communication-digitale','redaction-web','canva-pro','meta-business-suite','montage-video','ia-marketing','prompt-engineering','gestion-de-crise','infographie-canva','creation-contenu-ia','motion-design-claude','garder-le-meme-visage','court-metrage-ia','court-metrage-ia-complet'];
begin
 if new.segment <> 'academy' or new.collection <> 'pricing' then return new; end if;
 if auth.uid() is not null and not private.is_owner() then raise exception 'Pricing is owner-only' using errcode='42501'; end if;
 if jsonb_typeof(new.items) is distinct from 'array' or jsonb_array_length(new.items) <> 1 then raise exception 'Pricing requires one configuration'; end if;
 item := new.items->0;
 if item->>'slug' is distinct from 'academy-pricing' or not private.pricing_name(item->'title')
 or (item ? '_admin' and coalesce(item->'_admin'->>'status','') <> 'published') then raise exception 'Invalid pricing singleton'; end if;
 cfg := item->'configuration';
 if jsonb_typeof(cfg) is distinct from 'object' or cfg->'version' is distinct from '2'::jsonb or cfg->>'currency' is distinct from 'GNF' then raise exception 'Module pricing requires version 2 and GNF'; end if;
 if jsonb_typeof(cfg->'courses') is distinct from 'array' or jsonb_array_length(cfg->'courses') <> cardinality(allowed) then raise exception 'Complete module price assignments required'; end if;
 for row in select value from jsonb_array_elements(cfg->'courses') loop
  if not coalesce(row->>'slug'=any(allowed),false) or row->>'slug'=any(seen) or not private.pricing_money(row->'price',true) then raise exception 'Invalid module pricing'; end if;
  seen := array_append(seen,row->>'slug'); promo := row->'promotion';
  if jsonb_typeof(promo) is distinct from 'object' or jsonb_typeof(promo->'enabled') is distinct from 'boolean'
  or not private.pricing_money(promo->'price',true) or jsonb_typeof(promo->'start') is distinct from 'string' or jsonb_typeof(promo->'end') is distinct from 'string' then raise exception 'Invalid promotion'; end if;
  if (promo->>'enabled')::boolean then
   if (row->>'price')::numeric=0 or (promo->>'price')::numeric >= (row->>'price')::numeric
   or (promo->>'start') !~ '^\d{4}-\d\d-\d\dT\d\d:\d\d:00Z$' or (promo->>'end') !~ '^\d{4}-\d\d-\d\dT\d\d:\d\d:00Z$' then raise exception 'Promotion must reduce a paid price and have UTC dates'; end if;
   start_at := (promo->>'start')::timestamptz; end_at := (promo->>'end')::timestamptz;
   if end_at <= start_at then raise exception 'Promotion end must follow start'; end if;
  end if;
  if row->>'slug' in ('court-metrage-ia','court-metrage-ia-complet') and (row->'price' <> '0'::jsonb or promo->'enabled' <> 'false'::jsonb or promo->'price' <> '0'::jsonb) then raise exception 'AI short film must remain free'; end if;
 end loop;
 if jsonb_typeof(cfg->'subscription') is distinct from 'object' or cfg->'subscription'->>'status' is distinct from 'coming_soon'
 or cfg->'subscription'->>'catalog' is distinct from 'all' or jsonb_typeof(cfg->'subscription'->'plans') is distinct from 'array'
 or jsonb_array_length(cfg->'subscription'->'plans') not between 1 and 12 then raise exception 'Subscription must remain inactive and cover all Academy content'; end if;
 for plan in select value from jsonb_array_elements(cfg->'subscription'->'plans') loop
  if coalesce(plan->>'id','') !~ '^[a-z0-9]+(-[a-z0-9]+)*$' or plan->>'id'=any(plan_seen)
  or not private.pricing_name(plan->'name') or not private.pricing_money(plan->'price',true)
  or not private.pricing_money(plan->'durationDays') or (plan->>'durationDays')::numeric > 1095 then raise exception 'Invalid subscription period'; end if;
  plan_seen := array_append(plan_seen,plan->>'id');
 end loop;
 return new;
end $$;
revoke all on function private.validate_academy_pricing() from public,anon,authenticated;

update public.content_collections set items='[{"slug":"academy-pricing","title":{"fr":"Prix et promotions","en":"Prices and promotions"},"configuration":{"version":2,"currency":"GNF","courses":[{"slug":"communication-digitale","price":0,"promotion":{"enabled":false,"price":0,"start":"","end":""}},{"slug":"redaction-web","price":0,"promotion":{"enabled":false,"price":0,"start":"","end":""}},{"slug":"canva-pro","price":0,"promotion":{"enabled":false,"price":0,"start":"","end":""}},{"slug":"meta-business-suite","price":0,"promotion":{"enabled":false,"price":0,"start":"","end":""}},{"slug":"montage-video","price":0,"promotion":{"enabled":false,"price":0,"start":"","end":""}},{"slug":"ia-marketing","price":0,"promotion":{"enabled":false,"price":0,"start":"","end":""}},{"slug":"prompt-engineering","price":0,"promotion":{"enabled":false,"price":0,"start":"","end":""}},{"slug":"gestion-de-crise","price":0,"promotion":{"enabled":false,"price":0,"start":"","end":""}},{"slug":"infographie-canva","price":0,"promotion":{"enabled":false,"price":0,"start":"","end":""}},{"slug":"creation-contenu-ia","price":0,"promotion":{"enabled":false,"price":0,"start":"","end":""}},{"slug":"motion-design-claude","price":0,"promotion":{"enabled":false,"price":0,"start":"","end":""}},{"slug":"garder-le-meme-visage","price":0,"promotion":{"enabled":false,"price":0,"start":"","end":""}},{"slug":"court-metrage-ia","price":0,"promotion":{"enabled":false,"price":0,"start":"","end":""}},{"slug":"court-metrage-ia-complet","price":0,"promotion":{"enabled":false,"price":0,"start":"","end":""}}],"subscription":{"status":"coming_soon","catalog":"all","plans":[{"id":"monthly","name":{"fr":"Mensuel","en":"Monthly"},"durationDays":30,"price":0},{"id":"quarterly","name":{"fr":"Trimestriel","en":"Quarterly"},"durationDays":90,"price":0},{"id":"yearly","name":{"fr":"Annuel","en":"Yearly"},"durationDays":365,"price":0}]}}}]'::jsonb,revision=revision+1,updated_at=now() where segment='academy' and collection='pricing' and items->0->'configuration'->>'version' is distinct from '2';
insert into public.published_collections(segment,collection,items,revision) select segment,collection,items,revision from public.content_collections where segment='academy' and collection='pricing' on conflict(segment,collection) do update set items=excluded.items,revision=excluded.revision,published_at=now() where public.published_collections.items->0->'configuration'->>'version' is distinct from '2';
