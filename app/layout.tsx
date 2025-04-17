import {Metadata} from "next";
import "@/style/global.css";
import Header from "@/component/Header";
import Footer from "@/component/Footer";
import { LoadingProvider } from "@/lib/LoadingContext";
import { LoadingOverlay } from "@/component/LoadingOverlay";

export const metadata: Metadata = {
  title: {
      template: "%s | Next Games",
      default: "Next Games"
  },
  description: 'The Best Games on The Great Framework',
}

export default function RootLayout({ children, }: { children: React.ReactNode }) {
  return (
      <html>
      <body>
      <LoadingProvider>
          <Header />
          <main className="container mx-auto px-4 py-6">
              {children}
          </main>
          <Footer />
          <LoadingOverlay />
      </LoadingProvider>
      </body>
      </html>
  )
}
