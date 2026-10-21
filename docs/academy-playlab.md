# Academy : accueil, Playlab et attestations PDF

L’accueil présente une mission de cadrage publique, chargée au clic. Elle ne demande ni compte ni sauvegarde et ne valide aucun module. Les liens Connexion et S’inscrire du header ouvrent le bon formulaire ; une confirmation e-mail déjà commencée reste prioritaire. Un compte connecté retrouve Mon compte.

La formation complète « Faire un court-métrage avec l’IA » propose onze missions : chaîne de production, plan unique, bible visuelle, axe caméra, recadrage, mouvement, mixage, étalonnage, livraison, montage narratif et réparation finale. Les images sont des illustrations fictives. Les déplacements, filtres, cadrages et jauges sont des simulations pédagogiques ; aucun film IA n’est généré par la plateforme. Le mixage peut jouer un exemple sonore synthétique de sept secondes, uniquement sur demande. La lecture du coach utilise la voix disponible dans le navigateur.

Les XP sont décoratifs. La sauvegarde protégée de chaque entraînement reste distincte de `academy_progress` et des attestations. La lecture et la sauvegarde exigent le même accès complet et la validation des modules précédents que le cours. Aucun client ne peut écrire directement les sauvegardes. Les modules à venir restent verrouillés côté interface et serveur.

Les quiz présentent une question à la fois, des cartes de réponses accessibles au clavier, une correction serveur et un retour immédiat. Une réponse contrôlée est figée pendant la tentative, y compris si elle est incorrecte ; on peut revoir ses réponses et recommencer après le résultat. Seule la soumission finale corrigée par le serveur valide un module. Les confettis apparaissent uniquement après une bonne réponse confirmée, disparaissent après 1,8 seconde et sont désactivés avec la préférence de mouvement réduit.

Le profil permet de modifier nom, téléphone, ville, pays, activité et objectif. L’adresse e-mail reste en lecture seule ; aucune nouvelle permission ne porte sur l’identité, l’e-mail ou les rôles. Ces coordonnées ne figurent ni sur le QR public ni dans les événements analytiques.

Le PDF est produit dans le navigateur avec les polices Vera embarquées et leur licence. Les ressources lourdes se chargent à la demande. L’impression reste disponible en secours. Le spécimen public `documents/attestation-specimen.pdf` utilise le même générateur, porte « SPÉCIMEN - NON VALABLE » et ne correspond à aucune émission réelle. Son QR pointe vers une référence inexistante, qui doit afficher « Attestation introuvable ». Les attestations réelles exigent toujours la validation serveur de la formation complète ; une révocation reste visible sur la page de vérification même après téléchargement d’une ancienne copie PDF.

Migration : `20261021084451_learner_profiles_game_saves.sql`. Elle ajoute les champs facultatifs du profil et les sauvegardes privées ; elle ne remplace aucune donnée de cours ou de progression. Le produit Management n’est pas modifié.

Vérifications : tests Postgres PGlite (accès propre/autrui/anonyme, quiz, ordre, émission, coordonnées privées et sauvegardes), critères des onze missions, restauration de données corrompues, quiz dans un serveur simulé explicitement étiqueté, rendu PDF A4 paysage avec texte et URL QR vérifiés, builds FR/EN et contrôle des liens statiques. Les tests de jeu n’attribuent aucun résultat à un compte réel.
