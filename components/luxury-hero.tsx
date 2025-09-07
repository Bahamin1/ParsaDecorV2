"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { ChevronDown, Play, Sparkles, Star, Zap } from "lucide-react"
import { useEffect, useRef, useState } from "react"

interface LuxuryHeroProps {
  lang: string
  dict: any
}

export default function LuxuryHero({ lang, dict }: LuxuryHeroProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const isRTL = lang === "fa"

  // Hero background images
  const heroImages = [
    "/images/gallery/modern-living-room.jpg",
    "/images/gallery/luxury-bedroom.jpg",
    "/images/gallery/modern-kitchen.jpg",
    "/images/gallery/elegant-dining.jpg",
    "/images/gallery/bathroom-design.jpg",
    "/images/gallery/office-interior.jpg",
  ]

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])
  const y = useTransform(scrollYProgress, [0, 1], [0, -100])

  // Auto change background images every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [heroImages.length])

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section
      ref={containerRef}
      className={`relative min-h-screen flex items-center justify-center overflow-hidden ${isRTL ? "rtl" : ""}`}
    >
      {/* Background Images with Smooth Transition */}
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <motion.div
            key={image}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{
              opacity: index === currentImageIndex ? 1 : 0,
              scale: index === currentImageIndex ? 1.05 : 1,
            }}
            transition={{
              duration: 1.5,
              ease: "easeInOut",
            }}
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
        ))}

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating Particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.6, 0.2],
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
          className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-orange-400/20 to-yellow-400/20 rounded-full blur-3xl"
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
          className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-orange-500/20 to-red-400/20 rounded-full blur-3xl"
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
                  src="/images/parsa-decor-logo.png"
                  alt="Parsa Decor"
                  className="h-24 w-24 mx-auto rounded-full shadow-2xl border-4 border-white/20"
                />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="absolute inset-0 rounded-full border-4 border-orange-400/30 border-t-orange-400"
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
                    className="block text-orange-400"
                    animate={{
                      textShadow: [
                        "0 0 20px rgba(251,146,60,0.5)",
                        "0 0 40px rgba(251,146,60,0.8)",
                        "0 0 20px rgba(251,146,60,0.5)",
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
                    className="block text-orange-400"
                    animate={{
                      textShadow: [
                        "0 0 20px rgba(251,146,60,0.5)",
                        "0 0 40px rgba(251,146,60,0.8)",
                        "0 0 20px rgba(251,146,60,0.5)",
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
              <p className="text-xl md:text-2xl text-white/90 font-light leading-relaxed max-w-2xl mx-auto">
                {dict?.home?.hero?.subtitle || "طراحی داخلی مدرن و حرفه‌ای در استانبول"}
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
                    <Icon className="w-6 h-6 text-orange-400" />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
              transition={{ duration: 0.8, delay: 1.5 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <button className="group relative px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full font-semibold text-lg shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 hover:scale-105">
                <span className="relative z-10 flex items-center">
                  {dict?.common?.viewProjects || "مشاهده پروژه‌ها"}
                  <ChevronDown className={`w-5 h-5 ${isRTL ? "mr-2" : "ml-2"}`} />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>

              <button className="group relative px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-full font-semibold text-lg border-2 border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <span className="flex items-center">
                  <Play className={`w-5 h-5 ${isRTL ? "ml-2" : "mr-2"}`} />
                  {dict?.common?.watchVideo || "تماشای ویدیو"}
                </span>
              </button>
            </motion.div>

            {/* Image Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isLoaded ? 1 : 0 }}
              transition={{ duration: 0.8, delay: 2 }}
              className="flex items-center justify-center space-x-2 rtl:space-x-reverse mt-12"
            >
              {heroImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentImageIndex ? "bg-orange-400 scale-125" : "bg-white/30 hover:bg-white/50"
                  }`}
                />
              ))}
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 2.5 }}
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
