# Vérifications et stratégie de tests V2

Date : 19 octobre 2026. Ce document sépare les contrôles exécutés pendant l’audit des suites à construire après validation.

## État effectivement vérifié

- `pnpm typecheck` réussi : six tâches, cinq restaurées du cache et une exécutée.
- `pnpm test` rencontre une restriction IPC du runner tsx dans l’environnement courant.
- La commande équivalente `node --import tsx --test tests/*.test.ts` exécute quinze tests : quatorze réussites, un échec.
- L’échec est dans le chantier admin : le catalogue réel contient l’URL non HTTPS de CPR, que la nouvelle validation refuse. La correction devra déterminer l’URL HTTPS réelle ou autoriser une URL HTTP explicitement valide ; ne pas remplacer le lien par une URL inventée ni supprimer le projet pour faire passer le test.
- Le test admin de baseline lit aussi `apps/main/public/admin/content.json`, généré au build et ignoré par Git : il doit devenir autonome pour une CI partant d’un clone frais.
- Les six PNG de marque correspondent aux originaux. Inventaire : 144 routes verticales par langue ; contrôles de chemins et contenus déjà couverts en partie.
- Pas de build neuf, paiement, envoi email, migration, test RLS, test navigateur transactionnel ou mesure Lighthouse exécutés à cette étape. La tentative mobile navigateur a expiré ; sa configuration a été réinitialisée.

Le rapport ne déclare pas une mise en production validée. Les tests locaux `node:test` existants restent conservés et utiles ; le nouveau dispositif les complète sans les supprimer pour changer d’outil.

## Outils proposés

| Niveau                           | Outil                                                               | Responsabilité                                                                     |
| -------------------------------- | ------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| Unitaire métier                  | Vitest                                                              | Montants, transitions, validations, calcul progression/score et providers factices |
| Composants                       | Vitest + outils React adaptés                                       | États vide/chargement/erreur, rôles accessibles, interactions significatives       |
| Base et RLS                      | Supabase local/CI + pgTAP                                           | Droits positifs et négatifs sous vraies identités de base                          |
| API                              | Tests d’intégration                                                 | Auth, commandes, signatures, idempotence, replay, conflits et isolation            |
| E2E                              | Playwright                                                          | Parcours acheteur/apprenant/admin/client, navigation, uploads et reprise           |
| Visuel/accessibilité/performance | Playwright + outil d’accessibilité et Lighthouse lors de la recette | Mobile/clavier, contrastes, stabilité, poids/temps de chargement                   |

Les bibliothèques, configs et tests exécutables sont à créer après validation. Les versions seront vérifiées au moment d’installation ; aucun package n’est ajouté pour ce dossier de conception.

## Scénarios critiques

### E2E Academy gratuit

Nouvel utilisateur test → signup → vérification email via boîte de test → cours gratuit publié → inscription sans checkout → dashboard → prochaine leçon → progression enregistrée → reprise sur autre session. Rejouer l’inscription ne crée pas de doublon.

### E2E Academy payé — critère bloquant avant vente

Nouvel étudiant → signup → recherche d’une formation → checkout provider sandbox → confirmation serveur par webhook → enrollment → player → leçon vidéo/texte → quiz → réussite de toutes les exigences → certificat → vérification URL et téléchargement autorisé.

Éviter de « faire passer » ce scénario en forçant le statut payé, en utilisant une clé service_role dans le navigateur ou en appelant directement l’émission du certificat. Le provider factice valide les contrats en CI ; un passage sandbox réel valide l’adaptateur avant lancement. Aucun paiement réel nécessaire à la recette.

### E2E Admin Academy

Compte academy_admin → créer formation → modules/leçons et ressources privées → publier → fiche visible → archive/restauration. Un media_editor effectuant la même mutation est refusé. Un instructor ne modifie que ses cours affectés et ne publie pas un prix.

### E2E Media

Auteur crée article riche → soumet → éditeur programme → horloge/job de test atteint l’échéance → publication et statut de déploiement → modification en brouillon sans retrait de l’ancienne version → archive/restauration. Vérifier que brouillon et futur scheduled n’apparaissent jamais dans la projection publique.

### E2E Agency

Admin crée projet → ajoute médias → mise en avant et ordre → publication → projet visible à sa route → édition → dépublication/archivage/restauration. Identifiants stables et URLs historiques vérifiés.

### E2E Studios

Manager crée package et disponibilités → client réserve → hold → paiement sandbox/acompte → confirmation → notification → calendrier. Deux clients concurrents demandent le même créneau : une seule acquisition réussit. Tester aussi buffer, hold expiré, callback tardif, annulation et déplacement conflictuel.

## API et sécurité

Tests de signatures invalides, ID fournisseur répété, montant/devise incorrects, session absente/expirée, rôle retiré, élévation de privilèges, owner modifié et appels directs non prévus. Les grants, vues et RPC sont testés en plus des politiques de table.

Tests RLS : student A/B, anonyme, staff de chaque domaine, instructor affecté/non affecté et compte multirôle. Chacun doit réussir ses actions autorisées et échouer hors périmètre. Les tests sont transactionnels et utilisent un seed fictif isolé. [Tests base Supabase](https://supabase.com/docs/guides/database/testing), [pgTAP](https://supabase.com/docs/guides/database/extensions/pgtap).

Storage : fichier privé inaccessible anonymement, URL expirée refusée, utilisateur B privé de l’URL de A, publication d’une copie publique explicite, MIME/taille refusés si incompatibles. Vérifier aussi HTML, bundles, source maps et snapshot public : aucun corrigé, contenu payé, token ou pièce privée.

## Mobile, compréhension et SEO

Vues proposées : 360/390/768/1280 px ; parcours essentiels au clavier ; accès complet sans hover. Tests de formulaires avec validation, réseau lent, erreur provider et reprise. Visuels sans superposition des CTA et sans débordement.

Test compréhension dix secondes : cinq personnes externes, quatre réponses correctes minimum à la promesse et aux quatre univers. Ce test humain reste à organiser ; il ne peut pas être remplacé par une assertion cherchant les quatre mots dans le DOM.

SEO : canonicals, hreflang, robots, sitemaps publiés, redirections/ponts, 404, schémas Organization/Course/Article/Event/Breadcrumb et absence des pages privées. Vérifier les deux langues et le préfixe GitHub Pages.

## CI et seuil de sortie

PR : format, types, tests unitaires, migrations locales, pgTAP/API, build et liens. Staging : E2E provider factice puis adaptateur sandbox, recette mobile et audit des secrets. Production : smoke tests non destructifs et contrôles d’état ; aucune commande reset ou seed de développement.

Chaque phase livre ses tests avec ses fonctions. La phase 11 consolide la recette et la sécurité ; elle n’est pas le premier moment où l’on teste les droits. Toute réussite non exécutée apparaît comme « à tester », pas comme un badge vert.
