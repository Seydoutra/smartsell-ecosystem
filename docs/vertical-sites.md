# Sites autonomes — livraison du 10 octobre 2026

La correction validée transforme les pages d’introduction en cinq sites multipages, chacun dans une application distincte. L’utilisateur a choisi des parcours de démonstration avant connexion des inscriptions, comptes et réservations. L’architecture complète reste décrite dans `architecture/` ; ce document précise le périmètre effectivement réalisé.

## Direction visuelle

Les références demandées sont Amaset, Navia, Stoa, TBD Studio et Corndel. Elles ont été examinées comme références de composition : ampleur typographique, grands cadrages, navigation légère, alternance de densité et de respiration. Les textes, images, témoignages et chiffres de ces sites ne sont pas repris.

| Site    | Expression                                                                             |
| ------- | -------------------------------------------------------------------------------------- |
| Agency  | Violet profond, sculpture jaune en perspective, portfolio décalé, index des expertises |
| Academy | Papier clair, notes en mouvement, cartes pédagogiques, bande manifeste violette        |
| Media   | Rose violet, compositions typographiques, grande une et grille éditoriale              |
| Studios | Plateau sombre, faisceaux de lumière, cadres de prise de vue et plans de production    |
| Labs    | Grille, plans transparents, profondeur et interfaces produit illustratives             |

Le mouvement utilise CSS, IntersectionObserver et un traitement limité du pointeur. Les textes restent accessibles sans JavaScript. Le bouton de pause s’applique aux animations et transitions de la page et conserve ce choix pour la session de navigation. `prefers-reduced-motion` désactive les animations et masque ce bouton. Aucun son ni vidéo ne démarre automatiquement.

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
