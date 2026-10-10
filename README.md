# Smartsell — une maison, cinq sites

Six applications Next.js autonomes dans un monorepo : la maison Smartsell et Agency, Academy, Media, Studios, Labs. Chaque verticale possède son accueil, son menu, ses pages internes et son export statique. La composition GitHub Pages conserve les URLs `/fr/agency/`, `/fr/academy/`, `/fr/media/`, `/fr/studio/`, `/fr/labs/`.

## Démarrer

Node.js 22 ou supérieur, pnpm 11.25.0.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

La maison écoute sur `http://127.0.0.1:3000/fr/`. Les cinq applications écoutent sur les ports 3001 à 3005. Le serveur de la maison redirige les requêtes des verticales vers leur serveur local ; leurs propres URLs restent utilisables directement. Bibliothèque commune : `/fr/design-system/`.

```sh
pnpm format:check
pnpm typecheck
pnpm test
pnpm build
pnpm check:export
```

Le build exécute deux applications à la fois, puis assemble leurs exports dans `dist/`. Chaque application conserve aussi son export dans `apps/<site>/out/`. Aucun serveur applicatif ni service payant n’est nécessaire pour consulter cette version.

## Structure

| Dossier             | Rôle                                                                     |
| ------------------- | ------------------------------------------------------------------------ |
| `apps/main`         | Maison, homepage, navigation globale, recherche des pages, design system |
| `apps/agency`       | Histoire, collectif, expertises, portfolio et briefs                     |
| `apps/academy`      | Modules, programmes, leçons, espace apprenant et ressources              |
| `apps/media`        | Rubriques, articles, recherche, rédaction et newsletter                  |
| `apps/studio`       | Espaces, services, packs, galerie et réservation simulée                 |
| `apps/labs`         | Produits, recherche, IA et prise de contact                              |
| `packages/brand`    | Identité, couleurs et typographies                                       |
| `packages/ui`       | Composants, compositions par site, animations et interactions            |
| `packages/content`  | Registre des pages et contenus de démonstration                          |
| `packages/routing`  | Composition des chemins, origines et assets                              |
| `packages/seo`      | Métadonnées et garde d’indexation                                        |
| `packages/types`    | Contrats partagés                                                        |
| `docs/architecture` | Architecture validée et roadmap complète                                 |

Le registre `packages/content/src/sites.ts` est utilisé par chaque application pour générer ses pages. Les layouts, la configuration et les builds sont propres aux applications. Les compositions et contenus réutilisables sont partagés, sans dépendance entre les applications.

## Parcours disponibles

- Agency : 16 expertises, six études conceptuelles clairement identifiées, histoire, métiers du collectif, présentation et brouillon de contact.
- Academy : huit modules, trois leçons avec exercice et quiz par module, ajout à un espace local, progression, ressources et récapitulatif pédagogique. Les formats et durées envisagés ne sont pas des sessions ouvertes à la vente.
- Media : vingt articles originaux de démonstration, dix rubriques, recherche par mot et catégorie, partage du lien et simulation de newsletter.
- Studios : trois configurations illustratives, six packs, galerie graphique accessible et parcours de simulation en trois étapes avec contrôle des horaires et reprise du récapitulatif.
- Labs : Management, produit existant, et Obtura, vision produit ; pistes de recherche, approche IA et brief.
- Animations : sculptures CSS, lumière, profondeur, flottement, apparitions au défilement et transitions lorsque le navigateur les prend en charge. Pause conservée pendant la session, préférence de mouvement réduit respectée.

Les six fichiers de logo fournis sont conservés à l’identique. Inter et Space Grotesk sont auto-hébergées. Les sculptures, couvertures et plateaux illustratifs sont construits en CSS ; ils ne représentent pas des locaux, clients ou membres d’équipe réels.

Cette livraison suit le choix validé : **base complète et parcours de démonstration**, puis branchement des services lors des phases prévues. Aucun compte réel, paiement, email, inscription ou réservation n’est créé. La progression Academy et le récapitulatif Studios restent dans le navigateur ; les coordonnées des formulaires ne sont ni transmises ni persistées. Les récapitulatifs Academy ne sont pas des certifications officielles. Les clients, résultats, équipes nommées, tarifs et dates réelles doivent être validés avant intégration. Voir `docs/vertical-sites.md`.

**Smartsell Management** conserve son dépôt, son déploiement et ses données. Le présent projet utilise uniquement son URL publique. Il ne modifie ni ses sources ni ses comptes.

## Configuration et déploiements indépendants

Les variables `NEXT_PUBLIC_*` sont publiques et injectées au build. Ne jamais y placer de secret. Définir les variables dans l’environnement de la commande ou du workflow ; `.env.example` sert de référence.

- `NEXT_PUBLIC_SITE_URL` : origine utilisée pour les métadonnées.
- `NEXT_PUBLIC_BASE_PATH` : vide pour une composition à la racine ; `/smartsell-ecosystem` pour GitHub Pages. Utiliser aussi cette valeur pour `check:export`.
- `NEXT_PUBLIC_INDEXABLE=false` : maintien du garde d’indexation tant que les contenus de démonstration sont présents.
- `NEXT_PUBLIC_MANAGEMENT_URL` : URL publique du produit existant.
- `NEXT_PUBLIC_MAIN_ORIGIN` et les cinq `NEXT_PUBLIC_<SITE>_ORIGIN` : laisser vides pour la composition. Une origine HTTPS remplace le chemin global par `https://<origine>/fr/<page>/`.
- `NEXT_PUBLIC_APP_BASE_PATH` : uniquement pour le build individuel d’une verticale. Exemple `/fr`, avec l’origine de cette verticale configurée. Déployer alors le contenu de son `out/` sous `/fr/`, y compris `_next/` et `brand/`. Ne pas définir cette variable pour le build combiné.

Exemple de build individuel :

```sh
NEXT_PUBLIC_APP_BASE_PATH=/fr NEXT_PUBLIC_AGENCY_ORIGIN=https://agency.example pnpm --filter @smartsell/agency build
```

Les origines des autres sites doivent être configurées au build pour leurs liens croisés. La version française est livrée ; le routage prépare `en`, sans afficher de liens vers une traduction absente.

## GitHub Pages

Le workflow `Publish GitHub Pages` vérifie les sources puis publie chaque push sur `main`. Source dans Settings → Pages : GitHub Actions. URL : `https://seydoutra.github.io/smartsell-ecosystem/fr/`. Le dépôt est public, conformément à l’autorisation du propriétaire. Aucun déploiement vers Management n’est configuré.

```sh
NEXT_PUBLIC_BASE_PATH=/smartsell-ecosystem NEXT_PUBLIC_SITE_URL=https://seydoutra.github.io pnpm build
NEXT_PUBLIC_BASE_PATH=/smartsell-ecosystem pnpm check:export
```

Les modifications sont préparées dans des branches `feature/*`. La CI vérifie le formatage, les types, le routage, les données de démonstration, le build des six applications et les liens des exports. L’identité Sites est conservée dans `.openai/hosting.json` ; le canal de publication utilisé est GitHub Pages.
