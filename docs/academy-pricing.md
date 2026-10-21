# Prix par module et promotions Academy

Direction corrigée et validée le 21 octobre 2026 : **chaque module possède un prix indépendant et tous démarrent à 0 GNF**. Aucune grille publique par niveau, aucun prix payant imposé, aucun pack public.

« Module de formation » désigne une entrée du catalogue (Communication digitale, Canva Pro, Meta Business Suite, etc.). Les leçons et séquences composent un module. Le cours complet court-métrage IA conserve sa gratuité protégée.

## Gestion

1. Se connecter au dashboard propriétaire : `/fr/admin/`.
2. Ouvrir **Academy → Prix et promotions**.
3. Modifier le prix du module en GNF. **0 = gratuit**. Aucune catégorie tarifaire n’impose un montant.
4. Au besoin, ouvrir **Configurer une promotion**, choisir un prix réduit et une période, puis activer la promotion. Les horaires sont ceux de Conakry (UTC) ; la date de fin est exclusive. Une promotion peut rendre temporairement gratuit un module au prix normal positif.
5. Enregistrer dans Supabase, approuver la publication, puis relancer le workflow GitHub Pages via le lien du dashboard.

Les montants publics sont issus du dernier catalogue approuvé et reconstruit. La promotion n’est affichée que durant sa période ; la page réévalue son échéance toutes les 30 secondes et retrouve ensuite le prix normal. Ce calcul visuel ne constitue pas une autorisation de paiement : les futurs contrôles de commande devront vérifier le prix côté serveur.

Les prix sont visibles sur chaque carte et fiche de module. Tous les parcours disponibles restent gratuits au lancement. L’enregistrement des prix prépare la commercialisation ; cette phase ne déclenche aucun paiement, ne change pas les accès existants et ne met pas en place de paywall. La phase commerciale devra relier achat confirmé, prix serveur et accès individuel avant toute vente effective.

## Abonnement futur

Le dashboard prépare un montant et une durée en jours pour les formules mensuelle (30 jours), trimestrielle (90 jours) et annuelle (365 jours). Tous les montants démarrent à zéro, à définir avant lancement. Leur statut est verrouillé à `coming_soon` et leur périmètre à `all` : le futur abonnement donnera accès à **tout le catalogue Academy pendant la période souscrite**. Aucune formule n’est annoncée à la vente dans la vitrine.

L’activation et l’expiration des droits, les paiements et éventuels renouvellements restent une phase ultérieure. Aucun abonnement n’est créé par cette livraison.

## Stockage et protection

La collection singleton versionnée `academy/pricing` utilise une configuration `version: 2`. La migration `20261021102007_academy_module_prices_promotions.sql` remplace l’ébauche par niveaux par les prix individuels gratuits, uniquement dans cette collection. Les contenus, profils, progrès, autres brouillons CMS et Management sont préservés.

Seul un administrateur global propriétaire peut modifier ces montants. Les prix négatifs, fractionnaires, promotions incohérentes, doublons de modules et activation prématurée des abonnements sont rejetés côté serveur. La sauvegarde en brouillon ne change pas les prix publics ; le contrôle de révision empêche l’écrasement concurrent.

Les affectations couvrent les 14 entrées actuelles. L’intégration technique des nouvelles formations ajoutera leurs identifiants au catalogue de prix et à la validation serveur. Les 15 propositions du document voisin restent des contenus à préparer, sans publication comme formations complètes disponibles.
