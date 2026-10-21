import {
  attestationReference,
  attestationTitle,
  attestationUrl,
  type Attestation,
} from './attestation-model';
export type CertificateAssets = {
  regular: Uint8Array;
  bold: Uint8Array;
  brand: Uint8Array;
};
export async function makeAttestationPdf(
  record: Attestation,
  assets: CertificateAssets,
  specimen = false,
) {
  if (!attestationReference(record.id) || record.revoked_at)
    throw Error('Invalid or revoked attestation');
  const [
    {
      PDFDocument,
      rgb,
      PDFName,
      PDFString,
      pushGraphicsState,
      popGraphicsState,
      rectangle,
      clip,
      endPath,
    },
    fontkit,
    QRCode,
  ] = await Promise.all([
    import('pdf-lib'),
    import('@pdf-lib/fontkit'),
    import('qrcode'),
  ]);
  const pdf = await PDFDocument.create();
  pdf.registerFontkit(fontkit.default);
  pdf.setTitle(
    specimen
      ? 'Spécimen - Attestation Smartsell Academy'
      : 'Attestation de participation - Smartsell Academy',
  );
  pdf.setAuthor('Smartsell Academy');
  pdf.setLanguage('fr-FR');
  const regular = await pdf.embedFont(assets.regular, { subset: true }),
    bold = await pdf.embedFont(assets.bold, { subset: true });
  const page = pdf.addPage([841.89, 595.28]);
  const ink = rgb(0.17, 0.1, 0.23),
    purple = rgb(0.41, 0.17, 0.52),
    muted = rgb(0.47, 0.4, 0.51),
    gold = rgb(0.94, 0.88, 0.21),
    cream = rgb(0.987, 0.977, 0.96);
  page.drawRectangle({ x: 0, y: 0, width: 842, height: 596, color: cream });
  page.drawRectangle({ x: 0, y: 0, width: 17, height: 596, color: purple });
  page.drawRectangle({
    x: 32,
    y: 30,
    width: 778,
    height: 535,
    borderColor: rgb(0.78, 0.7, 0.81),
    borderWidth: 0.7,
  });
  page.drawRectangle({
    x: 40,
    y: 38,
    width: 762,
    height: 519,
    borderColor: rgb(0.9, 0.86, 0.91),
    borderWidth: 0.5,
  });
  page.drawRectangle({ x: 17, y: 530, width: 8, height: 65, color: gold });
  const brand = await pdf.embedPng(assets.brand);
  page.pushOperators(
    pushGraphicsState(),
    rectangle(60, 478, 220, 55),
    clip(),
    endPath(),
  );
  page.drawImage(brand, { x: 41.7, y: 367.5, width: 272, height: 272 });
  page.pushOperators(popGraphicsState());
  const draw = (
    text: string,
    x: number,
    y: number,
    size: number,
    font = regular,
    color = ink,
  ) => page.drawText(text, { x, y, size, font, color });
  draw('ACADEMY / FORMATION COMPLÈTE', 520, 502, 9, bold, purple);
  draw('APPRENDRE. CRÉER. AVANCER.', 65, 442, 9, bold, muted);
  draw('Attestation de', 62, 382, 39, regular, ink);
  draw('participation', 62, 330, 48, bold, purple);
  draw('Smartsell Academy atteste que', 65, 292, 11, regular, muted);
  let nameSize = 31;
  while (
    bold.widthOfTextAtSize(record.learner_name, nameSize) > 655 &&
    nameSize > 12
  )
    nameSize -= 0.5;
  draw(record.learner_name, 63, 248, nameSize, bold, ink);
  page.drawLine({
    start: { x: 65, y: 235 },
    end: { x: 740, y: 235 },
    thickness: 0.6,
    color: rgb(0.78, 0.7, 0.81),
  });
  draw(
    'a participé à la formation complète et validé le parcours requis :',
    65,
    213,
    10,
    regular,
    muted,
  );
  const title = attestationTitle(record),
    words = title.split(/\s+/);
  let line = '',
    y = 180;
  for (const word of words) {
    if (bold.widthOfTextAtSize((line + ' ' + word).trim(), 19) > 620 && line) {
      draw(line, 65, y, 19, bold, purple);
      y -= 25;
      line = word;
    } else line = (line + ' ' + word).trim();
  }
  if (line) draw(line, 65, y, 19, bold, purple);
  const date = new Intl.DateTimeFormat('fr-FR', {
    dateStyle: 'long',
    timeZone: 'UTC',
  }).format(new Date(record.issued_at));
  draw(`Émise le ${date}`, 65, 111, 10, regular, ink);
  draw('SMARTSELL ACADEMY', 65, 89, 11, bold, purple);
  draw('Équipe pédagogique', 65, 73, 9, regular, muted);
  draw(
    specimen
      ? 'DÉMONSTRATION - AUCUNE ATTESTATION ÉMISE'
      : `Référence : SSA-${record.id}`,
    65,
    52,
    7,
    regular,
    muted,
  );
  const url = attestationUrl(record.id),
    qr = QRCode.create(url, { errorCorrectionLevel: 'M' }),
    size = 82,
    unit = size / (qr.modules.size + 8),
    x = 690,
    baseY = 70;
  page.drawRectangle({
    x: x - 4,
    y: baseY - 4,
    width: size + 8,
    height: size + 8,
    color: rgb(1, 1, 1),
  });
  for (let row = 0; row < qr.modules.size; row++)
    for (let col = 0; col < qr.modules.size; col++)
      if (qr.modules.get(row, col))
        page.drawRectangle({
          x: x + (col + 4) * unit,
          y: baseY + size - (row + 5) * unit,
          width: unit + 0.01,
          height: unit + 0.01,
          color: ink,
        });
  draw('Scannez pour vérifier', 687, 57, 7, regular, purple);
  const link = pdf.context.obj({
    Type: 'Annot',
    Subtype: 'Link',
    Rect: [686, 50, 779, 158],
    Border: [0, 0, 0],
    A: { Type: 'Action', S: 'URI', URI: PDFString.of(url) },
  });
  page.node.set(
    PDFName.of('Annots'),
    pdf.context.obj([pdf.context.register(link)]),
  );
  if (specimen) {
    page.drawRectangle({
      x: 448,
      y: 350,
      width: 326,
      height: 58,
      color: rgb(0.96, 0.89, 0.73),
      borderColor: rgb(0.74, 0.52, 0.14),
      borderWidth: 1,
    });
    draw('SPÉCIMEN - NON VALABLE', 465, 374, 15, bold, rgb(0.56, 0.35, 0.08));
    draw(
      'Le QR code sert uniquement à tester le parcours.',
      465,
      359,
      8,
      regular,
      muted,
    );
  }
  return pdf.save();
}
export async function downloadAttestationPdf(record: Attestation) {
  const { withBasePath } = await import('@smartsell/routing');
  const load = async (path: string) => {
    const r = await fetch(withBasePath(path));
    if (!r.ok) throw Error('PDF asset unavailable');
    return new Uint8Array(await r.arrayBuffer());
  };
  const [regular, bold, brand] = await Promise.all([
    load('/fonts/vera.ttf'),
    load('/fonts/vera-bold.ttf'),
    load('/brand/wordmark-purple.png'),
  ]);
  const bytes = await makeAttestationPdf(record, { regular, bold, brand });
  const url = URL.createObjectURL(
    new Blob([new Uint8Array(bytes)], { type: 'application/pdf' }),
  );
  const a = document.createElement('a');
  a.href = url;
  a.download = `Smartsell-attestation-${record.id}.pdf`;
  a.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 30000);
}
