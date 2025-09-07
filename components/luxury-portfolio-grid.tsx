"use client"

import { motion } from "framer-motion"
import { ExternalLink, ArrowRight } from "lucide-react"
import Link from "next/link"

interface PortfolioGridProps {
  lang: string
  dict: any
}

export default function LuxuryPortfolioGrid({ lang, dict }: PortfolioGridProps) {
  const isRTL = lang === "fa"

  const projects = [
    {
      id: 1,
      title: "Modern Penthouse",
      category: "Residential",
      image: "/images/projects/modern-living-1.jpg",
      description: "Luxury penthouse with panoramic city views",
    },
    {
      id: 2,
      title: "Executive Office",
      category: "Commercial",
      image: "/images/projects/office-space-1.jpg",
      description: "Contemporary office space design",
    },
    {
      id: 3,
      title: "Boutique Hotel",
      category: "Hospitality",
      image: "/images/projects/hotel-lobby-1.jpg",
      description: "Elegant hotel lobby and reception area",
    },
    {
      id: 4,
      title: "Designer Kitchen",
      category: "Residential",
      image: "/images/projects/modern-kitchen-1.jpg",
      description: "State-of-the-art kitchen design",
    },
    {
      id: 5,
      title: "Luxury Bedroom",
      category: "Residential",
      image: "/images/projects/luxury-bedroom-1.jpg",
      description: "Serene and sophisticated bedroom suite",
    },
    {
      id: 6,
      title: "Restaurant Interior",
      category: "Commercial",
      image: "/images/projects/restaurant-interior-1.jpg",
      description: "Warm and inviting restaurant atmosphere",
    },
  ]

  return (
    <section className={`py-12 sm:py-20 bg-gray-50 ${isRTL ? "rtl" : ""}`}>
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            {dict?.portfolio?.title || "Our Portfolio"}
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            {dict?.portfolio?.subtitle || "Explore our collection of stunning interior design projects"}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative h-48 sm:h-64 overflow-hidden">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-3 sm:top-4 right-3 sm:right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                    <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>

              <div className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <span className="px-2 sm:px-3 py-1 bg-orange-100 text-orange-600 text-xs sm:text-sm font-medium rounded-full">
                    {project.category}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-500 transition-colors">
                  {project.title}
                </h3>

                <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">{project.description}</p>

                <button className="flex items-center space-x-2 rtl:space-x-reverse text-orange-500 font-medium group-hover:text-orange-600 transition-colors text-sm sm:text-base">
                  <span>{dict?.portfolio?.view_project || "View Project"}</span>
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            href={`/${lang}/portfolio`}
            className="inline-flex items-center space-x-2 rtl:space-x-reverse px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-full hover:scale-105 transition-transform duration-300 text-sm sm:text-base"
          >
            <span>{dict?.portfolio?.view_all || "View All Projects"}</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
