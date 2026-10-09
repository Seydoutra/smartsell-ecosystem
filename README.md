# Smartsell — phase 1

La maison mère de l’écosystème Smartsell : monorepo, design system, navigation transversale et homepage française.

## Démarrer

Node.js 22 ou supérieur, pnpm 11.25.0.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Accueil : http://localhost:3000/fr/ · Bibliothèque de composants : http://localhost:3000/fr/design-system/

```sh
pnpm typecheck
pnpm test
pnpm build
pnpm check:export
```

Le build Next.js exporte les pages statiques dans `apps/main/out/`. Le script de packaging copie cet export dans `dist/`, dossier servi par Sites. Aucun serveur applicatif ni service payant n’est requis pour cette phase.

## Structure

| Dossier             | Rôle                                                                  |
| ------------------- | --------------------------------------------------------------------- |
| `apps/main`         | Homepage, présentation des cinq univers et bibliothèque de composants |
| `packages/brand`    | Couleurs, typographies et tokens communs                              |
| `packages/ui`       | Logo, boutons, navigation, recherche, footer et titres                |
| `packages/content`  | Contenus et passerelles de la phase 1                                 |
| `packages/routing`  | URLs portables entre chemins et sous-domaines                         |
| `packages/seo`      | Métadonnées et garde d’indexation                                     |
| `packages/types`    | Contrats partagés                                                     |
| `docs/architecture` | Architecture et direction précédemment validées                       |

Le présent livrable couvre le socle demandé le 9 octobre 2026. La roadmap conservée dans `docs/architecture` décrit un périmètre plus large, à poursuivre dans les prochaines étapes.

Les verticales sont actuellement composées dans `apps/main`, avec une présentation utile pour chaque lien de navigation. Les applications Academy, Media, Studios et Labs seront extraites quand leurs fonctions seront développées. Elles ne sont pas des produits transactionnels dans cette phase.

## Périmètre livré

- Homepage avec cinq univers, vision, produits, Academy, Media, Studios et parcours croisés.
- Navigation globale, méga-menu, menu mobile et recherche locale des univers/produits.
- Logos fournis conservés à l’identique ; affichage recadré par CSS, sans réécriture des images.
- Polices Inter et Space Grotesk auto-hébergées ; focus clavier, dialogs natifs et mouvement réduit.
- Pages `/fr/agency/`, `/fr/academy/`, `/fr/media/`, `/fr/studio/`, `/fr/labs/` et `/fr/design-system/`.

Le produit **Smartsell Management** reste dans son dépôt et son déploiement existants. Ce projet utilise uniquement son URL publique. Il ne lit ni ne modifie ses sources, sa base de données ou ses sessions utilisateur.

Les catalogues, formations, contenus éditoriaux, réservations, authentification, paiements et CMS font partie des phases suivantes. Aucun témoignage, client, résultat ou contenu commercial fictif n’est ajouté.

## Configuration

Copier `.env.example` vers `apps/main/.env.local`. Les variables `NEXT_PUBLIC_*` sont publiques et injectées au build : ne jamais y placer un secret. Rebuilder après modification.

- `NEXT_PUBLIC_SITE_URL` : origine du site.
- `NEXT_PUBLIC_BASE_PATH` : vide sur un domaine dédié ; `/smartsell-ecosystem` pour GitHub Pages. À définir au build, avec la même valeur pour `pnpm check:export`.
- `NEXT_PUBLIC_INDEXABLE=false` : défaut ; robots et métadonnées bloquent l’indexation de la prévisualisation.
- `NEXT_PUBLIC_MANAGEMENT_URL` : URL du produit existant.
- `NEXT_PUBLIC_*_ORIGIN` : laisser vide tant que la verticale n’a pas son propre déploiement. Une origine HTTPS validée remplace `/fr/academy/.../` par `https://academy.example/fr/.../`.

La version française est publiée en phase 1. Les types préparent `en`, sans afficher un sélecteur de langue qui mènerait à des pages absentes.

## Publication

Le dépôt est autonome. `main` représente la version vérifiée ; `develop` sert de point de départ aux prochaines phases. Les changements passent par des branches `feat/*` et des pull requests. La CI vérifie types, routage, build et liens internes exportés. Aucun déploiement automatique vers Management n’est configuré.

L’hébergement demandé est GitHub Pages. Dans **Settings → Pages → Build and deployment → Source**, choisir **GitHub Actions**. Le workflow `Publish GitHub Pages` vérifie puis publie chaque push sur `main`, avec le préfixe `/smartsell-ecosystem`. Il peut aussi être lancé depuis **Actions → Publish GitHub Pages → Run workflow**. L’adresse cible du site est `https://seydoutra.github.io/smartsell-ecosystem/fr/`.

GitHub Pages nécessite un dépôt public avec l’offre actuelle du propriétaire ; le passage en public a été autorisé. Le garde d’indexation reste désactivé (`NEXT_PUBLIC_INDEXABLE=false`) tant que la phase de fondation est en cours. Sites conserve son identité dans `.openai/hosting.json`, mais aucun déploiement Sites n’est actif.

Pour vérifier localement le même export :

```sh
NEXT_PUBLIC_BASE_PATH=/smartsell-ecosystem NEXT_PUBLIC_SITE_URL=https://seydoutra.github.io pnpm build
NEXT_PUBLIC_BASE_PATH=/smartsell-ecosystem pnpm check:export
```
