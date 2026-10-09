'use client';
import { usePathname } from 'next/navigation';
import { GlobalNavigation } from '@smartsell/ui';
import { isVertical } from '@smartsell/routing';
export function MainNavigation() {
  const segment = usePathname().split('/')[2];
  return (
    <GlobalNavigation
      active={segment && isVertical(segment) ? segment : undefined}
    />
  );
}
