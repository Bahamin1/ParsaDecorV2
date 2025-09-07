"use client"

import { motion } from "framer-motion"
import { ArrowRight, Eye, Phone, Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"

interface EnhancedHeroButtonsProps {
  lang: string
  dict: any
}

export default function EnhancedHeroButtons({ lang, dict }: EnhancedHeroButtonsProps) {
  const router = useRouter()
  const isRTL = lang === "fa"

  return (
    <div className={`flex flex-col md:flex-row gap-6 justify-center items-center`}>
      {/* Primary CTA Button */}
      <motion.button
        onClick={() => router.push(`/${lang}/portfolio`)}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className="group relative px-8 py-4 bg-white text-gray-900 font-bold rounded-full overflow-hidden shadow-2xl"
      >
        {/* Background Animation */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500"
          initial={{ x: "-100%" }}
          whileHover={{ x: "0%" }}
          transition={{ duration: 0.3 }}
        />

        {/* Content */}
        <div
          className={`relative z-10 flex items-center justify-center ${isRTL ? "flex-row-reverse space-x-reverse" : ""} space-x-3`}
        >
          <Eye className="w-5 h-5 group-hover:text-white transition-colors duration-300" />
          <span className="group-hover:text-white transition-colors duration-300">
            {dict?.home?.hero?.cta1 || "مشاهده نمونه کارها"}
          </span>
          <motion.div
            animate={{ x: isRTL ? [-3, 0, -3] : [0, 3, 0] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          >
            <ArrowRight
              className={`w-5 h-5 group-hover:text-white transition-colors duration-300 ${isRTL ? "rotate-180" : ""}`}
            />
          </motion.div>
        </div>

        {/* Sparkle Effects */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100"
            initial={{ scale: 0 }}
            whileHover={{
              scale: [0, 1, 0],
              x: [0, (i % 2 === 0 ? 1 : -1) * 20],
              y: [0, (i < 2 ? -1 : 1) * 15],
            }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            style={{
              top: "50%",
              left: "50%",
            }}
          />
        ))}
      </motion.button>

      {/* Secondary CTA Button */}
      <motion.button
        onClick={() => router.push(`/${lang}/contact`)}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className="group relative px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full overflow-hidden backdrop-blur-sm"
      >
        {/* Background Animation */}
        <motion.div
          className="absolute inset-0 bg-white"
          initial={{ scale: 0 }}
          whileHover={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        />

        {/* Content */}
        <div
          className={`relative z-10 flex items-center justify-center ${isRTL ? "flex-row-reverse space-x-reverse" : ""} space-x-3`}
        >
          <Phone className="w-5 h-5 group-hover:text-gray-900 transition-colors duration-300" />
          <span className="group-hover:text-gray-900 transition-colors duration-300">
            {dict?.home?.hero?.cta2 || "تماس با ما"}
          </span>
          <motion.div
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            <Sparkles className="w-5 h-5 group-hover:text-gray-900 transition-colors duration-300" />
          </motion.div>
        </div>

        {/* Border Glow Effect */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-white opacity-0 group-hover:opacity-100"
          animate={{
            boxShadow: [
              "0 0 0 0 rgba(255, 255, 255, 0)",
              "0 0 0 8px rgba(255, 255, 255, 0.3)",
              "0 0 0 0 rgba(255, 255, 255, 0)",
            ],
          }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
        />
      </motion.button>
    </div>
  )
}
