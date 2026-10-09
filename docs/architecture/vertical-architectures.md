# Architecture des cinq verticales

Chaque verticale possède un layout, une navigation, des types de contenus, des templates de listes et détails, un CTA propre et ses suites de parcours. Les routes et phases exhaustives sont dans [information-architecture.md](information-architecture.md).

## Agency

Objectif : transformer une preuve créative en brief qualifié. Homepage : promesse → services → cas sélectionnés → méthode → personnes → preuve → contact. Services regroupés en stratégie & croissance, marque & design, digital & produit, contenu & production, IA & opérations, sans retirer les seize métiers du brief.

Catalogue filtrable par Branding, Websites, Applications, Campaigns, Photography, Film, Social Media, Products, AI, Strategy. Étude de cas : hero, client/secteur/année, challenge, approche, exécution, galerie, résultats vérifiés, services et équipe, cas suivant. Transitions légères ; galerie accessible et médias différés.

Contact : besoin, entreprise, budget indicatif facultatif, échéance, email/téléphone et consentement ; page de succès sans données personnelles dans l’URL. Client et témoignage publiés seulement avec autorisation. Carrières : offres réellement ouvertes ou candidature spontanée clairement nommée.

Phase 1 : site complet de base et six cas de démonstration sur preview ou six cas validés. Les demandes entrent dans `leads/contact_requests`. Le transfert vers CRM Management est un service ultérieur, pas un accès direct à la base produit.

## Academy

Objectif : apprendre, pratiquer et évoluer. Homepage : cours vedettes, prochaines cohortes, catégories, formateurs, résultats vérifiés, témoignages, entreprises, ressources gratuites, FAQ et CTA. Huit fiches de démonstration proposées : marketing digital, community management, design graphique, UI/UX, web, IA, Power BI, création vidéo. Ces titres ne prétendent pas être des offres déjà organisées.

Quatorze catégories : marketing digital, community management, graphic design, UI/UX, web development, AI, data, Power BI, video production, photography, sales, entrepreneurship, product management, automation.

Formats pris en charge : self-paced, live online, in-person, cohort, corporate, bootcamp, workshop. La fiche comprend titre, sous-titre, média, prix validé ou « Sur demande », niveau, format, durée, date, capacité restante calculée serveur quand active, formateur, langue, certification, description, objectifs, programme, prérequis, outils, projets, avis vérifiés, FAQ et CTA.

Phase 1 : catalogue, fiches, catégories, formateurs, entreprises, événements et demande d’intérêt. Phase 2 : gestion éditoriale autonome. Phase 3 : sessions/capacité, compte minimal, paiement, inscription et factures. Phase 4 : lecteur vidéo, modules et chapitres, fichiers, quiz, exercices, progression, notes, commentaires, support et certificats.

Espace apprenant phase 4 : mes cours, progression, certificats, prochaines sessions, documents, factures, profil, support. Lesson player : vidéo, chapitres, ressources, exercice/quiz, bouton terminer ; sauvegarde idempotente ; progression ne débloque un certificat qu’après règles serveur et évaluations requises. Les certifications sont des attestations de réussite Smartsell sauf accréditation documentée.

Certificat public : identifiant non devinable, programme et état de validité, informations nominatives limitées selon consentement. Une révocation doit être visible. Recommandation : cours vidéo → Studios ; cours IA → article Media ou produit Labs.

## Media

Objectif : expliquer tech, digital, business et culture créative, avec ancrage Afrique/Guinée. Homepage éditoriale : grande histoire, top stories, dernières publications, tendances éditoriales, sections Tech/IA/Startups/Guinée/Afrique/Business/Création, interviews et newsletter. Pas de faux compteur de tendances.

Rubriques : latest, tech, ai, startups, business, marketing, creative, africa, guinea, opinions, interviews. Article : titre, chapô, couverture, auteur, date de publication/mise à jour, temps de lecture, catégorie, partage, corps, citations, images et embeds, sujets liés, tags et newsletter. Opinion clairement identifiée ; corrections et politique éditoriale accessibles.

Auteur : bio, rôle et articles publiés. Recherche locale : mots-clés et rubriques. Partage utilise URL canonique ; embeds externes différés et, lorsque nécessaire, consentis. Phase 1 : templates et vingt textes de démonstration distincts en preview, jamais présentés comme actualités vérifiées. Phase 2 : auteurs/rédacteurs en chef, brouillons, preview, programmation, publication, mise à jour et archive Sanity.

Suite de parcours : article IA → Academy ; CRM → Management Labs. Une suggestion commerciale doit être identifiable et ne remplace pas les articles liés. Newsletter quotidienne/hebdomadaire uniquement si une cadence éditoriale réelle est assurée.

## Studios

Objectif : comprendre les espaces et les moyens de production, puis choisir une session adaptée. Homepage : grand visuel, espaces, usages, packages, équipements/staff, galerie, fonctionnement, FAQ, demande. Services : photo shoot, vidéo, podcast, interview, TV show, content creator, product shoot, corporate interview, live stream, training.

Six packs : Photo, Podcast, Creator, Corporate Interview, Product, Full Production. Chaque pack décrit durée, prix validé, équipement, staff, livrables, limites et add-ons. Add-ons : photographe, vidéaste, ingénieur son, étalonneur, monteur, makeup, lighting assistant, caméra, objectif, lumières, micros, prompteur, décor, fond, montage. Compatibilités et disponibilités sont des règles métier.

Phase 1 : catalogue et demande de créneau, avec réponse opérateur ; aucun calendrier affiché comme disponible en temps réel. Phase 5 : espace → service → package → date/heure/durée → add-ons → coordonnées → récapitulatif → acompte/paiement → confirmation. Retour arrière sans perte de saisie, récapitulatif des frais, fuseau Conakry visible.

Règles à valider : horaires, buffers, durée min/max, acompte, expiration hold, annulation/report/remboursement, capacité, heures supplémentaires, jours fériés et équipements partagés. Confirmation atomique et exclusion concurrente détaillées dans le modèle de données. Notification uniquement après écriture durable. Suite Creator → Academy, production corporate → Agency.

## Labs

Objectif : démontrer la capacité à construire des outils et convertir vers démo, accès ou attente selon l’état réel. Homepage : proposition produit, Management/Obtura, problèmes résolus, méthode, recherche, IA et contact.

Management : CRM, ventes et opérations, produit existant observé. Lien d’accès actuel maintenu. Obtura : Business OS pour créateurs visuels selon le brief ; statut à confirmer, CTA initial « Être informé » tant que disponibilité non validée. Pas de faux bouton « Get started » vers un produit non accessible.

Fiche produit : nom, tagline, logo approuvé, hero, problème, solution, fonctionnalités, captures réelles ou démonstration signalée, démo, teaser prix et roadmap validés, CTA approprié. Les pages Recherche et IA publient uniquement des travaux décrits avec leur maturité : expérimentation, prototype, bêta ou disponible.

Phase 1 : deux fiches produit et formulaire `product_demo_requests`. Phase 7 : accès unifié, connecteurs et intégrations réellement livrés. Le produit Management reste autonome. Les futurs SaaS s’ajoutent au type CMS `product` et au registre de destinations, sans changer le layout du groupe.

## Contrat commun de qualité

Contenu utile sans animation, mobile 320 px, clavier, focus et contrastes contrôlés. Pages vides, expirées et introuvables explicites. Formulaires avec validation serveur, état d’envoi, erreurs récupérables et succès réel. Les interactions désactivées n’affichent pas une confirmation fictive. Les états de démonstration portent une mention et sont exclus de l’indexation.
