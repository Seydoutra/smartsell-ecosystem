import { t } from '@smartsell/routing';

/*
 * Schéma de l'espace d'administration : un module par site, des
 * collections par module, des champs par collection. Les champs « i18n »
 * se remplissent en français et en anglais côte à côte.
 */

export type FieldType =
  | 'text'
  | 'textarea'
  | 'list'
  | 'number'
  | 'url'
  | 'bool'
  | 'select'
  | 'image'
  | 'images'
  | 'video'
  | 'group';

export type Field = {
  key: string;
  label: string;
  type: FieldType;
  i18n?: boolean;
  long?: boolean;
  options?: string[];
  fields?: Field[];
  hint?: string;
};

export type Collection = {
  id: string;
  label: string;
  singular: string;
  titleKey: string;
  subKey?: string;
  imageKey?: string;
  videoKey?: string;
  fields: Field[];
};

export type Module = {
  id: 'agency' | 'academy' | 'media' | 'studio' | 'labs';
  name: string;
  tagline: string;
  collections: Collection[];
};

const slug: Field = {
  key: 'slug',
  label: t('Identifiant (URL)', 'Identifier (URL)'),
  type: 'text',
  hint: t(
    'minuscules et tirets, ex. mon-projet',
    'lowercase and hyphens, e.g. my-project',
  ),
};

export const modules: Module[] = [
  {
    id: 'agency',
    name: 'Agency',
    tagline: t(
      'Expertises, portfolio et clients',
      'Services, portfolio and clients',
    ),
    collections: [
      {
        id: 'services',
        label: t('Expertises', 'Services'),
        singular: t('une expertise', 'a service'),
        titleKey: 'title',
        subKey: 'copy',
        fields: [
          slug,
          { key: 'title', label: t('Nom', 'Name'), type: 'text', i18n: true },
          {
            key: 'copy',
            label: t('Description', 'Description'),
            type: 'textarea',
            i18n: true,
          },
          {
            key: 'items',
            label: t('Livrables', 'Deliverables'),
            type: 'list',
            i18n: true,
          },
        ],
      },
      {
        id: 'brands',
        label: t('Identités de marque', 'Brand identities'),
        singular: t('une identité', 'an identity'),
        titleKey: 'name',
        subKey: 'sector',
        imageKey: 'pages',
        fields: [
          slug,
          { key: 'name', label: t('Marque', 'Brand'), type: 'text' },
          {
            key: 'sector',
            label: t('Secteur', 'Sector'),
            type: 'text',
            i18n: true,
          },
          {
            key: 'summary',
            label: t('Résumé', 'Summary'),
            type: 'textarea',
            i18n: true,
          },
          {
            key: 'deliverables',
            label: t('Livrables', 'Deliverables'),
            type: 'list',
            i18n: true,
          },
          {
            key: 'pages',
            label: t('Pages du brandbook', 'Brandbook pages'),
            type: 'images',
          },
        ],
      },
      {
        id: 'websites',
        label: t('Sites web', 'Websites'),
        singular: t('un site', 'a website'),
        titleKey: 'name',
        subKey: 'sector',
        imageKey: 'shot',
        fields: [
          slug,
          { key: 'name', label: t('Nom', 'Name'), type: 'text', i18n: true },
          {
            key: 'sector',
            label: t('Secteur', 'Sector'),
            type: 'text',
            i18n: true,
          },
          {
            key: 'url',
            label: t('Adresse du site', 'Site address'),
            type: 'url',
          },
          { key: 'shot', label: t('Capture', 'Screenshot'), type: 'image' },
        ],
      },
      {
        id: 'clients',
        label: 'Clients',
        singular: t('un client', 'a client'),
        titleKey: 'name',
        fields: [
          {
            key: 'name',
            label: t('Nom du client', 'Client name'),
            type: 'text',
          },
        ],
      },
      {
        id: 'series',
        label: t('Séries photo', 'Photo series'),
        singular: t('une série', 'a series'),
        titleKey: 'title',
        subKey: 'copy',
        imageKey: 'photos',
        fields: [
          slug,
          {
            key: 'title',
            label: t('Titre', 'Title'),
            type: 'text',
            i18n: true,
          },
          {
            key: 'copy',
            label: t('Description', 'Description'),
            type: 'textarea',
            i18n: true,
          },
          { key: 'photos', label: t('Photos', 'Photos'), type: 'images' },
        ],
      },
    ],
  },
  {
    id: 'academy',
    name: 'Academy',
    tagline: t('Modules et offres entreprises', 'Courses and company offers'),
    collections: [
      {
        id: 'courses',
        label: t('Modules', 'Courses'),
        singular: t('un module', 'a course'),
        titleKey: 'title',
        subKey: 'format',
        imageKey: 'photo',
        fields: [
          slug,
          {
            key: 'title',
            label: t('Titre', 'Title'),
            type: 'text',
            i18n: true,
          },
          {
            key: 'category',
            label: t('Thème', 'Topic'),
            type: 'text',
            i18n: true,
          },
          {
            key: 'track',
            label: t('Parcours', 'Track'),
            type: 'text',
            i18n: true,
          },
          {
            key: 'level',
            label: t('Niveau', 'Level'),
            type: 'text',
            i18n: true,
          },
          {
            key: 'format',
            label: t('Format', 'Format'),
            type: 'text',
            i18n: true,
          },
          { key: 'hours', label: t('Heures', 'Hours'), type: 'number' },
          {
            key: 'goal',
            label: t('Objectif', 'Goal'),
            type: 'textarea',
            i18n: true,
          },
          {
            key: 'why',
            label: t('Pourquoi ce module', 'Why this course'),
            type: 'textarea',
            i18n: true,
          },
          {
            key: 'project',
            label: t('Projet final', 'Final project'),
            type: 'textarea',
            i18n: true,
          },
          {
            key: 'program',
            label: t('Programme', 'Programme'),
            type: 'list',
            i18n: true,
          },
          {
            key: 'outcomes',
            label: t('À l’issue', 'Outcomes'),
            type: 'list',
            i18n: true,
          },
          { key: 'photo', label: 'Photo', type: 'image' },
          {
            key: 'lessons',
            label: t('Leçons avec quiz', 'Lessons with quiz'),
            type: 'group',
            fields: [
              {
                key: 'title',
                label: t('Titre', 'Title'),
                type: 'text',
                i18n: true,
              },
              {
                key: 'copy',
                label: t('Contenu', 'Content'),
                type: 'textarea',
                i18n: true,
              },
              {
                key: 'exercise',
                label: t('Exercice', 'Exercise'),
                type: 'textarea',
                i18n: true,
              },
              { key: 'question', label: 'Question', type: 'text', i18n: true },
              {
                key: 'options',
                label: t('Réponses proposées', 'Answer options'),
                type: 'list',
                i18n: true,
              },
              {
                key: 'answer',
                label: t(
                  'Bonne réponse (n°, à partir de 0)',
                  'Correct answer (index, from 0)',
                ),
                type: 'number',
              },
            ],
          },
        ],
      },
      {
        id: 'offers',
        label: t('Offres entreprises', 'Company offers'),
        singular: t('une offre', 'an offer'),
        titleKey: 'title',
        subKey: 'format',
        imageKey: 'photo',
        fields: [
          slug,
          {
            key: 'title',
            label: t('Titre', 'Title'),
            type: 'text',
            i18n: true,
          },
          {
            key: 'format',
            label: t('Format', 'Format'),
            type: 'text',
            i18n: true,
          },
          {
            key: 'copy',
            label: t('Description', 'Description'),
            type: 'textarea',
            i18n: true,
          },
          { key: 'photo', label: 'Photo', type: 'image' },
        ],
      },
    ],
  },
  {
    id: 'media',
    name: 'Media',
    tagline: t('Vidéos et articles', 'Videos and articles'),
    collections: [
      {
        id: 'films',
        label: t('Vidéos', 'Videos'),
        singular: t('une vidéo', 'a video'),
        titleKey: 'title',
        subKey: 'kind',
        videoKey: 'clip',
        fields: [
          slug,
          {
            key: 'title',
            label: t('Titre', 'Title'),
            type: 'text',
            i18n: true,
          },
          {
            key: 'kind',
            label: t('Catégorie', 'Category'),
            type: 'text',
            i18n: true,
          },
          {
            key: 'clip',
            label: t('Fichier vidéo', 'Video file'),
            type: 'video',
          },
          {
            key: 'vertical',
            label: t('Format vertical', 'Vertical format'),
            type: 'bool',
          },
        ],
      },
      {
        id: 'articles',
        label: 'Articles',
        singular: t('un article', 'an article'),
        titleKey: 'title',
        subKey: 'category',
        fields: [
          slug,
          {
            key: 'title',
            label: t('Titre', 'Title'),
            type: 'text',
            i18n: true,
          },
          {
            key: 'category',
            label: t('Rubrique', 'Section'),
            type: 'text',
            i18n: true,
          },
          {
            key: 'summary',
            label: t('Chapô', 'Summary'),
            type: 'textarea',
            i18n: true,
          },
          {
            key: 'minutes',
            label: t('Minutes de lecture', 'Reading minutes'),
            type: 'number',
          },
          {
            key: 'paragraphs',
            label: t('Paragraphes', 'Paragraphs'),
            type: 'list',
            i18n: true,
            long: true,
          },
        ],
      },
    ],
  },
  {
    id: 'studio',
    name: 'Studios',
    tagline: t('Plateaux et formules', 'Sets and packages'),
    collections: [
      {
        id: 'spaces',
        label: t('Plateaux', 'Sets'),
        singular: t('un plateau', 'a set'),
        titleKey: 'title',
        subKey: 'use',
        fields: [
          slug,
          { key: 'title', label: t('Nom', 'Name'), type: 'text', i18n: true },
          {
            key: 'copy',
            label: t('Description', 'Description'),
            type: 'textarea',
            i18n: true,
          },
          { key: 'use', label: t('Usages', 'Uses'), type: 'text', i18n: true },
          {
            key: 'equipment',
            label: t('Équipement', 'Equipment'),
            type: 'list',
            i18n: true,
          },
        ],
      },
      {
        id: 'packs',
        label: t('Formules', 'Packages'),
        singular: t('une formule', 'a package'),
        titleKey: 'title',
        subKey: 'family',
        fields: [
          slug,
          {
            key: 'family',
            label: t('Famille', 'Family'),
            type: 'select',
            options: ['podcast', 'shooting'],
          },
          { key: 'title', label: t('Nom', 'Name'), type: 'text', i18n: true },
          {
            key: 'space',
            label: t('Plateau', 'Set'),
            type: 'select',
            options: ['podcast', 'photo', 'video'],
          },
          {
            key: 'duration',
            label: t('Durée (h)', 'Duration (h)'),
            type: 'number',
          },
          {
            key: 'best',
            label: t(
              'Mise en avant « Meilleure option »',
              'Highlight as “Best option”',
            ),
            type: 'bool',
          },
          {
            key: 'copy',
            label: t('Description', 'Description'),
            type: 'textarea',
            i18n: true,
          },
          {
            key: 'includes',
            label: t('Inclus', 'Included'),
            type: 'list',
            i18n: true,
          },
          {
            key: 'deliverable',
            label: t('Livrable', 'Deliverable'),
            type: 'textarea',
            i18n: true,
          },
        ],
      },
    ],
  },
  {
    id: 'labs',
    name: t('Produits', 'Products'),
    tagline: t('Produits et solutions', 'Products and solutions'),
    collections: [
      {
        id: 'products',
        label: t('Produits', 'Products'),
        singular: t('un produit', 'a product'),
        titleKey: 'name',
        subKey: 'status',
        imageKey: 'shots',
        fields: [
          slug,
          { key: 'name', label: t('Nom', 'Name'), type: 'text' },
          {
            key: 'status',
            label: t('Statut', 'Status'),
            type: 'text',
            i18n: true,
          },
          {
            key: 'tagline',
            label: t('Accroche', 'Tagline'),
            type: 'text',
            i18n: true,
          },
          {
            key: 'pitch',
            label: t('Présentation', 'Pitch'),
            type: 'textarea',
            i18n: true,
          },
          {
            key: 'url',
            label: t('Adresse du produit', 'Product address'),
            type: 'url',
          },
          {
            key: 'cta',
            label: t('Texte du bouton', 'Button label'),
            type: 'text',
            i18n: true,
          },
          { key: 'shots', label: t('Captures', 'Screenshots'), type: 'images' },
          {
            key: 'audiences',
            label: t('Avantages par cible', 'Benefits by audience'),
            type: 'group',
            fields: [
              {
                key: 'who',
                label: t('Cible', 'Audience'),
                type: 'text',
                i18n: true,
              },
              {
                key: 'gain',
                label: t('Avantage', 'Benefit'),
                type: 'text',
                i18n: true,
              },
            ],
          },
        ],
      },
    ],
  },
];
