# Smartsell Ecosystem V2 — dossier de décision

19 octobre 2026 · **À valider avant modification du produit**

## Proposition centrale

La homepage oriente vers **Agency, Academy, Media et Studios**. Elle garde cinq sections au maximum : promesse, quatre univers, trois réalisations, preuves et contact. Labs n’est pas supprimé : ses produits restent accessibles dans une entrée secondaire Produits.

Le produit actuel fournit une bonne base de sites et de contenus. La V2 ajoute la profondeur : un compte Smartsell ID, un admin unique, un modèle Supabase relationnel, un LMS, des paiements et un booking transactionnel. Les composants qui fonctionnent sont conservés ; on ne remplace pas tout le projet.

## Dix livrables soumis à validation

| Demande                                | Document livré                                                                                                                     | Décision recommandée                                                                                |
| -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| 1. Audit de l’existant                 | [current-product-audit.md](current-product-audit.md) + [inventaire des routes](audit-route-inventory.md)                           | Garder monorepo, marque et contenus ; traiter le chantier admin non publié comme WIP                |
| 2. Nouvelle architecture d’information | [new-information-architecture.md](new-information-architecture.md)                                                                 | Quatre portes publiques, Produits secondaire, compte commun                                         |
| 3. Homepage simplifiée                 | [homepage-v2-proposal.md](homepage-v2-proposal.md)                                                                                 | Cinq sections, quatre cartes visibles ensemble, trois réalisations sélectionnées                    |
| 4. Sitemap                             | [sitemap-v2.md](sitemap-v2.md)                                                                                                     | Préserver anciens slugs, mapper studio→studios, maintenir Labs et les liens produits                |
| 5. Architecture Supabase               | [database.md](database.md)                                                                                                         | Tables métier, Auth, Storage et commandes serveur ; pas de blob global comme base du LMS            |
| 6. Matrice rôles/permissions           | [roles-permissions.md](roles-permissions.md)                                                                                       | Neuf rôles cumulables, permissions par domaine et ownership ; RLS testée                            |
| 7. Admin unifié                        | [unified-admin-dashboard.md](unified-admin-dashboard.md)                                                                           | Un shell, des modules autorisés et une publication suivie sans édition de code                      |
| 8. Parcours applicatifs                | [academy-lms.md](academy-lms.md), [media-cms.md](media-cms.md), [studio-booking.md](studio-booking.md), [payments.md](payments.md) | Inscription et paiement fiables, correction serveur, certificat vérifiable, anti-double-booking     |
| 9. Roadmap                             | [implementation-roadmap-v2.md](implementation-roadmap-v2.md)                                                                       | Douze phases 0–11 avec critères de sortie, tests au fil de l’eau                                    |
| 10. Risques et QA                      | [migration-risks-v2.md](migration-risks-v2.md), [testing.md](testing.md)                                                           | Migrations additives, imports réversibles, tests API/RLS/E2E et aucune donnée privée dans le public |

Compléments : [notifications et providers](notifications-and-providers.md), [analytics](analytics-v2.md).

## État vérifié en bref

- Sources `main` : commit `7c80fa4798715c3d20733c7ebcd23897710ad60b` ; le chantier dashboard local n’a pas été publié.
- Catalogue : 144 routes verticales par langue, 16 expertises, 13 formations, 20 articles, 18 films, 3 espaces, 6 packs et 4 produits. Les routes métier à créer ne sont pas comptées comme déjà fonctionnelles.
- Homepage observée : cinq entrées d’univers et quinze titres H2 ; contenu beaucoup plus long que les cinq sections cibles.
- Les types passent. Sur quinze tests locaux, quatorze passent ; un test du nouveau validateur admin bloque l’URL CPR existante. La recette mobile récente et les services externes restent à vérifier.
- Les six logos fournis sont identiques aux originaux. Aucun contenu, source applicative, schéma distant ou déploiement n’est changé pour ce dossier.

## Hébergement : recommandation à approuver

Conserver la vitrine sur GitHub Pages et créer **un portail commun sur un runtime serveur**, avec origine/hébergement à choisir. Supabase porte l’identité et les données ; les fonctions serveur contrôlent paiement, réservation, quiz et certificat. Cela évite une réécriture du public et les limites des routes dynamiques privées sur un export statique.

Une publication GitHub Pages reste un build, pas une mise à jour immédiate de page. L’admin doit suivre cette latence. Si la programmation Media à la minute est obligatoire, choisir une lecture publique dynamique pour cette partie plutôt que promettre un comportement absent.

## Points que valide ce dossier

1. Présenter Smartsell comme un écosystème à quatre univers ; garder Produits en secondaire.
2. Retenir le wireframe et le déplacement des contenus, sans suppression avant cartographie.
3. Retenir Supabase dédié, le portail commun et le modèle de permissions ; garder Management indépendant.
4. Construire par phases, avec premier lot homepage/navigation après validation.
5. Choisir les fournisseurs et activer les paiements réels seulement après validation des comptes, tarifs et règles métier.

Les prix, horaires, programmes complets, prestataires et conditions de vente ne sont pas inventés pour obtenir cette validation. Le test utilisateur de compréhension reste à réaliser. **L’accord sur ce dossier ouvre la phase suivante ; aucun travail d’implémentation V2 n’est lancé avant cet accord, conformément à la section 73 du brief.**
