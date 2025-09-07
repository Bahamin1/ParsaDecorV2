"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface ModernSectionProps {
  children: ReactNode
  className?: string
  delay?: number
}

export default function ModernSection({ children, className = "", delay = 0 }: ModernSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      viewport={{ once: true, margin: "-100px" }}
      className={`relative ${className}`}
    >
      {children}
    </motion.section>
  )
}
