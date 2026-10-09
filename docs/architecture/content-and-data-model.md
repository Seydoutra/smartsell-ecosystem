# Modèle de contenus et de données

Modèle conceptuel à valider avant migrations. Les tables ci-dessous appartiennent au futur écosystème, pas à une migration immédiate de la base Management.

## Répartition des autorités

| Donnée | Autorité | Synchronisation |
|---|---|---|
| Titres, textes, images, SEO, auteurs, programme éditorial | Sanity | Lecture publique après publication |
| Prix vendable, devise, session, capacité, état d’offre | Supabase | La page CMS référence un ID d’offre, le serveur lit le prix |
| Disponibilité espace et état booking | Supabase | Jamais calculés depuis le CMS ou le navigateur seul |
| Identité, permissions, droit de cours et progression | Supabase/Auth | Privé, RLS |
| Vidéos et état de transcodage | Provider vidéo | Métadonnées et assetId référencés |
| Transaction fournisseur | Provider + journal serveur | Webhook vérifié, idempotent, rapprochement |

Le CMS ne devient pas un registre de clients, de factures ou de paiements. Une modification de texte de formation n’altère pas une commande déjà vendue. Les commandes capturent un snapshot de l’offre, des conditions et du montant.

## Sanity : modèles

Tous les contenus partageables portent `vertical`, `locale`, slug localisé, titre, état éditorial, SEO, images avec alt et crédit, et références de suites de parcours.

| Type | Champs spécifiques |
|---|---|
| `siteSettings`, `navigation`, `page`, `vertical` | Identité, menus, blocs autorisés, CTA, coordonnées publiques |
| `caseStudy` | Client autorisé, secteur, année, challenge, approche, exécution, visuels, preuves des résultats, services, équipe, cas suivant |
| `service` | Problème, livrables, méthode, cas liés, FAQ, brief |
| `course` | Promesse, niveau, formats, durée indicative, langue, programme, objectifs, prérequis, outils, projets, formateur, certification et FAQ ; ID d’offre |
| `person` | Biographie, rôle, photo, crédits, liens professionnels approuvés |
| `article`, `category`, `tag` | Chapô, auteur, date, corps structuré, citations, images, embeds autorisés, temps de lecture, liens liés |
| `studioSpace`, `studioPackage`, `studioAddon` | Descriptions, équipements, galerie, staff, livrables ; IDs transactionnels |
| `product` | Nom, état réel, problème, solution, fonctionnalités, captures autorisées, démo, teaser tarif/roadmap, CTA |
| `testimonial`, `partner`, `metric`, `event`, `resource` | Consentement/droit de publication, dates, preuve, document, CTA |

Workflow : brouillon → revue → preview → publication immédiate ou programmée → mise à jour → archive. Validation des champs SEO, alt, droits des images et destinations de CTA. Une nouvelle rubrique sans articles ne doit pas créer une page publique vide. Prévoir références de traduction ; ne jamais traduire automatiquement les conditions, prix et engagements.

## Supabase : relations proposées

| Tables | Clés / relations | Phase d’activation |
|---|---|---|
| `profiles` | PK = `auth.users.id`, préférences et langue | 3, extension 6 |
| `organizations`, `organization_memberships`, `permissions`, `role_permissions` | Rôles par organisation, pas un champ admin global utilisateur | 6 ; schéma 1 |
| `academy_courses` | UUID, `cms_document_id` unique, état d’offre, devise, prix | 3 ; schéma 1 |
| `academy_sessions` | FK course, format, horaires, capacité, période d’inscription | 3 |
| `academy_enrollments` | FK user/course/session/order, état, contrainte contre inscription active dupliquée | 3 |
| `academy_progress` | FK enrollment/lesson, unicité par paire, completion timestamp | 4 |
| `modules`, `lessons` | FK course/module, ordre unique par parent, version de programme | 4 |
| `quizzes`, `quiz_questions`, `answers`, `quiz_attempts` | Leçon/quiz, tentative et propriétaire ; correction serveur | 4 |
| `certificates` | FK enrollment, ID public non séquentiel, date, révocation | 4 |
| `lesson_notes`, `lesson_comments`, `support_requests` | Propriétaire et ressource, règles de visibilité | 4 |
| `studio_spaces`, `studio_services`, `studio_packages`, `studio_addons` | Catalogue transactionnel, IDs CMS, prix serveur | 5 ; schéma 1 |
| `studio_package_addons` | Compatibilité package/add-on, quantités max | 5 |
| `studio_availability` | Espace, récurrence, exceptions et fermetures | 5 |
| `studio_bookings`, `studio_booking_addons` | Espace, user/contact, package, intervalle, prix snapshot et état | 5 |
| `newsletter_subscribers`, `newsletter_preferences`, `consent_events` | Email normalisé, segments, opt-in confirmé et preuve | 1–2 |
| `leads`, `contact_requests`, `product_demo_requests` | Verticale/source, coordonnées minimales, état de traitement, timestamps | 1 |
| `orders`, `order_items`, `transactions`, `payment_events`, `refunds` | Montant/devise serveur, provider reference, événement unique, état | 3 puis 5 |
| `audit_events`, `integration_outbox` | Historique actions serveur et événements à rejouer | Dès services actifs |

La requête anonyme crée une demande via endpoint serveur validé, avec limitation de débit ; elle ne peut pas lister les demandes. Les nouveaux schémas sont prévus en phase 1, mais un schéma ne signifie pas que son service utilisateur est activé.

## Accès

Visiteur : contenus publiés et formulaire protégé. Apprenant : propres inscriptions, documents et progression. Client Studio : propres réservations et pièces. Personnel : périmètre de sa verticale et permissions attribuées. Administrateur : périmètre explicite, actions journalisées. Propriétaire de plateforme : rôle contrôlé, jamais déduit de l’email fourni au formulaire.

RLS et policies Storage testées avec deux utilisateurs et deux organisations. Ressources privées stockées sous un préfixe propriétaire ; URLs signées après contrôle du droit. Clés privilégiées uniquement serveur. Références inter-organisations rejetées par contraintes cohérentes. Autorisations reconstruites sur chaque mutation sensible.

## Réservation sans double attribution — phase 5

L’intervalle bloqué inclut préparation et remise en état. Utiliser une plage `tstzrange` semi-ouverte `[début, fin)` et une contrainte d’exclusion GiST sur `(space_id, occupied_range)` pour les états qui bloquent. PostgreSQL documente ce mécanisme pour interdire des intervalles qui se chevauchent : [Range Types / exclusion constraints](https://www.postgresql.org/docs/current/rangetypes.html).

États : demande (non bloquante), hold (bloquant, expiration), attente paiement, confirmée, terminée, annulée, expirée. Le serveur vérifie horaires, fermeture, package, add-ons et durée. Un hold est acquis dans une transaction ; la contrainte arbitre deux requêtes simultanées. Les holds expirés sont explicitement libérés sous verrou avant acquisition et par un worker périodique : pas de prédicat dynamique `now()` dans la contrainte.

Webhook tardif après expiration : ne pas confirmer un créneau déjà réattribué ; diriger vers remboursement/traitement opérateur selon politique approuvée. Prix et confirmation provenant du navigateur ne font jamais autorité. Les équipements exclusifs et le personnel indisponible ajoutent leurs contraintes propres ; les stocks quantitatifs sont gérés transactionnellement.

## Recherche, recommandations et intégrations

Projection publique `content_id`, type, titre, extrait, tags, verticale, locale, destination et image. Mise à jour depuis événements de publication, retrait à l’archive. Recommandations éditoriales prioritaires, repli sur tags communs ; respecter publication, langue et disponibilité d’offre.

Intégration Management future via API serveur/outbox, mapping des IDs et contrat versionné. Ne jamais pousser les profils LMS dans les tables RH de Management. Partager une définition de format ou un contrat de référence ne nécessite pas de partager toutes les données.

Rétention, suppression, archivage comptable et textes juridiques seront définis avec le responsable concerné. Ce document spécifie les responsabilités techniques et ne rédige pas des conditions légales comme si elles étaient déjà validées.
