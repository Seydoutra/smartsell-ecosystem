# Audit du projet Smartsell existant

9 octobre 2026 · Audit de lecture · Aucun fichier source modifié

## Périmètre identifié

Le dossier relié aux logos est `/Users/traoreseydou/Documents/Codex/2026-09-25/co/work/smartsell-social-integrated`. Son `package.json` le nomme **smartsell-management**. Branche observée : `feat/smart-social-management-2026-10-08`. HEAD observé : `edf5ce4e`, correction des exports PDF de facture. Le working tree contient déjà des changements dans `dist`, des fichiers TypeScript générés et des fichiers non suivis : il n’a été ni réinitialisé ni reconstruit.

La vitrine [Smartsell Management](https://seydoutra.github.io/smartsell-management/) a été lue dans le navigateur. Elle présente les modules du produit, un essai de 72 h, des aperçus explicitement fictifs, les tarifs et l’inscription. Elle ne présente pas les cinq verticales du groupe. L’application authentifiée et les données réelles n’ont pas été ouvertes.

L’inventaire local autour du dossier montre plusieurs copies et branches du produit. Aucun dépôt distinct du futur site holding ou d’Obtura n’a été établi dans le périmètre étudié. Cela ne signifie pas qu’ils n’existent pas ailleurs.

## Architecture constatée

| Domaine | Preuve locale | Conclusion |
|---|---|---|
| Frontend | `package.json` : React 19, Vite 7, TypeScript, TanStack Query, React Hook Form, Zod, Framer Motion | Socle SPA de produit, réutilisable comme application Labs |
| Routage | `src/App.tsx:219–234`, `src/lib/marketingRoutes.ts` | Routes par pathname pour vitrine ; hash pour application, inscription et documents légaux |
| Construction | `vite.config.ts` | Base de build `/smartsell-management/`, plusieurs entrées HTML marketing |
| Données | `src/services/repository.ts`, repositories spécialisés | Client Supabase direct et couche métier déjà importante |
| Démo | `src/services/supabase.ts` | Démo si configuration absente ou `VITE_DEMO_MODE` différent de `false` |
| Auth | Client Supabase, pages inscription, fonctions OTP | Parcours existant spécifique au produit ; aucun compte transversal établi |
| Métier | CRM, projets, factures, équipements, production, RH, calendrier, SmartSocial | Smartsell Management est un actif distinct de l’écosystème public |
| Base | `supabase/setup.sql`, migrations numérotées jusqu’à `v68_payment_traceability.sql` | Historique riche ; exécution distante non vérifiée |
| Isolation | `v34_tenant_isolation.sql` | Mécanisme `tenant_owner_id`, pas un modèle d’organisations à reprendre aveuglément |
| Cache | `repository.ts:6–9` | Cache invalidé au changement d’utilisateur ; pas de clé explicite organisation/espace dans ce helper |
| SEO | `public/sitemap.xml`, `index.html` | URLs GitHub Pages et métadonnées à adapter au futur domaine ; aucun audit SEO chiffré |
| PWA | `public/sw.js`, manifest | Cache public borné à `/smartsell-management/` ; préserver cette portée |
| Déploiement | `.github/workflows` | Build et publication GitHub Pages au push sur `main` |
| Qualité | Vitest, tests métiers, scripts browser et SQL | Tests présents ; résultats non exécutés dans cet audit |
| CMS | Recherche ciblée Sanity et modèles Academy/Studios | Aucun CMS d’écosystème ni modèles équivalents repérés dans ce périmètre |

## Écarts vis-à-vis du brief

Pas de structure `apps/*` / `packages/*` multi-produits : le `pnpm-workspace.yaml` contient surtout une politique de builds, pas un monorepo d’écosystème. Les routes publiques sont orientées Management. Le socle Academy, le média public, le catalogue Studios et les pages Labs doivent être conçus séparément. La planification de matériel interne n’établit pas l’existence d’un booking client avec créneaux, acompte et exclusion concurrente.

La base contient des migrations d’isolation récentes. Le document `docs/SAAS_AUDIT_AND_ROADMAP.md` est daté du 26 septembre et cite un ancien commit : ses constats historiques ne sont pas traités comme des failles actuelles confirmées. La RLS effective, les fonctions privilégiées et le déploiement des migrations nécessiteront un audit de staging après validation.

## Identité fournie

Analyse des six PNG via dimensions, canal alpha et couleur dominante. Les trois wordmarks et l’icône jaune font 3240 × 3240. Leurs fonds sont **transparents**, et non noirs. Les couleurs dominantes opaques sont exactement jaune `(243,228,51)`, violet `(105,43,132)` et blanc `(255,255,255)`.

Les wordmarks jaune/violet ont une zone utile x=220–2839, y=1312–1928 ; le blanc x=563–2595, y=1381–1859. Les assets n’ont donc pas les mêmes marges. À 512 px, le symbole occupe environ 92 × 98 px ; à 192 px, 36 × 38 px. Les petites icônes risquent d’être difficiles à distinguer. Prévoir des variantes de cadrage et une icône maskable, sans redessiner le logo ni modifier les sources avant validation.

Les tokens existants `#6a2b85` et `#faee35` dans `src/styles.css` divergent légèrement du brief. Unifier les futurs tokens sur **#692B84 / #F3E433**, puis migrer le produit séparément avec contrôle visuel. La fonte Montserrat locale peut servir de transition ; Space Grotesk + Inter reste la proposition pour le nouvel écosystème.

## KEEP / ADAPT / REBUILD

| Décision | Éléments |
|---|---|
| Garder | Marque, produit Management, règles métier testées, dépôts de données spécialisés, exports, liens existants |
| Adapter | Tokens, contrat de marque, résolution d’URL, identité des utilisateurs à terme, analytics, documentation d’environnement |
| Construire | Holding, cinq verticales, Sanity, catalogue transversal, SEO rendu serveur, recherche globale, modèles transactionnels dédiés |

## Plan de préservation

Construire le nouvel écosystème dans un dépôt/checkout dédié après validation. Laisser Management sur son URL et ses migrations actuelles. La page Labs le décrit et renvoie vers le produit ; elle ne remplace ni sa homepage marketing ni son login. Un futur rattachement au monorepo peut se faire via `apps/management` ou rester dans un dépôt indépendant. Toute convergence d’auth et de données exige un mapping des identités, des tests d’isolation et une migration distincte avec retour arrière.

Cet audit n’a pas lancé de build, tests, migrations, déploiement ou paiement. Il ne promet aucun score de performance ni conformité AA déjà atteinte.
