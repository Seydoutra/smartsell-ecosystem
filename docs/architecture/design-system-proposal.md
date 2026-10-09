# Design system SMARTSELL — proposition

## Direction

**Éditoriale, précise, digitale, contemporaine.** Grands titres sans sérif, compositions asymétriques maîtrisées, noir et blanc pour la lecture, violet pour la profondeur, jaune pour les actions. Images de créateurs, équipes et espaces réels, avec droits et crédits. Aucun motif culturel décoratif ni imagerie stéréotypée.

Les verticales conservent les mêmes composants mais changent de rythme : Agency grands cas ; Academy cartes pédagogiques ; Media colonnes de lecture ; Studios galeries ; Labs interfaces et démonstrations. Les captures de Management montrées comme preuves restent celles du produit, pas un dashboard fictif présenté comme actif.

## Tokens couleur

| Famille | Tokens proposés |
|---|---|
| Marque | purple = `#692B84` ; yellow = `#F3E433` ; black = `#000000` ; white = `#FFFFFF` |
| Violet | purple-950 `#1A0A22` ; 900 `#2D103C` ; 800 `#491C5E` ; 700 `#692B84` ; 100 `#EBDDF3` ; 50 `#F7F1FA` |
| Jaune | yellow-600 `#9A8700` ; 500 `#F3E433` ; 100 `#FCF8CB` |
| Neutres | neutral-950 `#101014` ; 900 `#202026` ; 700 `#45454F` ; 500 `#73737D` ; 100 `#EEEEF2` ; 50 `#F8F8FA` |

Rampes secondaires proposées, non couleurs mesurées du logo. Tokens sémantiques : `surface`, `surface-inverse`, `text`, `text-muted`, `action`, `action-text`, `border`, `focus`, et états success/warning/error accompagnés d’un libellé. Aucun texte blanc sur jaune. Jaune sur blanc réservé aux surfaces graphiques, jamais au texte utile. Le document de vérification [contrastes](../contrast-checks.csv) mesure les paires essentielles ; il ne certifie pas l’interface complète.

## Typographie

Titres : **Space Grotesk**, poids 500/600/700. Texte : **Inter**, 400/500/600. WOFF2 auto-hébergés, latin utile, `font-display: swap` et fallback système. Jusqu’à leur approvisionnement, la planche utilise les fontes système et indique ce statut. Ne pas modifier le dessin du wordmark pour suivre la fonte des titres.

| Rôle | Desktop | Mobile | Interligne |
|---|---:|---:|---:|
| H1 | 80–96 px | 42–52 px | 1,02–1,08 |
| H2 | 48–64 px | 30–36 px | 1,10 |
| H3 | 28–32 px | 24 px | 1,20 |
| H4 | 22–24 px | 20 px | 1,25 |
| Body large | 20–22 px | 18 px | 1,55 |
| Body | 16–18 px | 16 px | 1,60 |
| Small | 14 px | 14 px | 1,45 |
| Caption | 12 px | 12 px | 1,40 |

Titres fluides avec `clamp`, largeur maximale lisible, corps de lecture Media 65–75 caractères. Majuscules sur courtes étiquettes seulement ; pas de paragraphe tout en capitales.

## Géométrie et composants

Grille 12 colonnes desktop, 6 tablette, 4 mobile. Conteneur cible 1280–1440 px. Gouttières 24–32 px desktop et 16–20 px mobile. Espacements 4/8/12/16/24/32/48/64/96/128. Sections 96–128 px desktop et 48–64 px mobile. Arrondis 4 px éditorial, 12 px cartes/outils ; pas de capsule pour chaque surface.

Bibliothèque : barre groupe, header local, footer, mega-menu, drawer, breadcrumb, button/link, champs et consentement, formulaire, search/filter, card case/course/article/product/space, pricing package, badge de format/statut, tabs, accordion FAQ, galerie, toast/status, page de succès, empty/error states, parcours suivant. Composants transactionnels supplémentaires : stepper booking, récapitulatif, lesson player, quiz et progression.

Chaque composant possède états normal/hover/focus/active/disabled/loading/error/success lorsqu’applicables. CTA principal jaune + texte noir, secondaire violet + blanc, tertiaire lien souligné. Cibles tactiles 44 × 44 px visées ; focus 2–3 px contrasté avec offset. Labels toujours visibles ; erreur proche du champ et annoncée.

## Règles de marque

Réutiliser les six PNG sans recoloration ni redessin. Les fonds sont transparents. Pour présenter correctement les wordmarks carrés, la planche conserve les fichiers et les cadre par CSS. Le logo blanc ayant un cadrage différent, il possède une règle propre. En implémentation, fournir des exports web correctement cadrés et idéalement des sources vectorielles autorisées. Les app-icons nécessitent un symbole plus lisible et une variante maskable ; ces variantes ne sont pas créées ici.

Lockup de verticale : wordmark sur une ligne, nom « AGENCY / ACADEMY / MEDIA / STUDIOS / LABS » en texte adjacent ou inférieur, séparé par un espacement stable. Taille et zone de protection fondées sur la hauteur utile du symbole, pas sur les 3240 px du fichier. Ne pas déformer, faire tourner ou superposer le wordmark à un texte complexe.

## Signature par verticale

| Univers | Surface dominante | Accent | Rythme |
|---|---|---|---|
| Maison | Violet profond / blanc | Jaune | Manifesto et portes d’entrée |
| Agency | Blanc, séquences noires | Violet | Cas grand format, preuves |
| Academy | Blanc / violet très clair | Violet + jaune CTA | Structuré, pédagogique |
| Media | Blanc / noir | Violet | Titres, colonnes et longue lecture |
| Studios | Noir | Jaune | Images, espace et packages |
| Labs | Violet profond / neutre clair | Jaune | Produit, interface et méthode |

## Mouvement et image

Micro-interactions 120–200 ms, transitions 200–350 ms, reveal léger ≤ 400 ms. Framer Motion réservé aux séquences utiles ; CSS suffit aux liens et boutons. Pas de mouvement indispensable, de scroll hijacking ni de texte masqué jusqu’au scroll. Réduction de mouvement = contenu immédiat.

Photographies locales contemporaines avec lumière et composition soignées ; couvertures éditoriales cohérentes ; avif/webp, dimensions explicites, tailles responsives, lazy loading sous le premier écran. Aucun visuel générique ajouté à cette livraison pour représenter des personnes ou espaces Smartsell non vérifiés.

## Validation attendue

Valider la palette principale, la typographie, le principe de lockup, le rythme distinct des cinq univers et la signature. Puis vérifier une homepage et une page de détail de chaque verticale sur desktop/mobile avant généralisation des composants.
