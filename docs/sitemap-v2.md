# Sitemap et compatibilité des URLs V2

Proposition à valider. `/:locale` représente `/fr` ou `/en`. En production GitHub Pages, les chemins publics portent aujourd’hui le préfixe `/smartsell-ecosystem` ; il doit être conservé par le package de routage. Les chemins ci-dessous décrivent l’arborescence produit, pas une migration déjà exécutée.

## Public — quatre univers et compléments

```text
/:locale/
/:locale/about/
/:locale/contact/
/:locale/search/
/:locale/products/                         # nouvelle entrée secondaire, Labs conservé
/:locale/products/[slug]/                  # fiches / liens des produits existants
/:locale/privacy/ · terms/ · credits/

/:locale/agency/
  about/ · history/ · services/ · services/[slug]/
  work/ · work/[slug]/ · team/ · clients/ · testimonials/
  contact/ · careers/ · privacy/

/:locale/academy/
  courses/ · courses/[slug]/
  categories/[slug]/ · instructors/[slug]/
  sessions/ · sessions/[id]/ · corporate/ · faq/
  privacy/

/:locale/media/
  latest/ · tech/ · ai/ · digital/ · business/ · startups/
  guinea/ · africa/ · events/ · events/[slug]/ · interviews/
  marketing/ · creative/ · opinions/         # rubriques existantes maintenues
  article/[slug]/ · authors/[slug]/ · tags/[slug]/
  videos/ · video/[slug]/ · search/ · newsletter/ · privacy/

/:locale/studios/
  spaces/ · spaces/[slug]/ · services/ · services/[slug]/
  packages/ · packages/[slug]/ · booking/
  gallery/ · faq/ · contact/ · privacy/
```

Les pages `/clients/` et `/testimonials/` ne sont nécessaires que si les contenus validés le justifient ; les collections CMS existent même si ces blocs restent intégrés à Agency/about. Rien n’impose de créer une page vide.

## Portail commun — origine serveur à définir

Routes cibles d’une seule application de compte et d’administration :

```text
/login/ · /signup/ · /auth/callback/ · /forgot-password/ · /reset-password/
/dashboard/
/dashboard/learning/
/dashboard/learning/[enrollmentId]/
/dashboard/learning/[enrollmentId]/lessons/[lessonId]/
/dashboard/certificates/ · /dashboard/downloads/
/dashboard/bookings/ · /dashboard/bookings/[id]/
/dashboard/payments/ · /dashboard/invoices/ · /dashboard/profile/
/checkout/[orderId]/ · /checkout/return/
/certificate/[publicId]/                    # vérification publique minimale
/admin/
/admin/agency/{projects,services,clients,team,testimonials,pages}/
/admin/academy/{courses,categories,instructors,cohorts,sessions,students}/
/admin/media/{articles,categories,tags,authors,events}/
/admin/studios/{spaces,services,packages,addons,availability,bookings}/
/admin/users/ · /admin/payments/ · /admin/invoices/
/admin/analytics/ · /admin/files/ · /admin/notifications/
/admin/audit/ · /admin/settings/
```

Les accolades sont une notation d’inventaire, pas des URLs littérales. Les routes sensibles vérifient l’accès côté serveur et dans les politiques de données. Les préfixes de langue du portail seront harmonisés lors du choix d’origine ; une URL canonique unique évitera les doublons `/admin` et `/fr/admin`.

## Compatibilité et déplacement

| Ancien chemin                                       | Cible recommandée                                                 | Traitement prévu                                                                                |
| --------------------------------------------------- | ----------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `/:locale/studio/…`                                 | `/:locale/studios/…`                                              | Correspondance explicite de chaque route, pas un remplacement aveugle de chaîne                 |
| `/:locale/studio/pricing/`                          | `/:locale/studios/packages/`                                      | Packages inchangés pendant l’import ; prix validés séparément                                   |
| `/:locale/studio/packs/[slug]/`                     | `/:locale/studios/packages/[slug]/`                               | Slugs conservés                                                                                 |
| `/:locale/academy/dashboard/`                       | Portail `/dashboard/learning/`                                    | Page-pont et explication de l’aperçu local ; aucune réussite certifiée importée automatiquement |
| `/:locale/academy/learn/[slug]/`                    | Aperçu conservé, ou player selon inscription                      | Ne jamais laisser un ancien export contenant des leçons payantes                                |
| `/:locale/admin/`                                   | Portail `/admin/`                                                 | Pont de compatibilité vers l’origine choisie                                                    |
| `/:locale/labs/…`                                   | Anciennes pages conservées ; nouvelle entrée `/:locale/products/` | Maintenir recherche/IA/contact Labs ; canonical choisi page par page                            |
| `/:locale/#solutions`, `#portfolio`, `#brief`, etc. | Page cible ou ancre de compatibilité pertinente                   | Inventorier les liens entrants avant de retirer les ancres                                      |
| Projets, cours et articles existants                | Même slug et contenu conservé                                     | Table de correspondance stable pendant la migration                                             |
| URLs Management/Kuma/Obtura/Garant                  | Liens existants                                                   | Aucun déplacement dans ce dépôt de leurs produits ni comptes                                    |

GitHub Pages ne fournit pas les redirections serveur d’un hébergement applicatif. Pendant cette étape : conserver des pages-ponts HTML explicites et navigables, avec canonical, éventuellement un remplacement client. Ne pas annoncer des « 301 » qui n’existent pas. Pour de vrais 301, prévoir un proxy ou un hébergement adapté après décision. Toute URL dynamique de certificat inconnue au build appartient au portail serveur ; aucun contournement par une fausse page 404 globale n’est retenu.

## Indexation

Sitemaps publics : maison, projets Agency publiés, cours publiés, articles publiés, événements à venir et pages Studios. Génération à partir des seules versions publiques ; mise à jour au déploiement sur la vitrine statique. `hreflang` seulement si une traduction réelle existe. Canonicals absolus cohérents avec basePath et domaine.

Exclure admin, compte, checkout, factures, résultats et contenus pédagogiques protégés. La page de vérification de certificat est `noindex` par défaut. Conserver les routes archivées utiles avec leur politique explicite : restauration, redirection vers un remplacement réel ou 410 sur l’hébergement capable de l’émettre.
