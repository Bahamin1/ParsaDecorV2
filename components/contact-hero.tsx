"use client"

import { motion } from "framer-motion"
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react"

interface ContactHeroProps {
  lang: string
  dict: any
}

export default function ContactHero({ lang, dict }: ContactHeroProps) {
  const isRTL = lang === "fa"

  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900" />

      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-orange-500/20 rounded-full"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center" dir={isRTL ? "rtl" : "ltr"}>
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">{dict.contact.hero.title}</h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">{dict.contact.hero.subtitle}</p>
        </motion.div>

        {/* Quick Contact Icons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className={`flex justify-center space-x-8 ${isRTL ? "flex-row-reverse space-x-reverse" : ""}`}
        >
          {[
            { icon: Phone, href: "tel:+905344232551", color: "blue" },
            { icon: Mail, href: "mailto:info@parsadecor.com", color: "green" },
            { icon: MessageCircle, href: "https://wa.me/905344232551", color: "green" },
            { icon: MapPin, href: "https://maps.app.goo.gl/dAs122gjvCJnnkFS6", color: "red" },
          ].map((item, index) => (
            <motion.a
              key={index}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className={`w-16 h-16 bg-gradient-to-br from-${item.color}-500 to-${item.color}-600 rounded-full flex items-center justify-center hover:shadow-lg hover:shadow-${item.color}-500/25 transition-all duration-300`}
            >
              <item.icon className="w-8 h-8 text-white" />
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
