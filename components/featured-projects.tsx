"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ArrowLeft } from "lucide-react"
import AnimatedSection from "./animated-section"

interface FeaturedProjectsProps {
  lang: string
  dict: any
}

export default function FeaturedProjects({ lang, dict }: FeaturedProjectsProps) {
  const isRTL = lang === "fa"

  const projects = [
    {
      id: 1,
      title:
        lang === "fa"
          ? "آپارتمان لوکس در بی‌اوغلو"
          : lang === "tr"
            ? "Beyoğlu'nda Lüks Daire"
            : "Luxury Apartment in Beyoğlu",
      category: lang === "fa" ? "مسکونی" : lang === "tr" ? "Konut" : "Residential",
      image: "/images/featured/beyoglu-apartment.jpg",
      location: lang === "fa" ? "بی‌اوغلو، استانبول" : lang === "tr" ? "Beyoğlu, İstanbul" : "Beyoğlu, Istanbul",
    },
    {
      id: 2,
      title: lang === "fa" ? "دفتر مدرن در لونت" : lang === "tr" ? "Levent'te Modern Ofis" : "Modern Office in Levent",
      category: lang === "fa" ? "اداری" : lang === "tr" ? "Ofis" : "Office",
      image: "/images/featured/levent-office.jpg",
      location: lang === "fa" ? "لونت، استانبول" : lang === "tr" ? "Levent, İstanbul" : "Levent, Istanbul",
    },
    {
      id: 3,
      title:
        lang === "fa"
          ? "هتل بوتیک در سلطان احمد"
          : lang === "tr"
            ? "Sultanahmet'te Butik Otel"
            : "Boutique Hotel in Sultanahmet",
      category: lang === "fa" ? "هتلداری" : lang === "tr" ? "Otelcilik" : "Hospitality",
      image: "/images/featured/sultanahmet-hotel.jpg",
      location:
        lang === "fa" ? "سلطان احمد، استانبول" : lang === "tr" ? "Sultanahmet, İstanbul" : "Sultanahmet, Istanbul",
    },
  ]

  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight

  return (
    <AnimatedSection className={`py-20 bg-[#F2F2F2] ${isRTL ? "rtl" : ""}`}>
      <div className="container mx-auto px-4">
        <div className={`text-center mb-16 ${isRTL ? "text-right" : "text-left"} md:text-center`}>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1E1E1E] mb-6">{dict.home.featured.title}</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">{dict.home.featured.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-2xl mb-4">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  width={600}
                  height={400}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
                <div className="absolute top-4 right-4 bg-[#EA3E27] text-white px-3 py-1 rounded-full text-sm font-medium">
                  {project.category}
                </div>
              </div>
              <div className={`space-y-2 ${isRTL ? "text-right" : "text-left"}`}>
                <h3 className="text-xl font-semibold text-[#1E1E1E] group-hover:text-[#EA3E27] transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-500">{project.location}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href={`/${lang}/portfolio`}
            className={`group inline-flex items-center space-x-2 bg-[#EA3E27] text-white px-8 py-4 rounded-full font-medium hover:bg-[#d63426] transition-all duration-300 ${isRTL ? "flex-row-reverse space-x-reverse" : ""}`}
          >
            <span>{dict.home.featured.view_all}</span>
            <ArrowIcon
              className={`w-5 h-5 group-hover:translate-x-1 transition-transform ${isRTL ? "group-hover:-translate-x-1" : ""}`}
            />
          </Link>
        </div>
      </div>
    </AnimatedSection>
  )
}
