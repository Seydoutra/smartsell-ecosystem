# Paiements, commandes et factures — architecture proposée

Statut : avant validation. Aucun prestataire marchand, compte de paiement ou encaissement réel n’est activé par cet audit.

## PaymentProvider

Contrat commun : capacités (pays, devise, canaux, remboursement), création d’une session/intent, état de transaction, vérification d’un webhook, remboursement et rapprochement. Adaptateurs prévus : Stripe, PayPal, Mobile Money, Orange Money, paiement manuel, et fournisseurs futurs.

« Prévoir » un adaptateur ne signifie pas que son service est disponible pour la structure juridique, le pays marchand, la devise ou le compte Smartsell. Le premier fournisseur réel doit être choisi après vérification commerciale et technique. Le paiement manuel est un mode distinct et ne satisfait pas le critère de parcours payé automatique sans intervention.

Devise métier principale : GNF. Les prix sont stockés en unités entières documentées ; chaque adaptateur convertit selon les règles du provider, sans division automatique par 100. La [documentation des devises Stripe](https://docs.stripe.com/currencies) est une source de vérification pour cet adaptateur ; les autres auront leurs propres règles.

## Données et états

Tables : orders, order_items, payments, transactions, invoices, invoice_lines, payment_events, refunds. La commande contient un instantané du produit, prix, devise et règles applicables. Les coordonnées de facturation ont une politique de conservation, indépendante d’un profil public.

États de paiement : `pending`, `processing`, `paid`, `failed`, `refunded`, `cancelled`. Un remboursement partiel garde le montant remboursé et sa transaction ; il ne se résume pas à un booléen. Les transitions impossibles ou fondées sur un événement fournisseur ancien sont refusées ou rapprochées explicitement.

## Flux payé automatique

1. Client authentifié choisit un cours ou package.
2. Serveur vérifie le droit d’achat, le prix en base, la disponibilité/capacité et crée une commande figée avec clé d’idempotence.
3. Provider ouvre sa page de paiement ; aucune donnée carte n’est traitée directement dans l’application.
4. Un webhook signé ou une vérification serveur documentée confirme le résultat.
5. Même transaction métier : enregistrer l’événement unique, vérifier montant/devise/référence, passer le paiement à l’état approprié, créer l’enrollment ou confirmer la réservation, préparer facture et notification.
6. Retour utilisateur : consulter l’état serveur, afficher « vérification en cours » si le webhook n’est pas encore traité ; ne jamais accorder un accès sur `?success=true`.

Les fournisseurs peuvent renvoyer le même événement et les événements peuvent arriver dans un ordre inattendu. Persister l’ID fournisseur avec unicité et faire des traitements idempotents. [Webhooks Stripe](https://docs.stripe.com/webhooks).

## Exceptions et reprise

- Une erreur de génération PDF/email ne déclenche pas un second paiement. La commande payée reste payée et le job est retenté.
- Paiement échoué/annulé : aucun enrollment payant ni confirmation studio. Le client peut relancer une nouvelle tentative liée à la même commande selon l’état.
- Remboursement : permission financière explicite, motif, montant, référence, journal et mise à jour de l’accès selon les conditions validées. Ne pas effacer l’historique des tentatives.
- Paiement tardif d’un booking : ne pas confirmer un créneau perdu ; processus d’exception décrit dans [studio-booking.md](studio-booking.md).
- Rapprochement : job relisant les états ambigus via l’API fournisseur et un tableau des écarts ; ne pas dépendre d’un email d’encaissement.
- Ne jamais rejouer un webhook réel sur une base de test ou l’inverse.

## Facturation et sécurité

Numéro unique émis côté serveur, instantané des lignes, montants et identité de facturation. Les obligations fiscales et mentions de la structure doivent être validées avant activation ; ce document ne les invente pas. Les PDF restent privés, accessibles au propriétaire et staff autorisé par URL temporaire.

Secrets provider, signature webhook et clés privilégiées stockés dans le runtime serveur. La clé publique Supabase seule peut être exposée au navigateur ; elle reste soumise à RLS. Redactions des logs et séparation sandbox/production obligatoires pour les tests.

## Acceptation avant paiement réel

Sandbox complet : achat → webhook → facture → accès au cours ou confirmation studio. Refus de montant/devise incorrects, faux webhook, événement rejoué, retour client falsifié et accès cross-user. Test de remboursement selon les capacités retenues. Le provider réel et les conditions prix/annulation sont des décisions d’activation ultérieures, distinctes de l’approbation de l’architecture.
