import ContactForm from "@/components/contact-form"
import ContactInfo from "@/components/contact-info"
import ContactMap from "@/components/contact-map"
import ModernFooter from "@/components/modern-footer"
import { getDictionary } from "../dictionaries"

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const dict = await getDictionary(lang as "en" | "tr" | "fa")

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{dict?.contact?.title || "تماس با ما"}</h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              {dict?.contact?.subtitle || "برای مشاوره رایگان با ما در تماس باشید"}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-12">
            <ContactForm lang={lang} dict={dict} />
            <ContactInfo lang={lang} dict={dict} />
          </div>

          <ContactMap lang={lang} dict={dict} />
        </div>
      </div>
      <ModernFooter lang={lang} dict={dict} />
    </div>
  )
}
