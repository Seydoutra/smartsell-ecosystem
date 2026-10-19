# Analytics V2 — métriques utiles, sans chiffres fictifs

Statut : proposition à valider. Aucune collecte supplémentaire activée par cet audit.

## Définitions et sources

| Domaine | Mesure                | Source et définition proposée                                                                        |
| ------- | --------------------- | ---------------------------------------------------------------------------------------------------- |
| Academy | Inscriptions          | Enrollments uniques créés sur la période, hors tests et doublons                                     |
| Academy | Completion            | Inscriptions ayant terminé / inscriptions éligibles, cohorte et période explicites                   |
| Academy | Revenus               | Paiements encaissés affectés aux cours, remboursements déduits ; jamais somme des prix du catalogue  |
| Academy | Cours populaires      | Inscriptions, puis complétion ; vues consultables séparément                                         |
| Media   | Vues                  | Événements de consultation selon une règle de déduplication documentée, filtrage bots quand possible |
| Media   | Production            | Articles publiés, révisions et rubriques sur la période                                              |
| Studios | Bookings              | Réservations par état ; confirmées séparées des demandes/holds expirés                               |
| Studios | Occupation            | Temps confirmé consommant les ressources / temps réellement réservable, par espace/période           |
| Studios | Revenus               | Montants encaissés Studios, avec acomptes/solde et remboursements explicités                         |
| Agency  | Portfolio views       | Consultations des projets publics ; pas de confusion avec projets réalisés                           |
| Agency  | Leads                 | Demandes effectivement collectées et dédupliquées ; un clic WhatsApp n’est pas une demande reçue     |
| Core    | Nouveaux utilisateurs | Profils vérifiés créés ; rôles multiples non comptés comme plusieurs personnes                       |

## Collecte

Événements métier fiables depuis les transactions serveur/outbox. Événements de lecture publics depuis un collecteur distinct avec minimisation, limites anti-abus et politique de consentement à définir. Aucun email, téléphone ou corps de message dans un événement de trafic. Les compteurs seront parfois approximatifs (bots, blocage du navigateur) et doivent l’indiquer.

Les agrégations sont calculées côté serveur dans des vues matérialisées/jobs ou fonctions bornées, avec fuseau de reporting et filtres. RBAC : Academy voit son périmètre, Studios le sien, super-admin la synthèse. Pagination et export autorisé, pas de dump des apprenants pour dessiner un graphe.

Avant branchement d’une source, l’UI affiche « Non connecté » ; après branchement mais avant collecte, « Aucune donnée pour cette période ». Aucun zéro ambigu interprété comme un résultat commercial établi.
