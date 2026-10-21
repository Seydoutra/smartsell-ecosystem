export type Configuration = {
  order: number[];
  actions: number;
  close: boolean;
  duration: number;
  look: string;
  light: string;
  landmark: boolean;
  cameraPosition: number;
  ratio: string;
  position: number;
  camera: boolean;
  person: boolean;
  endChecked: boolean;
  voice: number;
  music: number;
  ambience: number;
  foley: number;
  warmth: number;
  exposure: number;
  pack: string[];
  repairs: number[];
};
export const initial = (): Configuration => ({
  order: [],
  actions: 2,
  close: false,
  duration: 8,
  look: 'red',
  light: 'night',
  landmark: false,
  cameraPosition: 15,
  ratio: '16:9',
  position: 0,
  camera: false,
  person: false,
  endChecked: false,
  voice: 20,
  music: 90,
  ambience: 60,
  foley: 80,
  warmth: 80,
  exposure: 140,
  pack: ['unlicensed'],
  repairs: [],
});
export function restore(value: unknown): Configuration {
  const base = initial();
  if (!value || typeof value !== 'object') return base;
  for (const key of Object.keys(base) as (keyof Configuration)[]) {
    const v = (value as Record<string, unknown>)[key];
    if (
      typeof base[key] === 'number' &&
      typeof v === 'number' &&
      Number.isFinite(v) &&
      v >= 0 &&
      v <= 180
    )
      (base as any)[key] = v;
    else if (typeof base[key] === 'boolean' && typeof v === 'boolean')
      (base as any)[key] = v;
    else if (
      typeof base[key] === 'string' &&
      typeof v === 'string' &&
      v.length < 20
    )
      (base as any)[key] = v;
  }
  const obj = value as Record<string, unknown>;
  for (const key of ['order', 'repairs'] as const)
    if (Array.isArray(obj[key]))
      base[key] = [
        ...new Set(
          (obj[key] as unknown[]).filter(
            (v): v is number =>
              Number.isInteger(v) && Number(v) >= 0 && Number(v) < 8,
          ),
        ),
      ];
  if (Array.isArray(obj.pack))
    base.pack = (obj.pack as unknown[]).filter(
      (v): v is string =>
        typeof v === 'string' &&
        [
          'master',
          'vertical',
          'subtitles',
          'licences',
          'archive',
          'unlicensed',
        ].includes(v),
    );
  return base;
}
export function trainingReady(index: number, c: Configuration) {
  if (index === 0 || index === 9)
    return c.order.length === 8 && c.order.every((v, i) => v === i);
  if (index === 1) return c.actions === 1 && c.close && c.duration === 4;
  if (index === 2)
    return c.look === 'indigo' && c.light === 'morning' && c.landmark;
  if (index === 3) return c.cameraPosition > 55;
  if (index === 4)
    return c.ratio === '9:16' && c.position >= 45 && c.position <= 55;
  if (index === 5) return c.camera !== c.person && c.endChecked;
  if (index === 6)
    return c.voice >= 60 && c.music <= 30 && c.ambience <= 40 && c.foley <= 40;
  if (index === 7)
    return (
      c.warmth >= 20 && c.warmth <= 45 && c.exposure >= 90 && c.exposure <= 110
    );
  if (index === 8)
    return (
      ['master', 'vertical', 'subtitles', 'licences', 'archive'].every((s) =>
        c.pack.includes(s),
      ) && !c.pack.includes('unlicensed')
    );
  return index === 10 && [0, 1, 2, 3, 4].every((i) => c.repairs.includes(i));
}
