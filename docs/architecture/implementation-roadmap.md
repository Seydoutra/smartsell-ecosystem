# Plan d’exécution et critères de livraison

La présente livraison correspond au cadrage. L’implémentation démarre après validation, conformément aux sections 67 et 74 du brief.

Les durées suivantes sont des fourchettes indicatives de travail pour une petite équipe expérimentée, après accès aux contenus et comptes fournisseurs. Elles ne constituent pas un engagement calendaire ; les services de paiement, les contenus et la migration d’identité peuvent devenir le chemin critique.

| Phase | Périmètre | Dépendances | Sortie vérifiable | Estimation indicative |
|---|---|---|---|---|
| 0 — Validation | Architecture, sitemap, direction, périmètre et propriétaires | Ce dossier | Décisions approuvées ; informations métier listées | Selon revue |
| 1 — Socle & sites | Monorepo, design system, nav, holding et cinq verticales de base, modèles Sanity/Supabase, demandes, SEO, responsive | Marque, contenus, domaine et staging | Parcours publics cohérents, previews des cinq sites, schémas testés, aucune fausse transaction | 4–7 semaines |
| 2 — CMS opérationnel | Workflows, preview, auteurs, rôles, publication, programmation, recherche et newsletter | Comptes/plan Sanity, éditeurs, provider email | Éditeur publie et archive sans code ; brouillon invisible au public | 1–3 semaines |
| 3 — Commerce Academy | Offres/sessions, identité minimale, inscriptions, paiement validé, documents | Provider réellement compatible, prix, CGV approuvées | Commande payée ouvre exactement un droit ; capacité respectée ; événements rejouables | 2–4 semaines |
| 4 — LMS | Lecteur, modules, ressources, quiz/exercices, progression, certificats et support | Contenus pédagogiques, vidéo, règles de réussite | Deux apprenants n’accèdent pas aux droits de l’autre ; reprise et certificat fiables | 4–7 semaines |
| 5 — Booking Studios | Disponibilités, holds, packages/add-ons, acompte, confirmation, reports | Inventaire, horaires, règles, provider | Deux demandes simultanées ne confirment pas le même espace/intervalle | 3–5 semaines |
| 6 — Smartsell ID | Identité transversale, organisation/permissions, sessions multi-apps et éventuel mapping Management | Audit auth staging, accès aux projets existants | Connexion/revocation inter-univers testées ; droits séparés ; migration réversible | 2–4 semaines |
| 7 — Produits & extraction | Connecteurs Management/Obtura, sous-domaines selon besoins, nouveaux SaaS | Contrats API, disponibilité réelle des produits | Intégrations traçables ; anciens liens redirigés ; parcours et SEO préservés | Par intégration |

Sanity et Supabase ont leurs schémas en phase 1, mais le workflow éditorial complet est phase 2. Academy a besoin d’une identité locale minimale en phase 3 avant la convergence de phase 6. La page booking existe en phase 1 comme demande opérateur, puis devient un calendrier transactionnel en phase 5.

## Ordre de construction de la phase 1

1. Créer le checkout dédié, conventions Git, environnements isolés et architecture des packages.
2. Tokens, composants communs, URL resolver, navigation et layouts ; homepage mère.
3. Agency : services, portfolio et contact ; vérifier un cas et un formulaire.
4. Academy : catalogue, catégories, cours et formateurs ; vérifier filtres et demande d’intérêt.
5. Media : rubriques, auteurs, article et recherche ; vérifier publication et références.
6. Studios : espaces, packs, galerie et demande ; vérifier compatibilités informatives et wording.
7. Labs : Management/Obtura, états de disponibilité, demande de démonstration.
8. Passerelles, pages corporate/légales validées, recherche globale, newsletter initiale, SEO et contenu.
9. Revue mobile/desktop, accessibilité manuelle, performance, préparation déploiement et runbooks.

Chaque verticale a son jalon de preview et ses tests ciblés avant la suivante. Les contenus peuvent être préparés en parallèle par les responsables ; ce dossier ne délègue ni ne crée de chats supplémentaires.

## Matrice de recette

| Lot | Vérification nécessaire |
|---|---|
| Navigation | Cinq univers, actif, retour au groupe, menu clavier/mobile, recherche et changement de langue disponible |
| Contenu | Champs obligatoires, droits des images, exemples marqués, références valides, aucun faux témoignage/chiffre |
| Agency | Catégories, cas suivant, validation du brief, erreur réseau sans perte de saisie |
| Academy | Formats et filtres, offre cohérente, absence d’inscription fictive en phase 1 |
| Media | Brouillon inaccessible, auteur, rubrique, métadonnées, article lié, archive retirée de l’index |
| Studios | Demande explicite en phase 1 ; exclusion concurrente, hold expiré et webhook tardif en phase 5 |
| Labs | CTA correspondant à la maturité ; Management reste accessible par son lien actuel |
| Données | RLS antagoniste, fichiers privés, autorisation serveur, idempotence et secrets hors client |
| SEO | Canonical, OpenGraph, sitemap publié, robots, redirects 1:1 et aucune fuite preview |
| Accessibilité | Clavier, focus, labels, erreurs, contraste, zoom, réduction du mouvement |
| Performance | Échantillon représentatif mobile ; budgets et Lighthouse > 90 visés, corrections des écarts |
| Analytics | Consentement avant pixels, retrait possible, événements sans données personnelles |

## Démonstration et production

Préparer en preview six cas, huit cours, vingt articles, six packs et deux produits. Les articles de démonstration ne sont pas des nouvelles factuellement vérifiées ; les cours et packages n’ont pas de prix ou date inventés. Le lancement public nécessite des contenus réellement autorisés et un responsable par verticale.

Avant mise en ligne : domaine/DNS et coordonnées officiels, contenu approuvé, rétention et mentions juridiques revues, formulaires reliés et notifications testées, sauvegardes/restauration, monitoring et contact de maintenance. Publication uniquement sur la base d’une version reviewable approuvée ; aucune URL de production inventée dans ce dossier.

## Livrables après développement

Repository, README, docs architecture/CMS, migrations Supabase horodatées, `.env.example`, URLs de production réelles, instructions de déploiement/admin, procédures de sauvegarde/rollback et roadmap actualisée. Chaque phase met à jour ses documents et son état de disponibilité.

## Risques concrets à résoudre

- Identifier l’existant holding éventuel et le périmètre d’Obtura avant migration de liens.
- Vérifier staging/RLS Management avant toute convergence d’identité : migrations locales ≠ état distant.
- Choisir un fournisseur de paiement accessible au marchand et aux utilisateurs visés, avec GNF ou traitement de conversion explicite.
- Produire les contenus et médias autorisés ; le design ne doit pas compenser une offre non définie.
- Répéter une extraction d’Academy sur domaine de staging pour prouver la portabilité des URLs, assets et sessions.

**Validation demandée : architecture de marque, sitemap, choix technique progressif, direction visuelle et périmètre phase 1.** Les informations restantes peuvent être recueillies pendant la préparation de staging après cette validation.
