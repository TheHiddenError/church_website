import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";

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

  return (
      <html lang={locale} className={`${lato.className}`}>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </head>
        <body
          className={`antialiased overflow-x-hidden`}
        >
          <NextIntlClientProvider>
            {children}
          </NextIntlClientProvider>
        </body>
      </html>
  );
}