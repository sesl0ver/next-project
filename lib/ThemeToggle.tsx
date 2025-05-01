'use client'

import {useAtom} from 'jotai'
import {themeAtom} from '@/atoms/themeAtom';
import {RiMoonFill, RiSunFill} from "@remixicon/react";
import {useState} from "react";

export default function ThemeToggle({ initialTheme }) {
    const [theme, setTheme] = useAtom(themeAtom);
    const [value, setValue] = useState(0);
    const next = theme === 'dark' ? '' : 'dark';
    const toggleTheme = () => {
        setValue(c => c + 1);
        setTheme(next);
    }
    return (
        <button onClick={toggleTheme} className="align-middle">
            {
                ((value === 0) ? (initialTheme !== 'dark') : (theme !== 'dark')) ?
                                            <RiMoonFill size={18} /> : <RiSunFill size={18} />
            }
        </button>
    )
}