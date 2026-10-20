# Administration et comptes Smartsell

La vitrine reste hébergée sur GitHub Pages. Supabase fournit les comptes,
les données privées, les contenus enregistrés et les statistiques. Management
conserve son application et sa base séparées.

## État de cette intégration

Le 20 octobre 2026, la migration des comptes et droits, le catalogue initial
(12 collections publiées, 13 formations), la rétention quotidienne et les quatre
retours Auth FR/EN ont été appliqués dans le projet choisi. La clé publishable
publique est configurée. Les lectures anonymes du catalogue réussissent ; les
profils, rôles, inscriptions et visites privées refusent l’accès anonyme.

Le compte propriétaire n’est pas encore créé/confirmé. Son rôle est réservé à
`contact.smartsell@gmail.com`, sans confirmation forcée. Un SMTP transactionnel
reste nécessaire avant de valider les inscriptions publiques et les parcours
Auth de bout en bout. La préparation du code ne vaut pas validation de ces parcours.

Projet identifié dans le navigateur : `sryetyminwftkrpjkdcl`, organisation
`contact.mirsgn@gmail.com's Org` (Free). Le connecteur Supabase de cette session
utilise un autre compte et n’a pas accès à ce projet : ne pas appliquer ces
migrations à `cpr-site` ou à `mirs-management-staging`.

## Activation

1. Exécuter `supabase/migrations/20261020115600_ecosystem_accounts_learning_insights.sql`
   dans le projet choisi, puis `supabase/seed.sql`, puis la migration
   `20261020123308_daily_telemetry_retention.sql`. La seconde étape conserve les
   collections déjà présentes si elle est relancée. Le catalogue source reste
   versionné dans le dépôt. Avant de passer à un déploiement par le CLI,
   réconcilier son historique de migrations avec cette application manuelle.
2. Dans Authentication, conserver la confirmation des adresses e-mail et
   configurer un SMTP transactionnel. Le SMTP fourni par défaut par Supabase
   n’envoie qu’aux membres de l’organisation ; il ne convient pas aux inscriptions
   publiques. Ne pas désactiver la confirmation pour contourner cette limite.
3. Définir l’URL du site sur
   `https://seydoutra.github.io/smartsell-ecosystem/fr/academy/dashboard/`.
   Autoriser précisément les quatre retours FR/EN Academy dashboard et Admin.
   Ajouter séparément une URL locale uniquement pour les vérifications locales.
4. Renseigner uniquement l’URL du projet et une clé **publishable** active dans
   `packages/ui/src/platform/config.json`. Aucune clé secrète ou service_role
   dans ce fichier, dans GitHub ou dans le navigateur.
5. Le propriétaire crée son compte avec `contact.smartsell@gmail.com` dans
   Academy et confirme son e-mail. La correspondance exacte avec cette adresse
   confirmée lui attribue le rôle propriétaire. Aucun autre nouvel inscrit ne
   devient administrateur. Un compte existant confirmé est pris en charge par
   la migration, sans modification de ses identifiants.
6. Tester les parcours ci-dessous avant de déployer la branche sur `main`.

## E-mails de confirmation

Ouvrir Authentication → Emails → SMTP Settings dans le projet
`sryetyminwftkrpjkdcl`. Utiliser le service SMTP transactionnel du fournisseur
de messagerie si celui-ci l’autorise, ou un service dédié compatible Supabase.
Une boîte professionnelle et un domaine seuls ne fournissent pas ces réglages.

Renseigner l’adresse d’expédition complète et vérifiée, le nom `Smartsell`,
l’hôte SMTP, le port recommandé par le fournisseur (souvent 587 ou 465),
l’identifiant SMTP et son secret. Saisir le secret directement dans Supabase,
jamais dans le dépôt ou dans une conversation. Vérifier les enregistrements DNS
SPF/DKIM et DMARC avec le fournisseur ; ne pas remplacer un SPF existant sans
préserver ses expéditeurs autorisés.

Conserver Confirm email activé et le lien `{{ .ConfirmationURL }}` dans le
modèle de confirmation. Après activation, tester un vrai compte puis un lien de
récupération, y compris le retour vers Academy. Vérifier les spams et les logs
Auth en cas d’échec. Le SMTP intégré à Supabase ne convient pas au public : il
est réservé aux adresses de l’équipe du projet et fortement limité.

Documentation : https://supabase.com/docs/guides/auth/auth-smtp

## Administration

Accès `/fr/admin/` et `/en/admin/`, réservé actuellement au propriétaire global.
La base prévoit aussi des droits par univers ; leur interface de délégation
à l’équipe n’est pas encore ouverte.

Les contenus s’éditent en français et en anglais. **Enregistrer dans Supabase**
conserve les collections modifiées avec un contrôle de révision et un historique.
Une modification concurrente provoque un conflit explicite. Exporter les
modifications avant de recharger en cas de conflit ; l’application ne les écrase
pas silencieusement. Les brouillons des sessions connectées ne sont pas stockés
dans le localStorage générique de l’ancienne maquette.

**Approuver la publication** prépare un instantané public des collections
sauvegardées. **Déployer sur GitHub** ouvre le workflow Pages : lancer
`Run workflow` sur `main`. Le build lit les collections approuvées ; une erreur
de lecture ou de validation arrête le nouveau déploiement et conserve le site
précédent. Une sauvegarde Supabase ne signifie donc pas que la vitrine GitHub
Pages a déjà été reconstruite.

Les images et vidéos existantes restent réutilisables. Un aperçu `blob:` issu
d’un fichier local n’est pas un média durable et est refusé à la publication.
L’envoi de nouveaux fichiers dans Storage reste à connecter séparément.

## Academy

Les apprenants disposent d’une inscription, d’une connexion, d’une récupération
de mot de passe, d’un profil, de leurs modules et d’une progression synchronisée.
Les inscriptions aux aperçus et les validations de leçons passent par des
commandes SQL qui vérifient l’identité et l’inscription. Les quiz sont vérifiés
par le serveur ; une validation répétée ne crée pas de doublon.

Les 13 formations et leurs contenus existants sont conservés. Les trois leçons
actuelles de chaque module restent des **aperçus gratuits**. Elles ne constituent
pas les formations accompagnées intégrales et ne délivrent pas de certificat.
Les contenus pédagogiques d’un module déjà suivi nécessitent une nouvelle
version de cours pour être changés, afin de préserver la progression existante.
Les programmes payants, cohortes, paiements et certificats ne sont pas activés.

Les demandes envoyées depuis l’espace apprenant sont réellement enregistrées.
L’équipe peut suivre leur état ; l’apprenant retrouve ses propres demandes.
Les clics vers WhatsApp restent des clics, pas des messages reçus.

## Statistiques et parcours

Le dashboard expose pour chaque univers les pages vues consenties, sessions
observées, clics de contact, demandes reçues et collections administrées.
Academy ajoute les apprenants inscrits, inscriptions et leçons terminées sur
la période choisie. Les agrégats sont calculés par la base, sans échantillonnage
client des premières lignes.

Le suivi de navigation est facultatif et désactivé avant consentement.
L’identifiant de session est aléatoire et expire après 30 minutes d’inactivité.
Aucun e-mail, téléphone, paramètre d’URL, fragment, texte saisi ou enregistrement
d’écran n’est transmis dans les visites. Le dashboard affiche les 30 dernières
sessions de la période et les 100 dernières actions/demandes, avec leur limite
explicitement indiquée. La mesure publique reste approximative, plafonnée à
100 événements par session sur 30 minutes et 10 000 par jour.

Les événements de navigation de plus de 90 jours sont purgés lors de chaque
nouvelle collecte et par la tâche Supabase Cron `smartsell-telemetry-retention`,
tous les jours à 03 h 17 UTC, même en l’absence de trafic. Elle ne concerne que
les visites expirées, leurs compteurs et ses propres journaux de plus de 7 jours.
Les données pédagogiques nécessaires au service sont séparées des statistiques
facultatives.

## Vérifications

`pnpm test` exécute les tests de navigation existants et une vraie base PostgreSQL
éphémère (PGlite) avec rôles et RLS : séparation de deux apprenants, absence
d’élévation par métadonnées, révocation immédiate, cloisonnement Media/Academy,
inscriptions et progression idempotentes, conflits de révision, publication et
agrégats des visites. Cette base locale ne remplace pas la vérification du
serveur Auth Supabase et de l’envoi d’e-mails.

Vérifier à distance : création et confirmation de deux comptes apprenants,
connexion/déconnexion, récupération d’accès, reprise de progression sur un autre
navigateur, refus d’accès à l’administration, compte propriétaire, sauvegarde et
publication, collecte refusée/acceptée et données visibles dans les statistiques.
Aucune donnée de démonstration ne doit être injectée dans les statistiques réelles.
