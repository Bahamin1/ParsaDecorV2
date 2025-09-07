import ModernFooter from "@/components/modern-footer"
import PortfolioGrid from "@/components/portfolio-grid"
import { getDictionary } from "../dictionaries"

export default async function PortfolioPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const dict = await getDictionary(lang as "en" | "tr" | "fa")

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="pt-20">
        <PortfolioGrid lang={lang} dict={dict} />
      </div>
      <ModernFooter lang={lang} dict={dict} />
    </div>
  )
}
