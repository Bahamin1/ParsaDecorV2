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
  type: "screw" | "bolt" | "nut" | "washer" | "gear" | "wrench" | "hammer"
  opacity: number
}

export default function ProfessionalConstructionBackground() {
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
      const elementCount = Math.min(35, Math.floor((canvas.width * canvas.height) / 35000))

      for (let i = 0; i < elementCount; i++) {
        const types: ("screw" | "bolt" | "nut" | "washer" | "gear" | "wrench" | "hammer")[] = [
          "screw",
          "bolt",
          "nut",
          "washer",
          "gear",
          "wrench",
          "hammer",
        ]
        elements.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.08,
          vy: (Math.random() - 0.5) * 0.08,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.003,
          size: Math.random() * 10 + 8,
          type: types[Math.floor(Math.random() * types.length)],
          opacity: Math.random() * 0.3 + 0.15,
        })
      }

      elementsRef.current = elements
    }

    // Professional detailed objects
    const drawScrew = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(rotation)

      // Screw head with depth
      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, size * 0.8)
      gradient.addColorStop(0, "#8b9dc3")
      gradient.addColorStop(0.7, "#64748b")
      gradient.addColorStop(1, "#475569")

      ctx.beginPath()
      ctx.arc(0, 0, size * 0.8, 0, Math.PI * 2)
      ctx.fillStyle = gradient
      ctx.fill()

      // Outer ring
      ctx.beginPath()
      ctx.arc(0, 0, size * 0.8, 0, Math.PI * 2)
      ctx.strokeStyle = "#334155"
      ctx.lineWidth = 1
      ctx.stroke()

      // Phillips head cross
      ctx.beginPath()
      ctx.moveTo(-size * 0.5, -size * 0.1)
      ctx.lineTo(size * 0.5, size * 0.1)
      ctx.moveTo(-size * 0.5, size * 0.1)
      ctx.lineTo(size * 0.5, -size * 0.1)
      ctx.moveTo(-size * 0.1, -size * 0.5)
      ctx.lineTo(size * 0.1, size * 0.5)
      ctx.moveTo(size * 0.1, -size * 0.5)
      ctx.lineTo(-size * 0.1, size * 0.5)
      ctx.strokeStyle = "#1e293b"
      ctx.lineWidth = 2
      ctx.stroke()

      ctx.restore()
    }

    const drawBolt = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(rotation)

      // Hexagonal bolt head with gradient
      const gradient = ctx.createLinearGradient(-size, -size, size, size)
      gradient.addColorStop(0, "#94a3b8")
      gradient.addColorStop(0.5, "#64748b")
      gradient.addColorStop(1, "#475569")

      ctx.beginPath()
      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI) / 3
        const px = Math.cos(angle) * size * 0.7
        const py = Math.sin(angle) * size * 0.7

        if (i === 0) {
          ctx.moveTo(px, py)
        } else {
          ctx.lineTo(px, py)
        }
      }
      ctx.closePath()
      ctx.fillStyle = gradient
      ctx.fill()
      ctx.strokeStyle = "#334155"
      ctx.lineWidth = 1
      ctx.stroke()

      // Threaded shaft
      ctx.beginPath()
      ctx.rect(-size * 0.15, size * 0.7, size * 0.3, size * 0.8)
      ctx.fillStyle = "#64748b"
      ctx.fill()

      ctx.restore()
    }

    const drawNut = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(rotation)

      // Hexagonal nut
      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, size * 0.6)
      gradient.addColorStop(0, "#94a3b8")
      gradient.addColorStop(1, "#475569")

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
      ctx.fillStyle = gradient
      ctx.fill()

      // Center hole
      ctx.beginPath()
      ctx.arc(0, 0, size * 0.25, 0, Math.PI * 2)
      ctx.fillStyle = "#1e293b"
      ctx.fill()

      // Inner threads
      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI) / 3
        ctx.beginPath()
        ctx.moveTo(Math.cos(angle) * size * 0.25, Math.sin(angle) * size * 0.25)
        ctx.lineTo(Math.cos(angle) * size * 0.4, Math.sin(angle) * size * 0.4)
        ctx.strokeStyle = "#334155"
        ctx.lineWidth = 0.5
        ctx.stroke()
      }

      ctx.restore()
    }

    const drawWasher = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(rotation)

      // Outer ring with metallic gradient
      const gradient = ctx.createRadialGradient(0, 0, size * 0.3, 0, 0, size * 0.7)
      gradient.addColorStop(0, "#94a3b8")
      gradient.addColorStop(0.5, "#64748b")
      gradient.addColorStop(1, "#475569")

      ctx.beginPath()
      ctx.arc(0, 0, size * 0.7, 0, Math.PI * 2)
      ctx.fillStyle = gradient
      ctx.fill()

      // Inner hole
      ctx.beginPath()
      ctx.arc(0, 0, size * 0.3, 0, Math.PI * 2)
      ctx.fillStyle = "#1e293b"
      ctx.fill()

      // Highlight
      ctx.beginPath()
      ctx.arc(-size * 0.2, -size * 0.2, size * 0.15, 0, Math.PI * 2)
      ctx.fillStyle = "#cbd5e1"
      ctx.fill()

      ctx.restore()
    }

    const drawGear = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(rotation)

      const teeth = 8
      const outerRadius = size * 0.8
      const innerRadius = size * 0.6

      // Gear teeth
      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, outerRadius)
      gradient.addColorStop(0, "#94a3b8")
      gradient.addColorStop(0.7, "#64748b")
      gradient.addColorStop(1, "#475569")

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
      ctx.fillStyle = gradient
      ctx.fill()

      // Center hub
      ctx.beginPath()
      ctx.arc(0, 0, size * 0.4, 0, Math.PI * 2)
      ctx.fillStyle = "#64748b"
      ctx.fill()

      // Center hole
      ctx.beginPath()
      ctx.arc(0, 0, size * 0.2, 0, Math.PI * 2)
      ctx.fillStyle = "#1e293b"
      ctx.fill()

      ctx.restore()
    }

    const drawWrench = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(rotation)

      // Wrench handle
      const gradient = ctx.createLinearGradient(-size, 0, size, 0)
      gradient.addColorStop(0, "#94a3b8")
      gradient.addColorStop(0.5, "#64748b")
      gradient.addColorStop(1, "#475569")

      ctx.beginPath()
      ctx.roundRect(-size * 0.9, -size * 0.08, size * 1.8, size * 0.16, size * 0.08)
      ctx.fillStyle = gradient
      ctx.fill()

      // Wrench heads
      ctx.beginPath()
      ctx.roundRect(-size * 1.0, -size * 0.2, size * 0.25, size * 0.4, size * 0.05)
      ctx.fill()

      ctx.beginPath()
      ctx.roundRect(size * 0.75, -size * 0.15, size * 0.25, size * 0.3, size * 0.05)
      ctx.fill()

      ctx.restore()
    }

    const drawHammer = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(rotation)

      // Handle
      const handleGradient = ctx.createLinearGradient(0, -size, 0, size)
      handleGradient.addColorStop(0, "#92400e")
      handleGradient.addColorStop(1, "#78350f")

      ctx.beginPath()
      ctx.roundRect(-size * 0.8, -size * 0.06, size * 1.2, size * 0.12, size * 0.06)
      ctx.fillStyle = handleGradient
      ctx.fill()

      // Hammer head
      const headGradient = ctx.createLinearGradient(0, -size * 0.3, 0, size * 0.3)
      headGradient.addColorStop(0, "#94a3b8")
      headGradient.addColorStop(0.5, "#64748b")
      headGradient.addColorStop(1, "#475569")

      ctx.beginPath()
      ctx.roundRect(size * 0.3, -size * 0.25, size * 0.4, size * 0.5, size * 0.05)
      ctx.fillStyle = headGradient
      ctx.fill()

      // Claw
      ctx.beginPath()
      ctx.roundRect(size * 0.3, -size * 0.35, size * 0.15, size * 0.15, size * 0.03)
      ctx.fill()

      ctx.restore()
    }

    const handleMouseMove = (e: MouseEvent) => {
      mousePositionRef.current = { x: e.clientX, y: e.clientY }
    }

    const animate = () => {
      // Clear canvas completely - no trails
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      elementsRef.current.forEach((element) => {
        // Mouse interaction
        const dx = mousePositionRef.current.x - element.x
        const dy = mousePositionRef.current.y - element.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 100) {
          const angle = Math.atan2(dy, dx)
          const force = (100 - distance) / 2500
          element.vx -= Math.cos(angle) * force
          element.vy -= Math.sin(angle) * force
        }

        // Apply velocity with damping
        element.vx *= 0.998
        element.vy *= 0.998

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
          case "nut":
            drawNut(ctx, element.x, element.y, element.size, element.rotation)
            break
          case "washer":
            drawWasher(ctx, element.x, element.y, element.size, element.rotation)
            break
          case "gear":
            drawGear(ctx, element.x, element.y, element.size, element.rotation)
            break
          case "wrench":
            drawWrench(ctx, element.x, element.y, element.size, element.rotation)
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
        {/* Subtle ambient effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-slate-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-slate-500/5 rounded-full blur-3xl" />
      </motion.div>
    </>
  )
}
