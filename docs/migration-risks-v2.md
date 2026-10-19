# Risques de migration V2 et mesures de reprise

Statut : registre préparatoire. Aucun changement de données exécuté. P0 = à résoudre avant exposition de la fonction concernée ; P1 = avant ouverture générale ; P2 = amélioration suivie.

| Priorité | Risque                                                                          | Mesure proposée et preuve attendue                                                                                                    |
| -------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| P0       | Travaux locaux incomplets pris pour la version publiée                          | Référence `main` figée, inventaire du diff ; garder le chantier ; pas de push intégral automatique                                    |
| P0       | Migration appliquée dans le projet Management                                   | Projet et identifiant Supabase dédiés, vérification de cible avant chaque migration ; aucune réutilisation des credentials Management |
| P0       | Schéma JSON global / rôle editor autorisant tous les univers                    | Modèle relationnel et RBAC scoping ; tests Media→Academy et Studio→Media refusés                                                      |
| P0       | Leçons payantes/corrigés dans un export statique                                | Corps privés hors bundles/JSON public ; inspection des artefacts et tests anonymes                                                    |
| P0       | Paiement déclaré réussi par le client                                           | Vérification serveur, signature, montant/devise, clés uniques et E2E sandbox                                                          |
| P0       | Double booking ou confirmation après hold expiré                                | Allocations avec exclusion, transactions, tests concurrents et gestion des callbacks tardifs                                          |
| P0       | Modification d’un brouillon retirant un contenu déjà publié                     | `published_version_id` distinct, tests d’édition conservant la version live                                                           |
| P0       | Snapshot de publication remplaçant/supprimant une collection entière par erreur | Import normalisé, validations serveur, diff avant publication, reprise par version                                                    |
| P1       | Perte de liens lors de `studio` → `studios` ou Labs→Products                    | Mapping exhaustif, pages-ponts ou vrais redirects selon hébergement, canonicals et tests des anciens chemins                          |
| P1       | Nouvelle route dynamique impossible sur GitHub Pages                            | Portail serveur pour compte/certificats ; pas de fausse protection dans une page 404                                                  |
| P1       | Double écriture fichiers/DB créant deux catalogues divergents                   | Une source de vérité par domaine, flag de bascule, retrait progressif de l’adaptateur source                                          |
| P1       | Perte de contenus, traductions et crédits                                       | Export initial, IDs/slugs de reprise, comparaison des comptes et checksums ; contenu non mappé mis en quarantaine, jamais jeté        |
| P1       | Progression démo convertie en certificat réel                                   | Aucun transfert automatique de réussite ; import éventuel de préférence/aperçu seulement avec consentement                            |
| P1       | Booking WhatsApp importé comme place garantie                                   | Import manuel contrôlé de demandes distinctes des réservations confirmées                                                             |
| P1       | Fichiers privés exposés par un bucket public ou URL durable                     | Buckets privés, promotion explicite des copies publiques, URLs courtes et tests cross-user                                            |
| P1       | Droits clients sur pièces d’autrui                                              | Ownership + RLS + tests des vues, RPC, Storage et exports                                                                             |
| P1       | Événement provider répété provoquant double facture/enrollment                  | Idempotence externe/interne et transaction atomique ; tests de replay                                                                 |
| P1       | Migration ou seed destructif en production                                      | Migrations additives, seed dev séparé, sauvegarde/restauration en staging, revue et target guard                                      |
| P1       | Faux résultat de test dû à données générées manquantes                          | Rendre le test admin baseline autonome ; reproduire un clone frais                                                                    |
| P1       | Validateur bloquant le catalogue CPR                                            | Vérifier l’URL réelle ou la règle HTTP/HTTPS après approbation ; ne pas supprimer le contenu                                          |
| P1       | Programmation éditoriale plus précise que la latence de build                   | Job observable et SLA explicite ; hébergement dynamique si visibilité à la minute exigée                                              |
| P1       | Activation prématurée de l’indexation                                           | Sitemap uniquement public, noindex privé, suppression des contenus démo trompeurs puis activation contrôlée                           |
| P1       | Programmes/prix/conditions incomplets mais vente ouverte                        | Gate d’ouverture du checkout ; validation des données et conditions avant activation                                                  |
| P2       | CSS global et gros composants rendant les régressions coûteuses                 | Extraction ciblée, scopes admin/public, tests visuels des parcours essentiels                                                         |
| P2       | Coûts streaming/email/stockage imprévus                                         | Budgets et limites, métriques d’usage et fournisseurs choisis avant activation                                                        |

## Séquence de bascule

Sauvegarder et figer la référence → importer en staging → comparer données et routes → exécuter tests RLS/API/E2E → valider aperçu → ouvrir un domaine avec feature flag → observer → poursuivre. Le catalogue d’origine et la table de correspondance restent disponibles pendant la période de transition.

Rollback : repointer la vitrine vers la dernière publication saine ; désactiver les nouvelles commandes en cas d’incident ; conserver et rapprocher les paiements/réservations déjà acquis. Ne jamais restaurer aveuglément une ancienne base en effaçant des transactions nouvelles. Le rollback du code n’est pas une annulation de paiement.

## Limites connues de l’audit

Pas d’accès au schéma distant ni aux secrets, pas de provider marchand configuré, pas de preuve de délivrabilité email/streaming, pas de test de charge ou RLS distant. Le contrôle visuel mobile a été interrompu. Ces points restent des vérifications planifiées, pas des validations implicites.
