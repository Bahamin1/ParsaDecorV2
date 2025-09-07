"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useState, useEffect, useRef } from "react"
import { ChevronDown, Wrench, Hammer, Cog } from "lucide-react"
import { useRouter } from "next/navigation"

interface ModernHeroLayoutProps {
  lang: string
  dict: any
}

export default function ModernHeroLayout({ lang, dict }: ModernHeroLayoutProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <motion.div style={{ opacity, scale }} className="w-full">
        {/* Asymmetric Layout Grid */}
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-12 gap-4 min-h-screen items-center">
            {/* Left Side - Construction Tools Icons */}
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: isLoaded ? 0 : -100, opacity: isLoaded ? 1 : 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="col-span-2 hidden lg:flex flex-col space-y-8"
            >
              {[Wrench, Hammer, Cog].map((Icon, index) => (
                <motion.div
                  key={index}
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 3,
                    delay: index * 0.5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                  className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center border border-orange-500/30"
                >
                  <Icon className="w-6 h-6 text-orange-400" />
                </motion.div>
              ))}
            </motion.div>

            {/* Center Content - Diagonal Layout */}
            <div className="col-span-12 lg:col-span-8">
              <div className="relative">
                {/* Main Title - Diagonal Positioning */}
                <motion.div
                  initial={{ opacity: 0, y: 50, rotateX: 45 }}
                  animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 50, rotateX: isLoaded ? 0 : 45 }}
                  transition={{ duration: 1.2, delay: 0.8 }}
                  className="transform -skew-y-2 mb-8"
                >
                  <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white leading-none">
                    <span className="block transform skew-y-2">PARSA</span>
                    <span className="block text-orange-400 transform skew-y-2 ml-8 md:ml-16">DECOR</span>
                  </h1>
                </motion.div>

                {/* Subtitle - Offset Layout */}
                <motion.div
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : 100 }}
                  transition={{ duration: 1, delay: 1.2 }}
                  className="ml-8 md:ml-24 mb-12"
                >
                  <div className="max-w-md">
                    <p className="text-lg md:text-xl text-gray-300 font-light leading-relaxed">
                      {dict.home.hero.subtitle}
                    </p>
                  </div>
                </motion.div>

                {/* CTA Buttons - Staggered Layout */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
                  transition={{ duration: 0.8, delay: 1.5 }}
                  className="flex flex-col md:flex-row gap-6 ml-4 md:ml-12"
                >
                  <motion.button
                    onClick={() => router.push(`/${lang}/portfolio`)}
                    whileHover={{ scale: 1.05, skewX: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative px-8 py-4 bg-orange-500 text-white font-medium overflow-hidden transform hover:skew-x-2 transition-transform duration-300"
                    style={{ clipPath: "polygon(0 0, calc(100% - 20px) 0, 100% 100%, 20px 100%)" }}
                  >
                    <span className="relative z-10">{dict.home.hero.cta1}</span>
                    <motion.div
                      className="absolute inset-0 bg-orange-600"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "0%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.button>

                  <motion.button
                    onClick={() => router.push(`/${lang}/contact`)}
                    whileHover={{ scale: 1.05, skewX: 2 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative px-8 py-4 bg-transparent border-2 border-orange-400 text-orange-400 font-medium overflow-hidden transform hover:-skew-x-2 transition-transform duration-300"
                    style={{ clipPath: "polygon(20px 0, 100% 0, calc(100% - 20px) 100%, 0 100%)" }}
                  >
                    <span className="relative z-10">{dict.home.hero.cta2}</span>
                    <motion.div
                      className="absolute inset-0 bg-orange-400"
                      initial={{ x: "100%" }}
                      whileHover={{ x: "0%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.button>
                </motion.div>
              </div>
            </div>

            {/* Right Side - Decorative Elements */}
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: isLoaded ? 0 : 100, opacity: isLoaded ? 1 : 0 }}
              transition={{ duration: 1, delay: 0.7 }}
              className="col-span-2 hidden lg:flex flex-col items-end space-y-6"
            >
              {/* Geometric shapes representing construction */}
              <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 transform rotate-45" />
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full" />
              <div className="w-20 h-4 bg-gradient-to-r from-orange-400 to-red-500 transform -rotate-12" />
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator - Modern Design */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 2 }}
          className="absolute bottom-8 left-8"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="flex items-center space-x-3 text-orange-400"
          >
            <div className="w-px h-16 bg-gradient-to-b from-transparent via-orange-400 to-transparent" />
            <span className="text-sm font-light writing-mode-vertical-rl transform rotate-180">SCROLL</span>
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
