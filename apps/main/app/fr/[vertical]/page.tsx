import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { verticals } from '@smartsell/content';
import { ButtonLink, SectionHeading } from '@smartsell/ui';
import { routingConfig, urlFor, managementUrl } from '@smartsell/routing';
export const dynamicParams = false;
export function generateStaticParams() {
  return verticals.map((v) => ({ vertical: v.id }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{
    vertical: string;
  }>;
}): Promise<Metadata> {
  const { vertical } = await params;
  const v = verticals.find((v) => v.id === vertical);
  return v
    ? {
        title: `${v.name} — ${v.verb}`,
        description: v.description,
        alternates: { canonical: urlFor(v.id, 'fr', '', routingConfig) },
        openGraph: { title: `Smartsell ${v.name}`, description: v.description },
      }
    : {};
}
export default async function VerticalPage({
  params,
}: {
  params: Promise<{
    vertical: string;
  }>;
}) {
  const { vertical } = await params;
  const v = verticals.find((v) => v.id === vertical);
  if (!v) notFound();
  return (
    <main id="main">
      <section className={`vertical-hero vertical-hero--${v.theme}`}>
        <div className="container">
          <a className="breadcrumb" href="/fr/">
            SMARTSELL / LA MAISON
          </a>
          <p className="eyebrow">
            {v.number} / {v.verb} / SMARTSELL {v.name.toUpperCase()}
          </p>
          <h1>{v.headline}</h1>
          <p className="vertical-description">{v.description}</p>
          <ButtonLink href="#ambition">Explorer notre ambition</ButtonLink>
          <p className="vertical-stage">
            L’univers se construit. Découvrez sa direction.
          </p>
        </div>
      </section>
      <section className="section" id="ambition">
        <div className="container">
          <SectionHeading
            number={v.number}
            label={`Smartsell ${v.name}`}
            title={v.journey + '.'}
          />
          <div className="vertical-focus">
            {v.focus.map((item, i) => (
              <div key={item}>
                <span className="eyebrow">0{i + 1}</span>
                <h3>{item}</h3>
              </div>
            ))}
          </div>
          <div className="vertical-next">
            <p>
              {v.id === 'labs'
                ? 'Smartsell Management est déjà accessible sur le site du produit. Les nouvelles offres de Labs seront présentées ici.'
                : 'Cette première présentation pose les bases de l’univers. Son catalogue, ses contenus et ses services seront ajoutés progressivement.'}
            </p>
            {v.id === 'labs' && (
              <ButtonLink href={managementUrl} tone="secondary">
                Découvrir Management
              </ButtonLink>
            )}
          </div>
        </div>
      </section>
      <section className="vertical-cross">
        <div className="container">
          <p className="eyebrow">UNE VERTICALE SMARTSELL</p>
          <h2>
            La suite de votre parcours
            <br />
            se trouve peut-être ici.
          </h2>
          <div>
            {verticals
              .filter((other) => other.id !== v.id)
              .map((other) => (
                <a
                  key={other.id}
                  href={urlFor(other.id, 'fr', '', routingConfig)}
                >
                  <span>{other.verb}</span>
                  <strong>{other.name}</strong>
                  <span aria-hidden="true">↗</span>
                </a>
              ))}
          </div>
        </div>
      </section>
    </main>
  );
}
