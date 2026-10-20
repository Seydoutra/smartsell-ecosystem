import test from 'node:test';
import assert from 'node:assert/strict';
import { productionChecklist } from '../packages/ui/src/platform/film-model';
test('Production checklist excludes the exam grading table and makes forbidden practices explicit', () => {
  const items = productionChecklist([
    {
      type: 'table',
      rows: [
        ['Avant de générer', 'Pendant la génération'],
        ['Bible validée', 'Dernière image contrôlée'],
      ],
    },
    {
      type: 'table',
      rows: [
        ['En finition', 'Jamais'],
        ['Pack archivé', 'Musique sans licence'],
      ],
    },
    {
      type: 'table',
      rows: [
        ['Score', 'Résultat'],
        ['14 à 17', 'Validé'],
      ],
    },
  ]);
  assert.deepEqual(items, [
    'Bible validée',
    'Dernière image contrôlée',
    'Pack archivé',
    'Vérifier l’absence de : Musique sans licence',
  ]);
});
