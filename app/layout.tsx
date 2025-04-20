import {Metadata} from "next";
import "@/style/global.css";
import Header from "@/component/Header";
import Footer from "@/component/Footer";
import {LoadingOverlay} from "@/component/LoadingOverlay";
import {getThemeScript} from '@/lib/ThemeScript';
import {ToasterProvider} from "@/lib/ToasterProvider";
import {ThemeWrapper} from "@/lib/ThemeWrapper";
import PageWithScrollControl from "@/component/PageWithScrollControl";
import React from "react";

export const metadata: Metadata = {
  title: {
      template: "%s | Next Games",
      default: "Next Games"
  },
  description: 'The Best Games on The Great Framework',
}

export default function RootLayout({ children, }: { children: React.ReactNode }) {
  return (
      <html lang="ko" className="dark" suppressHydrationWarning>
      <head>
          <script dangerouslySetInnerHTML={{ __html: getThemeScript() }} />
          <title>Next Games</title>
      </head>
      <body className="min-h-screen bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <PageWithScrollControl />
      <Header />
      <main className="container mx-auto px-4 py-6">
          <ThemeWrapper>
          {children}
          </ThemeWrapper>
      </main>
      <Footer />
      <LoadingOverlay />
      <ToasterProvider />
      </body>
      </html>
  )
}
