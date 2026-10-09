# Audit SŌMA : synthèse et preuves

Observation : 9 octobre 2026. Sources primaires : [maison SŌMA](https://seydoutra.github.io/soma-experiences/fr/), [VIBES](https://seydoutra.github.io/soma-experiences/fr/vibes/), [page Le concept](https://seydoutra.github.io/soma-experiences/fr/vibes/concept/).

Les pages ont été consultées dans le navigateur, après échec de récupération par l’outil Web. Inspection de la navigation mobile à environ 337 px et d’une page interne à 1440 px. Lecture des liens, titres et sections ; observation visuelle ponctuelle. Pas de soumission de formulaires, achat de billets, mesure Lighthouse ou audit exhaustif WCAG.

## Ce que le site montre

La maison présente une promesse générale, ses compétences, cinq univers, des réalisations et plusieurs points de contact. Une carte VIBES ouvre un site doté d’une identité, d’un menu et de routes propres. La présence du groupe est explicite dans le menu et le footer de VIBES.

La homepage SŌMA contient notamment un hero de présentation, une mise en avant de l’événement Onomo Vibes, une présentation de la maison, des expertises, les cinq univers, une méthode, un portfolio, des témoignages, des formules, une FAQ et un journal. Cette structure mêle marque mère, expertise et activation commerciale.

VIBES possède une homepage, un concept, des événements, une galerie, des partenaires et un contact. Le CTA billetterie est dominant et mène à Billetfacile. Le retour au groupe reste secondaire. La page Concept garde la navigation VIBES et développe ses propres piliers : musique, style et partage.

## Conséquences pour SMARTSELL

Reprendre la distinction entre rôle de la maison et rôle de la verticale, ainsi que la navigation locale et le retour au groupe. Renforcer la visibilité transversale : cinq destinations permanentes, recherche globale et recommandations contextuelles. Dans Smartsell, les verticales sont des produits aux données et opérations spécifiques, ce qui demande davantage que des pages de présentation.

Ne pas transposer l’identité événementielle, la palette dorée, les typographies ou l’énergie lifestyle. L’autonomie de Smartsell doit venir de l’architecture et des parcours, avec son violet et son jaune.

## Limites et divergences

Le code SŌMA retrouvé localement dans `2026-09-28/toui/soma-experiences` utilise Next.js et un export statique. Il contient un composant central `components/soma-site.tsx`. Sa structure de pages ne reflète pas entièrement les routes VIBES observées en ligne : il est utilisé uniquement comme contexte historique, pas comme preuve du déploiement actuel.

Les captures prises immédiatement après navigation montrent une transition recouvrant temporairement la page. Cela ne permet pas de conclure à un défaut permanent. Un compteur change pendant l’animation : aucun diagnostic de date n’en est déduit. Les chiffres et témoignages visibles n’ont pas été vérifiés indépendamment et ne doivent pas être réutilisés pour Smartsell.

La billetterie externalisée montre un choix de conversion, mais ne prouve pas un système de réservation interne. Aucun SSO, CMS, modèle transactionnel ni infrastructure partagée du site live n’a été établi.

La traduction opérationnelle est détaillée dans [soma-structure-analysis.md](soma-structure-analysis.md).
