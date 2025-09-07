"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useState } from "react"
import { ArrowUpRight, Hammer, Wrench } from "lucide-react"

interface AsymmetricProjectGridProps {
  lang: string
  dict: any
}

export default function AsymmetricProjectGrid({ lang, dict }: AsymmetricProjectGridProps) {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)

  const projects = [
    {
      id: 1,
      title: "Modern Apartment in Beyoğlu",
      category: "Residential",
      image: "/placeholder.svg?height=400&width=600",
      size: "large",
    },
    {
      id: 2,
      title: "Luxury Office in Levent",
      category: "Commercial",
      image: "/placeholder.svg?height=400&width=600",
      size: "medium",
    },
    {
      id: 3,
      title: "Boutique Hotel in Sultanahmet",
      category: "Hospitality",
      image: "/placeholder.svg?height=400&width=600",
      size: "small",
    },
    {
      id: 4,
      title: "Creative Studio in Kadıköy",
      category: "Commercial",
      image: "/placeholder.svg?height=400&width=600",
      size: "medium",
    },
    {
      id: 5,
      title: "Penthouse in Nişantaşı",
      category: "Residential",
      image: "/placeholder.svg?height=400&width=600",
      size: "large",
    },
  ]

  const getGridClass = (size: string, index: number) => {
    const patterns = [
      "col-span-12 md:col-span-8 row-span-2", // large
      "col-span-12 md:col-span-4 row-span-1", // medium
      "col-span-12 md:col-span-4 row-span-1", // small
      "col-span-12 md:col-span-6 row-span-1", // medium
      "col-span-12 md:col-span-6 row-span-2", // large
    ]
    return patterns[index] || "col-span-12 md:col-span-4 row-span-1"
  }

  return (
    <section className="py-32 relative">
      <div className="container mx-auto px-4">
        {/* Section Header - Asymmetric */}
        <div className="grid grid-cols-12 gap-8 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="col-span-12 md:col-span-8"
          >
            <h2 className="text-5xl md:text-7xl font-black text-white mb-6">
              <span className="block">FEATURED</span>
              <span className="block text-orange-400 ml-8">PROJECTS</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="col-span-12 md:col-span-4 flex items-end"
          >
            <div className="flex space-x-4">
              <Hammer className="w-8 h-8 text-orange-400" />
              <Wrench className="w-8 h-8 text-yellow-400" />
            </div>
          </motion.div>
        </div>

        {/* Asymmetric Grid */}
        <div className="grid grid-cols-12 gap-6 auto-rows-fr">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={getGridClass(project.size, index)}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className="group relative h-full min-h-[300px] overflow-hidden bg-slate-800/50 backdrop-blur-sm border border-orange-500/20">
                {/* Diagonal Cut Design */}
                <div
                  className="absolute inset-0"
                  style={{
                    clipPath:
                      index % 2 === 0
                        ? "polygon(0 0, calc(100% - 40px) 0, 100% 100%, 0 100%)"
                        : "polygon(40px 0, 100% 0, 100% 100%, 0 100%)",
                  }}
                >
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="inline-block px-3 py-1 bg-orange-500/80 text-white text-xs font-medium rounded mb-2">
                      {project.category}
                    </span>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
                      {project.title}
                    </h3>

                    {/* View Project Button */}
                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{
                        opacity: hoveredProject === project.id ? 1 : 0,
                        scale: hoveredProject === project.id ? 1 : 0.8,
                      }}
                      transition={{ duration: 0.2 }}
                      className="inline-flex items-center space-x-2 text-orange-400 hover:text-white transition-colors"
                    >
                      <span className="text-sm font-medium">View Project</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>

                {/* Construction-themed corner accent */}
                <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button - Unique Design */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 flex justify-center"
        >
          <button
            className="group relative px-12 py-4 bg-transparent border-2 border-orange-400 text-orange-400 font-bold overflow-hidden transform hover:scale-105 transition-transform duration-300"
            style={{ clipPath: "polygon(20px 0, 100% 0, calc(100% - 20px) 100%, 0 100%)" }}
          >
            <span className="relative z-10">VIEW ALL PROJECTS</span>
            <motion.div
              className="absolute inset-0 bg-orange-400"
              initial={{ x: "-100%" }}
              whileHover={{ x: "0%" }}
              transition={{ duration: 0.3 }}
            />
          </button>
        </motion.div>
      </div>
    </section>
  )
}
