"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Check, Star, Clock, Users, Award, Phone, Mail } from "lucide-react"

interface ServiceDetailProps {
  lang: string
  dict: any
  slug: string
}

export default function ServiceDetail({ lang, dict, slug }: ServiceDetailProps) {
  const [service, setService] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)
  const isRTL = lang === "fa"

  const sampleServices: { [key: string]: any } = {
    "interior-design": {
      id: "interior-design",
      title: lang === "fa" ? "طراحی داخلی" : lang === "tr" ? "İç Mimari" : "Interior Design",
      subtitle:
        lang === "fa"
          ? "تبدیل فضای شما به محیطی زیبا و کاربردی"
          : lang === "tr"
            ? "Alanınızı güzel ve fonksiyonel bir ortama dönüştürün"
            : "Transform your space into a beautiful and functional environment",
      description:
        lang === "fa"
          ? "خدمات طراحی داخلی ما شامل طراحی کامل فضاهای مسکونی و تجاری با توجه به نیازها و سلیقه شماست. ما از جدیدترین ترندها و تکنولوژی‌های روز استفاده می‌کنیم تا فضایی منحصر به فرد برای شما خلق کنیم."
          : lang === "tr"
            ? "İç mimari hizmetlerimiz, ihtiyaçlarınız ve zevkinize göre konut ve ticari alanların tam tasarımını içerir. Size özgün bir alan yaratmak için en son trendleri ve güncel teknolojileri kullanıyoruz."
            : "Our interior design services include complete design of residential and commercial spaces according to your needs and taste. We use the latest trends and current technologies to create a unique space for you.",
      image: "/images/services/interior-design-hero.jpg",
      gallery: [
        "/images/projects/modern-living-1.jpg",
        "/images/projects/luxury-bedroom-1.jpg",
        "/images/projects/modern-kitchen-1.jpg",
        "/images/projects/elegant-dining-1.jpg",
      ],
      price_range: "€2,500 - €15,000",
      duration: lang === "fa" ? "2-6 هفته" : lang === "tr" ? "2-6 Hafta" : "2-6 Weeks",
      rating: 4.9,
      completed_projects: 150,
      features:
        lang === "fa"
          ? [
              "مشاوره اولیه رایگان",
              "طراحی مفهومی و ایده‌پردازی",
              "انتخاب مواد و رنگ‌بندی",
              "نقشه‌کشی 2D و 3D",
              "لیست خرید کامل",
              "نظارت بر اجرای پروژه",
              "پشتیبانی پس از تحویل",
              "ضمانت کیفیت کار",
            ]
          : lang === "tr"
            ? [
                "Ücretsiz ilk danışmanlık",
                "Konsept tasarım ve fikir geliştirme",
                "Malzeme ve renk seçimi",
                "2D ve 3D çizim",
                "Tam alışveriş listesi",
                "Proje uygulama denetimi",
                "Teslimat sonrası destek",
                "İş kalitesi garantisi",
              ]
            : [
                "Free initial consultation",
                "Concept design and ideation",
                "Material and color selection",
                "2D and 3D rendering",
                "Complete shopping list",
                "Project implementation supervision",
                "Post-delivery support",
                "Quality guarantee",
              ],
      process:
        lang === "fa"
          ? [
              {
                step: 1,
                title: "مشاوره اولیه",
                description: "بررسی نیازها و بودجه شما",
                duration: "1 روز",
              },
              {
                step: 2,
                title: "طراحی مفهومی",
                description: "ارائه ایده‌ها و طرح‌های اولیه",
                duration: "3-5 روز",
              },
              {
                step: 3,
                title: "توسعه طرح",
                description: "تکمیل جزئیات و نقشه‌های اجرایی",
                duration: "1-2 هفته",
              },
              {
                step: 4,
                title: "اجرا و نظارت",
                description: "پیاده‌سازی طرح با نظارت کامل",
                duration: "2-4 هفته",
              },
            ]
          : lang === "tr"
            ? [
                {
                  step: 1,
                  title: "İlk Danışmanlık",
                  description: "İhtiyaçlarınız ve bütçenizi değerlendirme",
                  duration: "1 Gün",
                },
                {
                  step: 2,
                  title: "Konsept Tasarım",
                  description: "Fikirler ve ilk tasarımları sunma",
                  duration: "3-5 Gün",
                },
                {
                  step: 3,
                  title: "Tasarım Geliştirme",
                  description: "Detayları tamamlama ve uygulama çizimleri",
                  duration: "1-2 Hafta",
                },
                {
                  step: 4,
                  title: "Uygulama ve Denetim",
                  description: "Tam denetimle tasarımı hayata geçirme",
                  duration: "2-4 Hafta",
                },
              ]
            : [
                {
                  step: 1,
                  title: "Initial Consultation",
                  description: "Assessing your needs and budget",
                  duration: "1 Day",
                },
                {
                  step: 2,
                  title: "Concept Design",
                  description: "Presenting ideas and initial designs",
                  duration: "3-5 Days",
                },
                {
                  step: 3,
                  title: "Design Development",
                  description: "Completing details and implementation drawings",
                  duration: "1-2 Weeks",
                },
                {
                  step: 4,
                  title: "Implementation & Supervision",
                  description: "Bringing the design to life with full supervision",
                  duration: "2-4 Weeks",
                },
              ],
      testimonials: [
        {
          name: "Sarah Johnson",
          rating: 5,
          comment:
            lang === "fa"
              ? "کار فوق‌العاده‌ای انجام دادند. خانه‌ام حالا بسیار زیباتر شده."
              : lang === "tr"
                ? "Harika bir iş çıkardılar. Evim artık çok daha güzel görünüyor."
                : "They did an amazing job. My home looks so much more beautiful now.",
          project: lang === "fa" ? "آپارتمان مدرن" : lang === "tr" ? "Modern Daire" : "Modern Apartment",
        },
        {
          name: "Michael Chen",
          rating: 5,
          comment:
            lang === "fa"
              ? "حرفه‌ای و دقیق. نتیجه فراتر از انتظارات من بود."
              : lang === "tr"
                ? "Profesyonel ve titiz. Sonuç beklentilerimin ötesindeydi."
                : "Professional and meticulous. The result exceeded my expectations.",
          project: lang === "fa" ? "دفتر شرکتی" : lang === "tr" ? "Kurumsal Ofis" : "Corporate Office",
        },
        {
          name: "Ayşe Demir",
          rating: 5,
          comment:
            lang === "fa"
              ? "طراحی بی‌نظیر و اجرای عالی. کاملاً راضی هستم."
              : lang === "tr"
                ? "Eşsiz tasarım ve mükemmel uygulama. Tamamen memnunum."
                : "Unique design and excellent execution. Completely satisfied.",
          project: lang === "fa" ? "رستوران" : lang === "tr" ? "Restoran" : "Restaurant",
        },
      ],
      packages: [
        {
          name: lang === "fa" ? "پایه" : lang === "tr" ? "Temel" : "Basic",
          price: "€2,500",
          features:
            lang === "fa"
              ? ["مشاوره اولیه", "طراحی مفهومی", "نقشه 2D", "لیست مواد"]
              : lang === "tr"
                ? ["İlk danışmanlık", "Konsept tasarım", "2D çizim", "Malzeme listesi"]
                : ["Initial consultation", "Concept design", "2D drawing", "Material list"],
        },
        {
          name: lang === "fa" ? "استاندارد" : lang === "tr" ? "Standart" : "Standard",
          price: "€5,000",
          features:
            lang === "fa"
              ? ["همه موارد پایه", "نقشه 3D", "انتخاب مبلمان", "نظارت جزئی"]
              : lang === "tr"
                ? ["Tüm temel özellikler", "3D çizim", "Mobilya seçimi", "Kısmi denetim"]
                : ["All basic features", "3D rendering", "Furniture selection", "Partial supervision"],
          popular: true,
        },
        {
          name: lang === "fa" ? "پریمیوم" : lang === "tr" ? "Premium" : "Premium",
          price: "€10,000+",
          features:
            lang === "fa"
              ? ["همه موارد استاندارد", "نظارت کامل", "پشتیبانی 6 ماهه", "ضمانت کیفیت"]
              : lang === "tr"
                ? ["Tüm standart özellikler", "Tam denetim", "6 ay destek", "Kalite garantisi"]
                : ["All standard features", "Full supervision", "6-month support", "Quality guarantee"],
        },
      ],
    },
  }

  useEffect(() => {
    setMounted(true)
    setTimeout(() => {
      const serviceData = sampleServices[slug] || sampleServices["interior-design"]
      setService(serviceData)
      setLoading(false)
    }, 1000)
  }, [slug])

  if (!mounted || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    )
  }

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">
            {lang === "fa" ? "خدمت یافت نشد" : lang === "tr" ? "Hizmet bulunamadı" : "Service Not Found"}
          </h1>
          <Link href={`/${lang}/services`} className="text-orange-500 hover:text-orange-400">
            {lang === "fa" ? "بازگشت به خدمات" : lang === "tr" ? "Hizmetlere Dön" : "Back to Services"}
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen bg-black text-white ${isRTL ? "rtl" : ""}`}>
      {/* Back Button */}
      <div className="container mx-auto px-4 py-8">
        <Link
          href={`/${lang}/services`}
          className="inline-flex items-center text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className={`w-5 h-5 ${isRTL ? "rotate-180 ml-2" : "mr-2"}`} />
          {lang === "fa" ? "بازگشت به خدمات" : lang === "tr" ? "Hizmetlere Dön" : "Back to Services"}
        </Link>
      </div>

      {/* Hero Section */}
      <section className="container mx-auto px-4 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">{service.title}</h1>
            <p className="text-xl text-orange-400 mb-6">{service.subtitle}</p>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">{service.description}</p>

            {/* Service Stats */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="text-2xl font-bold ml-2">{service.rating}</span>
                </div>
                <p className="text-gray-400 text-sm">{lang === "fa" ? "امتیاز" : lang === "tr" ? "Puan" : "Rating"}</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Award className="w-5 h-5 text-orange-400" />
                  <span className="text-2xl font-bold ml-2">{service.completed_projects}</span>
                </div>
                <p className="text-gray-400 text-sm">
                  {lang === "fa" ? "پروژه" : lang === "tr" ? "Proje" : "Projects"}
                </p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Clock className="w-5 h-5 text-green-400" />
                  <span className="text-lg font-bold">{service.duration}</span>
                </div>
                <p className="text-gray-400 text-sm">
                  {lang === "fa" ? "مدت زمان" : lang === "tr" ? "Süre" : "Duration"}
                </p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-4">
              <Link
                href={`/${lang}/contact`}
                className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors font-semibold"
              >
                {lang === "fa" ? "درخواست قیمت" : lang === "tr" ? "Fiyat Al" : "Get Quote"}
              </Link>
              <a
                href="tel:+905551234567"
                className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors font-semibold flex items-center"
              >
                <Phone className="w-5 h-5 mr-2" />
                {lang === "fa" ? "تماس فوری" : lang === "tr" ? "Hemen Ara" : "Call Now"}
              </a>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden"
            >
              <Image
                src={service.image || "/placeholder.svg?height=600&width=800"}
                alt={service.title}
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Service Packages */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">
          {lang === "fa" ? "پکیج‌های خدماتی" : lang === "tr" ? "Hizmet Paketleri" : "Service Packages"}
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {service.packages.map((pkg: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`bg-slate-900/50 rounded-2xl p-8 border ${
                pkg.popular ? "border-orange-500" : "border-slate-700/50"
              } relative`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                  {lang === "fa" ? "محبوب" : lang === "tr" ? "Popüler" : "Popular"}
                </div>
              )}
              <h3 className="text-2xl font-bold mb-4">{pkg.name}</h3>
              <div className="text-3xl font-bold text-orange-400 mb-6">{pkg.price}</div>
              <ul className="space-y-3 mb-8">
                {pkg.features.map((feature: string, idx: number) => (
                  <li key={idx} className="flex items-center">
                    <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={`/${lang}/contact`}
                className={`w-full py-3 rounded-lg font-semibold transition-colors text-center block ${
                  pkg.popular
                    ? "bg-orange-500 hover:bg-orange-600 text-white"
                    : "bg-slate-800 hover:bg-slate-700 text-white"
                }`}
              >
                {lang === "fa" ? "انتخاب پکیج" : lang === "tr" ? "Paketi Seç" : "Choose Package"}
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">
          {lang === "fa" ? "فرآیند کار" : lang === "tr" ? "Çalışma Süreci" : "Work Process"}
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {service.process.map((step: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-2xl font-bold text-white mx-auto mb-4">
                {step.step}
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-400 mb-2">{step.description}</p>
              <span className="text-orange-400 text-sm font-medium">{step.duration}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">
          {lang === "fa" ? "ویژگی‌های خدمات" : lang === "tr" ? "Hizmet Özellikleri" : "Service Features"}
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {service.features.map((feature: string, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex items-center p-4 bg-slate-900/50 rounded-xl"
            >
              <Check className="w-6 h-6 text-orange-500 mr-4 flex-shrink-0" />
              <span className="text-gray-300">{feature}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Gallery Section */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">
          {lang === "fa" ? "نمونه کارها" : lang === "tr" ? "Örnek Çalışmalar" : "Sample Works"}
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {service.gallery.map((image: string, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative aspect-[4/3] rounded-xl overflow-hidden group cursor-pointer"
            >
              <Image
                src={image || "/placeholder.svg?height=400&width=600"}
                alt={`${service.title} - Example ${index + 1}`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">
          {lang === "fa" ? "نظرات مشتریان" : lang === "tr" ? "Müşteri Görüşleri" : "Client Testimonials"}
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {service.testimonials.map((testimonial: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-slate-900/50 rounded-2xl p-8"
            >
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-300 mb-4 italic">"{testimonial.comment}"</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Users className="w-5 h-5 text-gray-400 mr-2" />
                  <span className="font-semibold">{testimonial.name}</span>
                </div>
                <span className="text-orange-400 text-sm">{testimonial.project}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="bg-gradient-to-r from-orange-500/10 to-purple-500/10 rounded-3xl p-12 text-center">
          <h3 className="text-3xl font-bold mb-4">
            {lang === "fa"
              ? "آماده شروع پروژه هستید؟"
              : lang === "tr"
                ? "Projeye Başlamaya Hazır mısınız?"
                : "Ready to Start Your Project?"}
          </h3>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            {lang === "fa"
              ? "با تیم متخصص ما تماس بگیرید و مشاوره رایگان دریافت کنید"
              : lang === "tr"
                ? "Uzman ekibimizle iletişime geçin ve ücretsiz danışmanlık alın"
                : "Contact our expert team and get free consultation"}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${lang}/contact`}
              className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors font-semibold"
            >
              {lang === "fa" ? "شروع پروژه" : lang === "tr" ? "Proje Başlat" : "Start Project"}
            </Link>
            <a
              href="mailto:info@parsadecor.com"
              className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors font-semibold flex items-center justify-center"
            >
              <Mail className="w-5 h-5 mr-2" />
              {lang === "fa" ? "ایمیل بفرستید" : lang === "tr" ? "E-posta Gönder" : "Send Email"}
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
