"use client"

import { motion, useMotionValue, useSpring } from "framer-motion"
import { useEffect, useState } from "react"

interface InteractiveLogoTextProps {
  lang: string
  isScrolled?: boolean
}

export default function InteractiveLogoText({ lang, isScrolled = false }: InteractiveLogoTextProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = document.getElementById("interactive-logo")?.getBoundingClientRect()
      if (rect) {
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        const x = (e.clientX - centerX) / 10
        const y = (e.clientY - centerY) / 10

        setMousePosition({ x, y })
        mouseX.set(x)
        mouseY.set(y)
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  const springX = useSpring(mouseX, { stiffness: 150, damping: 15 })
  const springY = useSpring(mouseY, { stiffness: 150, damping: 15 })

  const logoText = lang === "fa" ? "پارسا دکور" : "PARSA DECOR"
  const subtitle = lang === "fa" ? "طراحی داخلی" : "Interior Design"

  const letterVariants = {
    initial: {
      x: 0,
      y: 0,
      rotate: 0,
      scale: 1,
      color: isScrolled ? "#1E1E1E" : "#FFFFFF",
    },
    hover: (i: number) => ({
      x: mousePosition.x * (0.5 + i * 0.1),
      y: mousePosition.y * (0.3 + i * 0.05),
      rotate: mousePosition.x * (0.5 + i * 0.2),
      scale: 1.1 + i * 0.02,
      color: "#EA3E27",
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 10,
        delay: i * 0.02,
      },
    }),
    return: {
      x: 0,
      y: 0,
      rotate: 0,
      scale: 1,
      color: isScrolled ? "#1E1E1E" : "#FFFFFF",
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: 0.5,
      },
    },
  }

  const containerVariants = {
    initial: {},
    hover: {
      transition: {
        staggerChildren: 0.03,
      },
    },
  }

  return (
    <motion.div
      id="interactive-logo"
      className="flex flex-col items-center cursor-pointer select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setTimeout(() => {
          setMousePosition({ x: 0, y: 0 })
        }, 2000)
      }}
      variants={containerVariants}
      initial="initial"
      animate={isHovered ? "hover" : "initial"}
    >
      {/* Main Logo Text */}
      <motion.div
        className={`flex ${lang === "fa" ? "flex-row-reverse" : ""} items-center mb-1`}
        style={{
          x: springX,
          y: springY,
        }}
      >
        {logoText.split("").map((letter, i) => (
          <motion.span
            key={i}
            custom={i}
            variants={letterVariants}
            className={`text-xl font-bold transition-colors duration-300 ${letter === " " ? "w-3" : ""}`}
            style={{
              display: "inline-block",
              transformOrigin: "center center",
            }}
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        ))}
      </motion.div>

      {/* Subtitle */}
      <motion.div
        className={`text-xs transition-colors duration-300 ${isScrolled ? "text-gray-600" : "text-gray-300"}`}
        animate={{
          opacity: isHovered ? 0.7 : 1,
          scale: isHovered ? 0.95 : 1,
        }}
        transition={{ duration: 0.3 }}
      >
        {subtitle}
      </motion.div>

      {/* Decorative Elements */}
      <motion.div
        className="absolute -inset-4 rounded-full"
        animate={{
          background: isHovered ? "radial-gradient(circle, rgba(234, 62, 39, 0.1) 0%, transparent 70%)" : "transparent",
        }}
        transition={{ duration: 0.5 }}
      />

      {/* Floating Particles */}
      {isHovered &&
        [...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#EA3E27] rounded-full"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              x: [0, Math.cos((i * Math.PI * 2) / 6) * 30],
              y: [0, Math.sin((i * Math.PI * 2) / 6) * 30],
            }}
            transition={{
              duration: 2,
              delay: i * 0.1,
              ease: "easeOut",
            }}
          />
        ))}

      {/* Glow Effect */}
      <motion.div
        className="absolute inset-0 rounded-full blur-xl"
        animate={{
          background: isHovered ? "radial-gradient(circle, rgba(234, 62, 39, 0.3) 0%, transparent 50%)" : "transparent",
          scale: isHovered ? 1.5 : 1,
        }}
        transition={{ duration: 0.8 }}
      />
    </motion.div>
  )
}
