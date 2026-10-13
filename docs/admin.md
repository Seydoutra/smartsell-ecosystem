# Espace d'administration Smartsell

## Structure du site

Une maison mère et cinq sites autonomes, chacun en français et en anglais :

| Site    | Pages publiques                                                           | Contenus administrables                                                |
| ------- | ------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| Maison  | Accueil, design system                                                    | Reprend les contenus des cinq modules (clients, solutions, portfolio…) |
| Agency  | Portfolio, brandbooks, expertises (16), histoire, collectif, contact      | Expertises, identités de marque, sites web, clients, séries photo      |
| Academy | Modules (13), détail et leçons, Entreprises, Mon espace                   | Modules (avec programme et leçons à quiz), offres entreprises          |
| Media   | Vidéos (18), pages vidéo, articles (20), rubriques, recherche, newsletter | Vidéos, articles                                                       |
| Studios | Podcast, Shooting, plateaux, formules, réservation, galerie, FAQ, contact | Plateaux, formules                                                     |
| Labs    | Produits, recherche, IA & automatisation, contact                         | Produits (captures, avantages par cible)                               |

Les contenus vivent aujourd'hui dans `packages/content/src` :
`sites.fr.ts` / `sites.en.ts` (pages, expertises, articles, plateaux, formules),
`academy.ts` (modules, offres), `portfolio.ts` (clients, produits, brandbooks,
sites, photos, films) et `photos.ts` (médias).

## L'admin (maquette)

- Adresse : `/fr/admin/` et `/en/admin/` (non indexée).
- Au build, `scripts/export-content.ts` exporte les contenus des deux langues
  dans `admin/content.json` ; l'admin les lit et les présente en cinq modules.
- Schéma modulaire : `apps/main/components/admin/schema.ts`. Ajouter une
  collection ou un champ revient à ajouter une entrée dans ce fichier.
- Actions : ajouter, modifier (FR et EN côte à côte), dupliquer, réordonner,
  supprimer avec confirmation, choisir des images et vidéos dans la
  médiathèque, exporter le JSON, réinitialiser.
- Les modifications restent dans le navigateur (`localStorage`) : rien n'est
  publié tant que le stockage n'est pas branché.

## Brancher l'enregistrement

Deux options, au choix :

1. **Base de données (Supabase)** : connexion par identifiant, envoi de
   fichiers vers le stockage, contenus lus par le site ou republiés par un
   build automatique.
2. **Fichiers GitHub** : l'admin enregistre `content.json` dans le dépôt, et
   chaque enregistrement relance la publication (2 à 3 minutes).

Dans les deux cas, le site lira ses contenus depuis la même structure que
`content.json`, ce qui évite de réécrire l'interface.
