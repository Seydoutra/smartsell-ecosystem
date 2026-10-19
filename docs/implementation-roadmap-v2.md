# Roadmap V2 — lots et critères de validation

Statut : architecture et homepage approuvées par le propriétaire le 19 octobre 2026. Phase 1 implémentée ; les phases suivantes restent à engager explicitement. Le test humain de compréhension reste à organiser. Aucune date ou durée ferme n’est annoncée sans connaissance des contenus pédagogiques, tarifs, fournisseurs et comptes disponibles.

| Phase                            | Livraison                                                                                              | Dépendances                                            | Critère de sortie                                                                          |
| -------------------------------- | ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| 0 — Audit                        | Audit actuel, IA, homepage, sitemap, modèle Supabase/RBAC, risques et roadmap                          | Dépôt et brief V2                                      | Dossier présenté, validation du propriétaire avant modification                            |
| 1 — Accueil et navigation        | Cinq sections, quatre cartes ; Labs/Produits secondaire ; contenus déplacés et anciens liens conservés | Validation phase 0                                     | Test compréhension 10 s, recette responsive, aucun contenu perdu                           |
| 2 — Supabase, Auth, rôles        | Projet dédié, migrations additives, seed dev, Smartsell ID, RBAC multirôle, buckets/RLS                | Origine portail et accès infrastructure                | Tests négatifs inter-domaines/owners, bootstrap sûr, restauration de base testée           |
| 3 — Admin unifié                 | Shell partagé, palette, tables/filters/pagination, médias, journal, révisions et jobs de publication   | Phase 2                                                | Enregistrer/publier avec permissions et suivi sans édition de code                         |
| 4 — Agency CMS                   | Import projets/services/clients ; équipe/témoignages/textes ; featured/ordre et archive/restauration   | Phases 2–3, contenus validés                           | Non-développeur publie un projet ; routes et médias conservés                              |
| 5 — Media CMS                    | Éditeur riche, auteurs/tags/rubriques, événements, programmation                                       | Phases 2–3                                             | Brouillon → review → scheduled/published ; ancienne version maintenue et déploiement suivi |
| 6 — Academy catalogue/enrollment | Cours versionnés, formats, cohortes/sessions, formateurs ; inscription gratuite réelle                 | Phases 2–3                                             | Gratuit sans checkout, inscription idempotente, tableau apprenant réel                     |
| 7 — LMS                          | Modules/leçons typés, VideoProvider, ressources privées, progression, quiz, devoirs et certificats     | Phase 6, programmes validés                            | Accès contrôlé, correction serveur, certificat vérifiable ; test bout en bout gratuit      |
| 8 — Paiements                    | PaymentProvider, orders/payments/transactions/invoices, callbacks et remboursements                    | Phase 6 et provider sandbox ; phase 7 pour E2E complet | Achat sandbox → entitlement → apprentissage → certificat, sans intervention manuelle       |
| 9 — Studios booking              | Catalogue/tarifs, disponibilités, allocations atomiques, hold/acompte, calendrier et notifications     | Phases 2–3 et 8 pour paiement                          | Réservation et confirmation ; une seule acquisition concurrente d’un créneau               |
| 10 — Analytics                   | Collecte documentée, agrégats et tableaux par domaine                                                  | Instrumentation des phases 4–9                         | Données traçables et scopes respectés ; aucune mesure fictive                              |
| 11 — QA/sécurité finale          | Recette transverse, charge, SEO, observabilité, backups/rollback et exploitation                       | Toutes fonctions candidates                            | Scénarios critiques verts, limites documentées, validation de lancement                    |

Les tests, migrations sûres, audits et notifications métier sont livrés au fil des phases. Les chiffres analytics ne sont exposés qu’une fois leurs sources fiables. Les adaptateurs Stripe/PayPal/Orange/Mobile Money restent derrière le contrat tant qu’un fournisseur n’est pas retenu et configuré.

## Découpage des mises en ligne

1. La homepage simplifiée peut être livrée indépendamment du LMS. Ses CTA ne promettent pas d’inscription ou disponibilité réelle avant activation.
2. L’admin Agency/Media peut être ouvert après sécurisation sans attendre un système de paiement complet.
3. Academy gratuit précède Academy payant ; la vente attend les phases LMS et paiement validées ensemble.
4. Studios conserve un parcours de demande jusqu’à recette du calendrier et des paiements.
5. Produits/Labs reste accessible à chaque étape ; Management n’est jamais inclus dans une migration de compte implicite.

## Organisation des changements

Préserver le chantier local existant et ses brouillons ; créer un point de référence propre après inventaire. Retenir le shell UI et les validations réutilisables ; ne pas appliquer automatiquement la migration JSON globale à la V2. Migrations additives, imports idempotents et un seul stockage faisant autorité par domaine.

Chaque PR reste ciblée sur un lot, avec validation, aperçu et plan de reprise. Les scripts de build/publication et les changements d’hébergement sont revus séparément des contenus. Le propriétaire valide les décisions de produit et les mises en service ; aucun achat ou création de fournisseur n’est déduit du présent dossier.

## Conditions à lever au bon moment

- Phase 1 : sélection des trois réalisations et des preuves autorisées ; protocole utilisateur.
- Phase 2 : création du projet Supabase, choix de l’origine/hébergement du portail et configuration des emails Auth.
- Phase 7 : programmes complets, seuils de quiz, règles de certificat, formateurs et provider vidéo.
- Phase 8 : prestataire réellement disponible pour Smartsell, devise/canaux, tarifs, facturation et conditions commerciales.
- Phase 9 : disponibilités réelles, buffers, ressources, prix, acompte et annulation.

Ces conditions n’empêchent pas la validation de l’architecture. Elles empêchent seulement d’annoncer comme réels des services encore non activés.
