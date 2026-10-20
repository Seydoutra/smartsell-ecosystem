-- Daily cleanup also enforces retention when the public site receives no traffic.
create extension if not exists pg_cron with schema pg_catalog;
select cron.schedule(
 'smartsell-telemetry-retention',
 '17 3 * * *',
 $job$
 delete from public.visit_events where created_at < now() - interval '90 days';
 delete from private.visit_limits where day < current_date - 90;
 delete from cron.job_run_details where jobid = (select jobid from cron.job where jobname = 'smartsell-telemetry-retention') and end_time < now() - interval '7 days';
 $job$
);
