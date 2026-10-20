import test from 'node:test';
import assert from 'node:assert/strict';
import {
  teachingMoments,
  type TeachingBlock,
} from '../packages/ui/src/platform/teaching-model';

test('Guided teaching retains source explanations and examples and keeps alternate explanations within their section', () => {
  const table: TeachingBlock = {
    type: 'table',
    rows: [
      ['Stage', 'Time'],
      ['Prepare', '25%'],
    ],
  };
  const prompt: TeachingBlock = {
    type: 'prompt',
    title: 'Your prompt',
    text: 'A character [action]',
  };
  const blocks: TeachingBlock[] = [
    { type: 'heading', text: 'Preparation' },
    { type: 'text', text: 'Prepare your film before generating.' },
    {
      type: 'callout',
      title: 'EXPLIQUE-MOI COMME À UN ENFANT',
      text: 'Think of a chef preparing ingredients.',
    },
    table,
    { type: 'heading', text: 'Sound' },
    { type: 'text', text: 'Layer sounds for depth.' },
    prompt,
  ];
  const moments = teachingMoments(blocks, 10);
  for (const block of blocks.filter(
    (b) => b.text && b.type !== 'heading' && b.type !== 'prompt',
  ))
    assert(moments.some((m) => m.speech === block.text));
  assert.deepEqual(
    moments.filter((m) => m.material).map((m) => m.material),
    [table, prompt],
  );
  assert.equal(
    moments.find((m) => m.speech === 'Prepare your film before generating.')
      ?.analogy,
    'Think of a chef preparing ingredients.',
  );
  assert.equal(
    moments.find((m) => m.speech === 'Layer sounds for depth.')?.analogy,
    undefined,
  );
  assert.equal(
    moments.find((m) => m.speech === 'Layer sounds for depth.')?.example,
    prompt,
  );
  assert.equal(moments.filter((m) => m.kind === 'question').length, 3);
  assert.equal(moments.at(-1)?.kind, 'practice');
});

test('Teaching turns split long paragraphs without dropping sentences, and handle small or empty assessments', () => {
  const text = Array.from(
    { length: 20 },
    (_, i) => `Sentence ${i} explains a practical idea.`,
  ).join(' ');
  const turns = teachingMoments([{ type: 'text', text }], 0).slice(1, -1);
  assert(turns.length > 1);
  assert(turns.every((m) => m.speech.length <= 650));
  assert.equal(turns.map((m) => m.speech).join(' '), text);
  assert.equal(
    teachingMoments([], 0).filter((m) => m.kind === 'question').length,
    0,
  );
  assert(
    teachingMoments([{ type: 'text', text: 'One idea.' }], 1)
      .filter((m) => m.kind === 'question')
      .every((m) => m.question === 0),
  );
});
