"use client"

import { motion } from "framer-motion"
import { ArrowLeft, Calendar, Download, ExternalLink, MapPin, Share2, Star, Tag, User } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

interface ProjectDetailProps {
  lang: string
  dict: any
  slug: string
}

export default function ProjectDetail({ lang, dict, slug }: ProjectDetailProps) {
  const [project, setProject] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [mounted, setMounted] = useState(false)
  const isRTL = lang === "fa"

  const sampleProjects: { [key: string]: any } = {
    "modern-apartment-beyoglu": {
      id: "1",
      title:
        lang === "fa"
          ? "آپارتمان مدرن در بی‌اوغلو"
          : lang === "tr"
            ? "Beyoğlu'da Modern Daire"
            : "Modern Apartment in Beyoğlu",
      description:
        lang === "fa"
          ? "بازسازی کامل آپارتمان 120 متری با عناصر طراحی معاصر و سیستم خانه هوشمند. این پروژه شامل طراحی مجدد کامل فضاهای داخلی، استفاده از مواد پریمیوم و تکنولوژی‌های پیشرفته است."
          : lang === "tr"
            ? "Çağdaş tasarım öğeleri ve akıllı ev entegrasyonu ile 120m² dairenin komple renovasyonu. Bu proje, iç mekanların tamamen yeniden tasarımı, premium malzemeler ve ileri teknolojilerin kullanımını içerir."
            : "Complete renovation of a 120m² apartment with contemporary design elements and smart home integration. This project includes complete interior redesign, premium materials, and advanced technologies.",
      category: "residential",
      location: lang === "fa" ? "بی‌اوغلو، استانبول" : lang === "tr" ? "Beyoğlu, İstanbul" : "Beyoğlu, Istanbul",
      completion_date: "2024-01-15",
      status: "completed",
      images: [
        "/images/projects/modern-living-1.jpg",
        "/images/projects/modern-apartment-2.jpg",
        "/images/projects/luxury-living-2.jpg",
        "/images/projects/contemporary-bedroom-2.jpg",
      ],
      tags: ["modern", "apartment", "renovation", "smart-home"],
      client: lang === "fa" ? "مشتری خصوصی" : lang === "tr" ? "Özel Müşteri" : "Private Client",
      budget: "€45,000",
      featured: true,
      details: {
        area: "120m²",
        duration: lang === "fa" ? "3 ماه" : lang === "tr" ? "3 Ay" : "3 Months",
        rooms:
          lang === "fa" ? "3 اتاق خواب، 2 حمام" : lang === "tr" ? "3 Yatak Odası, 2 Banyo" : "3 Bedrooms, 2 Bathrooms",
        style: lang === "fa" ? "مدرن معاصر" : lang === "tr" ? "Çağdaş Modern" : "Contemporary Modern",
      },
      features:
        lang === "fa"
          ? [
              "سیستم خانه هوشمند کامل",
              "کابینت‌های سفارشی ساخت",
              "سیستم روشنایی LED هوشمند",
              "کفپوش پارکت اوک طبیعی",
              "سیستم تهویه مطبوع مرکزی",
              "آشپزخانه مجهز به آخرین تکنولوژی",
            ]
          : lang === "tr"
            ? [
                "Tam akıllı ev sistemi",
                "Özel yapım dolaplar",
                "Akıllı LED aydınlatma sistemi",
                "Doğal meşe parke zemin",
                "Merkezi klima sistemi",
                "Son teknoloji mutfak",
              ]
            : [
                "Complete smart home system",
                "Custom-built cabinets",
                "Smart LED lighting system",
                "Natural oak parquet flooring",
                "Central air conditioning system",
                "State-of-the-art kitchen",
              ],
      testimonial: {
        rating: 5,
        comment:
          lang === "fa"
            ? "کار فوق‌العاده‌ای انجام دادند. خانه‌ام حالا بسیار زیباتر و کاربردی‌تر شده."
            : lang === "tr"
              ? "Harika bir iş çıkardılar. Evim artık çok daha güzel ve fonksiyonel."
              : "They did an amazing job. My home is now much more beautiful and functional.",
        client_name: "Sarah Johnson",
      },
    },
    "luxury-office-levent": {
      id: "2",
      title: lang === "fa" ? "دفتر لوکس در لونت" : lang === "tr" ? "Levent'te Lüks Ofis" : "Luxury Office in Levent",
      description:
        lang === "fa"
          ? "طراحی دفتر شرکتی برای یک شرکت فناوری با فضاهای باز، امکانات مدرن و مناطق همکاری. این پروژه شامل طراحی 500 متر مربع فضای اداری با رویکرد مدرن و کاربردی است."
          : lang === "tr"
            ? "Açık alanlar, modern olanaklar ve işbirliği alanları ile bir teknoloji şirketi için kurumsal ofis tasarımı. Bu proje, modern ve fonksiyonel yaklaşımla 500 metrekare ofis alanının tasarımını içerir."
            : "Corporate office design for a tech company with open spaces, modern amenities, and collaborative areas. This project includes designing 500 square meters of office space with a modern and functional approach.",
      category: "commercial",
      location: lang === "fa" ? "لونت، استانبول" : lang === "tr" ? "Levent, İstanbul" : "Levent, Istanbul",
      completion_date: "2024-01-10",
      status: "completed",
      images: [
        "/images/projects/office-space-1.jpg",
        "/images/projects/executive-office-2.jpg",
        "/images/projects/modern-workspace-1.jpg",
        "/images/projects/elegant-reception-1.jpg",
      ],
      tags: ["office", "corporate", "modern", "tech"],
      client: "Tech Corp Ltd.",
      budget: "€120,000",
      featured: true,
      details: {
        area: "500m²",
        duration: lang === "fa" ? "4 ماه" : lang === "tr" ? "4 Ay" : "4 Months",
        rooms:
          lang === "fa"
            ? "15 دفتر، 3 اتاق جلسه"
            : lang === "tr"
              ? "15 Ofis, 3 Toplantı Odası"
              : "15 Offices, 3 Meeting Rooms",
        style: lang === "fa" ? "مدرن شرکتی" : lang === "tr" ? "Modern Kurumsal" : "Modern Corporate",
      },
      features:
        lang === "fa"
          ? [
              "فضای کار باز و انعطاف‌پذیر",
              "اتاق‌های جلسه با تکنولوژی پیشرفته",
              "منطقه استراحت و کافه",
              "سیستم صوتی و تصویری یکپارچه",
              "طراحی ارگونومیک",
              "فضای سبز داخلی",
            ]
          : lang === "tr"
            ? [
                "Açık ve esnek çalışma alanı",
                "İleri teknoloji toplantı odaları",
                "Dinlenme ve kafe alanı",
                "Entegre ses ve görüntü sistemi",
                "Ergonomik tasarım",
                "İç mekan yeşil alan",
              ]
            : [
                "Open and flexible workspace",
                "Advanced technology meeting rooms",
                "Rest and cafe area",
                "Integrated audio-visual system",
                "Ergonomic design",
                "Indoor green space",
              ],
      testimonial: {
        rating: 5,
        comment:
          lang === "fa"
            ? "محیط کاری فوق‌العاده‌ای خلق کردند که بهره‌وری تیم ما را افزایش داده."
            : lang === "tr"
              ? "Ekibimizin verimliliğini artıran harika bir çalışma ortamı yarattılar."
              : "They created an amazing work environment that increased our team's productivity.",
        client_name: "Michael Chen, CEO",
      },
    },
  }

  useEffect(() => {
    setMounted(true)
    // Simulate API call
    setTimeout(() => {
      const projectData = sampleProjects[slug] || sampleProjects["modern-apartment-beyoglu"]
      setProject(projectData)
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

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">
            {lang === "fa" ? "پروژه یافت نشد" : lang === "tr" ? "Proje bulunamadı" : "Project Not Found"}
          </h1>
          <Link href={`/${lang}/portfolio`} className="text-orange-500 hover:text-orange-400">
            {lang === "fa" ? "بازگشت به نمونه کارها" : lang === "tr" ? "Portföye Dön" : "Back to Portfolio"}
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
          href={`/${lang}/portfolio`}
          className="inline-flex items-center text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className={`w-5 h-5 ${isRTL ? "rotate-180 ml-2" : "mr-2"}`} />
          {lang === "fa" ? "بازگشت به نمونه کارها" : lang === "tr" ? "Portföye Dön" : "Back to Portfolio"}
        </Link>
      </div>

      {/* Project Header */}
      <section className="container mx-auto px-4 pb-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <span className="px-3 py-1 bg-orange-500/20 text-orange-400 rounded-full text-sm capitalize">
                {project.category}
              </span>
              {project.featured && (
                <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm">
                  {lang === "fa" ? "ویژه" : lang === "tr" ? "Öne Çıkan" : "Featured"}
                </span>
              )}
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">{project.title}</h1>

            <p className="text-xl text-gray-300 mb-8 leading-relaxed">{project.description}</p>

            {/* Project Info */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="flex items-center text-gray-400">
                <MapPin className="w-5 h-5 mr-3" />
                <span>{project.location}</span>
              </div>
              <div className="flex items-center text-gray-400">
                <Calendar className="w-5 h-5 mr-3" />
                <span>{new Date(project.completion_date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center text-gray-400">
                <User className="w-5 h-5 mr-3" />
                <span>{project.client}</span>
              </div>
              <div className="flex items-center text-gray-400">
                <Tag className="w-5 h-5 mr-3" />
                <span>{project.budget}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors flex items-center">
                <Share2 className="w-5 h-5 mr-2" />
                {lang === "fa" ? "اشتراک‌گذاری" : lang === "tr" ? "Paylaş" : "Share Project"}
              </button>
              <button className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors flex items-center">
                <Download className="w-5 h-5 mr-2" />
                {lang === "fa" ? "دانلود PDF" : lang === "tr" ? "PDF İndir" : "Download PDF"}
              </button>
            </div>
          </div>

          {/* Main Image */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden"
            >
              <Image
                src={project.images[currentImageIndex] || "/placeholder.svg?height=600&width=800"}
                alt={project.title}
                fill
                className="object-cover"
              />
            </motion.div>

            {/* Image Navigation */}
            <div className="flex justify-center mt-4 gap-2">
              {project.images.map((_: any, index: number) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentImageIndex ? "bg-orange-500" : "bg-gray-600"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Project Specifications */}
          <div className="bg-slate-900/50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-6">
              {lang === "fa" ? "جزئیات پروژه" : lang === "tr" ? "Proje Detayları" : "Project Details"}
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-400">{lang === "fa" ? "مساحت:" : lang === "tr" ? "Alan:" : "Area:"}</span>
                <span className="text-white">{project.details.area}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">
                  {lang === "fa" ? "مدت زمان:" : lang === "tr" ? "Süre:" : "Duration:"}
                </span>
                <span className="text-white">{project.details.duration}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">
                  {lang === "fa" ? "اتاق‌ها:" : lang === "tr" ? "Odalar:" : "Rooms:"}
                </span>
                <span className="text-white">{project.details.rooms}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">{lang === "fa" ? "سبک:" : lang === "tr" ? "Stil:" : "Style:"}</span>
                <span className="text-white">{project.details.style}</span>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="bg-slate-900/50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-6">
              {lang === "fa" ? "ویژگی‌های کلیدی" : lang === "tr" ? "Temel Özellikler" : "Key Features"}
            </h3>
            <ul className="space-y-3">
              {project.features.map((feature: string, index: number) => (
                <li key={index} className="flex items-start">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Client Testimonial */}
          <div className="bg-slate-900/50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-6">
              {lang === "fa" ? "نظر مشتری" : lang === "tr" ? "Müşteri Görüşü" : "Client Testimonial"}
            </h3>
            <div className="flex items-center mb-4">
              {[...Array(project.testimonial.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
            </div>
            <p className="text-gray-300 mb-4 italic">"{project.testimonial.comment}"</p>
            <div className="flex items-center">
              <User className="w-5 h-5 text-gray-400 mr-2" />
              <span className="font-semibold">{project.testimonial.client_name}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="container mx-auto px-4 py-12">
        <h3 className="text-3xl font-bold mb-8 text-center">
          {lang === "fa" ? "گالری پروژه" : lang === "tr" ? "Proje Galerisi" : "Project Gallery"}
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          {project.images.map((image: string, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer group"
              onClick={() => setCurrentImageIndex(index)}
            >
              <Image
                src={image || "/placeholder.svg?height=400&width=600"}
                alt={`${project.title} - Image ${index + 1}`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                <ExternalLink className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
              ? "پروژه مشابهی می‌خواهید؟"
              : lang === "tr"
                ? "Benzer Bir Proje Mi İstiyorsunuz?"
                : "Want a Similar Project?"}
          </h3>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            {lang === "fa"
              ? "با ��یم حرفه‌ای ما تماس بگیرید و پروژه رویایی خود را شروع کنید"
              : lang === "tr"
                ? "Profesyonel ekibimizle iletişime geçin ve hayalinizdeki projeyi başlatın"
                : "Contact our professional team and start your dream project"}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${lang}/contact`}
              className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors font-semibold"
            >
              {lang === "fa" ? "شروع پروژه" : lang === "tr" ? "Proje Başlat" : "Start Project"}
            </Link>
            <Link
              href={`/${lang}/portfolio`}
              className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors font-semibold"
            >
              {lang === "fa" ? "مشاهده پروژه‌های بیشتر" : lang === "tr" ? "Daha Fazla Proje" : "View More Projects"}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
