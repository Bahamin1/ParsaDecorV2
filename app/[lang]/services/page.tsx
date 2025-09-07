import ModernFooter from "@/components/modern-footer"
import ServicesGrid from "@/components/services-grid"
import { getDictionary } from "../dictionaries"

export default async function ServicesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const dict = await getDictionary(lang as "en" | "tr" | "fa")

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{dict?.services?.title || "خدمات ما"}</h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              {dict?.services?.subtitle || "ارائه خدمات کامل طراحی داخلی و بازسازی"}
            </p>
          </div>

          <ServicesGrid lang={lang} dict={dict} />
        </div>
      </div>
      <ModernFooter lang={lang} dict={dict} />
    </div>
  )
}
