import { courses, packs } from '@smartsell/content/sites';
export type Progress = Record<string, number[]>;
export function parseProgress(raw: string): Progress {
  try {
    const data = JSON.parse(raw);
    if (!data || typeof data !== 'object' || Array.isArray(data)) return {};
    return Object.fromEntries(
      courses
        .filter((c) => Array.isArray(data[c.slug]))
        .map((c) => [
          c.slug,
          [
            ...new Set<number>(
              data[c.slug].filter(
                (n: unknown) =>
                  Number.isInteger(n) &&
                  Number(n) >= 0 &&
                  Number(n) < c.lessons.length,
              ),
            ),
          ],
        ]),
    );
  } catch {
    return {};
  }
}
export const bookingOptions = [
  'Montage',
  'Sous-titres',
  'Direction créative',
  'Formats réseaux sociaux',
  'Sélection accompagnée',
  'Préparation du conducteur',
];
export function sessionError(
  date: string,
  time: string,
  duration: number,
  today: string,
): string {
  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
    !Number.isFinite(Date.parse(date + 'T00:00:00Z')) ||
    new Date(date + 'T00:00:00Z').toISOString().slice(0, 10) !== date ||
    date < today
  )
    return 'Choisissez aujourd’hui ou une date future.';
  if (
    !/^(09|1[0-6]):00$/.test(time) ||
    !Number.isInteger(duration) ||
    duration < 2 ||
    duration > 6 ||
    Number(time.slice(0, 2)) + duration > 18
  )
    return 'La session doit se terminer avant 18 h dans ce calendrier de démonstration.';
  return '';
}
export type BookingDemo = {
  reference: string;
  pack: string;
  date: string;
  time: string;
  duration: number;
  addons: string[];
};
export function parseBooking(raw: string): BookingDemo | null {
  try {
    const data = JSON.parse(raw);
    const pack = packs.find((p) => p.slug === data?.pack);
    if (
      !pack ||
      typeof data.reference !== 'string' ||
      !/^DEMO-[A-Z0-9]+$/.test(data.reference) ||
      typeof data.date !== 'string' ||
      typeof data.time !== 'string' ||
      data.duration < pack.duration ||
      sessionError(data.date, data.time, data.duration, '0000-01-01')
    )
      return null;
    return {
      reference: data.reference,
      pack: pack.slug,
      date: data.date,
      time: data.time,
      duration: data.duration,
      addons: Array.isArray(data.addons)
        ? data.addons.filter(
            (v: unknown) => typeof v === 'string' && bookingOptions.includes(v),
          )
        : [],
    };
  } catch {
    return null;
  }
}
