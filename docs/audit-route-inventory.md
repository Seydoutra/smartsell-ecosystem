# Inventaire des routes actuelles

Date : 19 octobre 2026. Registre source TypeScript, sans modification des routes. Chaque chemin existe en intention de build FR et EN ; cet inventaire ne constitue pas un crawl HTTP exhaustif.

Les liens publics sont actuellement préfixés par `/smartsell-ecosystem`. Les chemins ci-dessous utilisent `/:locale/` pour désigner `/fr/` et `/en/`.

| Site             | Routes déclarées par langue |
| ---------------- | --------------------------: |
| agency           |                          31 |
| academy          |                          31 |
| media            |                          55 |
| studio           |                          19 |
| labs             |                           8 |
| Total verticales |                         144 |

Routes maison supplémentaires : accueil de langue, `/design-system/` et `/admin/` ; racine de redirection et pages techniques à part. Le sitemap cible est présenté dans [sitemap-v2.md](sitemap-v2.md).

## agency

| Chemin actuel                                 | Composition | Titre du registre                    |
| --------------------------------------------- | ----------- | ------------------------------------ |
| `/:locale/agency/`                            | home        | Des marques qui font le mouvement.   |
| `/:locale/agency/services/`                   | services    | Une idée. Toutes ses dimensions.     |
| `/:locale/agency/services/strategie/`         | story       | Stratégie de marque                  |
| `/:locale/agency/services/branding/`          | story       | Identité & branding                  |
| `/:locale/agency/services/marketing/`         | story       | Marketing digital                    |
| `/:locale/agency/services/social-media/`      | story       | Social media                         |
| `/:locale/agency/services/performance/`       | story       | Campagnes & performance              |
| `/:locale/agency/services/web-design/`        | story       | Web design                           |
| `/:locale/agency/services/web-development/`   | story       | Développement web                    |
| `/:locale/agency/services/applications/`      | story       | Applications                         |
| `/:locale/agency/services/product-design/`    | story       | Product design                       |
| `/:locale/agency/services/ui-ux/`             | story       | UI & UX                              |
| `/:locale/agency/services/video/`             | story       | Film & vidéo                         |
| `/:locale/agency/services/photographie/`      | story       | Photographie                         |
| `/:locale/agency/services/contenus/`          | story       | Création de contenus                 |
| `/:locale/agency/services/ia-automatisation/` | story       | IA & automatisation                  |
| `/:locale/agency/services/crm/`               | story       | CRM & opérations                     |
| `/:locale/agency/services/croissance/`        | story       | Business growth                      |
| `/:locale/agency/work/`                       | work        | Le travail parle.                    |
| `/:locale/agency/work/focus-com/`             | brand       | Focus-Com                            |
| `/:locale/agency/work/g-traf/`                | brand       | G-TRAF+                              |
| `/:locale/agency/work/bet224/`                | brand       | Bet224                               |
| `/:locale/agency/work/laguipres/`             | brand       | LAGUIPRES                            |
| `/:locale/agency/work/tmc/`                   | brand       | Timam Corporation                    |
| `/:locale/agency/work/trixion/`               | brand       | Trixion                              |
| `/:locale/agency/history/`                    | story       | Une maison. Une continuité.          |
| `/:locale/agency/team/`                       | story       | Des métiers qui dialoguent.          |
| `/:locale/agency/about/`                      | story       | L’agence, dans l’écosystème.         |
| `/:locale/agency/careers/`                    | contact     | Rejoindre la conversation.           |
| `/:locale/agency/contact/`                    | contact     | Parlons de votre prochain mouvement. |
| `/:locale/agency/privacy/`                    | story       | Vos données, vos choix.              |

## academy

| Chemin actuel                                      | Composition | Titre du registre                                     |
| -------------------------------------------------- | ----------- | ----------------------------------------------------- |
| `/:locale/academy/`                                | home        | Le savoir ouvre le champ.                             |
| `/:locale/academy/courses/`                        | courses     | Nos modules de formation.                             |
| `/:locale/academy/courses/communication-digitale/` | course      | Communication digitale — Stratégie de contenu         |
| `/:locale/academy/learn/communication-digitale/`   | learn       | Communication digitale — Stratégie de contenu         |
| `/:locale/academy/courses/redaction-web/`          | course      | Rédaction institutionnelle pour le web                |
| `/:locale/academy/learn/redaction-web/`            | learn       | Rédaction institutionnelle pour le web                |
| `/:locale/academy/courses/canva-pro/`              | course      | Canva Pro — Visuels professionnels                    |
| `/:locale/academy/learn/canva-pro/`                | learn       | Canva Pro — Visuels professionnels                    |
| `/:locale/academy/courses/meta-business-suite/`    | course      | Meta Business Suite — Pages officielles               |
| `/:locale/academy/learn/meta-business-suite/`      | learn       | Meta Business Suite — Pages officielles               |
| `/:locale/academy/courses/montage-video/`          | course      | Montage vidéo simple — Initiation                     |
| `/:locale/academy/learn/montage-video/`            | learn       | Montage vidéo simple — Initiation                     |
| `/:locale/academy/courses/ia-marketing/`           | course      | Intelligence artificielle appliquée au marketing      |
| `/:locale/academy/learn/ia-marketing/`             | learn       | Intelligence artificielle appliquée au marketing      |
| `/:locale/academy/courses/prompt-engineering/`     | course      | Prompt engineering — Parler à l’IA                    |
| `/:locale/academy/learn/prompt-engineering/`       | learn       | Prompt engineering — Parler à l’IA                    |
| `/:locale/academy/courses/gestion-de-crise/`       | course      | Communication en période sensible — Gestion de crise  |
| `/:locale/academy/learn/gestion-de-crise/`         | learn       | Communication en période sensible — Gestion de crise  |
| `/:locale/academy/courses/infographie-canva/`      | course      | Infographie & Canva — Du fondamental au niveau agence |
| `/:locale/academy/learn/infographie-canva/`        | learn       | Infographie & Canva — Du fondamental au niveau agence |
| `/:locale/academy/courses/creation-contenu-ia/`    | course      | Création de contenu & IA — Intensif                   |
| `/:locale/academy/learn/creation-contenu-ia/`      | learn       | Création de contenu & IA — Intensif                   |
| `/:locale/academy/courses/motion-design-claude/`   | course      | Motion design avec Claude                             |
| `/:locale/academy/learn/motion-design-claude/`     | learn       | Motion design avec Claude                             |
| `/:locale/academy/courses/garder-le-meme-visage/`  | course      | Garder le même visage                                 |
| `/:locale/academy/learn/garder-le-meme-visage/`    | learn       | Garder le même visage                                 |
| `/:locale/academy/courses/court-metrage-ia/`       | course      | Faire un court-métrage avec l’IA                      |
| `/:locale/academy/learn/court-metrage-ia/`         | learn       | Faire un court-métrage avec l’IA                      |
| `/:locale/academy/corporate/`                      | corporate   | Former vos équipes.                                   |
| `/:locale/academy/dashboard/`                      | dashboard   | Mon espace.                                           |
| `/:locale/academy/privacy/`                        | story       | Vos données, vos choix.                               |

## media

| Chemin actuel                                       | Composition | Titre du registre                              |
| --------------------------------------------------- | ----------- | ---------------------------------------------- |
| `/:locale/media/`                                   | home        | Smartsell Media.                               |
| `/:locale/media/videos/`                            | videos      | Nos vidéos.                                    |
| `/:locale/media/video/la-patronne/`                 | film        | La Patronne                                    |
| `/:locale/media/video/kader-aye-sonna/`             | film        | Kader & Aye Sonna                              |
| `/:locale/media/video/prestige-glow/`               | film        | Prestige Glow                                  |
| `/:locale/media/video/dkh-dkr/`                     | film        | DKH Parfums                                    |
| `/:locale/media/video/radisson-karaa/`              | film        | Radisson × Karaa                               |
| `/:locale/media/video/princess/`                    | film        | Princess                                       |
| `/:locale/media/video/aye-sonna/`                   | film        | Aye Sonna                                      |
| `/:locale/media/video/ghost/`                       | film        | Ghost                                          |
| `/:locale/media/video/johndoe/`                     | film        | John Doe                                       |
| `/:locale/media/video/r2/`                          | film        | R2                                             |
| `/:locale/media/video/ak-teaser/`                   | film        | AK                                             |
| `/:locale/media/video/kdkr/`                        | film        | KDKR                                           |
| `/:locale/media/video/kk/`                          | film        | KK                                             |
| `/:locale/media/video/coco/`                        | film        | Coco                                           |
| `/:locale/media/video/seye/`                        | film        | Seye                                           |
| `/:locale/media/video/aissa/`                       | film        | Aïssa                                          |
| `/:locale/media/video/drews/`                       | film        | Drews                                          |
| `/:locale/media/video/reel-studio/`                 | film        | Reel studio                                    |
| `/:locale/media/latest/`                            | articles    | Les articles.                                  |
| `/:locale/media/tech/`                              | category    | Tech                                           |
| `/:locale/media/ai/`                                | category    | Intelligence artificielle                      |
| `/:locale/media/startups/`                          | category    | Startups                                       |
| `/:locale/media/business/`                          | category    | Business                                       |
| `/:locale/media/marketing/`                         | category    | Marketing                                      |
| `/:locale/media/creative/`                          | category    | Culture créative                               |
| `/:locale/media/africa/`                            | category    | Afrique                                        |
| `/:locale/media/guinea/`                            | category    | Guinée                                         |
| `/:locale/media/opinions/`                          | category    | Opinions                                       |
| `/:locale/media/interviews/`                        | category    | Entretiens                                     |
| `/:locale/media/article/une-marque-est-un-systeme/` | article     | Une marque est un système, pas une affiche.    |
| `/:locale/media/article/brief-qui-ouvre/`           | article     | Le brief qui ouvre des possibilités.           |
| `/:locale/media/article/ia-premier-brouillon/`      | article     | L’IA et le premier brouillon.                  |
| `/:locale/media/article/site-mobile/`               | article     | Dessiner d’abord le parcours mobile.           |
| `/:locale/media/article/apprendre-par-projet/`      | article     | Apprendre par un projet concret.               |
| `/:locale/media/article/podcast-preparation/`       | article     | Un podcast commence avant le micro.            |
| `/:locale/media/article/petite-entreprise-outils/`  | article     | Choisir un outil pour une petite équipe.       |
| `/:locale/media/article/conakry-angle-editorial/`   | article     | Conakry comme point de départ éditorial.       |
| `/:locale/media/article/entreprendre-petit/`        | article     | Commencer petit pour apprendre vite.           |
| `/:locale/media/article/campagne-question/`         | article     | Une campagne. Une question claire.             |
| `/:locale/media/article/design-et-contrainte/`      | article     | La contrainte comme matière créative.          |
| `/:locale/media/article/donnees-avant-graphiques/`  | article     | Les données avant les graphiques.              |
| `/:locale/media/article/portrait-questions/`        | article     | Préparer un entretien qui laisse une voix.     |
| `/:locale/media/article/afrique-contextes/`         | article     | Parler de contextes, au pluriel.               |
| `/:locale/media/article/portfolio-demarche/`        | article     | Un portfolio peut montrer la démarche.         |
| `/:locale/media/article/automatisation-humaine/`    | article     | L’automatisation et le point de contrôle.      |
| `/:locale/media/article/calendrier-realiste/`       | article     | Un calendrier qui laisse de la place.          |
| `/:locale/media/article/transmettre-outil/`         | article     | Transmettre un outil, transmettre sa maîtrise. |
| `/:locale/media/article/mouvement-utile/`           | article     | Le mouvement doit servir une idée.             |
| `/:locale/media/article/creer-ensemble/`            | article     | Créer ensemble demande un langage commun.      |
| `/:locale/media/search/`                            | search      | Trouver une idée.                              |
| `/:locale/media/authors/redaction/`                 | articles    | La rédaction Smartsell.                        |
| `/:locale/media/newsletter/`                        | newsletter  | La suite dans votre boîte mail.                |
| `/:locale/media/privacy/`                           | story       | Vos données, vos choix.                        |

## studio

| Chemin actuel                              | Composition | Titre du registre                    |
| ------------------------------------------ | ----------- | ------------------------------------ |
| `/:locale/studio/`                         | home        | Studio podcast & photo à Conakry.    |
| `/:locale/studio/podcast/`                 | podcast     | Studio podcast à Conakry.            |
| `/:locale/studio/shooting/`                | shooting    | Studio photo à Conakry.              |
| `/:locale/studio/spaces/`                  | spaces      | Nos plateaux.                        |
| `/:locale/studio/spaces/podcast/`          | space       | Studio podcast                       |
| `/:locale/studio/spaces/photo/`            | space       | Studio photo                         |
| `/:locale/studio/spaces/video/`            | space       | Plateau vidéo                        |
| `/:locale/studio/pricing/`                 | packs       | Des formules claires, sans surprise. |
| `/:locale/studio/packs/podcast-brut/`      | pack        | Podcast brut                         |
| `/:locale/studio/packs/podcast-montage/`   | pack        | Podcast + montage                    |
| `/:locale/studio/packs/podcast-reels/`     | pack        | Podcast + montage + Reels            |
| `/:locale/studio/packs/shooting-pro/`      | pack        | Shooting professionnel               |
| `/:locale/studio/packs/shooting-mode/`     | pack        | Shooting mode                        |
| `/:locale/studio/packs/shooting-produits/` | pack        | Shooting produits                    |
| `/:locale/studio/booking/`                 | booking     | Réserver une séance.                 |
| `/:locale/studio/gallery/`                 | gallery     | Lumière. Cadre. Matière.             |
| `/:locale/studio/faq/`                     | faq         | Avant d’entrer en studio.            |
| `/:locale/studio/contact/`                 | contact     | Parlons de votre production.         |
| `/:locale/studio/privacy/`                 | story       | Vos données, vos choix.              |

## labs

| Chemin actuel                        | Composition | Titre du registre                         |
| ------------------------------------ | ----------- | ----------------------------------------- |
| `/:locale/labs/`                     | home        | La suite se construit.                    |
| `/:locale/labs/products/`            | products    | Des outils pour faire avancer le travail. |
| `/:locale/labs/products/management/` | management  | Smartsell Management.                     |
| `/:locale/labs/products/obtura/`     | obtura      | Obtura. Le travail créatif, relié.        |
| `/:locale/labs/research/`            | story       | Explorer pour mieux construire.           |
| `/:locale/labs/ai/`                  | story       | Automatiser avec une intention.           |
| `/:locale/labs/contact/`             | contact     | Quel problème voulez-vous résoudre ?      |
| `/:locale/labs/privacy/`             | story       | Vos données, vos choix.                   |
