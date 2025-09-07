import ModernFooter from "@/components/modern-footer"
import ProductsSection from "@/components/products-section"
import { getDictionary } from "../dictionaries"

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang as "en" | "tr" | "fa")

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="pt-20">
        <ProductsSection lang={lang} dict={dict} />
      </div>
      <ModernFooter lang={lang} dict={dict} />
    </div>
  )
}
