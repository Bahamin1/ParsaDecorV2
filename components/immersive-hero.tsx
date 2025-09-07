"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import AnimatedLogo from "./animated-logo"
import { ChevronDown } from "lucide-react"

interface ImmersiveHeroProps {
  lang: string
  dict: any
}

export default function ImmersiveHero({ lang, dict }: ImmersiveHeroProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 500)
    const contentTimer = setTimeout(() => setShowContent(true), 2000)
    return () => {
      clearTimeout(timer)
      clearTimeout(contentTimer)
    }
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Main logo animation */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: isLoaded ? 1 : 0, opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="mb-8"
      >
        <AnimatedLogo />
      </motion.div>

      {/* Brand name */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
        transition={{ duration: 1, delay: 1 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl md:text-6xl font-light text-white mb-4 tracking-wider">PARSA DECOR</h1>
        <div className="w-24 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto" />
      </motion.div>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 20 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="text-lg md:text-xl text-gray-300 text-center max-w-2xl px-4 mb-12 font-light"
      >
        {dict.home.hero.subtitle}
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 20 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="flex flex-col sm:flex-row gap-6 mb-16"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group relative px-8 py-4 bg-transparent border border-cyan-400/50 text-cyan-400 rounded-full font-medium overflow-hidden transition-all duration-300 hover:border-cyan-400"
        >
          <span className="relative z-10">{dict.home.hero.cta1}</span>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-500/20"
            initial={{ x: "-100%" }}
            whileHover={{ x: "0%" }}
            transition={{ duration: 0.3 }}
          />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group relative px-8 py-4 bg-gradient-to-r from-cyan-400 to-blue-500 text-white rounded-full font-medium overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/25"
        >
          <span className="relative z-10">{dict.home.hero.cta2}</span>
          <motion.div
            className="absolute inset-0 bg-white/20"
            initial={{ scale: 0 }}
            whileHover={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          />
        </motion.button>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showContent ? 1 : 0 }}
        transition={{ duration: 0.8, delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="flex flex-col items-center text-gray-400"
        >
          <span className="text-sm mb-2 font-light">Scroll to explore</span>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>

      {/* Ambient light effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
    </section>
  )
}
