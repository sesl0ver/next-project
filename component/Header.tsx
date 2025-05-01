import Link from "next/link";
import Navigation from "./Navigation";
import {RiMenuLine, RiSearchLine} from '@remixicon/react';
import { Pacifico } from 'next/font/google';
import ThemeToggle from '@/lib/ThemeToggle';
import LoginButton from "@/component/LoginButton";

const logoFont = Pacifico({
    subsets: ['latin'],
    weight: '400',
    display: 'swap',
})

export default function Header({ initialTheme }) {
    return (
        <header className="shadow-sm w-full bg-gray-200 dark:bg-gray-800">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/" className={`text-xl dark:text-violet-500 text-violet-800 ${logoFont.className}`}>Amuge<br />Games</Link>
                        <div className="ml-8 relative hidden md:block">
                            <input type="text" placeholder="검색어를 입력하세요." className="w-96 h-10 pl-10 pr-4 rounded-full bg-gray-300 dark:bg-gray-700 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-600 dark:placeholder-gray-400 border-none focus:outline-none" />
                            <RiSearchLine size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="hidden md:block">
                            <LoginButton />
                            <ThemeToggle initialTheme={initialTheme} />
                        </div>

                        <div className="md:hidden">
                            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-700 text-white hover:text-pink-400">
                                <RiMenuLine />
                            </button>
                        </div>
                    </div>
                </div>
                <Navigation />
            </div>
        </header>
    )
}