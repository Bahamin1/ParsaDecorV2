"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"

interface ImprovedVideoSectionProps {
  lang: string
  dict: any
}

export default function ImprovedVideoSection({ lang, dict }: ImprovedVideoSectionProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [showControls, setShowControls] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [isInView, setIsInView] = useState(false)
  const [thumbnail, setThumbnail] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const isRTL = lang === "fa"

  // Generate thumbnail from first frame
  const generateThumbnail = () => {
    const video = videoRef.current
    const canvas = canvasRef.current

    if (!video || !canvas) return

    try {
      const ctx = canvas.getContext("2d")
      if (!ctx) return

      canvas.width = video.videoWidth || 1280
      canvas.height = video.videoHeight || 720

      ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
      const thumbnailDataUrl = canvas.toDataURL("image/jpeg", 0.8)
      setThumbnail(thumbnailDataUrl)
    } catch (error) {
      console.log("Thumbnail generation error:", error)
    }
  }

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const updateProgress = () => {
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100)
        setCurrentTime(video.currentTime)
      }
    }

    const updateDuration = () => {
      setDuration(video.duration)
    }

    const handleLoadedData = () => {
      // Generate thumbnail from first frame
      setTimeout(() => {
        video.currentTime = 0
        const handleSeeked = () => {
          generateThumbnail()
          video.removeEventListener("seeked", handleSeeked)
        }
        video.addEventListener("seeked", handleSeeked)
      }, 100)
    }

    video.addEventListener("timeupdate", updateProgress)
    video.addEventListener("loadedmetadata", updateDuration)
    video.addEventListener("loadeddata", handleLoadedData)
    video.addEventListener("ended", () => setIsPlaying(false))

    return () => {
      video.removeEventListener("timeupdate", updateProgress)
      video.removeEventListener("loadedmetadata", updateDuration)
      video.removeEventListener("loadeddata", handleLoadedData)
      video.removeEventListener("ended", () => setIsPlaying(false))
    }
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      { threshold: 0.5 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const togglePlay = () => {
    const video = videoRef.current
    if (!video || !isInView) return

    if (isPlaying) {
      video.pause()
    } else {
      video.play()
    }
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return

    video.muted = !video.muted
    setIsMuted(!isMuted)
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current
    if (!video) return

    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const newTime = (clickX / rect.width) * video.duration
    video.currentTime = newTime
  }

  return (
    <section ref={sectionRef} className="py-20 relative">
      <div className="container mx-auto px-4">
        {/* Hidden canvas for thumbnail generation */}
        <canvas ref={canvasRef} className="hidden" />

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
            <span className="block">{dict.home.video?.title}</span>
            <span className="block text-orange-400">پارسا دکور</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-yellow-400 mx-auto mb-6" />
          <p className="text-xl text-gray-300 font-light max-w-2xl mx-auto">{dict.home.video?.subtitle}</p>
        </motion.div>

        {/* Video Player */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div
            className="relative bg-slate-800 rounded-2xl overflow-hidden border-2 border-orange-500/20 shadow-2xl"
            style={{ aspectRatio: "16/9" }}
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}
          >
            {/* Video Element */}
            <video
              ref={videoRef}
              className="w-full h-full object-cover cursor-none"
              poster={thumbnail || "/placeholder.svg?height=720&width=1280&text=پارسا+دکور+تریلر"}
              preload="metadata"
              playsInline
              crossOrigin="anonymous"
            >
              <source src="/videos/parsa-decor-trailer.mov" type="video/quicktime" />
              <source src="/videos/parsa-decor-trailer.mp4" type="video/mp4" />
              مرورگر شما از پخش ویدیو پشتیبانی نمی‌کند.
            </video>

            {/* Custom Cursor for Video */}
            <div
              className="absolute inset-0 cursor-none"
              style={{
                cursor: `url("data:image/svg+xml,${encodeURIComponent(
                  `<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24' fill='white'><path d='${
                    isPlaying ? "M6 4h4v16H6V4zm8 0h4v16h-4V4z" : "M8 5v14l11-7z"
                  }'/></svg>`,
                )}") 16 16, pointer`,
              }}
              onClick={togglePlay}
            />

            {/* Play Button Overlay */}
            <AnimatePresence>
              {!isPlaying && isInView && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  className="absolute inset-0 flex items-center justify-center bg-black/30"
                >
                  <motion.button
                    onClick={togglePlay}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center shadow-2xl"
                  >
                    <Play className={`w-8 h-8 text-white ${isRTL ? "mr-1" : "ml-1"}`} />
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Controls Overlay */}
            <AnimatePresence>
              {showControls && isPlaying && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6"
                >
                  {/* Progress Bar */}
                  <div
                    className="w-full h-2 bg-white/20 rounded-full mb-4 cursor-pointer"
                    onClick={handleProgressClick}
                  >
                    <motion.div
                      className="h-full bg-orange-500 rounded-full"
                      style={{ width: `${progress}%` }}
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                    />
                  </div>

                  {/* Control Buttons */}
                  <div className={`flex items-center justify-between ${isRTL ? "flex-row-reverse" : ""}`}>
                    <div className={`flex items-center space-x-4 ${isRTL ? "flex-row-reverse space-x-reverse" : ""}`}>
                      <button
                        onClick={togglePlay}
                        className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors"
                      >
                        {isPlaying ? (
                          <Pause className="w-5 h-5 text-white" />
                        ) : (
                          <Play className={`w-5 h-5 text-white ${isRTL ? "mr-0.5" : "ml-0.5"}`} />
                        )}
                      </button>

                      <button
                        onClick={toggleMute}
                        className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                      >
                        {isMuted ? (
                          <VolumeX className="w-5 h-5 text-white" />
                        ) : (
                          <Volume2 className="w-5 h-5 text-white" />
                        )}
                      </button>

                      <span className="text-white text-sm font-medium">
                        {formatTime(currentTime)} / {formatTime(duration)}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Corner accents */}
            <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-orange-400/50" />
            <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-orange-400/50" />
            <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-orange-400/50" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-orange-400/50" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
