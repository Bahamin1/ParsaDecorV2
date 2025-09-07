"use client"

import type React from "react"

import { useState, useEffect } from "react"

interface EnhancedGalleryAnimationsProps {
  children: React.ReactNode
  isActive: boolean
}

export default function EnhancedGalleryAnimations({ children, isActive }: EnhancedGalleryAnimationsProps) {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([])

  useEffect(() => {
    if (isActive) {
      // Create floating particles
      const newParticles = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 2,
      }))
      setParticles(newParticles)

      // Clear particles after animation
      const timer = setTimeout(() => setParticles([]), 3000)
      return () => clearTimeout(timer)
    }
  }, [isActive])

  return (
    <div className="relative">
      {children}

      {/* Floating Particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-70 animate-bounce pointer-events-none"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: "2s",
          }}
        />
      ))}

      {/* Ripple Effect */}
      {isActive && (
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-0 h-0 border-2 border-white/30 rounded-full animate-ping"
            style={{ animationDuration: "1.5s" }}
          />
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-0 h-0 border border-purple-400/50 rounded-full animate-ping"
            style={{ animationDuration: "2s", animationDelay: "0.3s" }}
          />
        </div>
      )}

      {/* Glow Effect */}
      {isActive && (
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-pink-500/20 animate-pulse pointer-events-none rounded-lg" />
      )}
    </div>
  )
}
