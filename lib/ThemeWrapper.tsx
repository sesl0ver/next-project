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

  return <>{children}</>;
}
