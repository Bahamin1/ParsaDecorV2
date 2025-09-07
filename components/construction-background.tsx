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
  type: "screw" | "gear" | "bolt" | "washer"
  opacity: number
}

export default function ConstructionBackground() {
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
      const elementCount = Math.min(80, Math.floor((canvas.width * canvas.height) / 20000))

      for (let i = 0; i < elementCount; i++) {
        const types: ("screw" | "gear" | "bolt" | "washer")[] = ["screw", "gear", "bolt", "washer"]
        elements.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.02,
          size: Math.random() * 15 + 8,
          type: types[Math.floor(Math.random() * types.length)],
          opacity: Math.random() * 0.6 + 0.2,
        })
      }

      elementsRef.current = elements
    }

    const drawScrew = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(rotation)

      // Screw head
      ctx.beginPath()
      ctx.arc(0, 0, size * 0.8, 0, Math.PI * 2)
      ctx.fillStyle = "#64748b"
      ctx.fill()
      ctx.strokeStyle = "#475569"
      ctx.lineWidth = 1
      ctx.stroke()

      // Cross pattern
      ctx.beginPath()
      ctx.moveTo(-size * 0.5, 0)
      ctx.lineTo(size * 0.5, 0)
      ctx.moveTo(0, -size * 0.5)
      ctx.lineTo(0, size * 0.5)
      ctx.strokeStyle = "#334155"
      ctx.lineWidth = 2
      ctx.stroke()

      ctx.restore()
    }

    const drawGear = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(rotation)

      const teeth = 8
      const outerRadius = size
      const innerRadius = size * 0.6

      ctx.beginPath()
      for (let i = 0; i < teeth * 2; i++) {
        const angle = (i * Math.PI) / teeth
        const radius = i % 2 === 0 ? outerRadius : innerRadius
        const px = Math.cos(angle) * radius
        const py = Math.sin(angle) * radius

        if (i === 0) {
          ctx.moveTo(px, py)
        } else {
          ctx.lineTo(px, py)
        }
      }
      ctx.closePath()
      ctx.fillStyle = "#64748b"
      ctx.fill()
      ctx.strokeStyle = "#475569"
      ctx.lineWidth = 1
      ctx.stroke()

      // Center hole
      ctx.beginPath()
      ctx.arc(0, 0, size * 0.3, 0, Math.PI * 2)
      ctx.fillStyle = "#334155"
      ctx.fill()

      ctx.restore()
    }

    const drawBolt = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(rotation)

      // Bolt head (hexagonal)
      ctx.beginPath()
      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI) / 3
        const px = Math.cos(angle) * size * 0.8
        const py = Math.sin(angle) * size * 0.8

        if (i === 0) {
          ctx.moveTo(px, py)
        } else {
          ctx.lineTo(px, py)
        }
      }
      ctx.closePath()
      ctx.fillStyle = "#64748b"
      ctx.fill()
      ctx.strokeStyle = "#475569"
      ctx.lineWidth = 1
      ctx.stroke()

      ctx.restore()
    }

    const drawWasher = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(rotation)

      // Outer circle
      ctx.beginPath()
      ctx.arc(0, 0, size * 0.7, 0, Math.PI * 2)
      ctx.fillStyle = "#64748b"
      ctx.fill()
      ctx.strokeStyle = "#475569"
      ctx.lineWidth = 1
      ctx.stroke()

      // Inner hole
      ctx.beginPath()
      ctx.arc(0, 0, size * 0.3, 0, Math.PI * 2)
      ctx.fillStyle = "#1e293b"
      ctx.fill()

      ctx.restore()
    }

    const handleMouseMove = (e: MouseEvent) => {
      mousePositionRef.current = { x: e.clientX, y: e.clientY }
    }

    const animate = () => {
      ctx.fillStyle = "rgba(15, 23, 42, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      elementsRef.current.forEach((element) => {
        // Calculate distance to mouse
        const dx = mousePositionRef.current.x - element.x
        const dy = mousePositionRef.current.y - element.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        // Interactive effect: elements move away from mouse and rotate faster
        if (distance < 120) {
          const angle = Math.atan2(dy, dx)
          const force = (120 - distance) / 2000
          element.vx -= Math.cos(angle) * force
          element.vy -= Math.sin(angle) * force
          element.rotationSpeed += force * 2
        } else {
          element.rotationSpeed *= 0.98
        }

        // Apply velocity with damping
        element.vx *= 0.995
        element.vy *= 0.995

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
          case "gear":
            drawGear(ctx, element.x, element.y, element.size, element.rotation)
            break
          case "bolt":
            drawBolt(ctx, element.x, element.y, element.size, element.rotation)
            break
          case "washer":
            drawWasher(ctx, element.x, element.y, element.size, element.rotation)
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
        {/* Construction-themed ambient effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-red-500/5 rounded-full blur-3xl" />
      </motion.div>
    </>
  )
}
