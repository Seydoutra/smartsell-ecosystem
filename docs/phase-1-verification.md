# Vérification du socle — 9 octobre 2026

Périmètre : monorepo, design system, navigation globale et homepage. Les pages des verticales sont des présentations de leur direction ; leurs fonctions métier restent à construire.

| Contrôle                                        | Résultat                                                                                   |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------ |
| TypeScript strict et compilation Next.js        | Réussis                                                                                    |
| Tests de routage                                | 2 réussis : portabilité chemins/sous-domaines et rejet des chemins/origines invalides      |
| Export statique                                 | 11 fichiers HTML, dont accueil, cinq univers, bibliothèque et pages de repli               |
| Liens, ancres et ressources locales de l’export | 469 vérifiés, aucune cible absente                                                         |
| Logos                                           | Les six fichiers PNG sont identiques aux originaux, vérifiés par SHA-256                   |
| Desktop 1440 × 900                              | Homepage complète inspectée, aucun débordement horizontal                                  |
| Mobile 390 × 844 et 320 × 844                   | Aucun débordement horizontal ; texte et actions lisibles                                   |
| Tablette 768 × 1024                             | Aucun débordement horizontal                                                               |
| Navigation transversale                         | Méga-menu, accès Academy et état actif, accès Studios et Labs vérifiés                     |
| Recherche                                       | Management retrouvé avec son URL existante ; « creer » retrouve Agency ; état vide vérifié |
| Clavier                                         | Échap ferme méga-menu et recherche ; focus rendu au déclencheur ; dialogs natifs modaux    |
| Mobile                                          | Menu des cinq univers et passage du menu à la recherche vérifiés                           |
| Console navigateur                              | Aucun avertissement ou erreur relevé pendant les parcours inspectés                        |
| Management                                      | HEAD et état Git existants conservés ; aucun fichier de ce produit modifié                 |

Les vérifications visuelles ont été réalisées dans le navigateur intégré Codex sur l’export de production servi localement. Aucun score Lighthouse ni audit exhaustif de conformité WCAG n’est revendiqué. La prévisualisation locale est non indexable. Le projet Sites enregistré est privé ; sa publication reste bloquée par la revue automatique de la session, qui refuse la transmission au processus de publication.

La CI exécute format, types, routage, build et contrôle de l’export sur `main`, `develop` et les pull requests.
