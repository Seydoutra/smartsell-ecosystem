# Homepage V2 — proposition éditoriale et wireframe

Statut : architecture et homepage approuvées par le propriétaire le 19 octobre 2026 ; phase 1 implémentée. Recette technique et limites consignées dans `phase-1-delivery.md`. Le test de compréhension auprès de cinq personnes reste à organiser.

## Promesse comprise en dix secondes

**Smartsell est un écosystème digital composé de quatre univers : Agency, Academy, Media et Studios.** Cette phrase est visible sans animation obligatoire. L’animation accompagne la compréhension ; elle ne cache pas la moitié du message.

## Wireframe desktop

```text
┌──────────────────────────────────────────────────────────────┐
│ SMARTSELL  Agency Academy Media Studios  À propos  Contact   │
├──────────────────────────────────────────────────────────────┤
│ SMARTSELL                                                     │
│ CREATE. LEARN. INFORM. PRODUCE.                                │
│ Un écosystème digital qui réunit agence, formation, média      │
│ et production créative.                                       │
│ [Explorer l’écosystème ↓]  [Parler à Smartsell ↗]              │
├──────────────────────────────┬───────────────────────────────┤
│ AGENCY                       │ ACADEMY                       │
│ Une marque, une expérience.  │ Apprendre pour faire.         │
│ image + 1 phrase + CTA       │ image + 1 phrase + CTA        │
├──────────────────────────────┼───────────────────────────────┤
│ MEDIA                        │ STUDIOS                       │
│ Comprendre ce qui vient.     │ Créer. Produire. Enregistrer. │
│ image + 1 phrase + CTA       │ image + 1 phrase + CTA        │
├──────────────────────────────┴───────────────────────────────┤
│ Une sélection de réalisations : 3 cartes                      │
├──────────────────────────────────────────────────────────────┤
│ Preuves : quelques références / chiffres sourcés               │
├──────────────────────────────────────────────────────────────┤
│ Votre prochain pas commence ici.  [Parler à Smartsell ↗]       │
│ Footer compact : Produits · Carrières · Mentions · FR/EN       │
└──────────────────────────────────────────────────────────────┘
```

Cinq sections de contenu au maximum, hors navigation/footer. Pas de carousel indispensable pour découvrir un univers ; les quatre choix sont exposés ensemble.

## Texte et comportement des cinq sections

| Section          | Proposition                                                                                          | Action et limite                                                                                                                                                                 |
| ---------------- | ---------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1 — Hero         | `SMARTSELL` puis `CREATE. LEARN. INFORM. PRODUCE.` ; sous-titre du brief                             | Explorer mène à `#univers`. Parler mène au contact. Visuel abstrait léger existant, pas un montage de tous les métiers                                                           |
| 2 — Univers      | Agency : « Construire des marques et des expériences digitales. »                                    | Découvrir l’agence → Agency                                                                                                                                                      |
| 2 — Univers      | Academy : « Apprendre les compétences qui créent des opportunités. »                                 | Voir les formations → catalogue Academy                                                                                                                                          |
| 2 — Univers      | Media : « Comprendre le digital, la tech et l’innovation. »                                          | Lire le média → Media                                                                                                                                                            |
| 2 — Univers      | Studios : « Créer. Produire. Enregistrer. »                                                          | Réserver le studio → parcours de réservation ; avant activation, wording honnête « Préparer ma séance »                                                                          |
| 3 — Réalisations | Trois travaux existants : suggestion Focus-Com, un site web sélectionné et une production film/photo | À choisir avec le propriétaire ; réutiliser médias réels et autorisations. Aucun résultat client inventé                                                                         |
| 4 — Preuves      | Quelques références clients validées, ou 2–3 chiffres vérifiables                                    | Les 13 formations et les 14 noms clients sont des volumes de catalogue ; ne pas les présenter comme ventes ou personnes formées. Chiffres commerciaux seulement après validation |
| 5 — Contact      | « Votre prochain pas commence ici. » + un seul CTA principal                                         | Contact/brief dans sa page ; aucun formulaire de six étapes dans l’accueil                                                                                                       |

## Direction visuelle

Conserver les logos originaux, Montserrat, le violet profond et les accents jaunes. Agency : violet créatif ; Academy : campus clair ; Media : rythme éditorial ; Studios : ambiance cinéma. Les quatre cartes partagent une grille et une hiérarchie, sans devenir quatre composants incompatibles.

Réutiliser les photographies et productions déjà présentes plutôt que produire artificiellement une nouvelle équipe ou de faux projets. Les crédits restent disponibles. Animations : apparition brève des titres, zoom très léger sur les images, mouvement discret sur les cartes au pointeur. `prefers-reduced-motion` et pause restent fonctionnels. Aucune lecture de texte dépend d’une intro, d’un hover ou d’une rotation de mots.

## Mobile

Ordre naturel : promesse, CTA, quatre cartes empilées, réalisations, preuves, contact. Une image de couverture par carte, titres et CTA visibles avant interaction. Pas de scroll horizontal obligatoire, pas de vidéo lourde en hero, pas de sticky CTA recouvrant les formulaires. Cibles tactiles d’au moins 44 px, contrastes et focus vérifiés. Les temps de chargement doivent être mesurés sur réseau mobile limité.

## Aucun contenu perdu : table de déplacement

| Section actuelle                                          | Destination V2                                                                            |
| --------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| Hero « Votre marque mérite d’être vue »                   | Réutilisable sur Agency ; remplacé par la promesse écosystème sur la maison               |
| Raccourcis cinq univers + carousel écosystème             | Quatre cartes principales ; Labs vers Produits                                            |
| Défilement des métiers/services                           | Agency/services                                                                           |
| Liste des clients                                         | Preuves compactes + Agency/clients si une page est utile                                  |
| Sélecteur de parcours entreprise/entrepreneur/talent/etc. | Contact ou page À propos ; ses liens restent réutilisables                                |
| Présentation « Une seule équipe »                         | À propos / Agency/about                                                                   |
| Toutes les expertises                                     | Agency/services                                                                           |
| Toutes les solutions                                      | Products ; anciennes pages Labs conservées                                                |
| Portfolio avec quatre catalogues d’onglets                | Agency/work ; trois entrées seulement sur l’accueil                                       |
| Treize formations                                         | Academy/courses                                                                           |
| Trois plateaux et packs                                   | Studios/spaces et Studios/packages                                                        |
| Rail de films et contenus                                 | Media/videos et Agency/work selon l’usage ; références croisées sans dupliquer les médias |
| Profils métiers                                           | Agency/team                                                                               |
| Galerie de publics « Des visages, des voix »              | À propos / Studios/gallery selon les contenus                                             |
| Méthode en cinq temps                                     | Agency/about ou services                                                                  |
| Manifeste                                                 | À propos                                                                                  |
| Brief intelligent                                         | Contact / Agency/contact                                                                  |
| Marquees de fin et plan express                           | Liens essentiels dans le footer ; supprimer uniquement la duplication de présentation     |
| Crédits photo/vidéo                                       | Page de crédits ou footer détaillé, liens conservés                                       |

## Test de compréhension à organiser

Ce test n’a pas encore été réalisé. Protocole proposé : cinq personnes non familières de Smartsell, dont au moins trois sur téléphone. Montrer dix secondes la page, puis demander sans suggérer la réponse : « Qu’est Smartsell ? » et « Où iriez-vous pour apprendre / lire / réserver / créer une marque ? ».

Critère de sortie de phase 1 : au moins quatre personnes sur cinq identifient l’écosystème et ses quatre univers ; elles trouvent la bonne porte sans aide. Le résultat réel, les incompréhensions et la variante testée seront consignés avant validation de la homepage.
