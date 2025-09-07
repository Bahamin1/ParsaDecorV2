"use client"

import { motion } from "framer-motion"
import { Palette, Award, Users, MapPin } from "lucide-react"
import AnimatedSection from "./animated-section"

interface WhyChooseUsProps {
  lang: string
  dict: any
}

export default function WhyChooseUs({ lang, dict }: WhyChooseUsProps) {
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
    <AnimatedSection className={`py-20 bg-white ${isRTL ? "rtl" : ""}`}>
      <div className="container mx-auto px-4">
        <div className={`text-center mb-16 ${isRTL ? "text-right" : "text-left"} md:text-center`}>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1E1E1E] mb-6">{dict.home.why.title}</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">{dict.home.why.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`text-center group ${isRTL ? "text-right" : "text-left"} md:text-center`}
            >
              <div className="w-16 h-16 bg-[#EA3E27]/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-[#EA3E27] transition-colors duration-300">
                <feature.icon className="w-8 h-8 text-[#EA3E27] group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-semibold text-[#1E1E1E] mb-4">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}
