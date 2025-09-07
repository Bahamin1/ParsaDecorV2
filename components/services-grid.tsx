"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Home, Building2, Utensils, Palette, Hammer, Lightbulb, Star, Clock, Award } from "lucide-react"

interface ServicesGridProps {
  lang: string
  dict: any
}

export default function ServicesGrid({ lang, dict }: ServicesGridProps) {
  const isRTL = lang === "fa"

  const services = [
    {
      id: "interior-design",
      title: lang === "fa" ? "طراحی داخلی" : lang === "tr" ? "İç Mimari" : "Interior Design",
      description:
        lang === "fa"
          ? "طراحی فضاهای داخلی زیبا و کاربردی با توجه به سبک زندگی شما"
          : lang === "tr"
            ? "Yaşam tarzınıza uygun güzel ve fonksiyonel iç mekan tasarımı"
            : "Beautiful and functional interior spaces designed for your lifestyle",
      icon: Home,
      image: "/images/services/interior-design.jpg",
      features:
        lang === "fa"
          ? ["طراحی مفهومی", "انتخاب مواد", "نقشه‌کشی 3D", "نظارت بر اجرا"]
          : lang === "tr"
            ? ["Konsept tasarım", "Malzeme seçimi", "3D çizim", "Uygulama denetimi"]
            : ["Concept design", "Material selection", "3D rendering", "Implementation supervision"],
      price: "€2,500+",
      duration: lang === "fa" ? "2-6 هفته" : lang === "tr" ? "2-6 Hafta" : "2-6 Weeks",
      rating: 4.9,
      projects: 150,
      popular: true,
    },
    {
      id: "renovation",
      title: lang === "fa" ? "بازسازی" : lang === "tr" ? "Renovasyon" : "Renovation",
      description:
        lang === "fa"
          ? "بازسازی کامل یا جزئی ساختمان‌ها با استفاده از جدیدترین تکنیک‌ها"
          : lang === "tr"
            ? "En yeni tekniklerle binaların tam veya kısmi renovasyonu"
            : "Complete or partial building renovation using the latest techniques",
      icon: Hammer,
      image: "/images/services/renovation.jpg",
      features:
        lang === "fa"
          ? ["بازسازی کامل", "تعمیرات جزئی", "بهسازی انرژی", "مدرن‌سازی"]
          : lang === "tr"
            ? ["Tam renovasyon", "Kısmi onarım", "Enerji iyileştirme", "Modernizasyon"]
            : ["Full renovation", "Partial repairs", "Energy improvement", "Modernization"],
      price: "€15,000+",
      duration: lang === "fa" ? "1-6 ماه" : lang === "tr" ? "1-6 Ay" : "1-6 Months",
      rating: 4.8,
      projects: 85,
      popular: false,
    },
    {
      id: "commercial-design",
      title: lang === "fa" ? "طراحی تجاری" : lang === "tr" ? "Ticari Tasarım" : "Commercial Design",
      description:
        lang === "fa"
          ? "طراحی فضاهای تجاری، اداری و هتل‌ها برای بهبود تجربه مشتری"
          : lang === "tr"
            ? "Müşteri deneyimini iyileştirmek için ticari, ofis ve otel alanları tasarımı"
            : "Commercial, office and hotel space design to enhance customer experience",
      icon: Building2,
      image: "/images/services/commercial-design.jpg",
      features:
        lang === "fa"
          ? ["طراحی دفتر", "طراحی فروشگاه", "طراحی رستوران", "طراحی هتل"]
          : lang === "tr"
            ? ["Ofis tasarımı", "Mağaza tasarımı", "Restoran tasarımı", "Otel tasarımı"]
            : ["Office design", "Store design", "Restaurant design", "Hotel design"],
      price: "€5,000+",
      duration: lang === "fa" ? "2-8 هفته" : lang === "tr" ? "2-8 Hafta" : "2-8 Weeks",
      rating: 4.7,
      projects: 120,
      popular: true,
    },
    {
      id: "restaurant-design",
      title: lang === "fa" ? "طراحی رستوران" : lang === "tr" ? "Restoran Tasarımı" : "Restaurant Design",
      description:
        lang === "fa"
          ? "طراحی رستوران‌ها و کافه‌ها با تمرکز بر جو و تجربه غذاخوری"
          : lang === "tr"
            ? "Atmosfer ve yemek deneyimine odaklanan restoran ve kafe tasarımı"
            : "Restaurant and cafe design focusing on atmosphere and dining experience",
      icon: Utensils,
      image: "/images/services/restaurant-design.jpg",
      features:
        lang === "fa"
          ? ["طراحی آشپزخانه", "چیدمان میز", "طراحی نور", "انتخاب مبلمان"]
          : lang === "tr"
            ? ["Mutfak tasarımı", "Masa düzeni", "Aydınlatma tasarımı", "Mobilya seçimi"]
            : ["Kitchen design", "Table layout", "Lighting design", "Furniture selection"],
      price: "€8,000+",
      duration: lang === "fa" ? "3-10 هفته" : lang === "tr" ? "3-10 Hafta" : "3-10 Weeks",
      rating: 4.9,
      projects: 95,
      popular: false,
    },
    {
      id: "color-consultation",
      title: lang === "fa" ? "مشاوره رنگ" : lang === "tr" ? "Renk Danışmanlığı" : "Color Consultation",
      description:
        lang === "fa"
          ? "انتخاب پالت رنگی مناسب برای ایجاد فضایی هماهنگ و دلپذیر"
          : lang === "tr"
            ? "Uyumlu ve hoş bir alan yaratmak için uygun renk paleti seçimi"
            : "Selecting the right color palette to create a harmonious and pleasant space",
      icon: Palette,
      image: "/images/services/color-consultation.jpg",
      features:
        lang === "fa"
          ? ["تحلیل رنگ", "پالت رنگی", "ترکیب رنگ‌ها", "روانشناسی رنگ"]
          : lang === "tr"
            ? ["Renk analizi", "Renk paleti", "Renk kombinasyonu", "Renk psikolojisi"]
            : ["Color analysis", "Color palette", "Color combination", "Color psychology"],
      price: "€500+",
      duration: lang === "fa" ? "1-2 هفته" : lang === "tr" ? "1-2 Hafta" : "1-2 Weeks",
      rating: 4.6,
      projects: 200,
      popular: false,
    },
    {
      id: "lighting-design",
      title: lang === "fa" ? "طراحی نورپردازی" : lang === "tr" ? "Aydınlatma Tasarımı" : "Lighting Design",
      description:
        lang === "fa"
          ? "طراحی سیستم نورپردازی برای ایجاد فضایی گرم و دعوت‌کننده"
          : lang === "tr"
            ? "Sıcak ve davetkar bir alan yaratmak için aydınlatma sistemi tasarımı"
            : "Lighting system design to create a warm and inviting space",
      icon: Lightbulb,
      image: "/images/services/lighting-design.jpg",
      features:
        lang === "fa"
          ? ["نور طبیعی", "نور مصنوعی", "نور تزئینی", "کنترل هوشمند"]
          : lang === "tr"
            ? ["Doğal ışık", "Yapay ışık", "Dekoratif ışık", "Akıllı kontrol"]
            : ["Natural light", "Artificial light", "Decorative light", "Smart control"],
      price: "€1,500+",
      duration: lang === "fa" ? "2-4 هفته" : lang === "tr" ? "2-4 Hafta" : "2-4 Weeks",
      rating: 4.8,
      projects: 110,
      popular: true,
    },
  ]

  return (
    <div className={`${isRTL ? "rtl" : ""}`}>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="group"
          >
            <Link href={`/${lang}/services/${service.id}`}>
              <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-700/50 hover:border-orange-500/50 transition-all duration-300 hover:transform hover:scale-105">
                {/* Service Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={service.image || "/placeholder.svg?height=300&width=400"}
                    alt={service.title}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />

                  {/* Service Icon */}
                  <div className="absolute top-4 left-4 w-12 h-12 bg-orange-500/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <service.icon className="w-6 h-6 text-orange-400" />
                  </div>

                  {/* Popular Badge */}
                  {service.popular && (
                    <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {lang === "fa" ? "محبوب" : lang === "tr" ? "Popüler" : "Popular"}
                    </div>
                  )}

                  {/* Price Badge */}
                  <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm font-medium">
                    {service.price}
                  </div>
                </div>

                {/* Service Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-semibold text-white group-hover:text-orange-400 transition-colors duration-300">
                      {service.title}
                    </h3>
                    <div className="flex items-center text-yellow-400">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm ml-1">{service.rating}</span>
                    </div>
                  </div>

                  <p className="text-gray-400 mb-4 line-clamp-2">{service.description}</p>

                  {/* Service Stats */}
                  <div className="flex items-center justify-between mb-4 text-sm text-gray-300">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1 text-orange-400" />
                      {service.duration}
                    </div>
                    <div className="flex items-center">
                      <Award className="w-4 h-4 mr-1 text-orange-400" />
                      {service.projects} {lang === "fa" ? "پروژه" : lang === "tr" ? "Proje" : "Projects"}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-2 mb-6">
                    {service.features.slice(0, 3).map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-300">
                        <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2 flex-shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <div className="flex items-center justify-between">
                    <span className="text-orange-400 font-medium group-hover:text-orange-300 transition-colors">
                      {lang === "fa" ? "اطلاعات بیشتر" : lang === "tr" ? "Daha Fazla" : "Learn More"}
                    </span>
                    <ArrowRight
                      className={`w-5 h-5 text-orange-400 group-hover:translate-x-1 transition-transform ${isRTL ? "rotate-180" : ""}`}
                    />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* CTA Section */}
      <section className="mt-20 text-center">
        <div className="bg-gradient-to-r from-orange-500/10 to-purple-500/10 rounded-3xl p-12">
          <h3 className="text-3xl font-bold text-white mb-4">
            {lang === "fa"
              ? "خدمات سفارشی نیاز دارید؟"
              : lang === "tr"
                ? "Özel Hizmet Mi Gerekiyor?"
                : "Need Custom Services?"}
          </h3>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            {lang === "fa"
              ? "با تیم متخصص ما تماس بگیرید و راه‌حل مناسب پروژه خود را پیدا کنید"
              : lang === "tr"
                ? "Uzman ekibimizle iletişime geçin ve projeniz için uygun çözümü bulun"
                : "Contact our expert team and find the right solution for your project"}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${lang}/contact`}
              className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors font-semibold"
            >
              {lang === "fa" ? "درخواست قیمت" : lang === "tr" ? "Fiyat Al" : "Get Quote"}
            </Link>
            <Link
              href={`/${lang}/portfolio`}
              className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors font-semibold"
            >
              {lang === "fa" ? "مشاهده نمونه کارها" : lang === "tr" ? "Portföyü Gör" : "View Portfolio"}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
