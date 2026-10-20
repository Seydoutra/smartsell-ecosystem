export function productionChecklist(
  blocks: { type: string; rows?: string[][] }[],
) {
  return blocks
    .filter(
      (block) =>
        block.type === 'table' &&
        ['Avant de générer', 'En finition'].includes(
          block.rows?.[0]?.[0] || '',
        ),
    )
    .flatMap((block) =>
      block
        .rows!.slice(1)
        .flatMap((row) =>
          row.map((item, column) =>
            block.rows![0][column] === 'Jamais'
              ? `Vérifier l’absence de : ${item}`
              : item,
          ),
        ),
    );
}
