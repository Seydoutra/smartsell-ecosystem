import { withBasePath } from '@smartsell/routing';
export default function NotFound() {
  return (
    <main id="main" className="container section">
      <p className="eyebrow">SMARTSELL / 404</p>
      <h1>
        Cette page
        <br />
        n’est pas ici.
      </h1>
      <p style={{ marginTop: 24 }}>
        Retrouvez les cinq univers de Smartsell depuis la maison.
      </p>
      <a
        className="button button--primary"
        style={{ marginTop: 32 }}
        href={withBasePath('/fr/')}
      >
        Revenir à l’accueil ↗
      </a>
    </main>
  );
}
