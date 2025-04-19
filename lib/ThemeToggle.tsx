'use client'

import { useAtom } from 'jotai';
import { syncedThemeAtom } from '@/atoms/themeAtom';
import {RiMoonFill, RiSunFill} from "@remixicon/react";

export default function ThemeToggle() {
    const [theme, setTheme] = useAtom(syncedThemeAtom);

    return (
        <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="align-middle">
            {theme !== 'dark' ? <RiMoonFill /> : <RiSunFill />}
        </button>
    );
}
