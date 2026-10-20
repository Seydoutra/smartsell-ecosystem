export type TeachingBlock = {
  type: string;
  text?: string;
  title?: string;
  level?: number;
  rows?: string[][];
};
export type TeachingMoment = {
  kind: 'explain' | 'example' | 'question' | 'practice';
  title: string;
  speech: string;
  material?: TeachingBlock;
  question?: number;
  analogy?: string;
  example?: TeachingBlock;
};
// Keep every source paragraph, but pace it into short spoken turns instead of a document page.
export function teachingMoments(
  blocks: TeachingBlock[],
  questionCount: number,
): TeachingMoment[] {
  const turns: TeachingMoment[] = [
    {
      kind: 'explain',
      title: 'Prenez place, on commence.',
      speech:
        'Installez-vous. Nous allons avancer ensemble, une idée à la fois. Je vous explique, nous regardons un exemple, puis c’est à vous d’essayer. Prenez le temps de comprendre : le quiz de cette séance débloquera le module suivant.',
    },
  ];
  let title = 'On commence ensemble';
  for (const [blockIndex, block] of blocks.entries()) {
    if (block.type === 'heading') {
      title = block.text || title;
      continue;
    }
    if (block.type === 'table' || block.type === 'prompt') {
      turns.push({
        kind: 'example',
        title,
        speech:
          block.type === 'prompt'
            ? 'Passons à une consigne concrète. Dépliez le prompt sur le tableau. Remplacez les éléments entre crochets par votre projet, puis observez ce que chaque contrainte impose.'
            : 'Regardons cet exemple ensemble. Le tableau relie les idées que nous venons de voir. Parcourez ses éléments, puis expliquez-vous ce qui changerait pour votre propre film.',
        material: block,
      });
      continue;
    }
    const text = block.text?.trim();
    if (!text) continue;
    // Explanations and examples belong to their section, never an unrelated chapter.
    let start = blockIndex - 1;
    while (start >= 0 && blocks[start].type !== 'heading') start--;
    const nextHeading = blocks.findIndex(
      (b, i) => i > blockIndex && b.type === 'heading',
    );
    const section = blocks.slice(
      Math.max(0, start),
      nextHeading < 0 ? blocks.length : nextHeading,
    );
    const analogy = section.find(
      (b) => b.type === 'callout' && b.title?.includes('ENFANT'),
    )?.text;
    const example = section.find(
      (b) => b.type === 'table' || b.type === 'prompt',
    );
    const sentences = text.match(/[^.!?]+[.!?]+(?:[»”])?|[^.!?]+$/g) || [text];
    let piece = '';
    const append = () => {
      if (piece.trim())
        turns.push({
          kind: 'explain',
          title:
            block.title === 'CE QUE TU SAURAS FAIRE À LA FIN'
              ? 'Voici votre objectif'
              : block.title?.includes('ENFANT')
                ? 'Prenons une comparaison'
                : block.title === 'À RETENIR'
                  ? 'Gardez cette idée'
                  : block.title === 'ATTENTION'
                    ? 'Le point à surveiller'
                    : block.title || title,
          speech: piece.trim(),
          analogy: analogy === text ? undefined : analogy,
          example,
        });
      piece = '';
    };
    for (const sentence of sentences) {
      if (piece.length + sentence.length > 650 && piece) append();
      piece += sentence;
    }
    append();
  }
  const questionPositions = new Map<number, number>();
  if (questionCount)
    [
      ...new Set([
        0,
        Math.min(1, questionCount - 1),
        Math.min(4, questionCount - 1),
      ]),
    ].forEach((q, i, questions) =>
      questionPositions.set(
        Math.max(0, Math.ceil((turns.length * (i + 1)) / questions.length) - 1),
        q,
      ),
    );
  const result: TeachingMoment[] = [];
  turns.forEach((turn, i) => {
    result.push(turn);
    if (questionPositions.has(i))
      result.push({
        kind: 'question',
        title: 'À votre tour',
        speech:
          'Faisons une pause. Choisissez la réponse qui vous paraît juste. Je vous expliquerai le raisonnement avant que nous poursuivions.',
        question: questionPositions.get(i),
      });
  });
  result.push({
    kind: 'practice',
    title: 'Maintenant, faites-le vivre',
    speech:
      'Vous avez les repères. Passez maintenant à la manipulation : testez les réglages, comparez les résultats et notez votre décision dans votre carnet. Ensuite, le quiz du module vérifiera ce que vous avez retenu.',
  });
  return result;
}
