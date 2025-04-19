import { atom } from 'jotai';

// 기본값은 'light'로 설정 (SSR 안전)
export const themeAtom = atom<'light' | 'dark'>('light');

// 클라이언트에서 테마를 동기화하는 atom
export const syncedThemeAtom = atom(
    (get) => get(themeAtom),
    (get, set, newTheme: 'light' | 'dark') => {
        set(themeAtom, newTheme);

        if (typeof window !== 'undefined') {
            localStorage.setItem('theme', newTheme);

            if (newTheme === 'dark') {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        }
    }
);