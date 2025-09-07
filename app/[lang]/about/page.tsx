import InteractiveCursor from "@/components/interactive-cursor"
import ModernAboutLayout from "@/components/modern-about-layout"
import ProfessionalConstructionBackground from "@/components/professional-construction-background"
import type { Metadata } from "next"
import { getDictionary } from "../dictionaries"

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params

  const titles = {
    en: "About Us - Parsa Decor",
    tr: "Hakkımızda - Parsa Decor",
    fa: "درباره ما - پارسا دکور",
  }

  return {
    title: titles[lang as keyof typeof titles],
  }
}

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const dict = await getDictionary(lang as "en" | "tr" | "fa")

  return (
    <div className="relative min-h-screen bg-slate-900">
      <ProfessionalConstructionBackground />
      <InteractiveCursor />
      <ModernAboutLayout lang={lang} dict={dict} />
    </div>
  )
}
