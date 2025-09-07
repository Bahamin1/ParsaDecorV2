import { getDictionary } from "../dictionaries"
import MaterialsSelector from "@/components/materials-selector"

export default async function MaterialsPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">{dict.materials.title}</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">{dict.materials.subtitle}</p>
        </div>
        <MaterialsSelector lang={lang} dict={dict} />
      </div>
    </div>
  )
}
