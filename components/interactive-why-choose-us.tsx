"use client"

import { motion } from "framer-motion"
import { Palette, Award, Settings, MapPin } from "lucide-react"
import InteractiveSection from "./interactive-section"
import InteractiveFeatureCard from "./interactive-feature-card"

interface InteractiveWhyChooseUsProps {
  lang: string
  dict: any
}

export default function InteractiveWhyChooseUs({ lang, dict }: InteractiveWhyChooseUsProps) {
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
      icon: Settings,
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
    <InteractiveSection className={`py-32 relative ${isRTL ? "rtl" : ""}`}>
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
          <p className="text-xl text-gray-300 font-light">{dict.home.why.subtitle}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <InteractiveFeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </InteractiveSection>
  )
}
