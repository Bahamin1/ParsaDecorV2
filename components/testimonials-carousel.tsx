"use client"

import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"
import { useState, useEffect } from "react"

interface TestimonialsProps {
  lang: string
  dict: any
}

export default function TestimonialsCarousel({ lang, dict }: TestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const isRTL = lang === "fa"

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Homeowner",
      image: "/professional-woman-diverse.png",
      rating: 5,
      text: "Parsa Decor transformed our home beyond our expectations. The attention to detail and creativity is outstanding.",
    },
    {
      name: "Michael Chen",
      role: "Business Owner",
      image: "/professional-man.png",
      rating: 5,
      text: "Our office renovation was completed on time and within budget. The team's professionalism is remarkable.",
    },
    {
      name: "Emma Wilson",
      role: "Restaurant Owner",
      image: "/professional-woman-manager.png",
      rating: 5,
      text: "The restaurant design created the perfect atmosphere for our customers. Sales have increased significantly.",
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [testimonials.length])

  return (
    <section
      className={`py-12 sm:py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 ${isRTL ? "rtl" : ""}`}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
            {dict?.testimonials?.title || "What Our Clients Say"}
          </h2>
          <p className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto px-4">
            {dict?.testimonials?.subtitle || "Real feedback from satisfied customers"}
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 sm:p-8 md:p-12 border border-white/20"
          >
            <div className="text-center">
              <Quote className="w-12 h-12 sm:w-16 sm:h-16 text-orange-400 mx-auto mb-4 sm:mb-6" />

              <p className="text-lg sm:text-xl md:text-2xl text-white mb-6 sm:mb-8 leading-relaxed italic">
                "{testimonials[currentIndex].text}"
              </p>

              <div className="flex justify-center mb-4 sm:mb-6">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 fill-current" />
                ))}
              </div>

              <div className="flex items-center justify-center space-x-4 rtl:space-x-reverse">
                <img
                  src={testimonials[currentIndex].image || "/placeholder.svg"}
                  alt={testimonials[currentIndex].name}
                  className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-white/20"
                />
                <div className="text-left rtl:text-right">
                  <h4 className="text-lg sm:text-xl font-semibold text-white">{testimonials[currentIndex].name}</h4>
                  <p className="text-sm sm:text-base text-white/70">{testimonials[currentIndex].role}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Indicators */}
          <div className="flex justify-center space-x-2 sm:space-x-3 mt-6 sm:mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "bg-orange-400 w-6 sm:w-8" : "bg-white/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
