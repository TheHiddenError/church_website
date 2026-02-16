import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import NavBar from "./root_components/navbar/navbar";
import Footer from "./root_components/navbar/footer";

const lato = Lato({
  weight: ["100", "300", "400", "700", "900"],
  subsets: ["latin"]
})

// const inter = Inter({
//   subsets: ["latin"]
// })

export const metadata: Metadata = {
  title: "Iglesia Nueva Esperanza"
}


export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode,
  params: Promise<unknown>
}) {
  const {locale} = await params as {locale:string };
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
      <html lang={locale} className={`${lato.className}`}>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </head>
        <body
          className={`antialiased overflow-x-hidden`}
        >
          <NextIntlClientProvider>
            <div className="min-h-screen flex flex-col">
              <NavBar />
              <div className="mt-10 h-[70vh] overflow-auto-y flex-1">{children}</div>
              <Footer />
            </div>
          </NextIntlClientProvider>
        </body>
      </html>
  );
}