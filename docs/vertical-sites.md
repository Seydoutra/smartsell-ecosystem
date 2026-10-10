# Sites autonomes — livraison du 10 octobre 2026

La correction validée transforme les pages d’introduction en cinq sites multipages, chacun dans une application distincte. L’utilisateur a choisi des parcours de démonstration avant connexion des inscriptions, comptes et réservations. L’architecture complète reste décrite dans `architecture/` ; ce document précise le périmètre effectivement réalisé.

## Direction visuelle

La référence principale de cette refonte est la vitrine Smartsell Management, à la demande de l’utilisateur : fond noir quadrillé, halo violet, navigation vitrée, titre centré avec une ligne jaune changeante, aperçus d’interfaces et alternance de sections claires et sombres. Management a été consulté en lecture seule. Son code, ses comptes, ses données et sa publication n’ont pas été modifiés.

Les précédentes références Amaset, Navia, Stoa, TBD Studio et Corndel restent des inspirations de composition. Aucun texte, image, témoignage ou chiffre de ces sites n’est repris.

| Site    | Aperçu interactif                                                     |
| ------- | --------------------------------------------------------------------- |
| Agency  | Identité Kalo, exploration digitale Noura, méthode créative           |
| Academy | Module marketing digital, exercice concret, parcours de démonstration |
| Media   | Une éditoriale, rubriques et liens de lecture                         |
| Studios | Plateau image, onde audio, étapes d’une session simulée               |
| Labs    | Management, vision Obtura et pistes de recherche                      |

La homepage présente également les cinq univers dans un aperçu à onglets avec des liens vers chaque site autonome. Les onglets s’utilisent à la souris et au clavier (flèches, Début, Fin). Les scènes illustrent des contenus existants du site ; elles ne représentent pas une activité réelle ni des données clients.

Le mouvement utilise CSS, IntersectionObserver et un traitement limité du pointeur. La ligne changeante du titre conserve un texte accessible stable ; elle s’arrête quand elle sort de l’écran, quand l’onglet est masqué ou lorsque les animations sont en pause. Les contenus et le premier aperçu restent lisibles sans JavaScript. Le bouton de pause conserve le choix pour la session. `prefers-reduced-motion` désactive les animations et masque ce bouton. Aucun son ni vidéo ne démarre automatiquement.

Les titres se révèlent mot par mot. Agency ajoute une bande typographique défilante et six compositions SVG originales pour ses projets conceptuels : livres, interfaces, affiches, catalogue et parcours. Leurs plans flottent séparément et réagissent légèrement au pointeur sur ordinateur. Ces animations continues s’arrêtent hors du viewport ; les aperçus interactifs rejouent leur entrée au changement d’onglet. Les maquettes restent illustratives, sans suggérer de références clients réelles. La pause et la préférence de mouvement réduit gardent les textes et visuels entièrement lisibles.

## Signature de mouvement

`packages/ui/src/signature.tsx` et `signature.css` réunissent une grammaire commune à la maison et aux cinq sites. Elle est inspirée des compositions Amaset, Navia, Stoa, TBD Studio et Corndel, sans en reprendre de texte ni d’image :

- un rideau pixel à l’arrivée, une fois par site et par session, puis une couverture pixel lors des changements de site ;
- une mosaïque vivante dans les héros, teintée par site et sensible au pointeur ;
- un manifeste dont les mots s’allument au défilement, avec des chiffres tirés des contenus existants ;
- sur la homepage : l’orbite « maison mère + cinq sites », des onglets verticaux à progression automatique avec contour lumineux, une croix lumineuse pour le parcours et une clôture avec accès directs.

Le rideau disparaît en CSS même sans JavaScript. La pause, `prefers-reduced-motion`, l’onglet masqué et la sortie du viewport arrêtent les animations ; les onglets s’arrêtent aussi au survol et au focus.

## Version immersive (agence)

La homepage parle désormais comme une agence de communication et de marketing digital, avec des appels à l’action vers le contact Agency à chaque section. `packages/ui/src/immersive.tsx` ajoute des colonnes de photos défilantes, un bandeau typographique, un zoom/dézoom au scroll, un défilement horizontal des expertises, un carrousel plein cadre des cinq sites, des cartes de méthode empilées, une galerie en parallaxe et un bouton « Parlons de votre projet » flottant. Chaque site vertical reçoit un bandeau de photos et un appel à l’action.

Les photographies viennent d’Unsplash (licence libre) et sont chargées depuis `images.unsplash.com` ; leur liste et leurs auteurs sont dans `packages/content/src/photos.ts`. Ce sont des images d’illustration : elles ne présentent ni l’équipe ni des clients. À remplacer par des photos Smartsell dès qu’elles existent.

## Academy

Huit modules et trois leçons d’aperçu par module. Le quiz donne un retour et bloque la validation tant que la réponse est incorrecte. Les modules choisis et indices des leçons terminées sont stockés sous `smartsell-academy-demo-v1`. La lecture ignore les modules inconnus, les indices hors limites et les données malformées. Les notes d’exercice restent temporaires. Le tableau de bord peut effacer la progression. Les récapitulatifs imprimables portent explicitement la mention sans valeur de certification officielle.

Les durées affichées décrivent des formats envisagés, sans calendrier ni prix de formation validés. La version présente les métiers des intervenants ; elle ne crée pas de profils nominatifs fictifs.

## Studios

Trois espaces illustratifs et six packs. Le parcours choisit un pack, une date future ou actuelle, une heure, une durée et des options, puis montre le récapitulatif. Les heures de simulation sont comprises entre 9 h et 18 h, avec contrôle de l’heure de fin. Ce calendrier ne prétend pas représenter une disponibilité réelle.

Le stockage `smartsell-studio-demo-v1` contient seulement référence, pack, date, heure, durée et options. Nom et email restent dans l’état temporaire du formulaire et ne sont pas enregistrés. Un récapitulatif simulé peut être repris après rechargement, puis effacé. Aucun paiement, email, blocage de créneau ou réservation auprès d’une équipe n’est déclenché.

## Agency, Media, Labs

Les six études Agency sont des concepts avec marques fictives. Aucun client, résultat ou témoignage réel n’est revendiqué. Les pages histoire présentent la vision fournie, sans inventer de date de fondation.

Les vingt articles Media sont des guides et opinions originaux, identifiés comme exemples éditoriaux. La rubrique entretiens présente un guide de questions, pas une interview fictive. La recherche gère les accents et les rubriques. Le partage copie seulement le lien dans le presse-papiers sur action du visiteur. Le formulaire newsletter ne transmet ni ne conserve l’adresse.

Labs renvoie vers le produit Management existant. Obtura reste une vision produit, sans date de lancement, prix ou fonctionnalités disponibles inventés. Les pistes de recherche ne sont pas présentées comme des études publiées.

Les formulaires de contact préparent un brouillon visible et copiable. Le visiteur choisit lui-même comment l’envoyer. Aucun service de contact réel n’est raccordé dans cette livraison.

## Suite de la roadmap

Remplacer les concepts par les réalisations autorisées ; valider les membres du collectif et intervenants, les équipements Studios, les offres et les sessions. Connecter ensuite le CMS, les comptes, les inscriptions, le suivi pédagogique et les réservations selon les phases prévues, avec validation des données et des parcours côté serveur. Les contenus de démonstration restent protégés contre l’indexation jusque-là.
