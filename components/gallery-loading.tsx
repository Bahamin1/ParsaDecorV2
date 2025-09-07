"use client"

import { motion } from "framer-motion"

export default function GalleryLoading() {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="text-center">
        {/* Animated logo */}
        <motion.div
          className="w-20 h-20 mx-auto mb-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        {/* Loading text */}
        <motion.h2
          className="text-2xl font-bold text-white mb-4"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
        >
          در حال بارگذاری گالری شوک‌آور...
        </motion.h2>

        {/* Progress bar */}
        <div className="w-64 h-2 bg-slate-700 rounded-full mx-auto overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-orange-500 to-red-500"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
          />
        </div>
      </div>
    </div>
  )
}
