import InteractiveFeaturedProjects from "@/components/interactive-featured-projects"
import LuxuryHero from "@/components/luxury-hero"
import ModernFooter from "@/components/modern-footer"
import ServicesShowcase from "@/components/services-showcase"
import TestimonialsCarousel from "@/components/testimonials-carousel"
import WhyChooseUsModern from "@/components/why-choose-us-modern"
import { getDictionary } from "./dictionaries"

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const dict = await getDictionary(lang as "en" | "tr" | "fa")

  return (
    <div className="min-h-screen">
      <LuxuryHero lang={lang} dict={dict} />
      <InteractiveFeaturedProjects lang={lang} dict={dict} />
      <ServicesShowcase lang={lang} dict={dict} />
      <WhyChooseUsModern lang={lang} dict={dict} />
      <TestimonialsCarousel lang={lang} dict={dict} />
      <ModernFooter lang={lang} dict={dict} />
    </div>
  )
}
