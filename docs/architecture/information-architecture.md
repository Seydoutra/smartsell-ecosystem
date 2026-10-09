# Architecture de l’information et sitemap complet

125 entrées de routes et gabarits proposés. Les lignes `[slug]` sont des templates, pas des URLs de contenus réels. Les lignes concrètes service/catégorie/produit sont des déclinaisons de ces templates : leur présence ne signifie pas qu’elles soient déjà construites.

## Règles de lecture

- Toutes les routes portent `/fr` dans la version publiée. Les exemples du brief sans préfixe deviennent des redirections 301/308 vers leur équivalent `/fr`. `/` redirige vers `/fr`, sans géolocalisation imposée.
- `/en` utilise les mêmes gabarits mais reste non publié et absent du sitemap XML jusqu’à validation de la traduction. Les slugs peuvent être localisés via une référence de traduction.
- P1 = socle et contenus de base ; P2 = back-office ; P3 = commerce Academy ; P4 = LMS ; P5 = booking ; P6 = compte commun ; P7 = intégrations produits.
- « Indexable oui » signifie éligible seulement si le contenu est publié, utile et validé. Ce registre inclut aussi les routes privées et futures pour planifier le produit ; il ne sert pas directement de sitemap XML.
- Les confirmations, recherches, authentification, compte et admin restent hors sitemap public. Une route future n’apparaît pas comme lien actif si son service est indisponible.

## Hiérarchie générale

```text
SMARTSELL /fr
├── Maison : about, our-story, team, ecosystem, work, products, careers, contact
├── Agency : services → service ; work → étude de cas ; clients ; contact ; careers
├── Academy : courses → formation ; categories ; instructors ; corporate ; events ; apprentissage
├── Media : rubriques → article ; authors ; recherche ; politique éditoriale
├── Studios /studio : spaces → espace ; services ; pricing ; booking ; gallery ; faq
├── Labs : products → Management / Obtura / futur produit ; research ; ai ; contact
└── Partagé : search, newsletter, legal ; account et admin selon phases
```

## Routes détaillées

### Maison mère

| Route | Page / fonction | Phase | Accès | Indexable |
|---|---|---:|---|---|
| `/fr` | Accueil maison | 1 | public | oui |
| `/fr/about` | À propos | 1 | public | oui |
| `/fr/our-story` | Notre histoire | 1 | public | oui |
| `/fr/team` | Équipe et leadership | 1 | public | oui |
| `/fr/ecosystem` | Écosystème | 1 | public | oui |
| `/fr/work` | Réalisations du groupe | 1 | public | oui |
| `/fr/products` | Produits du groupe | 1 | public | oui |
| `/fr/careers` | Carrières | 1 | public | oui |
| `/fr/contact` | Contact | 1 | public | oui |
| `/fr/newsletter` | Newsletter segmentée | 1 | public | oui |
| `/fr/search` | Recherche globale | 1 | public | non |
| `/fr/legal` | Mentions légales | 1 | public | oui |
| `/fr/privacy` | Confidentialité | 1 | public | oui |
| `/fr/cookies` | Cookies | 1 | public | oui |
| `/fr/terms` | Conditions générales | 1 | public | oui |
| `/fr/refund-policy` | Politique de remboursement | 1 | public | oui |

### Agency

| Route | Page / fonction | Phase | Accès | Indexable |
|---|---|---:|---|---|
| `/fr/agency` | Accueil Agency | 1 | public | oui |
| `/fr/agency/about` | À propos Agency | 1 | public | oui |
| `/fr/agency/services` | Services | 1 | public | oui |
| `/fr/agency/work` | Portfolio | 1 | public | oui |
| `/fr/agency/clients` | Clients | 1 | public | oui |
| `/fr/agency/contact` | Brief et contact | 1 | public | oui |
| `/fr/agency/careers` | Carrières Agency | 1 | public | oui |
| `/fr/agency/services/[slug]` | Détail service | 1 | public | oui |
| `/fr/agency/work/[slug]` | Étude de cas | 1 | public | oui |
| `/fr/agency/services/brand-strategy` | Brand Strategy | 1 | public | oui |
| `/fr/agency/services/branding` | Branding | 1 | public | oui |
| `/fr/agency/services/digital-marketing` | Digital Marketing | 1 | public | oui |
| `/fr/agency/services/social-media` | Social Media | 1 | public | oui |
| `/fr/agency/services/performance-marketing` | Performance Marketing | 1 | public | oui |
| `/fr/agency/services/web-design` | Web Design | 1 | public | oui |
| `/fr/agency/services/web-development` | Web Development | 1 | public | oui |
| `/fr/agency/services/apps` | Apps | 1 | public | oui |
| `/fr/agency/services/product-design` | Product Design | 1 | public | oui |
| `/fr/agency/services/ui-ux` | UI/UX | 1 | public | oui |
| `/fr/agency/services/video-production` | Video Production | 1 | public | oui |
| `/fr/agency/services/photography` | Photography | 1 | public | oui |
| `/fr/agency/services/content` | Content | 1 | public | oui |
| `/fr/agency/services/ai-automation` | AI Automation | 1 | public | oui |
| `/fr/agency/services/crm` | CRM | 1 | public | oui |
| `/fr/agency/services/business-growth` | Business Growth | 1 | public | oui |

### Academy

| Route | Page / fonction | Phase | Accès | Indexable |
|---|---|---:|---|---|
| `/fr/academy` | Accueil Academy | 1 | public | oui |
| `/fr/academy/courses` | Catalogue formations | 1 | public | oui |
| `/fr/academy/instructors` | Formateurs | 1 | public | oui |
| `/fr/academy/corporate` | Formations entreprises | 1 | public | oui |
| `/fr/academy/events` | Événements et cohortes | 1 | public | oui |
| `/fr/academy/resources` | Ressources gratuites | 1 | public | oui |
| `/fr/academy/faq` | FAQ formations | 1 | public | oui |
| `/fr/academy/terms` | Conditions Academy | 1 | public | oui |
| `/fr/academy/courses/[slug]` | Fiche formation | 1 | public | oui |
| `/fr/academy/categories/[slug]` | Catégorie de formation | 1 | public | oui |
| `/fr/academy/instructors/[slug]` | Profil formateur | 1 | public | oui |
| `/fr/academy/categories/digital-marketing` | Marketing digital | 1 | public | oui |
| `/fr/academy/categories/community-management` | Community Management | 1 | public | oui |
| `/fr/academy/categories/graphic-design` | Graphic Design | 1 | public | oui |
| `/fr/academy/categories/ui-ux` | UI/UX | 1 | public | oui |
| `/fr/academy/categories/web-development` | Web Development | 1 | public | oui |
| `/fr/academy/categories/ai` | IA | 1 | public | oui |
| `/fr/academy/categories/data` | Data | 1 | public | oui |
| `/fr/academy/categories/power-bi` | Power BI | 1 | public | oui |
| `/fr/academy/categories/video-production` | Video Production | 1 | public | oui |
| `/fr/academy/categories/photography` | Photography | 1 | public | oui |
| `/fr/academy/categories/sales` | Sales | 1 | public | oui |
| `/fr/academy/categories/entrepreneurship` | Entrepreneurship | 1 | public | oui |
| `/fr/academy/categories/product-management` | Product Management | 1 | public | oui |
| `/fr/academy/categories/automation` | Automation | 1 | public | oui |
| `/fr/academy/dashboard` | Tableau de bord apprenant | 4 | utilisateur | non |
| `/fr/academy/my-courses` | Mes cours | 4 | utilisateur | non |
| `/fr/academy/learn/[courseSlug]/[lessonId]` | Lecteur de leçon | 4 | utilisateur | non |
| `/fr/academy/documents` | Documents | 4 | utilisateur | non |
| `/fr/academy/support` | Support apprenant | 4 | utilisateur | non |
| `/fr/academy/checkout/[offerId]` | Inscription et paiement | 3 | utilisateur | non |
| `/fr/academy/invoices` | Mes factures | 3 | utilisateur | non |
| `/fr/academy/profile` | Profil Academy | 3 | utilisateur | non |
| `/fr/academy/certificate/[id]` | Vérification certificat | 4 | public | non |

### Media

| Route | Page / fonction | Phase | Accès | Indexable |
|---|---|---:|---|---|
| `/fr/media` | Accueil Media | 1 | public | oui |
| `/fr/media/latest` | Dernières histoires | 1 | public | oui |
| `/fr/media/tech` | Tech | 1 | public | oui |
| `/fr/media/ai` | IA | 1 | public | oui |
| `/fr/media/startups` | Startups | 1 | public | oui |
| `/fr/media/business` | Business | 1 | public | oui |
| `/fr/media/marketing` | Marketing | 1 | public | oui |
| `/fr/media/creative` | Culture créative | 1 | public | oui |
| `/fr/media/africa` | Afrique | 1 | public | oui |
| `/fr/media/guinea` | Guinée | 1 | public | oui |
| `/fr/media/opinions` | Opinions | 1 | public | oui |
| `/fr/media/interviews` | Interviews | 1 | public | oui |
| `/fr/media/article/[slug]` | Article | 1 | public | oui |
| `/fr/media/authors/[slug]` | Auteur | 1 | public | oui |
| `/fr/media/search` | Recherche Media | 1 | public | non |
| `/fr/media/editorial-policy` | Politique éditoriale | 1 | public | oui |

### Studios

| Route | Page / fonction | Phase | Accès | Indexable |
|---|---|---:|---|---|
| `/fr/studio` | Accueil Studios | 1 | public | oui |
| `/fr/studio/spaces` | Espaces | 1 | public | oui |
| `/fr/studio/services` | Services de production | 1 | public | oui |
| `/fr/studio/pricing` | Packages et tarifs | 1 | public | oui |
| `/fr/studio/gallery` | Galerie | 1 | public | oui |
| `/fr/studio/faq` | FAQ Studios | 1 | public | oui |
| `/fr/studio/terms` | Conditions Studio | 1 | public | oui |
| `/fr/studio/spaces/[slug]` | Fiche espace | 1 | public | oui |
| `/fr/studio/booking` | Demande de créneau P1 ; booking transactionnel P5 | 1 | public | non |
| `/fr/studio/booking/confirmation/[id]` | Confirmation privée | 5 | utilisateur | non |

### Labs

| Route | Page / fonction | Phase | Accès | Indexable |
|---|---|---:|---|---|
| `/fr/labs` | Accueil Labs | 1 | public | oui |
| `/fr/labs/products` | Catalogue produits | 1 | public | oui |
| `/fr/labs/research` | Recherche | 1 | public | oui |
| `/fr/labs/ai` | IA et automatisation | 1 | public | oui |
| `/fr/labs/contact` | Contact Labs | 1 | public | oui |
| `/fr/labs/products/[slug]` | Fiche produit | 1 | public | oui |
| `/fr/labs/products/smartsell-management` | SMARTSELL MANAGEMENT | 1 | public | oui |
| `/fr/labs/products/obtura` | OBTURA — état à confirmer | 1 | public | oui |

### Services partagés

| Route | Page / fonction | Phase | Accès | Indexable |
|---|---|---:|---|---|
| `/fr/account` | Compte Smartsell ID | 6 | utilisateur | non |
| `/fr/account/profile` | Profil commun | 6 | utilisateur | non |
| `/fr/account/organizations` | Organisations et accès | 6 | utilisateur | non |
| `/fr/account/invoices` | Factures transversales | 6 | utilisateur | non |
| `/fr/auth/login` | Connexion centrale | 6 | public | non |
| `/fr/auth/callback` | Callback identité | 6 | public | non |
| `/fr/admin` | Hub administratif | 2 | personnel | non |
| `/fr/admin/content` | Pages et contenus | 2 | personnel | non |
| `/fr/admin/portfolio` | Portfolio | 2 | personnel | non |
| `/fr/admin/academy` | Academy | 2 | personnel | non |
| `/fr/admin/media` | Media | 2 | personnel | non |
| `/fr/admin/studio` | Demandes puis réservations | 2 | personnel | non |
| `/fr/admin/products` | Produits | 2 | personnel | non |
| `/fr/admin/forms` | Demandes | 2 | personnel | non |
| `/fr/admin/newsletter` | Newsletter | 2 | personnel | non |
| `/fr/admin/users` | Utilisateurs | 6 | personnel | non |

## Pages transversales et canonical

`/fr/work` agrège des cas Agency et renvoie aux détails `/fr/agency/work/[slug]`, sans dupliquer les détails. `/fr/products` renvoie aux pages Labs. Les formations vedettes et articles de la maison renvoient à la verticale propriétaire. Chaque contenu possède un seul détail canonique.

Les catégories de portfolio sont des filtres du catalogue, pas dix pages SEO vides : Branding, Websites, Applications, Campaigns, Photography, Film, Social Media, Products, AI, Strategy. Les catégories Academy ont des pages propres quand des cours validés existent. Les rubriques Media publient leurs listes et articles ; les tags restent des filtres tant qu’un contenu suffisant ne justifie pas leur page.

## Inventaire de contenus préparés après validation

| Verticale | Minimum de démonstration demandé | Gabarit propriétaire |
|---|---:|---|
| Agency | 6 cas | caseStudy |
| Academy | 8 formations | course |
| Media | 20 articles | article |
| Studios | 6 packages | package ; liste pricing |
| Labs | 2 produits | product |

Ces 42 contenus ne sont pas rédigés intégralement à ce stade de cadrage. Ils feront partie des previews de développement, avec marquage démonstration tant que faits et droits ne sont pas validés. Aucun prix, avis ni résultat fictif ne sera publié comme réel.

## États et systèmes hors sitemap éditorial

404 par langue/verticale, contenu archivé et redirection si remplacement, état vide de catalogue/recherche, erreur réseau et succès de formulaire. Ressources système futures : `/robots.txt`, `/sitemap.xml` et variantes par domaine/langue ; API et webhooks ne sont pas des pages de navigation. Le Sanity Studio possède son propre domaine administratif, à définir au déploiement.

Le registre [CSV](../sitemap.csv) et [JSON](../sitemap.json) reprend ces lignes, avec type de template. Il servira à contrôler couverture, accès, phases et résolution de destinations.
