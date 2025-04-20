'use client'

import { useEffect } from 'react';
import { useSetAtom } from 'jotai';
import { syncedThemeAtom } from '@/atoms/themeAtom';

export function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const setTheme = useSetAtom(syncedThemeAtom);

  useEffect(() => {
    const stored = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const resolved = stored ?? (prefersDark ? 'dark' : 'light');

    setTheme(resolved);
  }, [setTheme]);


  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      const href = link?.getAttribute('href');

      if (href && /^https?:\/\//.test(href)) {
        const ok = window.confirm(
            '외부 사이트로 이동합니다.\n피싱사이트 확인을 위해 URL을 다시 한번 확인해주세요.\n이동하시겠습니까?'
        );
        if (!ok) e.preventDefault();
      }
    };

    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  return <>{children}</>;
}
