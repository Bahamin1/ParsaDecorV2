"use client"

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion"
import { useEffect, useState } from "react"

export default function InteractiveLogo() {
  const [isLoaded, setIsLoaded] = useState(false)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Transform mouse position into rotation values
  const rotateX = useTransform(mouseY, [-300, 300], [10, -10])
  const rotateY = useTransform(mouseX, [-300, 300], [-10, 10])

  // Add spring physics for smoother movement
  const springRotateX = useSpring(rotateX, { stiffness: 100, damping: 30 })
  const springRotateY = useSpring(rotateY, { stiffness: 100, damping: 30 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2
      const centerY = window.innerHeight / 2
      mouseX.set(e.clientX - centerX)
      mouseY.set(e.clientY - centerY)
    }

    window.addEventListener("mousemove", handleMouseMove)

    const timer = setTimeout(() => setIsLoaded(true), 500)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      clearTimeout(timer)
    }
  }, [mouseX, mouseY])

  return (
    <div className="relative flex items-center justify-center">
      <motion.div
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          perspective: "1000px",
        }}
        className="relative"
      >
        {/* Outer glow ring */}
        <motion.div
          className="absolute w-32 h-32 rounded-full border-2 border-cyan-400/30"
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: { duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
            scale: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
          }}
          style={{
            background: "conic-gradient(from 0deg, transparent, #06b6d4, #3b82f6, transparent)",
            filter: "blur(1px)",
          }}
        />

        {/* Inner rotating ring */}
        <motion.div
          className="absolute w-24 h-24 rounded-full border border-blue-400/50"
          animate={{
            rotate: -360,
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />

        {/* Main logo container */}
        <motion.div
          className="relative z-10 w-20 h-20 flex items-center justify-center"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Logo background */}
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            style={{
              filter: "blur(0.5px)",
              boxShadow: "0 0 30px rgba(6, 182, 212, 0.5), inset 0 0 20px rgba(255, 255, 255, 0.1)",
            }}
          />

          {/* Logo text */}
          <motion.div
            className="relative z-10 text-white font-bold text-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            transition={{ delay: 1 }}
          >
            P
          </motion.div>

          {/* Floating particles around logo */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full"
              animate={{
                x: [0, Math.cos((i * Math.PI * 2) / 8) * 40],
                y: [0, Math.sin((i * Math.PI * 2) / 8) * 40],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.3,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>

        {/* Pulsing background effect */}
        <motion.div
          className="absolute w-40 h-40 rounded-full bg-cyan-400/5"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.1, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </div>
  )
}
