# Smartsell Influence

Influence ajoute un univers autonome à l’écosystème, sous `/fr/influence/` et
`/en/influence/`. Le produit Management, sa base et son application restent séparés.

## Parcours

- Vitrine : création, formats, méthode, répertoire et candidature créateur.
- Entreprise : sélection de profils, brief en trois étapes, campagnes, livrables,
  retours, conditions contractuelles, reporting et dépenses en GNF.
- Créateur : missions attribuées, confirmation d’intérêt, remise du contenu,
  retours, relevés de statistiques avec preuve, honoraires et paiements enregistrés.
- Smartsell : revue des candidatures, publication du répertoire, attribution des
  missions, conditions/version/référence de contrat, validation éditoriale et
  enregistrement des dépenses documentées.

Les espaces sont accessibles depuis le pied de page Influence. Le pilotage
Smartsell est aussi relié au dashboard d’administration existant. Les liens
`dashboard/?demo=1`, `creator/?demo=1` et `admin/?demo=1` ouvrent des simulations
locales explicites. Aucun de leurs changements ne modifie Supabase.

## Base et sécurité

Migration `20261022170635_influence_campaign_portals.sql` appliquée le
22 octobre 2026 au projet `sryetyminwftkrpjkdcl`, organisation MIRS. Huit tables
sont protégées par RLS. Le contrôle en production confirme : répertoire public
accessible, profils privés refusés aux visiteurs anonymes, aucune modification
directe de mission par le rôle authenticated et aucune exécution anonyme du RPC
privé de lecture des espaces.

Les écritures utilisent `influence_command`, avec contrôles métier côté serveur.
L’identité du client vient de sa session. Le rôle affiché dans l’interface
n’accorde aucun droit. Un créateur voit ses missions et ses paiements, sans le
budget global du client. Le propriétaire dispose des opérations d’administration.
Les révisions des missions évitent d’écraser une modification concurrente. Le
texte d’un contrat dont la signature externe est référencée reste immuable.

Les tables ne contiennent aucun profil fictif ni campagne de démonstration.
Le répertoire réel commence vide ; Smartsell doit approuver les candidatures.
L’adresse propriétaire est désormais réservée à `contact@smartsell.pro` par la
migration `20261022183255_smartsell_owner_contact_pro.sql`. Elle doit être
confirmée par son titulaire avant activation de ses droits.

Les inscriptions réutilisent les comptes Smartsell et la confirmation par code.
Ne jamais désactiver la confirmation ni créer de mot de passe pour un utilisateur.

## Lecture des résultats

Les statistiques sont des relevés déclaratifs datés, associés à un lien de
preuve. Le bilan utilise le dernier relevé cumulatif de chaque mission ; les
versions successives ne sont pas additionnées. Les vues ne sont pas une audience
unique et ne démontrent pas des ventes. Le ratio affiché est interactions/vues.
Les honoraires prévus sont distincts des dépenses et paiements enregistrés.
Le CSV conserve les valeurs détaillées et protège les cellules contre les
formules ; le bilan et les conditions peuvent être imprimés.

Aucune connexion automatique aux API Instagram, TikTok ou YouTube, aucun
versement bancaire et aucune signature électronique ne sont activés. Les
contrats signés en dehors de la plateforme et les paiements effectivement
réalisés sont référencés par Smartsell.

## Ressources visuelles

Photo ajoutée depuis le compte Envato, licence enregistrée pour **Site web
Smartsell** le 22 octobre 2026 :

- « Vidéo d’un blogueur parlant et filmant », DC_Studio,
  [ressource Envato](https://app.envato.com/search/photos/f4236f21-5ee9-4af4-bc33-16076129012f?itemType=photos&term=african+content+creator+camera).
- Original téléchargé : `man-records-video-with-smartphone-and-microphone-2026-09-21-19-24-14-utc.jpg`.
- Version optimisée : `apps/main/public/influence/creator-recording.jpg`,
  1500 × 1000, environ 139 Ko.

Les autres photos d’ambiance sont issues du catalogue visuel déjà intégré et
licencié du site. Les personnes représentées sont des modèles d’illustration,
jamais présentées comme de véritables membres du répertoire. Les noms et les
chiffres des aperçus sont explicitement fictifs. L’avatar par défaut du répertoire
réel est un pictogramme générique.

## Vérification

`tests/influence.test.ts` vérifie les calculs et, dans un Postgres embarqué,
l’isolation de deux entreprises et d’un créateur, la publication par Smartsell,
les transitions de mission, les conflits, les contrats et les dépenses.
La suite complète comporte 32 tests. Vérifier aussi les parcours dans le
navigateur et l’export statique FR/EN avec le préfixe GitHub Pages.
