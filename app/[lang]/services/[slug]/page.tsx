import { getDictionary } from "../../dictionaries"
import LuxuryNavigation from "@/components/luxury-navigation"
import ServiceDetail from "@/components/service-detail"
import ModernFooter from "@/components/modern-footer"
import SmoothCursor from "@/components/smooth-cursor"

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>
}) {
  const { lang, slug } = await params
  const dict = await getDictionary(lang)

  return (
    <main className="min-h-screen bg-black">
      <SmoothCursor />
      <LuxuryNavigation lang={lang} dict={dict} />
      <div className="pt-24">
        <ServiceDetail lang={lang} dict={dict} slug={slug} />
      </div>
      <ModernFooter lang={lang} dict={dict} />
    </main>
  )
}
