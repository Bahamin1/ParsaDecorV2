"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

interface ToolElement {
  x: number
  y: number
  vx: number
  vy: number
  rotation: number
  rotationSpeed: number
  size: number
  type: "screw" | "screwdriver" | "wrench" | "hammer" | "pliers" | "drill_bit" | "nail" | "bolt"
  opacity: number
  color: string
}

export default function DetailedConstructionBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const elementsRef = useRef<ToolElement[]>([])
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
      const elements: ToolElement[] = []
      const elementCount = Math.min(45, Math.floor((canvas.width * canvas.height) / 25000))

      const colors = ["#64748b", "#94a3b8", "#475569", "#334155", "#ea580c", "#dc2626"]

      for (let i = 0; i < elementCount; i++) {
        const types: ("screw" | "screwdriver" | "wrench" | "hammer" | "pliers" | "drill_bit" | "nail" | "bolt")[] = [
          "screw",
          "screwdriver",
          "wrench",
          "hammer",
          "pliers",
          "drill_bit",
          "nail",
          "bolt",
        ]
        elements.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.1,
          vy: (Math.random() - 0.5) * 0.1,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.005,
          size: Math.random() * 15 + 10,
          type: types[Math.floor(Math.random() * types.length)],
          opacity: Math.random() * 0.4 + 0.2,
          color: colors[Math.floor(Math.random() * colors.length)],
        })
      }

      elementsRef.current = elements
    }

    // Detailed tool drawings
    const drawScrew = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      rotation: number,
      color: string,
    ) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(rotation)

      // Screw head with realistic details
      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, size * 0.8)
      gradient.addColorStop(0, "#cbd5e1")
      gradient.addColorStop(0.6, color)
      gradient.addColorStop(1, "#334155")

      ctx.beginPath()
      ctx.arc(0, 0, size * 0.8, 0, Math.PI * 2)
      ctx.fillStyle = gradient
      ctx.fill()

      // Outer ring
      ctx.beginPath()
      ctx.arc(0, 0, size * 0.8, 0, Math.PI * 2)
      ctx.strokeStyle = "#1e293b"
      ctx.lineWidth = 1.5
      ctx.stroke()

      // Phillips head cross with depth
      ctx.beginPath()
      ctx.moveTo(-size * 0.5, -size * 0.08)
      ctx.lineTo(size * 0.5, size * 0.08)
      ctx.moveTo(-size * 0.5, size * 0.08)
      ctx.lineTo(size * 0.5, -size * 0.08)
      ctx.moveTo(-size * 0.08, -size * 0.5)
      ctx.lineTo(size * 0.08, size * 0.5)
      ctx.moveTo(size * 0.08, -size * 0.5)
      ctx.lineTo(-size * 0.08, size * 0.5)
      ctx.strokeStyle = "#0f172a"
      ctx.lineWidth = 3
      ctx.stroke()

      // Threaded shaft
      ctx.beginPath()
      ctx.rect(-size * 0.1, size * 0.8, size * 0.2, size * 0.6)
      ctx.fillStyle = color
      ctx.fill()

      // Thread lines
      for (let i = 0; i < 4; i++) {
        ctx.beginPath()
        ctx.moveTo(-size * 0.1, size * 0.8 + i * size * 0.15)
        ctx.lineTo(size * 0.1, size * 0.8 + i * size * 0.15)
        ctx.strokeStyle = "#1e293b"
        ctx.lineWidth = 0.5
        ctx.stroke()
      }

      ctx.restore()
    }

    const drawScrewdriver = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      rotation: number,
      color: string,
    ) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(rotation)

      // Handle with grip texture
      const handleGradient = ctx.createLinearGradient(0, -size * 0.8, 0, size * 0.2)
      handleGradient.addColorStop(0, "#dc2626")
      handleGradient.addColorStop(0.3, "#ef4444")
      handleGradient.addColorStop(0.7, "#dc2626")
      handleGradient.addColorStop(1, "#991b1b")

      ctx.beginPath()
      ctx.roundRect(-size * 0.15, -size * 0.8, size * 0.3, size, size * 0.15)
      ctx.fillStyle = handleGradient
      ctx.fill()

      // Grip lines
      for (let i = 0; i < 8; i++) {
        ctx.beginPath()
        ctx.moveTo(-size * 0.12, -size * 0.7 + i * size * 0.1)
        ctx.lineTo(size * 0.12, -size * 0.7 + i * size * 0.1)
        ctx.strokeStyle = "#7f1d1d"
        ctx.lineWidth = 1
        ctx.stroke()
      }

      // Metal shaft
      const shaftGradient = ctx.createLinearGradient(0, size * 0.2, 0, size * 1.2)
      shaftGradient.addColorStop(0, "#e2e8f0")
      shaftGradient.addColorStop(0.5, color)
      shaftGradient.addColorStop(1, "#334155")

      ctx.beginPath()
      ctx.rect(-size * 0.05, size * 0.2, size * 0.1, size)
      ctx.fillStyle = shaftGradient
      ctx.fill()

      // Tip
      ctx.beginPath()
      ctx.moveTo(-size * 0.05, size * 1.2)
      ctx.lineTo(0, size * 1.3)
      ctx.lineTo(size * 0.05, size * 1.2)
      ctx.closePath()
      ctx.fillStyle = "#1e293b"
      ctx.fill()

      ctx.restore()
    }

    const drawWrench = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      rotation: number,
      color: string,
    ) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(rotation)

      // Wrench body with realistic gradient
      const bodyGradient = ctx.createLinearGradient(-size, -size * 0.1, size, size * 0.1)
      bodyGradient.addColorStop(0, "#e2e8f0")
      bodyGradient.addColorStop(0.3, color)
      bodyGradient.addColorStop(0.7, color)
      bodyGradient.addColorStop(1, "#334155")

      ctx.beginPath()
      ctx.roundRect(-size * 1.2, -size * 0.08, size * 2.4, size * 0.16, size * 0.08)
      ctx.fillStyle = bodyGradient
      ctx.fill()

      // Wrench heads with detailed openings
      ctx.beginPath()
      ctx.roundRect(-size * 1.3, -size * 0.25, size * 0.3, size * 0.5, size * 0.05)
      ctx.fill()

      ctx.beginPath()
      ctx.roundRect(size * 1.0, -size * 0.2, size * 0.3, size * 0.4, size * 0.05)
      ctx.fill()

      // Opening details
      ctx.beginPath()
      ctx.rect(-size * 1.25, -size * 0.15, size * 0.2, size * 0.3)
      ctx.fillStyle = "#0f172a"
      ctx.fill()

      ctx.beginPath()
      ctx.rect(size * 1.05, -size * 0.1, size * 0.2, size * 0.2)
      ctx.fillStyle = "#0f172a"
      ctx.fill()

      // Brand marking
      ctx.fillStyle = "#1e293b"
      ctx.font = `${size * 0.1}px Arial`
      ctx.textAlign = "center"
      ctx.fillText("12mm", 0, size * 0.05)

      ctx.restore()
    }

    const drawHammer = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      rotation: number,
      color: string,
    ) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(rotation)

      // Wooden handle with wood grain effect
      const handleGradient = ctx.createLinearGradient(0, -size * 1.2, 0, size * 0.2)
      handleGradient.addColorStop(0, "#92400e")
      handleGradient.addColorStop(0.2, "#a3470f")
      handleGradient.addColorStop(0.4, "#92400e")
      handleGradient.addColorStop(0.6, "#78350f")
      handleGradient.addColorStop(0.8, "#92400e")
      handleGradient.addColorStop(1, "#78350f")

      ctx.beginPath()
      ctx.roundRect(-size * 0.08, -size * 1.2, size * 0.16, size * 1.4, size * 0.08)
      ctx.fillStyle = handleGradient
      ctx.fill()

      // Wood grain lines
      for (let i = 0; i < 6; i++) {
        ctx.beginPath()
        ctx.moveTo(-size * 0.06, -size * 1.1 + i * size * 0.2)
        ctx.lineTo(size * 0.06, -size * 1.1 + i * size * 0.2)
        ctx.strokeStyle = "#451a03"
        ctx.lineWidth = 0.5
        ctx.stroke()
      }

      // Metal hammer head
      const headGradient = ctx.createLinearGradient(-size * 0.4, -size * 0.3, size * 0.4, size * 0.3)
      headGradient.addColorStop(0, "#f1f5f9")
      headGradient.addColorStop(0.3, color)
      headGradient.addColorStop(0.7, color)
      headGradient.addColorStop(1, "#1e293b")

      ctx.beginPath()
      ctx.roundRect(-size * 0.4, -size * 0.3, size * 0.8, size * 0.6, size * 0.05)
      ctx.fillStyle = headGradient
      ctx.fill()

      // Claw end
      ctx.beginPath()
      ctx.moveTo(-size * 0.4, -size * 0.1)
      ctx.lineTo(-size * 0.6, -size * 0.4)
      ctx.lineTo(-size * 0.5, -size * 0.45)
      ctx.lineTo(-size * 0.4, -size * 0.2)
      ctx.closePath()
      ctx.fill()

      ctx.beginPath()
      ctx.moveTo(-size * 0.4, size * 0.1)
      ctx.lineTo(-size * 0.6, size * 0.4)
      ctx.lineTo(-size * 0.5, size * 0.45)
      ctx.lineTo(-size * 0.4, size * 0.2)
      ctx.closePath()
      ctx.fill()

      // Strike surface texture
      for (let i = 0; i < 3; i++) {
        ctx.beginPath()
        ctx.moveTo(size * 0.2, -size * 0.2 + i * size * 0.13)
        ctx.lineTo(size * 0.35, -size * 0.2 + i * size * 0.13)
        ctx.strokeStyle = "#0f172a"
        ctx.lineWidth = 1
        ctx.stroke()
      }

      ctx.restore()
    }

    const drawPliers = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      rotation: number,
      color: string,
    ) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(rotation)

      // Plier handles
      const handleGradient = ctx.createLinearGradient(0, 0, 0, size * 1.2)
      handleGradient.addColorStop(0, "#dc2626")
      handleGradient.addColorStop(0.3, "#ef4444")
      handleGradient.addColorStop(1, "#991b1b")

      // Left handle
      ctx.beginPath()
      ctx.roundRect(-size * 0.6, size * 0.2, size * 0.12, size, size * 0.06)
      ctx.fillStyle = handleGradient
      ctx.fill()

      // Right handle
      ctx.beginPath()
      ctx.roundRect(size * 0.48, size * 0.2, size * 0.12, size, size * 0.06)
      ctx.fillStyle = handleGradient
      ctx.fill()

      // Metal jaws
      const jawGradient = ctx.createLinearGradient(-size * 0.6, -size * 0.4, size * 0.6, size * 0.4)
      jawGradient.addColorStop(0, "#e2e8f0")
      jawGradient.addColorStop(0.5, color)
      jawGradient.addColorStop(1, "#334155")

      // Upper jaw
      ctx.beginPath()
      ctx.moveTo(-size * 0.6, size * 0.2)
      ctx.lineTo(-size * 0.8, -size * 0.4)
      ctx.lineTo(-size * 0.7, -size * 0.5)
      ctx.lineTo(-size * 0.5, size * 0.1)
      ctx.closePath()
      ctx.fillStyle = jawGradient
      ctx.fill()

      // Lower jaw
      ctx.beginPath()
      ctx.moveTo(size * 0.6, size * 0.2)
      ctx.lineTo(size * 0.8, -size * 0.4)
      ctx.lineTo(size * 0.7, -size * 0.5)
      ctx.lineTo(size * 0.5, size * 0.1)
      ctx.closePath()
      ctx.fillStyle = jawGradient
      ctx.fill()

      // Pivot point
      ctx.beginPath()
      ctx.arc(0, size * 0.15, size * 0.08, 0, Math.PI * 2)
      ctx.fillStyle = "#1e293b"
      ctx.fill()

      // Teeth on jaws
      for (let i = 0; i < 4; i++) {
        ctx.beginPath()
        ctx.moveTo(-size * 0.75 + i * size * 0.05, -size * 0.45)
        ctx.lineTo(-size * 0.75 + i * size * 0.05, -size * 0.4)
        ctx.strokeStyle = "#0f172a"
        ctx.lineWidth = 1
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(size * 0.75 - i * size * 0.05, -size * 0.45)
        ctx.lineTo(size * 0.75 - i * size * 0.05, -size * 0.4)
        ctx.strokeStyle = "#0f172a"
        ctx.lineWidth = 1
        ctx.stroke()
      }

      ctx.restore()
    }

    const drawDrillBit = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      rotation: number,
      color: string,
    ) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(rotation)

      // Drill bit shaft with spiral
      const shaftGradient = ctx.createLinearGradient(0, -size, 0, size * 1.2)
      shaftGradient.addColorStop(0, "#f8fafc")
      shaftGradient.addColorStop(0.3, color)
      shaftGradient.addColorStop(0.7, color)
      shaftGradient.addColorStop(1, "#1e293b")

      ctx.beginPath()
      ctx.rect(-size * 0.05, -size, size * 0.1, size * 2.2)
      ctx.fillStyle = shaftGradient
      ctx.fill()

      // Spiral flutes
      for (let i = 0; i < 20; i++) {
        const y1 = -size + i * size * 0.1
        const y2 = y1 + size * 0.05
        ctx.beginPath()
        ctx.moveTo(-size * 0.04, y1)
        ctx.bezierCurveTo(size * 0.02, y1 + size * 0.02, size * 0.04, y2 - size * 0.02, -size * 0.04, y2)
        ctx.strokeStyle = "#0f172a"
        ctx.lineWidth = 1
        ctx.stroke()
      }

      // Drill tip
      ctx.beginPath()
      ctx.moveTo(-size * 0.05, size * 1.2)
      ctx.lineTo(0, size * 1.3)
      ctx.lineTo(size * 0.05, size * 1.2)
      ctx.closePath()
      ctx.fillStyle = "#0f172a"
      ctx.fill()

      // Chuck end
      ctx.beginPath()
      ctx.rect(-size * 0.08, -size * 1.1, size * 0.16, size * 0.2)
      ctx.fillStyle = "#475569"
      ctx.fill()

      // Chuck grooves
      for (let i = 0; i < 3; i++) {
        ctx.beginPath()
        ctx.moveTo(-size * 0.06, -size * 1.05 + i * size * 0.05)
        ctx.lineTo(size * 0.06, -size * 1.05 + i * size * 0.05)
        ctx.strokeStyle = "#1e293b"
        ctx.lineWidth = 0.5
        ctx.stroke()
      }

      ctx.restore()
    }

    const drawNail = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      rotation: number,
      color: string,
    ) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(rotation)

      // Nail head
      const headGradient = ctx.createRadialGradient(0, -size * 0.8, 0, 0, -size * 0.8, size * 0.3)
      headGradient.addColorStop(0, "#f1f5f9")
      headGradient.addColorStop(0.7, color)
      headGradient.addColorStop(1, "#334155")

      ctx.beginPath()
      ctx.arc(0, -size * 0.8, size * 0.25, 0, Math.PI * 2)
      ctx.fillStyle = headGradient
      ctx.fill()

      // Head rim
      ctx.beginPath()
      ctx.arc(0, -size * 0.8, size * 0.25, 0, Math.PI * 2)
      ctx.strokeStyle = "#1e293b"
      ctx.lineWidth = 1
      ctx.stroke()

      // Nail shaft
      const shaftGradient = ctx.createLinearGradient(-size * 0.05, -size * 0.5, size * 0.05, size * 1.2)
      shaftGradient.addColorStop(0, "#e2e8f0")
      shaftGradient.addColorStop(0.5, color)
      shaftGradient.addColorStop(1, "#334155")

      ctx.beginPath()
      ctx.rect(-size * 0.03, -size * 0.5, size * 0.06, size * 1.7)
      ctx.fillStyle = shaftGradient
      ctx.fill()

      // Nail point
      ctx.beginPath()
      ctx.moveTo(-size * 0.03, size * 1.2)
      ctx.lineTo(0, size * 1.3)
      ctx.lineTo(size * 0.03, size * 1.2)
      ctx.closePath()
      ctx.fillStyle = "#1e293b"
      ctx.fill()

      ctx.restore()
    }

    const drawBolt = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      rotation: number,
      color: string,
    ) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(rotation)

      // Hexagonal bolt head with realistic shading
      const headGradient = ctx.createLinearGradient(-size * 0.8, -size * 0.8, size * 0.8, size * 0.8)
      headGradient.addColorStop(0, "#f1f5f9")
      headGradient.addColorStop(0.3, color)
      headGradient.addColorStop(0.7, color)
      headGradient.addColorStop(1, "#1e293b")

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
      ctx.fillStyle = headGradient
      ctx.fill()

      // Hex head edges
      ctx.strokeStyle = "#0f172a"
      ctx.lineWidth = 1.5
      ctx.stroke()

      // Threaded shaft
      const shaftGradient = ctx.createLinearGradient(-size * 0.15, size * 0.7, size * 0.15, size * 1.8)
      shaftGradient.addColorStop(0, "#e2e8f0")
      shaftGradient.addColorStop(0.5, color)
      shaftGradient.addColorStop(1, "#334155")

      ctx.beginPath()
      ctx.rect(-size * 0.12, size * 0.7, size * 0.24, size * 1.1)
      ctx.fillStyle = shaftGradient
      ctx.fill()

      // Thread lines
      for (let i = 0; i < 8; i++) {
        ctx.beginPath()
        ctx.moveTo(-size * 0.12, size * 0.8 + i * size * 0.12)
        ctx.lineTo(size * 0.12, size * 0.8 + i * size * 0.12)
        ctx.strokeStyle = "#1e293b"
        ctx.lineWidth = 0.8
        ctx.stroke()
      }

      // Size marking on head
      ctx.fillStyle = "#0f172a"
      ctx.font = `${size * 0.15}px Arial`
      ctx.textAlign = "center"
      ctx.fillText("M8", 0, size * 0.1)

      ctx.restore()
    }

    const handleMouseMove = (e: MouseEvent) => {
      mousePositionRef.current = { x: e.clientX, y: e.clientY }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      elementsRef.current.forEach((element) => {
        // Mouse interaction
        const dx = mousePositionRef.current.x - element.x
        const dy = mousePositionRef.current.y - element.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 120) {
          const angle = Math.atan2(dy, dx)
          const force = (120 - distance) / 3000
          element.vx -= Math.cos(angle) * force
          element.vy -= Math.sin(angle) * force
          element.rotationSpeed += force * 3
        } else {
          element.rotationSpeed *= 0.99
        }

        // Apply velocity with damping
        element.vx *= 0.998
        element.vy *= 0.998

        // Update position and rotation
        element.x += element.vx
        element.y += element.vy
        element.rotation += element.rotationSpeed

        // Wrap around edges
        if (element.x < -element.size * 2) element.x = canvas.width + element.size * 2
        if (element.x > canvas.width + element.size * 2) element.x = -element.size * 2
        if (element.y < -element.size * 2) element.y = canvas.height + element.size * 2
        if (element.y > canvas.height + element.size * 2) element.y = -element.size * 2

        // Set opacity and draw element
        ctx.globalAlpha = element.opacity

        switch (element.type) {
          case "screw":
            drawScrew(ctx, element.x, element.y, element.size, element.rotation, element.color)
            break
          case "screwdriver":
            drawScrewdriver(ctx, element.x, element.y, element.size, element.rotation, element.color)
            break
          case "wrench":
            drawWrench(ctx, element.x, element.y, element.size, element.rotation, element.color)
            break
          case "hammer":
            drawHammer(ctx, element.x, element.y, element.size, element.rotation, element.color)
            break
          case "pliers":
            drawPliers(ctx, element.x, element.y, element.size, element.rotation, element.color)
            break
          case "drill_bit":
            drawDrillBit(ctx, element.x, element.y, element.size, element.rotation, element.color)
            break
          case "nail":
            drawNail(ctx, element.x, element.y, element.size, element.rotation, element.color)
            break
          case "bolt":
            drawBolt(ctx, element.x, element.y, element.size, element.rotation, element.color)
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
        {/* Tool-themed ambient effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-600/8 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-600/8 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-slate-400/8 rounded-full blur-3xl" />
      </motion.div>
    </>
  )
}
