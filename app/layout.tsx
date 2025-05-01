import {Metadata} from "next";
import "@/style/global.css";
import Header from "@/component/Header";
import Footer from "@/component/Footer";
import {LoadingOverlay} from "@/component/LoadingOverlay";
import {ToasterProvider} from "@/lib/ToasterProvider";
import PageWithScrollControl from "@/component/PageWithScrollControl";
import React from "react";
import { cookies } from 'next/headers'
import UserDataWrapper from "@/component/UserDataWrapper";

export const metadata: Metadata = {
    title: {
        template: "%s | Next Games",
        default: "Next Games"
    },
    description: 'The Best Games on The Great Framework',
}

export default async function RootLayout({ children, }: { children: React.ReactNode }) {
    const cookie = await cookies();
    const cookieTheme = cookie.get('theme')?.value
    const initialTheme = cookieTheme === 'dark' ? 'dark' : null
    return (
        <html lang="ko" className={initialTheme === 'dark' ? 'dark' : undefined} suppressHydrationWarning>
        <head>
            <title>Next Games</title>
        </head>
        <body className="min-h-screen bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
        <PageWithScrollControl />
        <Header initialTheme={initialTheme} />
        <main className="container mx-auto px-4 py-6">
            <UserDataWrapper>
                {children}
            </UserDataWrapper>
        </main>
        <Footer />
        <LoadingOverlay />
        <ToasterProvider />
        </body>
        </html>
    )
}