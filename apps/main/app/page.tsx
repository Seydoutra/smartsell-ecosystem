import { withBasePath } from '@smartsell/routing';
export default function RootPage() {
  return (
    <main className="root-redirect">
      <meta httpEquiv="refresh" content={`0;url=${withBasePath('/fr/')}`} />
      <h1>Smartsell</h1>
      <p>Un écosystème. Cinq façons d’avancer.</p>
      <a href={withBasePath('/fr/')}>Découvrir Smartsell →</a>
    </main>
  );
}
