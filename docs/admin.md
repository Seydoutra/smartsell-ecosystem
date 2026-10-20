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
`contact.smartsell@gmail.com`, sans confirmation forcée. Le SMTP Hostinger est
enregistré et un premier e-mail a été reçu selon le test utilisateur. Les codes
e-mail sont réglés à 6 chiffres et 600 secondes. La confirmation d'inscription
utilise maintenant un formulaire de code ; son modèle d’e-mail sans lien est
enregistré dans Supabase. Un renvoi réel a reçu une réponse Auth 200 ;
l’utilisateur a confirmé la réception du code et l’ouverture de son espace
apprenant après sa saisie. La création/confirmation du propriétaire et les
contrôles de récupération et d’isolation avec deux sessions réelles restent à
effectuer ; ils ne sont pas couverts par cette seule vérification.

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

Configuration enregistrée : `smtp.hostinger.com`, port `465`, expéditeur et
identifiant `contact@smartsell.pro`, nom `Smartsell`. Le secret reste uniquement
dans Supabase.

Conserver **Confirm email** activé. Dans Sign In / Providers → Email, régler
**Email OTP length** à `6` et **Email OTP expiration** à `600` secondes. Dans
Emails → Confirm sign up, appliquer `supabase/templates/confirmation.html`,
avec l’objet « Votre code de confirmation Smartsell ». Ce modèle affiche
`{{ .Token }}` et ne contient aucun lien de redirection. Ne pas modifier le
modèle de récupération de mot de passe pour ce changement.

L’inscription affiche directement la saisie du code. Le site appelle
`verifyOtp({ email, token, type: 'email' })` et n’ouvre l’espace personnel
qu’après réception d’une session Supabase. Un renvoi via `resend({ type:
'signup', email })` permet aux inscrits dont l’ancien lien ne fonctionne plus
de demander un nouveau code sans recréer leur compte. Le bouton attend une
minute entre deux demandes ; les limites serveur restent applicables. Seuls
l’e-mail et les délais sont mémorisés temporairement dans sessionStorage,
jamais le code ni le mot de passe.

Tester un vrai code reçu, un code expiré, le renvoi et la reprise après
actualisation. Tester séparément un lien de récupération, y compris le retour
vers Academy. Vérifier les spams et les logs Auth en cas d’échec. Le SMTP
intégré à Supabase ne convient pas au public : il est réservé aux adresses de
l’équipe du projet et fortement limité.

Documentation : https://supabase.com/docs/guides/auth/auth-smtp

Codes : https://supabase.com/docs/guides/auth/auth-email-templates

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

L’espace apprenant propose un accueil personnel, les cours ajoutés avec filtres
« Tous / En cours / Terminés », un catalogue avec recherche sans distinction
d’accents et filtre par parcours, les échanges avec l’équipe et le profil.
Les cartes affichent une image, le pourcentage et le nombre de leçons terminées.
Le bouton de reprise ouvre la première leçon manquante ; un aperçu terminé
reste consultable. Les suggestions excluent les cours déjà ajoutés et favorisent
les catégories puis les parcours suivis, avec un ordre stable pour les nouveaux
comptes. Aucune progression n’est simulée pour remplir l’interface.

Les pourcentages utilisent les leçons réellement validées en base, sans compter
les doublons ni les indices retirés du catalogue. La progression globale est
pondérée par le nombre de leçons des cours ajoutés. Les écrans privés Academy
utilisent une navigation compacte ; les vitrines et contenus publics existants
conservent leur présentation.

Les apprenants disposent d’une inscription, d’une connexion, d’une récupération
de mot de passe, d’un profil, de leurs modules et d’une progression synchronisée.
Les inscriptions aux aperçus et les validations de leçons passent par des
commandes SQL qui vérifient l’identité et l’inscription. Les quiz sont vérifiés
par le serveur ; une validation répétée ne crée pas de doublon.

Les 13 formations et leurs contenus existants sont conservés. Les trois leçons
actuelles de ces treize modules restent des **aperçus gratuits**. Elles ne constituent
pas les formations accompagnées intégrales et ne délivrent pas de certificat.
Les contenus pédagogiques d’un module déjà suivi nécessitent une nouvelle
version de cours pour être changés, afin de préserver la progression existante.
Les programmes payants, cohortes et paiements ne sont pas activés. Les attestations
restent réservées aux formations complètes éligibles, selon les conditions ci-dessous.

Les demandes envoyées depuis l’espace apprenant sont réellement enregistrées.
L’équipe peut suivre leur état ; l’apprenant retrouve ses propres demandes.
Les clics vers WhatsApp restent des clics, pas des messages reçus.

## Attestations de participation

Appliquer après les migrations précédentes
`supabase/migrations/20261020180047_course_participation_attestations.sql`.
La migration ne rend aucun des 13 aperçus actuels éligible et n’émet aucun
document de démonstration. Le panneau « Mes attestations » présente les documents
réels du compte ; le document peut être imprimé ou enregistré en PDF depuis
le dialogue d’impression du navigateur.

Pour publier une future formation complète, gratuite ou payante, préparer son
contenu intégral et les clés de quiz côté serveur, puis activer sa politique dans
`private.academy_attestation_policies` avec le nombre exact de leçons. Le cours doit
être publié avec l’accès `invitation` ; un processus administratif de confiance
accorde l’accès intégral via `academy_enrollments.full_access_granted_at`.
Ces réglages ne sont pas modifiables par l’apprenant. Le flux actuel de publication
du catalogue concerne les aperçus : prévoir le flux de publication des formations
complètes avant leur mise en vente. Aucun paiement ni octroi automatique après
achat n’est simulé dans cette intégration.

Le serveur exige un compte confirmé, un nom de profil et la validation de toutes
les leçons après l’activation de la formation et l’octroi de l’accès intégral.
L’achèvement d’un aperçu antérieur ne suffit pas. La dernière leçon déclenche
l’émission ; « Actualiser mes attestations » reprend une émission éligible après
correction du nom de profil. Une même formation ne produit qu’un seul document
par apprenant. Le nom et le titre sont conservés tels qu’ils étaient à l’émission.

Chaque document porte une référence UUID aléatoire et un QR code généré localement,
menant à `/fr/academy/verify/?id=…` (également disponible en anglais). Cette page
publique vérifie une référence précise et affiche uniquement le nom, la formation,
la date, l’émetteur et l’état valide/révoqué. Elle n’expose ni e-mail ni identifiant
de compte ; les tables et listes restent privées. La possession d’un document ou
de son QR permet donc de consulter ces informations limitées. Une référence absente
et une indisponibilité du service donnent des messages distincts.

La commande `ecosystem_revoke_attestation(reference, reason)` est réservée au
propriétaire global et demande un motif ; elle conserve le document avec son état
révoqué et journalise l’action. Il n’y a pas encore d’écran de révocation dans
l’administration. Les tests SQL locaux couvrent l’éligibilité, l’isolation, les
refus de falsification, l’unicité, la vérification publique et la révocation.

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

## Première formation complète intégrée

« Faire un court-métrage avec l’IA », niveau 2, est une nouvelle formation séparée
(`court-metrage-ia-complet`). L’ancien aperçu `court-metrage-ia` est conservé.
Le propriétaire a choisi l’accès gratuit complet pour les comptes confirmés.
Le programme comporte 11 modules, 120 questions et les prompts du manuscrit ;
la somme des durées conseillées est de 12 h 30. Les contenus sont en français,
y compris quand la navigation est en anglais. Les bases du niveau 1 sont requises.

L’importeur `scripts/import-film-course.py` lit le Word sans exécuter son contenu.
Il contrôle les 11 modules, la numérotation et les 120 corrigés. Son résultat privé
et le SQL d’import doivent rester **hors du dépôt public**. Le site et les exports
administratifs ne contiennent que le programme public de la formation complète.
Les aperçus gardent leur circuit d’édition et publication existant.

Après la migration des attestations, appliquer
`20261020181210_immersive_full_courses.sql`, puis
`20261020183617_guided_course_progression.sql` et le SQL privé produit par :

```sh
python3 scripts/import-film-course.py /chemin/cours.docx /dossier-prive/cours.json --sql-output /dossier-prive/cours.sql --free
```

L’import configure le cours et sa politique d’attestation. Il n’inscrit aucun
apprenant et ne crée aucune progression ou attestation. Un cours déjà suivi est
immuable ; une modification de son manuscrit exige une nouvelle version de cours.
Le catalogue public conserve `access=invitation` comme type d’accès intégral ;
`private.academy_full_courses.self_enroll=true` autorise explicitement son inscription
gratuite. Le catalogue des aperçus ne peut pas archiver ou remplacer ce cours.

L’accès au manuscrit passe par `ecosystem_read_course_module`, qui exige une
inscription avec accès intégral et un compte confirmé. Les réponses attendues et
explications sont retirées de cette lecture. `ecosystem_submit_course_quiz` vérifie
toutes les réponses côté serveur et retourne les corrigés après l’envoi. Les dix
premiers modules exigent 10/10 ; l’examen final conserve le seuil source de 14/20.
Les modules précédents doivent être validés avant toute lecture du suivant,
y compris par appel direct à la fonction. Le menu et les liens de reprise
respectent également cet ordre. L’ancienne validation à une question
ne peut pas valider un module complet. Les nouvelles tentatives sont possibles.

La séance principale présente le contenu en courtes explications avec un guide
virtuel illustré. La synthèse vocale française du navigateur reste facultative et
se déclenche à la demande. Les exemples et analogies sont rattachés à leur section.
Trois pauses de compréhension utilisent `ecosystem_answer_course_question` : cette
fonction exige le même accès au module et retourne une correction, sans écrire de
progression ni délivrer d’attestation. Une réponse correcte permet de continuer
la séance ; seul le quiz du module débloque le suivant. Le support source complet
reste consultable dans les ressources du module accessible.

Le carnet est enregistré dans `academy_workbooks` avec RLS limitée au propriétaire
des notes. L’apprenant peut en exporter le texte. Les prompts personnalisés et les
simulations des ateliers sont temporaires ; leur manipulation ne valide pas le
cours. Le projet de huit plans et son pack doivent toujours être relus par un pair.
L’attestation remise concerne la participation et le parcours de connaissances ;
elle ne prétend pas certifier une évaluation humaine du film final.

L’accueil de l’administration contient un formulaire propriétaire pour accorder
un accès intégral à un compte confirmé. Il n’encaisse aucun paiement et ne valide
aucune leçon. Le libre accès de cette première formation rend cette opération
facultative pour les apprenants.

Le 20 octobre 2026, les migrations et le manuscrit ont été appliqués dans le projet
MIRS prévu. Le contrôle SQL relève 11 modules, 120 questions, libre inscription
activée, seuil final 14 et attestation activée, sans document émis. Les lectures
anonymes privées et les commandes de validation anonymes sont refusées.
