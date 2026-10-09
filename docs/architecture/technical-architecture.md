# Architecture technique proposée

Proposition, pas état réalisé. Les choix de services nécessitent validation des accès, de la facturation et des environnements. Versions supportées et corrigées à figer dans le lockfile au démarrage, sans reprendre aveuglément les versions du produit existant.

## Décision : monorepo modulaire, extraction progressive

pnpm Workspaces + Turborepo. Les applications composent des modules autonomes, qui ne s’importent jamais entre eux. Les bibliothèques partagées contiennent uniquement les contrats communs. Cette séparation respecte les conventions [apps et packages de Turborepo](https://turborepo.dev/docs/crafting-your-repository/structuring-a-repository).

```text
apps/
  main/             # Phase 1 : point de publication Next.js, holding + routes des verticales
  cms/              # Sanity Studio, déploiement administratif distinct
  academy/          # Shell indépendant au moment de l’extraction
  media/            # Idem
  studio/           # Idem
  labs/             # Idem
  agency/           # Option si l’agence a besoin de son propre déploiement
packages/
  ui/ brand/ auth/ analytics/ seo/ database/ utils/ types/
  content/          # Requêtes CMS, validation et références
  routing/          # Résolution chemins/domaines, langues et redirections
  agency/ academy/ media/ studio/ labs/  # Domaines autonomes dès la phase 1
  payments/ video/  # Interfaces et adaptateurs, activation progressive
  config/           # TypeScript, lint, tests, conventions communes
supabase/migrations/ # Nouvelles migrations horodatées ; jamais copie brute de Management
docs/
```

Les shells Academy/Media/Studio/Labs sont créés lors de leur extraction, pas comme applications vides à entretenir. En phase 1, chacun possède déjà son layout, ses routes, ses templates et sa couche de données dans son package. `apps/main` importe les points d’entrée publics ; les règles métier restent indépendantes du host et de Next.js autant que possible.

Alternative : cinq applications et un reverse proxy dès la première version. Plus d’autonomie de livraison, mais plus de builds, de règles d’assets et d’exploitation. La recommandation progressive réduit ce coût tant qu’une même équipe publie tous les univers. Elle ne repousse pas la séparation du code.

## Flux

```text
Visiteur → CDN / Next.js → templates de la verticale → Sanity (contenus publiés)
                         → services serveur → Supabase (demandes et transactions)
Éditeur → Sanity Studio → validation → publication → webhook → invalidation ciblée
Utilisateur → Supabase Auth → autorisation → données privées et droits d’accès
Paiement → adaptateur fournisseur → webhook signé → événement idempotent → droit/confirmation
```

Next.js App Router : rendu statique ou revalidation pour contenus publics, rendu privé sans cache partagé pour compte et admin. Petits composants client pour filtres, recherche, formulaires et interactions. Management conserve React/Vite : aucun portage forcé vers Next.js.

## Du chemin au sous-domaine

| Verticale | Phase 1 | Cible ultérieure |
|---|---|---|
| Maison | `smartsell.pro/fr` | Même domaine |
| Agency | `smartsell.pro/fr/agency` | Chemin maintenu ; sous-domaine facultatif |
| Academy | `smartsell.pro/fr/academy/...` | `academy.smartsell.pro/fr/...` |
| Media | `smartsell.pro/fr/media/...` | `media.smartsell.pro/fr/...` |
| Studios | `smartsell.pro/fr/studio/...` | `studio.smartsell.pro/fr/...` |
| Labs | `smartsell.pro/fr/labs/...` | `labs.smartsell.pro/fr/...` |

Un registre associe `vertical`, `locale`, `relativePath`, `origin`, `mountPath`. Les références CMS portent l’identité d’un contenu, pas une URL absolue figée. `urlFor` calcule les liens internes et les canoniques. Une table de correspondance garde les anciens chemins.

Lors d’une extraction : créer le shell, publier les mêmes templates via le registre, vérifier assets et images, callbacks auth, CSP/CORS, canoniques, sitemap, analytics, puis rediriger ancien chemin vers nouvelle URL avec 301/308. Pas de redirection de toutes les pages vers la homepage. Navigation inter-applications via liens HTML normaux et chargement de page ; navigation locale via le routeur du shell.

Si plusieurs déploiements doivent rester sur un seul domaine, [Next.js Multi-zones](https://nextjs.org/docs/app/guides/multi-zones) fournit un modèle par zones. Les chemins d’assets doivent être distincts et les routes non concurrentes. Ce montage reste un choix à tester, pas une garantie déjà acquise sur l’hébergement cible.

## CMS et back-office

Sanity gère les contenus et leurs références. Supabase gère disponibilité, commandes, inscriptions et accès. Un hub `/admin` expose des sections par rôle et des liens vers Sanity Studio ; il ne duplique pas tout l’éditeur. Les comptes Sanity et les clients Smartsell ID sont des identités distinctes au lancement.

Éditeurs limités à leur verticale, journalistes auteurs, rédacteurs en chef autorisant publication, opérateurs studio gérant disponibilités, gestionnaires Academy gérant sessions, super admin global. Ces permissions doivent être implémentées côté fournisseur/base, et non uniquement dans les menus.

Les brouillons sont consultés par une preview signée, sans indexation et sans cache public. Les webhooks de publication sont authentifiés. La programmation doit utiliser [Scheduled Drafts / Content Releases](https://www.sanity.io/docs/studio/scheduled-drafts), sous réserve du plan et des permissions. Éviter l’ancienne Scheduling API dépréciée. Une archive éditoriale est un état métier explicite, filtré des listes publiques.

## SMARTSELL ID

Préparer le contrat dès la phase 1 ; activer une identité commune en phase 6. Academy peut disposer d’une identité minimale en phase 3, sur le futur projet Auth de l’écosystème ; elle ne fusionne pas les comptes Management.

Pour Next.js, sessions serveur avec cookies et flux PKCE, suivant [Supabase SSR](https://supabase.com/docs/guides/auth/server-side). Valider côté serveur les identités et droits, séparer rôles d’organisation, accès client et rôle plateforme. La [RLS Supabase](https://supabase.com/docs/guides/database/postgres/row-level-security) est la frontière des lignes transactionnelles.

Un même projet Auth ne rend pas les sessions automatiquement communes entre sous-domaines. Préférer un point de connexion `id.smartsell.pro` et un échange de code à usage unique pour établir une session propre à chaque application. Le protocole et la révocation seront spécifiés/testés en phase 6. Aucun JWT dans une URL ; destinations de retour autorisées. Les cookies partagés sur tout le domaine ne sont pas retenus par défaut. Déconnexion globale, comptes liés, suppression et migration Management sont des travaux explicites.

## Paiements, vidéo, devises

`PaymentProvider` : créer intention, vérifier webhook, vérifier statut, rembourser. Statuts métier indépendants du fournisseur, références uniques, montant/devise recalculés serveur, journal des événements. Adaptateurs prévus : Stripe, PayPal, Mobile Money dont Orange Money/Wave si contrat compatible, manuel et virement. Aucun n’est annoncé disponible en Guinée sans vérification du marchand, de la devise et des conditions. Phase 1 : demande commerciale ; phase 3 : premier moyen de paiement réellement validé.

GNF prioritaire ; conserver montants en unités mineures selon la devise, GNF sans décimales ; éviter les flottants. `fr-GN`, `Africa/Conakry`, téléphones E.164 `+224`. Dates absolues en UTC, rendu Conakry, horaires d’ouverture stockés avec leur fuseau.

`VideoProvider` : assetId, poster, durée, statut de traitement, URL de lecture et autorisation. Adaptateurs possibles Mux/Bunny/Cloudflare Stream. Master vidéo chez le fournisseur ; fichiers pédagogiques légers dans un stockage privé. Le LMS délivre un accès limité dans le temps après vérification du droit.

## Infrastructure et livraison

Netlify est la proposition de déploiement des nouvelles surfaces : [support App Router et rendu Next.js](https://docs.netlify.com/build/frameworks/framework-setup-guides/nextjs/overview/). GitHub Pages reste le déploiement observé de Management. Aucun nouveau domaine n’est déjà connecté.

Environnements séparés dev/staging/prod pour Supabase et contenus Sanity. Preview sans données réelles ni secrets de production. CI : lint, typecheck, tests ciblés, build, tests browser des parcours critiques ; migrations testées sur base isolée. Déploiement de preview par PR, promotion contrôlée, sauvegarde avant migration, procédures de restauration répétées. Service worker Management maintenu dans sa portée actuelle.

Branches prévues : `main` production, `develop` intégration, `feature/*` travaux. Commits orientés résultat ; règles de protection et cadence à fixer à l’implémentation. Cette livraison ne crée ni branche ni commit dans le produit existant.

Variables futures documentées : URL publique, locale, fuseau, devise, URL Supabase et clé publique, clés privilégiées serveur uniquement, projet/dataset Sanity, secret preview et webhook, configuration d’adaptateurs vidéo/paiement, coordonnées WhatsApp approuvées, identifiants analytics. Le futur `.env.example` ne contiendra aucune clé réelle.

## SEO, analytics et qualité

Metadata, OpenGraph et canoniques par page ; Schema.org adapté à Organization, Article, Course, Product et BreadcrumbList. LocalBusiness uniquement avec coordonnées réelles. Sitemap par langue et, après séparation, index par domaine ; uniquement les contenus publiés indexables. Admin, espace personnel, recherche et confirmations sont exclus et protégés selon leur nature. Ne pas confondre `noindex` et contrôle d’accès.

GA4, Meta Pixel, TikTok Pixel derrière gestion de consentement. Aucun email, téléphone, contenu de formulaire ou identifiant sensible dans les événements. Taxonomie du brief conservée, avec `vertical`, `content_id`, `locale`, `journey_id` anonyme et consentement. `studio_booking_complete` n’est envoyé qu’après confirmation serveur. Phase 1 utilise `studio_request_submit` et `course_interest_submit`, distincts d’un achat.

Recherche sur une projection de contenus publiés ; version initiale légère mise à jour à publication, API serveur dès que le volume dépasse le budget de téléchargement. Jamais d’indexation de brouillons ou données privées. Filtres et slugs paginés stables.

WCAG AA comme objectif avec navigation clavier, focus visible, labels, contraste, réduction du mouvement et tests manuels. Échantillon performance : homepage mère, cinq homepages, détail formation, article, cas client et formulaire studio. Aucun objectif de qualité n’est présenté comme déjà atteint.
