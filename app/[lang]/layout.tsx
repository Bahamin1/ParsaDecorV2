import LuxuryNavigation from "@/components/luxury-navigation"
import { ThemeProvider } from "@/components/theme-provider"
import { Inter } from "next/font/google"
import type React from "react"
import "../globals.css"
import { getDictionary } from "./dictionaries"

const inter = Inter({ subsets: ["latin"] })

export async function generateStaticParams() {
  return [{ lang: "fa" }, { lang: "en" }, { lang: "tr" }]
}

export async function generateViewport() {
  return {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  }
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang as "en" | "tr" | "fa")

  return (
    <html lang={lang} dir={lang === "fa" ? "rtl" : "ltr"} className="dark">
      <body className={`${inter.className} bg-slate-900 text-white`}>
        <ThemeProvider defaultTheme="dark"  >
          <LuxuryNavigation lang={lang} dict={dict} />
          <main className="min-h-screen">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}
