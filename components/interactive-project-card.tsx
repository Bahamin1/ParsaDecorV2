"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useState } from "react"
import { ArrowRight } from "lucide-react"

interface InteractiveProjectCardProps {
  project: {
    id: number
    title: string
    category: string
    image: string
  }
  index: number
  lang: string
}

export default function InteractiveProjectCard({ project, index, lang }: InteractiveProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      viewport={{ once: true }}
      className="group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        whileHover={{ y: -10 }}
        className="relative overflow-hidden rounded-2xl bg-slate-800/50 backdrop-blur-sm border border-cyan-400/20 h-full"
      >
        <div className="relative h-64 overflow-hidden">
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            width={600}
            height={400}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />

          {/* Interactive overlay that appears on hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={false}
          />
        </div>

        <div className="p-6">
          <p className="text-sm text-cyan-400 font-light mb-2">{project.category}</p>
          <h3 className="text-xl font-light text-white group-hover:text-cyan-400 transition-colors duration-300">
            {project.title}
          </h3>

          {/* View details button that appears on hover */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
            transition={{ duration: 0.3 }}
            className="mt-4"
          >
            <a
              href={`/${lang}/portfolio/${project.id}`}
              className="inline-flex items-center text-sm text-cyan-400 hover:text-white transition-colors"
            >
              <span className="mr-2">View Details</span>
              <motion.div animate={{ x: isHovered ? 5 : 0 }} transition={{ duration: 0.3 }}>
                <ArrowRight className="w-4 h-4" />
              </motion.div>
            </a>
          </motion.div>
        </div>

        {/* Animated border effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          animate={{
            boxShadow: isHovered
              ? "0 0 0 1px rgba(34, 211, 238, 0.3), 0 0 30px rgba(34, 211, 238, 0.2)"
              : "0 0 0 0 rgba(34, 211, 238, 0)",
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  )
}
