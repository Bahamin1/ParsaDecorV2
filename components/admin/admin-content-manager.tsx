"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Edit, Save, X, Globe, Home, Info, Briefcase, Phone } from "lucide-react"

interface ContentSection {
  id: string
  title: string
  icon: any
  fields: ContentField[]
}

interface ContentField {
  key: string
  label: string
  type: "text" | "textarea" | "rich-text"
  value: Record<string, string>
}

export default function AdminContentManager() {
  const [selectedLanguage, setSelectedLanguage] = useState<"en" | "tr" | "fa">("en")
  const [editingSection, setEditingSection] = useState<string | null>(null)
  const [hasChanges, setHasChanges] = useState(false)

  const [content, setContent] = useState<ContentSection[]>([
    {
      id: "hero",
      title: "Hero Section",
      icon: Home,
      fields: [
        {
          key: "title",
          label: "Main Title",
          type: "text",
          value: {
            en: "Transform Your Space with Parsa Decor",
            tr: "Parsa Decor ile Mekanınızı Dönüştürün",
            fa: "فضای خود را با پارسا دکور متحول کنید",
          },
        },
        {
          key: "subtitle",
          label: "Subtitle",
          type: "textarea",
          value: {
            en: "Creating elegant, modern interiors in Istanbul that reflect your unique style and personality",
            tr: "İstanbul'da benzersiz tarzınızı ve kişiliğinizi yansıtan zarif, modern iç mekanlar yaratıyoruz",
            fa: "ایجاد فضاهای داخلی زیبا و مدرن در استانبول که سبک منحصر به فرد و شخصیت شما را منعکس می‌کند",
          },
        },
        {
          key: "cta1",
          label: "Primary Button Text",
          type: "text",
          value: {
            en: "View Portfolio",
            tr: "Portföyü Görüntüle",
            fa: "مشاهده نمونه کارها",
          },
        },
        {
          key: "cta2",
          label: "Secondary Button Text",
          type: "text",
          value: {
            en: "Contact Us",
            tr: "İletişime Geç",
            fa: "تماس با ما",
          },
        },
      ],
    },
    {
      id: "about",
      title: "About Section",
      icon: Info,
      fields: [
        {
          key: "title",
          label: "Section Title",
          type: "text",
          value: {
            en: "About Parsa Decor",
            tr: "Parsa Decor Hakkında",
            fa: "درباره پارسا دکور",
          },
        },
        {
          key: "subtitle",
          label: "Subtitle",
          type: "text",
          value: {
            en: "Crafting Beautiful Spaces in Istanbul",
            tr: "İstanbul'da Güzel Mekanlar Yaratmak",
            fa: "خلق فضاهای زیبا در استانبول",
          },
        },
        {
          key: "description",
          label: "Main Description",
          type: "textarea",
          value: {
            en: "Founded in the heart of Istanbul, Parsa Decor brings together international design expertise with local craftsmanship. Our team of passionate designers creates spaces that tell your story while honoring the rich cultural heritage of this magnificent city.",
            tr: "İstanbul'un kalbinde kurulan Parsa Decor, uluslararası tasarım uzmanlığını yerel zanaatkarlıkla bir araya getiriyor. Tutkulu tasarımcılardan oluşan ekibimiz, bu muhteşem şehrin zengin kültürel mirasını onurlandırırken hikayenizi anlatan mekanlar yaratıyor.",
            fa: "پارسا دکور که در قلب استانبول تأسیس شده، تخصص طراحی بین‌المللی را با صنعتگری محلی ترکیب می‌کند. تیم ما از طراحان پرشور، فضاهایی می‌سازد که داستان شما را بیان می‌کند و در عین حال میراث فرهنگی غنی این شهر باشکوه را گرامی می‌دارد.",
          },
        },
      ],
    },
    {
      id: "services",
      title: "Services Section",
      icon: Briefcase,
      fields: [
        {
          key: "title",
          label: "Section Title",
          type: "text",
          value: {
            en: "Our Services",
            tr: "Hizmetlerimiz",
            fa: "خدمات ما",
          },
        },
        {
          key: "subtitle",
          label: "Subtitle",
          type: "text",
          value: {
            en: "Comprehensive interior design solutions",
            tr: "Kapsamlı iç tasarım çözümleri",
            fa: "راه‌حل‌های جامع طراحی داخلی",
          },
        },
      ],
    },
    {
      id: "contact",
      title: "Contact Section",
      icon: Phone,
      fields: [
        {
          key: "title",
          label: "Section Title",
          type: "text",
          value: {
            en: "Get In Touch",
            tr: "İletişime Geçin",
            fa: "با ما در تماس باشید",
          },
        },
        {
          key: "subtitle",
          label: "Subtitle",
          type: "text",
          value: {
            en: "Ready to transform your space? Let's discuss your project",
            tr: "Mekanınızı dönüştürmeye hazır mısınız? Projenizi konuşalım",
            fa: "آماده تحول فضای خود هستید؟ بیایید درباره پروژه‌تان صحبت کنیم",
          },
        },
      ],
    },
  ])

  const updateFieldValue = (sectionId: string, fieldKey: string, value: string) => {
    setContent((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              fields: section.fields.map((field) =>
                field.key === fieldKey ? { ...field, value: { ...field.value, [selectedLanguage]: value } } : field,
              ),
            }
          : section,
      ),
    )
    setHasChanges(true)
  }

  const saveChanges = async () => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setHasChanges(false)
    setEditingSection(null)
    // Show success message
  }

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "tr", name: "Türkçe", flag: "🇹🇷" },
    { code: "fa", name: "فارسی", flag: "🇮🇷" },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Content Manager</h1>
          <p className="text-slate-600 mt-1">Edit website content across all languages</p>
        </div>
        {hasChanges && (
          <button
            onClick={saveChanges}
            className="flex items-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>Save Changes</span>
          </button>
        )}
      </div>

      {/* Language Selector */}
      <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Globe className="w-4 h-4 text-slate-400" />
            <span className="text-sm font-medium text-slate-700">Editing Language:</span>
          </div>
          <div className="flex items-center bg-slate-100 rounded-lg p-1">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => setSelectedLanguage(language.code as any)}
                className={`flex items-center space-x-2 px-3 py-2 text-sm rounded-lg transition-colors ${
                  selectedLanguage === language.code
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <span>{language.flag}</span>
                <span>{language.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {content.map((section, index) => (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-sm border border-slate-200"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <section.icon className="w-5 h-5 text-orange-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">{section.title}</h3>
                </div>
                <button
                  onClick={() => setEditingSection(editingSection === section.id ? null : section.id)}
                  className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
                >
                  {editingSection === section.id ? <X className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
                </button>
              </div>

              <div className="space-y-4">
                {section.fields.map((field) => (
                  <div key={field.key}>
                    <label className="block text-sm font-medium text-slate-700 mb-2">{field.label}</label>
                    {editingSection === section.id ? (
                      field.type === "textarea" ? (
                        <textarea
                          value={field.value[selectedLanguage] || ""}
                          onChange={(e) => updateFieldValue(section.id, field.key, e.target.value)}
                          rows={3}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                      ) : (
                        <input
                          type="text"
                          value={field.value[selectedLanguage] || ""}
                          onChange={(e) => updateFieldValue(section.id, field.key, e.target.value)}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                      )
                    ) : (
                      <div className="p-3 bg-slate-50 rounded-lg">
                        <p
                          className={`text-sm ${field.type === "textarea" ? "leading-relaxed" : ""} ${
                            selectedLanguage === "fa" ? "text-right" : "text-left"
                          }`}
                        >
                          {field.value[selectedLanguage] || "No content available"}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Preview Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-white rounded-lg p-6 shadow-sm border border-slate-200"
      >
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Live Preview</h3>
        <div className="bg-slate-50 rounded-lg p-6">
          <div className="text-center space-y-4">
            <h2
              className={`text-2xl font-bold text-slate-900 ${selectedLanguage === "fa" ? "text-right" : "text-left"}`}
            >
              {content.find((s) => s.id === "hero")?.fields.find((f) => f.key === "title")?.value[selectedLanguage]}
            </h2>
            <p className={`text-slate-600 ${selectedLanguage === "fa" ? "text-right" : "text-left"}`}>
              {content.find((s) => s.id === "hero")?.fields.find((f) => f.key === "subtitle")?.value[selectedLanguage]}
            </p>
            <div className="flex items-center justify-center space-x-4">
              <button className="px-6 py-2 bg-orange-500 text-white rounded-lg">
                {content.find((s) => s.id === "hero")?.fields.find((f) => f.key === "cta1")?.value[selectedLanguage]}
              </button>
              <button className="px-6 py-2 border border-orange-500 text-orange-500 rounded-lg">
                {content.find((s) => s.id === "hero")?.fields.find((f) => f.key === "cta2")?.value[selectedLanguage]}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
