# Homepage holding — Wireframe annoté

Proposition à valider. La [planche visuelle](../direction-visuelle.html) montre le premier écran et le rythme des univers ; ce document couvre la homepage entière.

## Premier écran

```text
┌ SMARTSELL   Agency · Academy · Media · Studios · Labs   Recherche · FR ┐
│ UN ÉCOSYSTÈME DIGITAL & CRÉATIF                                       │
│                                                                     │
│ Un écosystème.                     01 CRÉER       / AGENCY            │
│ Cinq façons                        02 APPRENDRE   / ACADEMY           │
│ d’avancer.                         03 COMPRENDRE  / MEDIA             │
│                                    04 PRODUIRE    / STUDIOS           │
│ [Explorer l’écosystème ↗]           05 INNOVER     / LABS              │
│                                                                     │
│ Depuis Conakry. Pour les marques, les talents et les idées qui avancent.│
└─────────────────────────────────────────────────────────────────────┘
```

Le hero exprime la maison ; le premier CTA descend vers les cinq cartes. Les noms de verticales sont des liens directs. Le visuel est une composition typographique ou une photographie légère, pas une vidéo obligatoire. Sur mobile, le titre puis CTA puis cinq lignes apparaissent dans cet ordre.

## Séquence complète

| Ordre | Section | Contenu et objectif | Template / source |
|---|---|---|---|
| 1 | Hero | Positionnement, signature, CTA | `homepage.hero`, version FR validée |
| 2 | L’écosystème | Cinq grandes portes numérotées, verbe, promesse, lien | Références `vertical` |
| 3 | Ce que nous faisons | Cinq capacités et exemple de parcours transversal | Texte éditorial + liens |
| 4 | Réalisations | 2–3 cas Agency autorisés, challenge et résultat vérifié | `caseStudy` |
| 5 | Produits | Management et Obtura, état de disponibilité visible | `product` |
| 6 | Formations | 3 cours, niveau/format/durée et CTA | `course` + offre transactionnelle |
| 7 | À lire | Une grande histoire et 2 articles, rubriques distinctes | `article` publié |
| 8 | Studios | Un espace, usages, package sélectionné | `studioSpace` + offre |
| 9 | Clients / partenaires | Logos publiables avec autorisation | `partner` |
| 10 | En chiffres | 3 résultats datés, sourcés et validés | `metric` avec preuve interne |
| 11 | Témoignages | 2 citations attribuées et autorisées | `testimonial` |
| 12 | CTA final | « Faisons avancer votre prochaine idée. » Contact et newsletter | `leadForm`, segmentation |
| 13 | Footer | Liens maison, univers, légal et contact | Composant partagé |

Les sections sans contenus vérifiés restent préparées dans le CMS mais ne sont pas publiées avec des promesses inventées. Les exemples de démonstration sont marqués « Démonstration », sur preview non indexable. Les cinq verticales restent visibles même si certaines fonctionnalités arrivent plus tard ; leurs CTA annoncent alors une demande ou une liste d’attente.

## Cartes d’univers

Agency : « Des marques qui avancent. » → Explorer Agency.

Academy : « Les compétences ouvrent des possibilités. » → Découvrir les formations.

Media : « Lire le changement. » → Lire les dernières histoires.

Studios : « Votre idée prend place. » → Découvrir les espaces.

Labs : « Des problèmes réels. Des produits utiles. » → Découvrir les produits.

Desktop : cinq colonnes dans la section immersive, ou grandes lignes éditoriales si les textes ne tiennent pas. Mobile : cinq blocs verticaux entièrement cliquables, sans défilement horizontal imposé. Hover : déplacement discret de la flèche et révélation d’une courte description ; aucune information essentielle masquée au clavier ou au toucher.

## Comportement et budgets

Au maximum une transition de section discrète. Contenu dans le HTML initial ; pas de titres rendus uniquement par animation. `prefers-reduced-motion` désactive reveals et effets de mouvement. Pas de chargement anticipé de toutes les vidéos ou interfaces Management.

Objectifs de lancement : LCP ≤ 2,5 s, CLS ≤ 0,1, INP ≤ 200 ms en données terrain quand disponibles ; Lighthouse mobile > 90 sur performance, accessibilité, bonnes pratiques et SEO pour un échantillon représentatif. Ces objectifs sont à mesurer, pas des scores acquis. Images du premier écran proposées ≤ 200 Ko, JS initial compressé cible ≤ 150 Ko à confirmer avec le prototype, polices WOFF2 auto-hébergées et jeux de caractères réduits.
