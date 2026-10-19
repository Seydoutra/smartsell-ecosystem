# Unified Admin Dashboard — architecture proposée

Statut : à valider. Un seul back-office, une identité, des modules visibles selon permissions. La maquette et le chantier local existants sont des ressources à réutiliser après recette, pas quatre nouveaux admins à construire.

## Arborescence fonctionnelle

```text
SMARTSELL ADMIN
  Dashboard
  Agency     → Projets · Services · Clients · Équipe · Témoignages · Pages
  Academy    → Cours · Modules/Leçons · Catégories · Formateurs
               Cohortes/Sessions · Apprenants · Devoirs · Certificats
  Media      → Articles · Rubriques/Tags · Auteurs · Événements
  Studios    → Espaces · Services · Packages · Add-ons
               Disponibilités · Réservations · Calendrier
  Users      → Profils · Rôles · Accès
  Payments   → Commandes · Paiements · Transactions · Factures
  Analytics  → Vue globale et vues autorisées par domaine
  Settings   → Identité · Pages maison · Produits · Intégrations
  Outils     → Médiathèque · Notifications · Journal · Corbeille
```

Les labels peuvent être traduits, mais la navigation et les permissions restent uniques. Produits est un complément administrable, pas une cinquième porte publique.

## Écran d’accueil

Le dashboard montre les données utiles à l’utilisateur connecté : nouveaux apprenants, revenus Academy encaissés, réservations Studios, articles publiés, projets Agency, nouveaux utilisateurs, paiements à traiter et activité récente. Un media_editor ne voit pas un revenu Academy par simple effet de la vue globale.

Chaque carte indique la période, la définition du compteur et son actualisation. « Revenu » désigne un montant réellement encaissé net des remboursements selon la définition retenue ; « utilisateurs » ne signifie ni sessions ni leads. Avant connexion d’une source, afficher « Non connecté » ou un état vide explicite. Aucun graphe illustratif présenté comme réel.

## Shell et composants réutilisés

Sidebar responsive, barre de recherche et palette `Ctrl/Cmd+K`, breadcrumbs, actions contextualisées, notifications et profil. Les tables utilisent tri, filtre, pagination serveur et sélection par IDs stables. Les actions en masse sont bornées à la sélection autorisée et journalisées ; confirmation spécifique pour archive ou opération financière.

Éditeur en page pour un cours ou article long ; drawer pour aperçu et action courte ; modal pour confirmation. Focus initial, piège de focus, Escape et retour au déclencheur vérifiés. Les états loading, erreur réseau, accès refusé, conflit de révision, vide et succès appartiennent aux composants communs.

Réutiliser le formulaire FR/EN et le sélecteur de médias actuels. Les extensions riches deviennent des champs typés ; elles ne rendent pas le contenu par HTML arbitraire. Le composant WIP très volumineux doit être séparé par domaines au moment de brancher les modules.

## Contrats de service

- Un module ne dépend pas directement de la page React d’un autre univers.
- Contrats de données et validations communs, repositories par domaine et providers d’infrastructure séparés.
- Les modules ne contournent ni RLS ni les commandes métier en faisant des mises à jour privilégiées depuis le client.
- Mutation avec révision attendue : en cas de conflit, garder le brouillon local, proposer comparaison/rechargement ; ne pas écraser silencieusement.
- « Enregistrer » ≠ « Publier ». La version publique courante reste visible jusqu’à publication explicite d’une nouvelle révision.
- L’état « approuvé mais déploiement en attente » est distinct de « visible sur le site ». Le non-développeur ne doit pas dépendre durablement d’un clic dans GitHub.

## Publication sans édition de code

Après validation de la V2 : l’admin appelle une commande sécurisée qui crée un job de publication. Un worker autorisé déclenche le workflow GitHub avec un credential conservé côté serveur. Il ne place pas de PAT dans la page. Le job suit build, déploiement, réussite/échec et donne une URL d’aperçu/publication.

Un déploiement statique a une latence ; les publications programmées doivent exposer leur statut et retenter les échecs. Si une visibilité exactement à l’heure est requise, rendre cette partie du public sur hébergement serveur au lieu de promettre l’instantané sur GitHub Pages.

## Agency : couverture CMS attendue

Projet typé (site, application, branding, campagne, photographie, film, social media, produit digital, IA), client, année, secteur, services, description, challenge, solution, médias, résultats sourcés, technologies, featured et ordre. CRUD et archive/restauration ; duplication crée un nouveau slug brouillon.

Les textes des pages Agency, l’équipe, les clients et témoignages sont des collections avec champs et prévisualisation. Le propriétaire doit pouvoir les gérer sans modifier un fichier TypeScript. Les médias de projets peuvent être réutilisés dans la sélection de la maison et Media, sans upload dupliqué.

## Users et réglages

Invitations staff, rôles cumulables, suspension et journal utilisent une opération serveur. Les inscriptions publiques créent seulement un profil client/apprenant. Les réglages exposent des champs bornés : textes de la maison, sélection de projets, coordonnées, navigation secondaire, intégrations publiques. Les secrets sont renseignés dans l’infrastructure par le propriétaire, jamais exportables via le CMS.

## Critère de recette

Un administrateur non développeur crée un projet, une formation et un article, prépare leurs médias, publie et vérifie les URLs sans toucher au dépôt. Il archive puis restaure un contenu. Le studio manager ouvre une disponibilité, suit une réservation et constate un conflit concurrent. Les mêmes actions faites par un rôle non autorisé sont refusées côté serveur.
