import type { Course } from '@smartsell/content/academy';

export type LearningProgress = Record<string, number[]>;

export function courseProgress(course: Course, progress: LearningProgress) {
  const total = course.lessons.length;
  const completed = [...new Set(progress[course.slug] || [])].filter(
    (index) => Number.isInteger(index) && index >= 0 && index < total,
  );
  const done = completed.length;
  const finished = total > 0 && done === total;
  return {
    total,
    done,
    percent: total ? Math.round((done / total) * 100) : 0,
    finished,
    next: finished
      ? 0
      : Math.max(
          0,
          course.lessons.findIndex((_, i) => !completed.includes(i)),
        ),
  };
}

export function learningSummary(catalog: Course[], progress: LearningProgress) {
  const enrolled = catalog.filter((course) =>
    Object.hasOwn(progress, course.slug),
  );
  const states = enrolled.map((course) => courseProgress(course, progress));
  const done = states.reduce((sum, state) => sum + state.done, 0);
  const total = states.reduce((sum, state) => sum + state.total, 0);
  return {
    enrolled,
    completed: states.filter((state) => state.finished).length,
    done,
    total,
    percent: total ? Math.round((done / total) * 100) : 0,
  };
}

export function suggestedCourses(
  catalog: Course[],
  progress: LearningProgress,
  limit = 4,
) {
  const enrolled = catalog.filter((course) =>
    Object.hasOwn(progress, course.slug),
  );
  const score = (course: Course) =>
    enrolled.reduce(
      (total, chosen) =>
        total +
        (chosen.category === course.category ? 3 : 0) +
        (chosen.track === course.track ? 1 : 0),
      0,
    );
  return catalog
    .filter((course) => !Object.hasOwn(progress, course.slug))
    .map((course, index) => ({ course, index, score: score(course) }))
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .slice(0, Math.max(0, limit))
    .map(({ course }) => course);
}

const searchable = (text: string) =>
  text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
export function matchesCourse(course: Course, query: string, track = '') {
  return (
    (!track || course.track === track) &&
    searchable(
      `${course.title} ${course.goal} ${course.category} ${course.track} ${course.level}`,
    ).includes(searchable(query.trim()))
  );
}

export function resumeLesson(
  course: Course,
  progress: LearningProgress,
  requested: string | null,
) {
  if (requested && /^[1-9][0-9]*$/.test(requested)) {
    const index = Number(requested) - 1;
    if (Number.isSafeInteger(index) && index < course.lessons.length)
      return index;
  }
  return courseProgress(course, progress).next;
}
