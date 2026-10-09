# Navigation globale et locale

## Desktop

```text
SMARTSELL | Agency  Academy  Media  Studios  Labs | Recherche | FR | Smartsell ID*
----------------------------------------------------------------------
SMARTSELL ACADEMY | Formations  Formateurs  Entreprises  Événements | CTA
```

La barre d’écosystème est discrète (environ 40–48 px). Le header local utilise le lockup et un CTA métier (environ 64–80 px). Un menu « Écosystème » donne accès aux cinq univers depuis le logo/sélecteur, sans rendre le clic logo ambigu : logo = maison ; bouton voisin = menu.

`*` Smartsell ID est masqué tant que le parcours central n’est pas disponible. Lors du lancement, un lien clairement nommé « Accéder à Management » peut ouvrir l’URL actuelle du produit ; il ne promet pas un compte universel.

## Méga-menu

| Univers | Phrase | Destination |
|---|---|---|
| Agency | Construisez votre marque | `/fr/agency` |
| Academy | Développez vos compétences | `/fr/academy` |
| Media | Comprenez ce qui vient | `/fr/media` |
| Studios | Donnez forme à vos contenus | `/fr/studio` |
| Labs | Construisons les outils de demain | `/fr/labs` |

Ouverture au clic, à Entrée et Espace ; hover ajouté sur pointeur fin. `aria-expanded`, fermeture Échap, focus restitué au bouton. Liens réels accessibles sans hover. Le menu n’est pas un composant ARIA `menubar` complexe : navigation standard et panneau divulgable suffisent.

## Mobile

Une ligne visible : logo local, bouton « Écosystème », bouton « Menu ». Le drawer regroupe le menu local en premier, le CTA local, puis les cinq univers, la recherche, la langue et le retour à la maison. Pas de deux barres fixes qui occupent le premier écran. Menu modal avec focus contenu, fond inerte et fermeture explicite ; liens utilisables au clavier.

## Menus secondaires

| Site | Liens | CTA |
|---|---|---|
| Maison | Écosystème, À propos, Réalisations, Produits, Contact | Explorer l’écosystème |
| Agency | Services, Réalisations, À propos, Clients, Carrières | Parler de mon projet |
| Academy | Formations, Formateurs, Entreprises, Événements ; Mon apprentissage à terme | Trouver une formation |
| Media | À la une, Tech, IA, Business, Afrique, Guinée ; autres rubriques dans « Toutes les rubriques » | S’abonner |
| Studios | Espaces, Services, Packages & tarifs, Galerie, FAQ | Demander un créneau / Réserver en phase 5 |
| Labs | Produits, Recherche, IA, Contact | Demander une démo |

## Recherche et footer

Recherche globale : articles, formations, projets et produits publiés. Filtres par type et verticale, état vide utile, compteur de résultats, page `/fr/search?q=...`. La recherche Media reste éditoriale. Les requêtes de recherche ne partent pas dans les pixels publicitaires.

Footer commun : marque mère et signature « Avec vous, de bout en bout. », cinq univers, ressources locales, contact public vérifié, Conakry–Guinée, réseaux approuvés, newsletter segmentée et pages légales. Une newsletter locale présélectionne sa rubrique, mais demande un consentement explicite.

Le breadcrumb suit l’univers : `SMARTSELL → Academy → Formations → [Cours]`. L’état actif utilise une forme ou un texte en plus de la couleur. La langue relie la même page traduite ; aucune redirection vers un faux équivalent anglais.

Tous les liens passent par le registre d’URL `urlFor(vertical, locale, path)`. Au passage aux sous-domaines, la navigation change de configuration, pas de liens codés en dur dans chaque carte.
