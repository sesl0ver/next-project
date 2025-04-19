import Link from "next/link";
import Navigation from "./Navigation";
import { RiMenuLine } from '@remixicon/react';
import { Pacifico } from 'next/font/google';
import ThemeProvider from '@/lib/ThemeToggle';
import {ToasterProvider} from "@/lib/ToasterProvider";

const logoFont = Pacifico({
    subsets: ['latin'],
    weight: '400',
    display: 'swap',
})

export default function Header() {
    return (
        <header className="shadow-sm w-full bg-gray-200 dark:bg-gray-800">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/" className={`text-xl dark:text-violet-500 text-violet-800 ${logoFont.className}`}>Amuge<br />Games</Link>
                        <div className="ml-8 relative hidden md:block">
                            <input type="text" placeholder="검색어를 입력하세요." className="w-96 h-10 pl-10 pr-4 rounded-full bg-gray-300 dark:bg-gray-700 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-600 dark:placeholder-gray-400 border-none focus:outline-none" />
                            <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="hidden md:block">
                            <button className="px-4 py-2 mx-1 bg-green-600 text-white rounded-xl text-sm hover:bg-green-800">로그인</button>
                            <button className="px-4 py-2 mx-1 bg-indigo-600 text-white rounded-xl text-sm hover:bg-indigo-800">회원가입</button>
                            <ThemeProvider />
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