"use client"

import { motion } from "framer-motion"
import { Palette, Award, Users, MapPin } from "lucide-react"
import ModernSection from "./modern-section"

interface ModernWhyChooseUsProps {
  lang: string
  dict: any
}

export default function ModernWhyChooseUs({ lang, dict }: ModernWhyChooseUsProps) {
  const isRTL = lang === "fa"

  const features = [
    {
      icon: Palette,
      title: dict.home.why.item1.title,
      description: dict.home.why.item1.description,
    },
    {
      icon: Award,
      title: dict.home.why.item2.title,
      description: dict.home.why.item2.description,
    },
    {
      icon: Users,
      title: dict.home.why.item3.title,
      description: dict.home.why.item3.description,
    },
    {
      icon: MapPin,
      title: dict.home.why.item4.title,
      description: dict.home.why.item4.description,
    },
  ]

  return (
    <ModernSection className={`py-32 relative ${isRTL ? "rtl" : ""}`}>
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className={`text-center mb-20 ${isRTL ? "text-right" : "text-left"} md:text-center`}
        >
          <h2 className="text-5xl md:text-7xl font-extralight text-white mb-6 tracking-wider">{dict.home.why.title}</h2>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto mb-8" />
          <p className="text-xl text-gray-300 max-w-2xl mx-auto font-light">{dict.home.why.subtitle}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`group ${isRTL ? "text-right" : "text-left"} md:text-center`}
            >
              <div className="w-16 h-16 bg-cyan-400/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-cyan-400 transition-colors duration-300">
                <feature.icon className="w-8 h-8 text-cyan-400 group-hover:text-slate-900 transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-light text-white mb-4 group-hover:text-cyan-400 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-300 leading-relaxed font-light">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </ModernSection>
  )
}
