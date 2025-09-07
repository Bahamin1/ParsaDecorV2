"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useState, useEffect, useRef } from "react"
import { ChevronDown, Sparkles, Zap, Star } from "lucide-react"
import EnhancedHeroButtons from "./enhanced-hero-buttons"

interface EnhancedHeroLayoutProps {
  lang: string
  dict: any
}

export default function EnhancedHeroLayout({ lang, dict }: EnhancedHeroLayoutProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const isRTL = lang === "fa"

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])
  const y = useTransform(scrollYProgress, [0, 1], [0, -100])

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section
      ref={containerRef}
      className={`relative min-h-screen flex items-center justify-center overflow-hidden ${isRTL ? "rtl" : ""}`}
      style={{
        background: "linear-gradient(135deg, #ff0080 0%, #ff4500 50%, #ffd700 100%)",
      }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/30 rounded-full"
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}

        {/* Gradient Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-pink-400/30 to-purple-400/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-yellow-400/30 to-red-400/30 rounded-full blur-3xl"
        />
      </div>

      <motion.div style={{ opacity, scale, y }} className="w-full relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-6xl mx-auto">
            {/* Logo Integration */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: isLoaded ? 1 : 0, rotate: isLoaded ? 0 : -180 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="mb-8"
            >
              <div className="relative inline-block">
                <img
                  src="/images/parsa-decor-logo-new.png"
                  alt="Parsa Decor"
                  className="h-24 w-24 mx-auto rounded-full shadow-2xl"
                />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="absolute inset-0 rounded-full border-4 border-white/30 border-t-white"
                />
              </div>
            </motion.div>

            {/* Main Title */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 50 }}
              transition={{ duration: 1.2, delay: 0.8 }}
              className="mb-8"
            >
              {lang === "fa" ? (
                <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white leading-none">
                  <motion.span
                    className="block"
                    animate={{
                      textShadow: [
                        "0 0 20px rgba(255,255,255,0.5)",
                        "0 0 40px rgba(255,255,255,0.8)",
                        "0 0 20px rgba(255,255,255,0.5)",
                      ],
                    }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    پارسا
                  </motion.span>
                  <motion.span
                    className="block text-yellow-200"
                    animate={{
                      textShadow: [
                        "0 0 20px rgba(255,215,0,0.5)",
                        "0 0 40px rgba(255,215,0,0.8)",
                        "0 0 20px rgba(255,215,0,0.5)",
                      ],
                    }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
                  >
                    دکور
                  </motion.span>
                </h1>
              ) : (
                <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white leading-none">
                  <motion.span
                    className="block"
                    animate={{
                      textShadow: [
                        "0 0 20px rgba(255,255,255,0.5)",
                        "0 0 40px rgba(255,255,255,0.8)",
                        "0 0 20px rgba(255,255,255,0.5)",
                      ],
                    }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    PARSA
                  </motion.span>
                  <motion.span
                    className="block text-yellow-200"
                    animate={{
                      textShadow: [
                        "0 0 20px rgba(255,215,0,0.5)",
                        "0 0 40px rgba(255,215,0,0.8)",
                        "0 0 20px rgba(255,215,0,0.5)",
                      ],
                    }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
                  >
                    DECOR
                  </motion.span>
                </h1>
              )}
            </motion.div>

            {/* Subtitle */}
            <motion.div
              initial={{ opacity: 0, x: isRTL ? -100 : 100 }}
              animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : isRTL ? -100 : 100 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="mb-12"
            >
              <div className="max-w-2xl mx-auto">
                <p className="text-xl md:text-2xl text-white/90 font-light leading-relaxed">
                  {dict?.home?.hero?.subtitle || "طراحی داخلی مدرن و حرفه‌ای"}
                </p>
                <div className="flex items-center justify-center space-x-4 rtl:space-x-reverse mt-4">
                  {[Sparkles, Zap, Star].map((Icon, index) => (
                    <motion.div
                      key={index}
                      animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 180, 360],
                      }}
                      transition={{
                        duration: 2,
                        delay: index * 0.3,
                        repeat: Number.POSITIVE_INFINITY,
                      }}
                    >
                      <Icon className="w-6 h-6 text-yellow-200" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
              transition={{ duration: 0.8, delay: 1.5 }}
            >
              <EnhancedHeroButtons lang={lang} dict={dict} />
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 2 }}
          className={`absolute bottom-8 ${isRTL ? "right-8" : "left-8"}`}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className={`flex items-center ${isRTL ? "space-x-reverse space-x-3" : "space-x-3"} text-white/80`}
          >
            <div className="w-px h-16 bg-gradient-to-b from-transparent via-white/60 to-transparent" />
            <span className="text-sm font-light">{dict?.common?.scroll || "اسکرول"}</span>
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
