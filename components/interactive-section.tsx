"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import type { ReactNode } from "react"
import { useRef } from "react"

interface InteractiveSectionProps {
  children: ReactNode
  className?: string
  delay?: number
}

export default function InteractiveSection({ children, className = "", delay = 0 }: InteractiveSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  // Parallax effect
  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  return (
    <motion.section
      ref={sectionRef}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8, delay }}
      viewport={{ once: true, margin: "-100px" }}
      className={`relative ${className}`}
    >
      {/* Parallax background element */}
      <motion.div style={{ y }} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-400/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </motion.div>

      {children}
    </motion.section>
  )
}
