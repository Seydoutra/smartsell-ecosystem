'use client';
import { useEffect, useState } from 'react';
import { t } from '@smartsell/routing';
import { platform, checked } from './client';
import { useAccount } from './auth';
import type { LearningProgress } from './learning-model';

export function useLearning() {
  const { user } = useAccount();
  const [progress, setProgress] = useState<LearningProgress>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [retry, setRetry] = useState(0);
  useEffect(() => {
    if (!user) return;
    let active = true;
    setLoading(true);
    setError('');
    Promise.all([
      platform()
        .from('academy_enrollments')
        .select('course_slug')
        .eq('user_id', user.id),
      platform()
        .from('academy_progress')
        .select('course_slug,lesson_index')
        .eq('user_id', user.id),
    ])
      .then(async ([enrollments, lessons]) => {
        const e = await checked(enrollments);
        const l = await checked(lessons);
        if (!active) return;
        const next: LearningProgress = Object.fromEntries(
          (e || []).map((row) => [row.course_slug, []]),
        );
        for (const row of l || [])
          next[row.course_slug]?.push(row.lesson_index);
        setProgress(next);
      })
      .catch(() => {
        if (active)
          setError(
            t(
              'Impossible de lire votre progression. Réessayez.',
              'Unable to load your progress. Try again.',
            ),
          );
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [user?.id, retry]);
  return {
    user,
    progress,
    loading,
    error,
    reload: () => setRetry((n) => n + 1),
  };
}

export function LearningError({
  error,
  retry,
}: {
  error: string;
  retry: () => void;
}) {
  return error ? (
    <div className="ss-learner-error" role="alert">
      <p>{error}</p>
      <button className="text-button" onClick={retry}>
        {t('Réessayer', 'Try again')}
      </button>
    </div>
  ) : null;
}
