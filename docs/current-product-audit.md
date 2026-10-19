# Smartsell Ecosystem — audit du produit actuel

Date : 19 octobre 2026. Statut : **audit préalable V2 ; aucune modification produit autorisée par ce document**.

## 1. Conclusion

La base est réutilisable : identité, six applications Next.js, deux langues, menus propres aux univers, portfolio réel, catalogue Academy, articles et médias. Le problème principal de la homepage est sa hiérarchie : elle présente Smartsell comme une agence, puis réexplique cinq univers et expose leurs catalogues. La V2 doit présenter un écosystème à **quatre portes principales**, puis laisser chaque univers expliquer son offre.

La profondeur applicative reste à construire. Les écrans Academy et Studios ne constituent pas encore des inscriptions, évaluations, certificats ou réservations faisant autorité. L’admin publié est une maquette locale ; le chantier Supabase présent dans le workspace est un travail non publié, incomplet pour les exigences V2.

**Décision recommandée : conserver la vitrine et ses composants, simplifier l’orientation, puis ajouter un backend relationnel et des opérations serveur par domaine.** Labs et ses produits restent accessibles en navigation secondaire. Management conserve son dépôt, son hébergement et ses données.

## 2. Périmètre et niveau de preuve

- Dépôt : `Seydoutra/smartsell-ecosystem`. Branche distante `main` lue via GitHub : `7c80fa4798715c3d20733c7ebcd23897710ad60b` (14 octobre 2026).
- HEAD local identique ; branche locale `feature/team-dashboard`, avec des modifications non commitées issues du chantier précédent.
- Homepage publique inspectée dans le navigateur à l’URL fournie. À 1280 px de largeur : 15 titres H2 dans le contenu, une hauteur de document d’environ 22 653 px et cinq entrées principales d’univers. Ces mesures dépendent de la fenêtre et des animations ; elles décrivent la densité, pas un score de performance.
- Inventaire des routes et contenus exécuté depuis les modules TypeScript locaux, sans modifier les sources. Le snapshot de publication local est vide ; les chiffres correspondent au catalogue source.
- Lecture des layouts, configurations, formulaires, interactions, tests, workflows et migrations locales.
- Aucun accès à une base distante, compte marchand, service vidéo ou fournisseur email n’a été utilisé. L’existence d’une configuration externe non visible n’est donc pas certifiée. Aucun secret n’a été lu.
- La tentative de contrôle mobile du navigateur a expiré. L’override de viewport a été réinitialisé. Le responsive est audité dans les sources ; une nouvelle recette visuelle mobile reste nécessaire. Aucun résultat Lighthouse ni test utilisateur de dix secondes n’est revendiqué.

Le présent audit décrit les fonctions et frontières de confiance ; il ne remplace ni un pentest, ni une recette exhaustive de chaque route.

## 3. Architecture et inventaire

| Élément         | Constat vérifié                                                                               | Classement | Décision proposée                                                 |
| --------------- | --------------------------------------------------------------------------------------------- | ---------- | ----------------------------------------------------------------- |
| Monorepo        | pnpm/Turbo ; applications `main`, `agency`, `academy`, `media`, `studio`, `labs`              | KEEP       | Garder les frontières de site et les packages partagés            |
| Framework       | Next.js 16.4, React 19.3, export statique, builds FR et EN séparés                            | KEEP       | Garder la vitrine statique pendant la transition                  |
| Hébergement     | GitHub Actions assemble les exports et publie sur GitHub Pages                                | KEEP       | Ne pas déplacer le public sans nécessité                          |
| Services métier | Pas de route API ou service transactionnel livré dans la référence publiée                    | BUILD      | Supabase Auth/Postgres/Storage + fonctions serveur                |
| Packages        | `brand`, `ui`, `content`, `routing`, `seo`, `types`                                           | KEEP       | Ajouter progressivement des contrats métier communs               |
| Registres       | Pages FR/EN et données distribuées entre `sites.*`, `academy.ts`, `portfolio.ts`, `photos.ts` | REFACTOR   | Import contrôlé vers les tables relationnelles                    |
| Compositions    | Gros fichiers homepage et UI par site ; plusieurs couches CSS globales                        | REFACTOR   | Extraire au besoin et scoper les styles, sans réécriture générale |
| Publication WIP | Snapshot JSON global approuvé puis rebuild GitHub                                             | REFACTOR   | Séparer révision de travail et version publique par contenu       |

Catalogue observé : **16 expertises, 6 identités de marque, 13 sites web, 14 noms clients, 3 séries photo, 18 films, 13 formations, 4 offres entreprises, 20 articles, 3 espaces, 6 packs, 4 produits**. Les volumes de catalogue ne sont pas des chiffres de ventes, d’apprenants ou de productions livrées.

Routes déclarées par langue : Agency 31, Academy 31, Media 55, Studios 19, Labs 8, soit **144 routes verticales**. L’accueil maison, le design system et l’admin s’ajoutent à cet inventaire. Voir [l’inventaire détaillé](audit-route-inventory.md). Les exports locaux contiennent aussi des pages techniques et ne prouvent pas, à eux seuls, l’état du déploiement.

## 4. Audit fonctionnel KEEP / SIMPLIFY / MOVE / REFACTOR / REMOVE / BUILD

| Élément                                 | État actuel                                                                         | Classement | Destination / évolution                                                                           |
| --------------------------------------- | ----------------------------------------------------------------------------------- | ---------- | ------------------------------------------------------------------------------------------------- |
| Logos, jaune/violet, Montserrat         | Identité installée ; les six PNG fournis correspondent aux originaux par SHA-256    | KEEP       | Garder les fichiers à l’identique                                                                 |
| Hero maison                             | Positionnement agence et texte changeant                                            | SIMPLIFY   | Promesse « écosystème digital », quatre verbes lisibles ensemble                                  |
| Accès rapides + carrousel univers       | Deux mécanismes exposent les cinq mêmes portes                                      | SIMPLIFY   | Une grille de quatre cartes, toujours visibles                                                    |
| Labs en cinquième porte                 | Présent au même niveau que les quatre univers principaux                            | MOVE       | `/products/` en pied de page ou menu secondaire ; anciennes URLs conservées                       |
| Catalogue de services sur l’accueil     | Déclinaisons détaillées                                                             | MOVE       | Agency/services ; une carte Agency suffit sur l’accueil                                           |
| Formations sur l’accueil                | Carousel avec les 13 formations                                                     | MOVE       | Academy/courses                                                                                   |
| Produits sur l’accueil                  | Management, Kuma, Obtura, Garant                                                    | MOVE       | Products, avec liens existants préservés                                                          |
| Portfolio d’accueil                     | Onglets identités, sites, photos et vidéo                                           | SIMPLIFY   | 3–4 réalisations sélectionnées ; catalogue complet dans Agency                                    |
| Clients et preuves                      | Noms de clients et compteurs de catalogue                                           | SIMPLIFY   | Bande compacte ; aucun résultat commercial inventé                                                |
| Méthode / manifeste / métiers / publics | Longues sections successives                                                        | MOVE       | À propos et Agency/about/team                                                                     |
| Brief intelligent                       | Six étapes et préparation d’un message WhatsApp                                     | MOVE       | Contact / Agency/contact ; CTA simple sur l’accueil                                               |
| Plan express                            | Tous les liens des cinq sites sur l’accueil                                         | MOVE       | Footer et recherche globale                                                                       |
| Rubans, transitions et scènes répétés   | Nombreuses animations et effets de survol                                           | REMOVE     | Retirer seulement les occurrences superflues de l’accueil ; garder les composants et les contenus |
| Menus propres aux univers               | Déjà présents                                                                       | KEEP       | Réduire les liens prioritaires ; conserver les pages secondaires                                  |
| Recherche globale                       | Filtrage local d’un index de pages                                                  | REFACTOR   | Index public de contenus publiés ; filtrage par type, locale et pagination                        |
| Agency                                  | Portfolio et expertises réels, pages internes, collectif par métiers                | KEEP       | Étendre le modèle projet ; compléter les données éditoriales validées                             |
| Agency CMS                              | Collections du prototype ; pas de gestion complète équipe/témoignages/texte du site | BUILD      | CRUD, médias, mise en avant, ordre, archive/restauration, révisions                               |
| Academy catalogue                       | 13 formations, objectifs, programmes et 3 leçons d’aperçu par formation             | KEEP       | Migrer en cours/modules/leçons, sans assimiler les aperçus à un programme complet                 |
| Academy inscription                     | Ajout/progression locale ; aucune inscription payante faisant autorité              | BUILD      | Smartsell ID, enrollment et contrôle des droits                                                   |
| Player Academy                          | Navigation, texte, exercice et quiz mono-choix                                      | REFACTOR   | Leçons typées et progression serveur ; supports privés                                            |
| Quiz et certificats                     | Réponses correctes dans les données client ; récapitulatif démo                     | BUILD      | Correction serveur, tentatives, validation humaine si nécessaire, certificat vérifiable           |
| Media                                   | Articles texte courts, rubriques, vidéos, recherche et partage                      | KEEP       | Préserver slugs, corps d’articles et fichiers                                                     |
| Media CMS                               | Champs de formulaire et listes de paragraphes                                       | BUILD      | Éditeur riche structuré, auteurs, tags, Une, événements, programmation                            |
| Newsletter                              | Simulation : l’email n’est pas enregistré ni envoyé                                 | BUILD      | Consentement, confirmation, désabonnement et fournisseur email                                    |
| Studios vitrine                         | Espaces, packs, podcast/shooting, galerie                                           | KEEP       | Normaliser services, prix, ressources et options                                                  |
| Studios réservation                     | Contrôles de dates/horaires puis demande WhatsApp                                   | BUILD      | Disponibilités serveur, hold, exclusion des conflits, acompte et confirmation                     |
| Auth publiée                            | Aucun Smartsell ID livré dans la référence auditée                                  | BUILD      | Compte unique, récupération et rôles cumulables                                                   |
| Admin publié                            | JSON du catalogue + sauvegarde locale                                               | REFACTOR   | Réutiliser shell et champs après recette ; brancher les modules relationnels                      |
| Admin WIP                               | OTP, rôles globaux admin/editor/viewer, demandes, archive et snapshot               | REFACTOR   | Ne pas traiter ce chantier comme une application validée ou une base déployée                     |
| Paiements, factures, notifications      | Pas de parcours de production identifié                                             | BUILD      | Opérations serveur et providers abstraits                                                         |
| Analytics                               | Pas de collecte de trafic métier vérifiée                                           | BUILD      | Mesures définies et données réelles ; afficher « non connecté » avant activation                  |

« REMOVE » vise ici la surcharge de présentation. Aucun contenu source ni média n’est proposé à la suppression avant son rattachement à une destination.

## 5. Formulaires, UX, responsive et accessibilité

Le brief maison et le contact Agency préparent un message WhatsApp ; l’envoi effectif appartient au visiteur. Studios prépare également une demande WhatsApp, sans garantir le créneau. Les autres `DraftForm` préparent un texte copiable. La newsletter est une simulation. Il n’existe donc pas aujourd’hui une boîte de réception serveur exhaustive des demandes.

Les composants proposent des labels, des états de formulaire, une recherche en dialog, une pause de mouvement, `prefers-reduced-motion`, des images lazy et des vidéos avec posters. À conserver, puis vérifier sur clavier et lecteurs d’écran. Les hover ne doivent pas porter une information indispensable sur téléphone.

Les styles contiennent des breakpoints jusqu’aux petits écrans. Cela ne garantit pas tous les parcours. Restent à mesurer : focus des dialogs, ordre de lecture, cibles tactiles, contraste des légendes, chargement mobile lent et pages longues. Le dashboard WIP regroupe près de 2 000 lignes dans un composant ; le découpage fonctionnel sera utile avant d’ajouter tout le périmètre V2.

## 6. SEO et performance

- Métadonnées, canonicals, langues FR/EN et OpenGraph existent. L’accueil inclut un schéma Organization.
- Le public inspecté porte `noindex, nofollow` ; la CI de publication force actuellement `NEXT_PUBLIC_INDEXABLE=false`. Ce garde doit être levé seulement pour le contenu public validé.
- Le sitemap de la maison expose essentiellement les accueils quand l’indexation est activée. Il n’est pas le sitemap complet des projets, cours, articles et événements.
- Les cours, articles et événements requièrent des données structurées spécifiques ; les espaces privés, paiement, admin et supports payants restent exclus.
- L’image OpenGraph commune est un wordmark carré : prévoir des images éditoriales dédiées, en conservant le logo original.
- Les images sont optimisées manuellement et Next est en mode `unoptimized`. Plusieurs feuilles globales et des vidéos MP4 sont chargées ; profiler les usages avant extraction et code splitting.
- Aucun score Core Web Vitals n’a été mesuré pendant cet audit. Objectifs de recette proposés : LCP ≤ 2,5 s, INP ≤ 200 ms, CLS ≤ 0,1 aux conditions de mesure documentées, puis validation terrain.

## 7. Backend et sécurité : écart à la V2

Le dossier local `supabase/migrations` contient une migration **non validée sur serveur** avec six tables `ecosystem_*`, un workspace JSON global, un rôle par membre et un bucket public. Cette approche est utile à un petit CMS de transition ; elle ne répond pas aux relations LMS, aux réservations atomiques ni aux neuf rôles cumulables du brief.

Points prioritaires pour la conception :

1. Un éditeur global ne doit pas pouvoir modifier les quatre univers. Le blob global et ses RPC doivent être remplacés ou strictement isolés du futur modèle métier.
2. Une leçon payante et sa correction ne doivent pas être exportées dans le HTML, les bundles ou le JSON public. Cacher un bouton ne suffit pas.
3. Le statut d’un brouillon en cours de modification ne doit pas retirer accidentellement sa dernière version publique.
4. L’actuel bucket public WIP ne convient ni aux documents payants, ni aux devoirs, ni aux factures. Les URLs privées doivent être temporaires et autorisées côté serveur.
5. Paiements et réservations doivent vérifier identité, montant, disponibilité, signature et idempotence côté serveur.
6. Les révisions et archives doivent être restaurables sans réécrire une migration déjà appliquée. L’état réel d’application des migrations devra être vérifié avant toute transition.

## 8. Vérifications effectuées le 19 octobre

| Contrôle                                    | Résultat                                                                        | Portée                                                                               |
| ------------------------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| Lecture de `main` distant                   | SHA confirmé                                                                    | Référence publiée côté sources                                                       |
| Inventaire des registres FR                 | 144 routes verticales, volumes ci-dessus                                        | Aucun parcours transactionnel distant testé                                          |
| Types                                       | `pnpm typecheck` réussi : six tâches ; cinq résultats de cache et une exécution | Workspace local WIP, pas certification de sécurité                                   |
| Tests existants + tests admin WIP           | 15 tests exécutés directement : 14 réussis, 1 échec                             | Échec « baseline catalog » : URL CPR non HTTPS rejetée par la nouvelle validation    |
| Runner habituel                             | `pnpm test` bloqué par la création d’un pipe IPC dans cet environnement         | Relancé par `node --import tsx --test tests/*.test.ts` pour exécuter les mêmes tests |
| Logos                                       | Six fichiers identiques aux pièces de référence                                 | SHA-256 local                                                                        |
| Mobile / E2E                                | Recette actuelle incomplète, contrôle navigateur interrompu                     | Ne pas déclarer une validation globale responsive                                    |
| API, RLS, paiement, emails, providers vidéo | Non exécutés                                                                    | Projet distant et comptes de test non configurés dans cet audit                      |

Les tests `node:test` existants restent utiles. Vitest, Playwright, pgTAP et les tests API demandés sont proposés dans [testing.md](testing.md), sans installation à cette étape.

## 9. Inventaire de migration sans perte

- Conserver toutes les URLs existantes et les fichiers ; cartographier ancien slug → nouvelle entité avant import.
- Garder les licences et crédits des illustrations ; les licences ne sont pas vérifiées juridiquement par cet audit.
- Importer les cours comme **aperçus existants**, et non comme formations automatiquement ouvertes à la vente.
- Ne pas transformer la progression navigateur en réussite certifiée ni un message WhatsApp en réservation confirmée.
- Conserver Labs et les liens Management/Kuma/Obtura/Garant. Aucun compte ni historique Management n’est fusionné.
- Exporter les brouillons locaux avant changement de structure ; tester les imports en staging, puis comparer comptes, slugs et médias.

## 10. Suite soumise à validation

Lire [le dossier de décision V2](product-audit.md), [la nouvelle architecture d’information](new-information-architecture.md), [la homepage proposée](homepage-v2-proposal.md), [la base cible](database.md), [les permissions](roles-permissions.md) et [la roadmap](implementation-roadmap-v2.md).

**Le brief demande d’attendre la validation de ce dossier avant toute modification du produit. Aucun correctif, déploiement ou exécution de migration n’est inclus dans cette étape d’audit.**
