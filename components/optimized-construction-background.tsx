"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

interface ConstructionElement {
  x: number
  y: number
  vx: number
  vy: number
  rotation: number
  rotationSpeed: number
  size: number
  type: "screw" | "bolt" | "wrench" | "screwdriver" | "hammer"
  opacity: number
}

export default function OptimizedConstructionBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const elementsRef = useRef<ConstructionElement[]>([])
  const animationRef = useRef<number>()
  const mousePositionRef = useRef({ x: 0, y: 0 })
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      createElements()
    }

    const createElements = () => {
      const elements: ConstructionElement[] = []
      const elementCount = Math.min(40, Math.floor((canvas.width * canvas.height) / 30000)) // Reduced count

      for (let i = 0; i < elementCount; i++) {
        const types: ("screw" | "bolt" | "wrench" | "screwdriver" | "hammer")[] = [
          "screw",
          "bolt",
          "wrench",
          "screwdriver",
          "hammer",
        ]
        elements.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.1, // Reduced speed
          vy: (Math.random() - 0.5) * 0.1,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.005, // Much slower rotation
          size: Math.random() * 12 + 6,
          type: types[Math.floor(Math.random() * types.length)],
          opacity: Math.random() * 0.4 + 0.1, // Lower opacity
        })
      }

      elementsRef.current = elements
    }

    // Simplified 2D illustrations
    const drawScrew = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(rotation)

      // Screw head - simplified
      ctx.beginPath()
      ctx.arc(0, 0, size * 0.7, 0, Math.PI * 2)
      ctx.fillStyle = "#64748b"
      ctx.fill()

      // Simple cross pattern
      ctx.beginPath()
      ctx.moveTo(-size * 0.4, 0)
      ctx.lineTo(size * 0.4, 0)
      ctx.moveTo(0, -size * 0.4)
      ctx.lineTo(0, size * 0.4)
      ctx.strokeStyle = "#334155"
      ctx.lineWidth = 1.5
      ctx.stroke()

      ctx.restore()
    }

    const drawBolt = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(rotation)

      // Simplified hexagonal bolt head
      ctx.beginPath()
      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI) / 3
        const px = Math.cos(angle) * size * 0.6
        const py = Math.sin(angle) * size * 0.6

        if (i === 0) {
          ctx.moveTo(px, py)
        } else {
          ctx.lineTo(px, py)
        }
      }
      ctx.closePath()
      ctx.fillStyle = "#64748b"
      ctx.fill()

      ctx.restore()
    }

    const drawWrench = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(rotation)

      // Simplified wrench shape
      ctx.beginPath()
      ctx.rect(-size * 0.8, -size * 0.1, size * 1.6, size * 0.2)
      ctx.fillStyle = "#64748b"
      ctx.fill()

      // Wrench head
      ctx.beginPath()
      ctx.rect(-size * 0.9, -size * 0.3, size * 0.3, size * 0.6)
      ctx.fill()

      ctx.restore()
    }

    const drawScrewdriver = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(rotation)

      // Handle
      ctx.beginPath()
      ctx.rect(-size * 0.6, -size * 0.15, size * 0.8, size * 0.3)
      ctx.fillStyle = "#ea580c"
      ctx.fill()

      // Shaft
      ctx.beginPath()
      ctx.rect(size * 0.2, -size * 0.05, size * 0.6, size * 0.1)
      ctx.fillStyle = "#64748b"
      ctx.fill()

      ctx.restore()
    }

    const drawHammer = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(rotation)

      // Handle
      ctx.beginPath()
      ctx.rect(-size * 0.8, -size * 0.08, size * 1.2, size * 0.16)
      ctx.fillStyle = "#92400e"
      ctx.fill()

      // Hammer head
      ctx.beginPath()
      ctx.rect(size * 0.3, -size * 0.25, size * 0.4, size * 0.5)
      ctx.fillStyle = "#64748b"
      ctx.fill()

      ctx.restore()
    }

    const handleMouseMove = (e: MouseEvent) => {
      mousePositionRef.current = { x: e.clientX, y: e.clientY }
    }

    const animate = () => {
      ctx.fillStyle = "rgba(15, 23, 42, 0.03)" // Lighter clear
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      elementsRef.current.forEach((element) => {
        // Simplified mouse interaction
        const dx = mousePositionRef.current.x - element.x
        const dy = mousePositionRef.current.y - element.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 100) {
          const angle = Math.atan2(dy, dx)
          const force = (100 - distance) / 3000 // Reduced force
          element.vx -= Math.cos(angle) * force
          element.vy -= Math.sin(angle) * force
        }

        // Apply velocity with stronger damping
        element.vx *= 0.99
        element.vy *= 0.99

        // Update position and rotation
        element.x += element.vx
        element.y += element.vy
        element.rotation += element.rotationSpeed

        // Wrap around edges
        if (element.x < -element.size) element.x = canvas.width + element.size
        if (element.x > canvas.width + element.size) element.x = -element.size
        if (element.y < -element.size) element.y = canvas.height + element.size
        if (element.y > canvas.height + element.size) element.y = -element.size

        // Set opacity and draw element
        ctx.globalAlpha = element.opacity

        switch (element.type) {
          case "screw":
            drawScrew(ctx, element.x, element.y, element.size, element.rotation)
            break
          case "bolt":
            drawBolt(ctx, element.x, element.y, element.size, element.rotation)
            break
          case "wrench":
            drawWrench(ctx, element.x, element.y, element.size, element.rotation)
            break
          case "screwdriver":
            drawScrewdriver(ctx, element.x, element.y, element.size, element.rotation)
            break
          case "hammer":
            drawHammer(ctx, element.x, element.y, element.size, element.rotation)
            break
        }
      })

      ctx.globalAlpha = 1
      animationRef.current = requestAnimationFrame(animate)
    }

    resizeCanvas()
    setIsLoaded(true)
    animate()

    window.addEventListener("resize", resizeCanvas)
    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 30%, #334155 70%, #475569 100%)",
        }}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 1 }}
        className="fixed inset-0 z-0 pointer-events-none"
      >
        {/* Reduced ambient effects */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-orange-500/3 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-yellow-500/3 rounded-full blur-3xl" />
      </motion.div>
    </>
  )
}
