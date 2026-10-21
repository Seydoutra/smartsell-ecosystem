import test from 'node:test';
import assert from 'node:assert/strict';
import {
  initial,
  restore,
  trainingReady,
} from '../packages/ui/src/platform/film-game-model';
test('Training challenges require their intended result and do not accept the initial scene', () => {
  const solutions = [
    { order: [0, 1, 2, 3, 4, 5, 6, 7] },
    { actions: 1, close: true, duration: 4 },
    { look: 'indigo', light: 'morning', landmark: true },
    { cameraPosition: 65 },
    { ratio: '9:16', position: 50 },
    { camera: true, endChecked: true },
    { voice: 70, music: 20, ambience: 30, foley: 25 },
    { warmth: 30, exposure: 100 },
    { pack: ['master', 'vertical', 'subtitles', 'licences', 'archive'] },
    { order: [0, 1, 2, 3, 4, 5, 6, 7] },
    { repairs: [0, 1, 2, 3, 4] },
  ];
  solutions.forEach((solution, index) => {
    assert.equal(trainingReady(index, initial()), false);
    assert.equal(trainingReady(index, { ...initial(), ...solution }), true);
  });
  assert.equal(
    trainingReady(5, {
      ...initial(),
      camera: true,
      person: true,
      endChecked: true,
    }),
    false,
  );
  assert.equal(
    trainingReady(8, {
      ...initial(),
      ...solutions[8],
      pack: [...solutions[8].pack!, 'unlicensed'],
    }),
    false,
  );
  assert.equal(trainingReady(99, initial()), false);
});
test('Saved scene restoration rejects malformed values without executable state', () => {
  const clean = restore({
    duration: NaN,
    voice: -1,
    exposure: 999,
    close: 'yes',
    order: [0, 0, 1, 99, '2'],
    repairs: [-1, 0],
    pack: ['master', 'evil', {}, 'vertical'],
    look: 'x'.repeat(50),
  });
  assert.equal(clean.duration, 8);
  assert.equal(clean.voice, 20);
  assert.equal(clean.exposure, 140);
  assert.equal(clean.close, false);
  assert.equal(clean.look, 'red');
  assert.deepEqual(clean.order, [0, 1]);
  assert.deepEqual(clean.repairs, [0]);
  assert.deepEqual(clean.pack, ['master', 'vertical']);
  assert.deepEqual(restore(null), initial());
});
