"use client"

import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"

interface InteractiveFeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
  index: number
}

export default function InteractiveFeatureCard({ icon: Icon, title, description, index }: InteractiveFeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      className="group text-center"
    >
      <div className="relative mb-8">
        {/* Icon container with glow effect */}
        <motion.div
          className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-cyan-400/20 to-blue-500/20 backdrop-blur-sm border border-cyan-400/30 flex items-center justify-center group-hover:border-cyan-400 transition-all duration-300"
          whileHover={{ scale: 1.1 }}
        >
          <Icon className="w-10 h-10 text-cyan-400 group-hover:text-white transition-colors duration-300" />
        </motion.div>

        {/* Floating particles */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            animate={{
              y: [0, -20, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.7,
            }}
            style={{
              left: `${30 + i * 20}%`,
              top: "10%",
            }}
          />
        ))}
      </div>

      <h3 className="text-xl font-light text-white mb-4 group-hover:text-cyan-400 transition-colors duration-300">
        {title}
      </h3>
      <p className="text-gray-400 leading-relaxed font-light">{description}</p>

      {/* Interactive hover effect */}
      <motion.div
        className="mt-6 mx-auto w-0 h-px bg-cyan-400/50"
        animate={{
          width: "0%",
        }}
        whileHover={{
          width: "30%",
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  )
}
