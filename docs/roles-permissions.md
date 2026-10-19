# Smartsell ID — rôles et permissions V2

Proposition à valider. Un compte Supabase Auth ; plusieurs rôles par compte. Les rôles s’additionnent dans leurs périmètres explicites. Le rôle student ne devient pas un rôle de staff, même après achat.

## Matrice proposée

Légende : G = gérer dans son périmètre ; P = publier/approuver ; L = lire ; « soi » = ses propres données ; « affecté » = uniquement ses cours/cohortes ; — = aucun droit.

| Rôle             | Agency   | Academy catalogue       | Leçons / correction                             | Media                                    | Studios                        | Utilisateurs                      | Finances                                        | Configuration              |
| ---------------- | -------- | ----------------------- | ----------------------------------------------- | ---------------------------------------- | ------------------------------ | --------------------------------- | ----------------------------------------------- | -------------------------- |
| `super_admin`    | G/P      | G/P                     | G                                               | G/P                                      | G                              | G et rôles                        | G global                                        | G                          |
| `agency_admin`   | G/P      | —                       | —                                               | —                                        | —                              | L contacts des leads autorisés    | —                                               | Réglages éditoriaux Agency |
| `academy_admin`  | —        | G/P                     | G Academy                                       | —                                        | —                              | L apprenants Academy              | L Academy ; opérations dédiées selon permission | Réglages Academy           |
| `instructor`     | —        | L + brouillons affectés | G affecté ; corriger devoirs                    | —                                        | —                              | L minimum des apprenants affectés | —                                               | Son profil formateur       |
| `media_editor`   | —        | —                       | —                                               | G/P                                      | —                              | L auteurs et profils publics      | —                                               | Réglages éditoriaux Media  |
| `media_author`   | —        | —                       | —                                               | Créer/modifier ses brouillons, soumettre | —                              | Son profil                        | —                                               | —                          |
| `studio_manager` | —        | —                       | —                                               | —                                        | G planning/offres/réservations | L contacts de ses réservations    | L Studios ; demandes d’opérations               | Réglages Studios           |
| `student`        | L public | L public                | Accès selon enrollment ; soumettre ses réponses | L public                                 | L public                       | soi                               | Ses achats/factures                             | Son profil                 |
| `customer`       | L public | L public                | — sauf rôle student et inscription              | L public                                 | Ses réservations               | soi                               | Ses achats/factures                             | Son profil                 |

Tout visiteur lit les projections publiques publiées. Les habilitations financières de remboursement et les exports massifs de données personnelles sont distincts des permissions éditoriales ; rôle de base et permission effective ne sont pas interchangeables.

## Règles qui ne se négocient pas dans l’interface

- Attribution/retrait de rôle par opération serveur autorisée, avec journal et contrôle de l’acteur. Aucun champ `role` dans le profil auto-modifiable ni validation fondée sur un bouton masqué.
- Le super-admin est créé par une procédure de bootstrap du propriétaire, puis MFA à prévoir avant production ; il n’est jamais le premier inscrit anonyme.
- Le rôle Media ne permet aucune écriture Academy, même en appelant directement la Data API ou une RPC.
- Un author peut passer de draft à review sur ses articles ; publier, changer d’auteur ou archiver un article publié exige la permission éditoriale correspondante.
- Un instructor ne peut ni fixer le prix de ses cours, ni créer un certificat à la main, ni consulter les paiements des autres élèves.
- Un student ne peut modifier ni `paid`, ni son score corrigé, ni `certificate_issued`, ni les données d’un autre compte.
- Un customer ne peut confirmer lui-même une réservation ou prolonger un hold en modifiant l’horodatage client.
- Un utilisateur désactivé perd l’accès ; les fonctions sensibles revérifient la base d’habilitations et ne se contentent pas d’un ancien claim en cache.

## Application technique

`roles`, `permissions`, `role_permissions`, `user_roles` portent le RBAC. Les fonctions de permissions reçoivent une action et une ressource/périmètre, jamais un rôle auto-déclaré par le navigateur. Affectations formateur et ownership apportent les contraintes supplémentaires.

RLS protège les lignes, avec `USING` et `WITH CHECK` adaptés. Les changements de colonnes sensibles — statut publié, propriétaire, montant, score, rôle — exigent aussi des grants de colonne ou des commandes serveur ; une politique RLS de ligne seule ne protège pas toutes ces mutations. Les vues publiques ne contournent pas RLS ; leur mode d’exécution est vérifié pour la version PostgreSQL retenue.

Les réponses de quiz et secrets sont dans un schéma non exposé. Les téléchargements et vidéos sont signés seulement après vérification des droits. Les ressources anonymes ne sont ni des dumps de tables ni des snapshots contenant des leçons privées. [RLS Supabase](https://supabase.com/docs/guides/database/postgres/row-level-security).

## Contrôles de recette minimum

| Cas                                                                         | Résultat attendu                      |
| --------------------------------------------------------------------------- | ------------------------------------- |
| Student A lit la facture / progression de B                                 | Refus / aucune ligne                  |
| Student appelle `update academy_courses`                                    | Refus                                 |
| Media editor modifie un cours ou un prix                                    | Refus                                 |
| Studio manager modifie un article Media                                     | Refus                                 |
| Media author publie son propre brouillon directement                        | Refus                                 |
| Instructor ouvre un devoir d’une cohorte non affectée                       | Refus                                 |
| User modifie `user_roles` ou s’attribue super_admin                         | Refus                                 |
| Rôle retiré appelle une RPC avec une session encore active                  | Refus                                 |
| Anonyme lit version future programmée ou réponse correcte                   | Aucune donnée                         |
| Academy admin crée/publie un cours et relit les inscriptions de son domaine | Autorisé                              |
| Compte possédant academy_admin et media_editor                              | Droits des deux domaines, pas Studios |

Ces tests seront exécutés avec pgTAP et appels authentifiés réels en staging, pas avec des chaînes de caractères recherchant le mot « policy » dans le SQL. Aucun test RLS n’a été exécuté sur une base distante pendant cet audit.
