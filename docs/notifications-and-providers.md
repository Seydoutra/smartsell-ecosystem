# Notifications et intégrations — proposition V2

Statut : conception à valider. Aucun email, SMS ou message WhatsApp envoyé pendant l’audit.

## NotificationProvider

Contrat commun : préparer le message à partir d’un template versionné, adresser un canal autorisé, envoyer avec une clé d’idempotence, recevoir un accusé/callback, retenter et exposer un échec. Canaux initiaux : in-app et email. WhatsApp et SMS sont des adaptateurs futurs ; les liens WhatsApp actuels restent distincts d’une API d’envoi automatique.

Une transaction métier écrit son événement dans `outbox_events`. Un worker envoie ensuite, enregistre `notification_deliveries`, retente avec délai et limite d’essais, puis place les échecs dans une file à examiner. Une panne email ne retire ni l’accès au cours ni le booking confirmé.

## Templates requis

| Template                               | Déclencheur et données                                                  |
| -------------------------------------- | ----------------------------------------------------------------------- |
| welcome                                | Compte vérifié ; prénom, lien vers le compte                            |
| course_enrollment                      | Enrollment réellement créé ; cours, prochaine étape                     |
| payment_confirmation                   | Paiement confirmé côté serveur ; référence et lien privé vers facture   |
| booking_confirmation                   | Booking confirmé ; lieu, créneau/fuseau, package, conditions            |
| password_reset                         | Flux Supabase Auth ; URL de retour autorisée, pas un reset maison       |
| certificate_ready                      | Certificat émis ; lien privé de téléchargement et vérification publique |
| course_available                       | Ouverture d’accès/session au bon public inscrit                         |
| article_scheduled / publication_failed | Staff autorisé ; date et état de déploiement                            |

Les emails transactionnels ne valent pas inscription à une newsletter. Préférences, consentement marketing, désabonnement et statut de délivrabilité sont gérés séparément. Ne pas inclure de corrigé, mot de passe, pièce jointe financière publique ou URL privée durable dans un email.

## Trois abstractions à conserver

- **VideoProvider** : upload direct, traitement, métadonnées, signature de lecture et callbacks. Bunny, Mux, Cloudflare sont candidats, pas activés.
- **PaymentProvider** : checkout, preuve serveur, capacité de remboursement et rapprochement ; voir [payments.md](payments.md).
- **NotificationProvider** : canaux et templates sans dépendance à un fournisseur email précis.

Chaque adaptateur possède un mode de test explicite. Un faux paiement ou faux envoi ne peut jamais apparaître en production comme une réussite réelle. Configuration publique et secret serveur sont séparés ; aucun credential d’intégration dans l’export JSON du CMS.
