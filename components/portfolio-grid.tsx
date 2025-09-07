"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Calendar, MapPin, ArrowRight, Filter, Eye, Heart } from "lucide-react"

interface PortfolioGridProps {
  lang: string
  dict: any
}

export default function PortfolioGrid({ lang, dict }: PortfolioGridProps) {
  const [mounted, setMounted] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [filteredProjects, setFilteredProjects] = useState<any[]>([])
  const [likedProjects, setLikedProjects] = useState<Set<string>>(new Set())
  const isRTL = lang === "fa"

  const projects = [
    {
      id: "modern-apartment-beyoglu",
      title:
        lang === "fa"
          ? "آپارتمان مدرن در بی‌اوغلو"
          : lang === "tr"
            ? "Beyoğlu'da Modern Daire"
            : "Modern Apartment in Beyoğlu",
      category: "residential",
      location: lang === "fa" ? "بی‌اوغلو، استانبول" : lang === "tr" ? "Beyoğlu, İstanbul" : "Beyoğlu, Istanbul",
      completion_date: "2024-01-15",
      area: "120m²",
      duration: lang === "fa" ? "3 ماه" : lang === "tr" ? "3 Ay" : "3 Months",
      budget: "€45,000",
      image: "/images/projects/modern-living-1.jpg",
      tags: ["modern", "apartment", "renovation"],
      featured: true,
      views: 1250,
      likes: 89,
      description:
        lang === "fa"
          ? "بازسازی کامل آپارتمان با طراحی معاصر و استفاده از مواد باکیفیت"
          : lang === "tr"
            ? "Çağdaş tasarım ve kaliteli malzemelerle dairenin komple renovasyonu"
            : "Complete apartment renovation with contemporary design and quality materials",
    },
    {
      id: "luxury-office-levent",
      title: lang === "fa" ? "دفتر لوکس در لونت" : lang === "tr" ? "Levent'te Lüks Ofis" : "Luxury Office in Levent",
      category: "commercial",
      location: lang === "fa" ? "لونت، استانبول" : lang === "tr" ? "Levent, İstanbul" : "Levent, Istanbul",
      completion_date: "2024-01-10",
      area: "500m²",
      duration: lang === "fa" ? "4 ماه" : lang === "tr" ? "4 Ay" : "4 Months",
      budget: "€120,000",
      image: "/images/projects/office-space-1.jpg",
      tags: ["office", "corporate", "modern"],
      featured: true,
      views: 980,
      likes: 67,
      description:
        lang === "fa"
          ? "طراحی دفتر شرکتی مدرن با فضاهای باز و امکانات پیشرفته"
          : lang === "tr"
            ? "Açık alanlar ve gelişmiş olanaklar ile modern kurumsal ofis tasarımı"
            : "Modern corporate office design with open spaces and advanced facilities",
    },
    {
      id: "boutique-hotel-sultanahmet",
      title:
        lang === "fa"
          ? "هتل بوتیک در سلطان احمد"
          : lang === "tr"
            ? "Sultanahmet'te Butik Otel"
            : "Boutique Hotel in Sultanahmet",
      category: "hospitality",
      location:
        lang === "fa" ? "سلطان احمد، استانبول" : lang === "tr" ? "Sultanahmet, İstanbul" : "Sultanahmet, Istanbul",
      completion_date: "2023-12-20",
      area: "800m²",
      duration: lang === "fa" ? "6 ماه" : lang === "tr" ? "6 Ay" : "6 Months",
      budget: "€200,000",
      image: "/images/projects/hotel-lobby-1.jpg",
      tags: ["hotel", "luxury", "traditional"],
      featured: false,
      views: 1340,
      likes: 95,
      description:
        lang === "fa"
          ? "هتل بوتیک با ترکیب طراحی سنتی و مدرن در قلب استانبول تاریخی"
          : lang === "tr"
            ? "Tarihi İstanbul'un kalbinde geleneksel ve modern tasarımın birleşimi"
            : "Boutique hotel combining traditional and modern design in historic Istanbul",
    },
    {
      id: "restaurant-kadikoy",
      title: lang === "fa" ? "رستوران در کادیکوی" : lang === "tr" ? "Kadıköy'de Restoran" : "Restaurant in Kadıköy",
      category: "restaurant",
      location: lang === "fa" ? "کادیکوی، استانبول" : lang === "tr" ? "Kadıköy, İstanbul" : "Kadıköy, Istanbul",
      completion_date: "2023-11-15",
      area: "300m²",
      duration: lang === "fa" ? "2 ماه" : lang === "tr" ? "2 Ay" : "2 Months",
      budget: "€80,000",
      image: "/images/projects/restaurant-interior-1.jpg",
      tags: ["restaurant", "cozy", "modern"],
      featured: false,
      views: 1180,
      likes: 82,
      description:
        lang === "fa"
          ? "رستوران با فضای گرم و دعوت‌کننده و طراحی داخلی منحصر به فرد"
          : lang === "tr"
            ? "Sıcak ve davetkar atmosfer ile eşsiz iç tasarıma sahip restoran"
            : "Restaurant with warm, inviting atmosphere and unique interior design",
    },
    {
      id: "penthouse-nisantasi",
      title:
        lang === "fa" ? "پنت‌هاوس در نیشان‌تاشی" : lang === "tr" ? "Nişantaşı'nda Penthouse" : "Penthouse in Nişantaşı",
      category: "residential",
      location: lang === "fa" ? "نیشان‌تاشی، استانبول" : lang === "tr" ? "Nişantaşı, İstanbul" : "Nişantaşı, Istanbul",
      completion_date: "2023-10-30",
      area: "250m²",
      duration: lang === "fa" ? "5 ماه" : lang === "tr" ? "5 Ay" : "5 Months",
      budget: "€150,000",
      image: "/images/projects/penthouse-view-1.jpg",
      tags: ["penthouse", "luxury", "view"],
      featured: true,
      views: 1450,
      likes: 112,
      description:
        lang === "fa"
          ? "پنت‌هاوس لوکس با نمای بی‌نظیر شهر و امکانات درجه یک"
          : lang === "tr"
            ? "Eşsiz şehir manzarası ve birinci sınıf olanaklar ile lüks penthouse"
            : "Luxury penthouse with stunning city views and premium amenities",
    },
    {
      id: "cafe-besiktas",
      title: lang === "fa" ? "کافه در بشیکتاش" : lang === "tr" ? "Beşiktaş'ta Kafe" : "Cafe in Beşiktaş",
      category: "restaurant",
      location: lang === "fa" ? "بشیکتاش، استانبول" : lang === "tr" ? "Beşiktaş, İstanbul" : "Beşiktaş, Istanbul",
      completion_date: "2023-09-10",
      area: "150m²",
      duration: lang === "fa" ? "1.5 ماه" : lang === "tr" ? "1.5 Ay" : "1.5 Months",
      budget: "€35,000",
      image: "/images/projects/cafe-interior-1.jpg",
      tags: ["cafe", "cozy", "minimalist"],
      featured: false,
      views: 945,
      likes: 63,
      description:
        lang === "fa"
          ? "کافه مینیمال با طراحی دنج و فضای آرام برای مطالعه و کار"
          : lang === "tr"
            ? "Çalışma ve okuma için sakin alan ile samimi tasarımlı minimal kafe"
            : "Minimal cafe with cozy design and peaceful space for study and work",
    },
  ]

  const categories = [
    { id: "all", name: lang === "fa" ? "همه" : lang === "tr" ? "Tümü" : "All" },
    { id: "residential", name: lang === "fa" ? "مسکونی" : lang === "tr" ? "Konut" : "Residential" },
    { id: "commercial", name: lang === "fa" ? "تجاری" : lang === "tr" ? "Ticari" : "Commercial" },
    { id: "hospitality", name: lang === "fa" ? "هتلداری" : lang === "tr" ? "Otelcilik" : "Hospitality" },
    { id: "restaurant", name: lang === "fa" ? "رستوران" : lang === "tr" ? "Restoran" : "Restaurant" },
  ]

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredProjects(projects)
    } else {
      setFilteredProjects(projects.filter((project) => project.category === selectedCategory))
    }
  }, [selectedCategory])

  const toggleLike = (projectId: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const newLiked = new Set(likedProjects)
    if (newLiked.has(projectId)) {
      newLiked.delete(projectId)
    } else {
      newLiked.add(projectId)
    }
    setLikedProjects(newLiked)
  }

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    )
  }

  return (
    <div className={`${isRTL ? "rtl" : ""}`}>
      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-6 py-3 rounded-lg transition-all duration-300 text-sm font-medium ${
              selectedCategory === category.id
                ? "bg-orange-500 text-white shadow-lg"
                : "bg-slate-800/50 text-gray-300 hover:bg-slate-700/50 border border-slate-700"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence>
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <Link href={`/${lang}/portfolio/${project.id}`}>
                <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-700/50 hover:border-orange-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/10">
                  {/* Project Image */}
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={project.image || "/placeholder.svg?height=300&width=400"}
                      alt={project.title}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />

                    {/* Featured Badge */}
                    {project.featured && (
                      <div className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {lang === "fa" ? "ویژه" : lang === "tr" ? "Öne Çıkan" : "Featured"}
                      </div>
                    )}

                    {/* Budget Badge */}
                    <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm font-medium">
                      {project.budget}
                    </div>

                    {/* Category Badge */}
                    <div className="absolute bottom-4 left-4 bg-slate-800/80 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm capitalize">
                      {categories.find((c) => c.id === project.category)?.name || project.category}
                    </div>

                    {/* Stats Overlay */}
                    <div className="absolute bottom-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full text-white text-xs">
                        <Eye className="w-3 h-3" />
                        {project.views}
                      </div>
                      <button
                        onClick={(e) => toggleLike(project.id, e)}
                        className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs transition-colors ${
                          likedProjects.has(project.id)
                            ? "bg-red-500/80 text-white"
                            : "bg-black/50 backdrop-blur-sm text-white hover:bg-red-500/80"
                        }`}
                      >
                        <Heart className={`w-3 h-3 ${likedProjects.has(project.id) ? "fill-current" : ""}`} />
                        {project.likes + (likedProjects.has(project.id) ? 1 : 0)}
                      </button>
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-orange-400 transition-colors duration-300">
                      {project.title}
                    </h3>

                    <p className="text-gray-400 mb-4 line-clamp-2">{project.description}</p>

                    {/* Project Details */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-300">
                        <MapPin className="w-4 h-4 mr-2 text-orange-400" />
                        {project.location}
                      </div>
                      <div className="flex items-center text-sm text-gray-300">
                        <Calendar className="w-4 h-4 mr-2 text-orange-400" />
                        {new Date(project.completion_date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-300">
                        <span>{project.area}</span>
                        <span>{project.duration}</span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="px-2 py-1 bg-orange-500/20 text-orange-400 rounded text-xs">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="flex items-center justify-between">
                      <span className="text-orange-400 font-medium group-hover:text-orange-300 transition-colors">
                        {dict?.common?.view_details || (lang === "fa" ? "مشاهده جزئیات" : "View Details")}
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
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-20">
          <Filter className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">
            {lang === "fa" ? "پروژه‌ای یافت نشد" : lang === "tr" ? "Proje bulunamadı" : "No projects found"}
          </h3>
          <p className="text-gray-400">
            {lang === "fa"
              ? "در این دسته‌بندی پروژه‌ای وجود ندارد"
              : lang === "tr"
                ? "Bu kategoride proje bulunmuyor"
                : "No projects available in this category"}
          </p>
        </motion.div>
      )}

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mt-20 text-center"
      >
        <div className="bg-gradient-to-r from-orange-500/10 to-purple-500/10 rounded-3xl p-12 border border-orange-500/20">
          <h3 className="text-3xl font-bold text-white mb-4">
            {lang === "fa" ? "پروژه خود را شروع کنید" : lang === "tr" ? "Projenizi Başlatın" : "Start Your Project"}
          </h3>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            {lang === "fa"
              ? "با تیم حرفه‌ای ما، فضای رویایی خود را خلق کنید"
              : lang === "tr"
                ? "Profesyonel ekibimizle hayalinizdeki mekanı yaratın"
                : "Create your dream space with our professional team"}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${lang}/contact`}
              className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors font-semibold"
            >
              {dict?.common?.start_project || (lang === "fa" ? "شروع پروژه" : "Start Project")}
            </Link>
            <Link
              href={`/${lang}/services`}
              className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors font-semibold"
            >
              {dict?.common?.view_services || (lang === "fa" ? "مشاهده خدمات" : "View Services")}
            </Link>
          </div>
        </div>
      </motion.section>
    </div>
  )
}
