"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import ModernSection from "./modern-section"

interface ModernFeaturedProjectsProps {
  lang: string
  dict: any
}

export default function ModernFeaturedProjects({ lang, dict }: ModernFeaturedProjectsProps) {
  const projects = [
    {
      id: 1,
      title:
        lang === "fa"
          ? "آپارتمان مدرن در بی‌اوغلو"
          : lang === "tr"
            ? "Beyoğlu'nda Modern Daire"
            : "Modern Apartment in Beyoğlu",
      category: lang === "fa" ? "مسکونی" : lang === "tr" ? "Konut" : "Residential",
      image: "/images/projects/modern-living-1.jpg",
    },
    {
      id: 2,
      title: lang === "fa" ? "دفتر لوکس در لونت" : lang === "tr" ? "Levent'te Lüks Ofis" : "Luxury Office in Levent",
      category: lang === "fa" ? "اداری" : lang === "tr" ? "Ofis" : "Office",
      image: "/images/projects/office-space-1.jpg",
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
      image: "/images/projects/hotel-lobby-1.jpg",
    },
  ]

  return (
    <ModernSection className="py-32 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-extralight text-white mb-6 tracking-wider">
            {dict.home.featured.title}
          </h2>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto mb-8" />
          <p className="text-xl text-gray-300 max-w-2xl mx-auto font-light">{dict.home.featured.subtitle}</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-2xl bg-slate-800/50 backdrop-blur-sm border border-cyan-400/20">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                </div>

                <div className="p-6">
                  <p className="text-sm text-cyan-400 font-light mb-2">{project.category}</p>
                  <h3 className="text-xl font-light text-white group-hover:text-cyan-400 transition-colors duration-300">
                    {project.title}
                  </h3>
                </div>

                {/* Hover effect overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                  initial={false}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </ModernSection>
  )
}
