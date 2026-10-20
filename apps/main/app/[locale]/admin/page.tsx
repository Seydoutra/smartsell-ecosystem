import type { Metadata } from 'next';
import { locale, t, basePath, urlFor, routingConfig } from '@smartsell/routing';
import { AdminApp } from '../../../components/admin/admin-app';
import './admin.css';

export const metadata: Metadata = {
  title: { absolute: t('Administration · Smartsell', 'Admin · Smartsell') },
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <AdminApp
      base={basePath}
      siteHref={urlFor('main', locale, '', routingConfig)}
    />
  );
}
