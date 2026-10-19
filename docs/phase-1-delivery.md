# Phase 1 — accueil et navigation autour de quatre univers

Architecture et homepage approuvées par le propriétaire le 19 octobre 2026. Cette livraison porte sur la vitrine publique, avec les mêmes contenus et les mêmes produits.

## Résultat

L’accueil contient cinq sections : promesse visible immédiatement, quatre portes Agency/Academy/Media/Studios, trois réalisations existantes, références clients déjà présentes et prise de contact. Il ne contient plus le catalogue intégral ni le brief en six étapes.

La navigation principale présente les quatre univers, À propos et Contact. Produits est un accès secondaire, également présent dans le menu mobile et le pied de page. Les sites autonomes conservent leurs menus propres ; leur barre d’écosystème présente les quatre univers.

Nouvelles pages FR et EN : `/about/`, `/contact/`, `/products/` et `/explore/`. Les chemins sont préfixés par `/smartsell-ecosystem/:locale/` sur GitHub Pages. Le chemin historique `/studio/` reste utilisé ; aucune migration de slug n’est introduite dans ce lot.

## Préservation

- Les 144 routes de verticales par langue restent déclarées, dont les anciennes pages Labs.
- Les catalogues, photographies, vidéos, formations, projets, produits et six PNG de marque ne sont pas modifiés.
- L’ancien accueil complet est conservé dans `/explore/`, accessible depuis « Explorer en détail ». Les parcours et la méthode sont extraits dans un module partagé avec À propos.
- Une comparaison des textes longs de l’ancien accueil avec l’archive et ce module partagé ne trouve aucun texte perdu hors des deux anciens titres de métadonnées FR/EN.
- Les anciens fragments d’accueil `services`, `solutions`, `produits`, `portfolio`, `methode`, `manifeste`, `vision`, `brief`, `parcours` et `apercus` sont résolus vers leurs nouvelles destinations au chargement et lors d’un changement de fragment. `ecosystem` reste un alias de la section des univers.
- Les liens externes des quatre produits restent ceux du catalogue existant. Management et ses données ne font l’objet d’aucune modification.
- Le chantier local du dashboard est préservé dans sa copie d’origine. Aucun changement d’admin, de schéma, d’authentification ou de fournisseur n’entre dans cette livraison.

## Recette

Contrôles réalisés :

- `pnpm typecheck` : six applications vérifiées ; `pnpm test` : neuf tests réussis.
- `pnpm format:check` et `git diff --check` réussis.
- Build de production FR/EN, avec le préfixe GitHub Pages : réussi. Contrôle d’export : 336 pages HTML et 25 026 liens et ressources locaux vérifiés.
- Recette navigateur : bureau 1280 px, paysage 1024 px, téléphone 390 px et petit écran 320 px ; pas de débordement horizontal constaté sur l’accueil final à 320 px.
- Navigation mobile, accès secondaire aux Produits, recherche Management, pages À propos/Produits/Contact, changement FR/EN et retour vers Agency vérifiés.
- Ancien lien `/#brief` résolu vers `/contact/#brief` ; lien WhatsApp vérifié sans envoyer de message. Accès `/explore/#credits` vérifié.
- Mode clair : titres fixes lisibles, logo violet original et liens de navigation contrastés. Mode sombre conservé. Pause du mouvement vérifiée sur la nouvelle animation ; règles `prefers-reduced-motion` présentes, sans émulation d’un appareil réel.
- Les six logos livrés sont identiques, octet pour octet, aux pièces jointes du propriétaire.

La compilation ne remplace pas une recette complète du LMS ou des réservations : leurs parcours existants restent ceux de démonstration, dans l’attente des phases correspondantes. Le test de compréhension décrit dans `homepage-v2-proposal.md` reste à organiser auprès de cinq personnes : aucune validation utilisateur ni mesure sur réseau mobile limité n’est revendiquée ici.
