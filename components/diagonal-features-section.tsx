"use client"

import { motion } from "framer-motion"
import { Palette, Award, Settings, MapPin, Wrench, Hammer, Cog, Ruler } from "lucide-react"

interface DiagonalFeaturesSectionProps {
  lang: string
  dict: any
}

export default function DiagonalFeaturesSection({ lang, dict }: DiagonalFeaturesSectionProps) {
  const features = [
    {
      icon: Palette,
      title: dict.home.why.item1.title,
      description: dict.home.why.item1.description,
      accent: Wrench,
    },
    {
      icon: Award,
      title: dict.home.why.item2.title,
      description: dict.home.why.item2.description,
      accent: Hammer,
    },
    {
      icon: Settings,
      title: dict.home.why.item3.title,
      description: dict.home.why.item3.description,
      accent: Cog,
    },
    {
      icon: MapPin,
      title: dict.home.why.item4.title,
      description: dict.home.why.item4.description,
      accent: Ruler,
    },
  ]

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Diagonal Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-orange-500/5 to-transparent transform -skew-y-6 origin-top-left" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-tl from-yellow-500/5 to-transparent transform skew-y-6 origin-bottom-right" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-black text-white mb-6">
            <span className="block transform -skew-x-12">WHY CHOOSE</span>
            <span className="block text-orange-400 transform skew-x-12">PARSA DECOR</span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-orange-400 to-yellow-400 mx-auto transform -skew-x-12" />
        </motion.div>

        {/* Features Grid - Diagonal Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50, y: 50 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`group relative ${index % 2 === 0 ? "md:transform md:-skew-y-2" : "md:transform md:skew-y-2"}`}
            >
              {/* Feature Card */}
              <div className="relative p-8 bg-slate-800/30 backdrop-blur-sm border border-orange-500/20 overflow-hidden">
                {/* Diagonal accent line */}
                <div
                  className={`absolute top-0 ${index % 2 === 0 ? "left-0" : "right-0"} w-1 h-full bg-gradient-to-b from-orange-400 to-yellow-400 transform ${index % 2 === 0 ? "skew-y-12" : "-skew-y-12"}`}
                />

                {/* Icon Section */}
                <div className="flex items-center space-x-4 mb-6">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    className="w-16 h-16 bg-gradient-to-br from-orange-400/20 to-yellow-400/20 rounded-lg flex items-center justify-center border border-orange-400/30"
                  >
                    <feature.icon className="w-8 h-8 text-orange-400" />
                  </motion.div>

                  {/* Accent tool icon */}
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: index * 0.5 }}
                    className="w-8 h-8 text-yellow-400/60"
                  >
                    <feature.accent className="w-full h-full" />
                  </motion.div>
                </div>

                {/* Content */}
                <div className={index % 2 === 0 ? "md:transform md:skew-y-2" : "md:transform md:-skew-y-2"}>
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-orange-400 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed font-light">{feature.description}</p>
                </div>

                {/* Hover effect overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-yellow-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={false}
                />

                {/* Construction corner detail */}
                <div
                  className={`absolute ${index % 2 === 0 ? "bottom-4 right-4" : "bottom-4 left-4"} w-6 h-6 border-2 border-orange-400/50 transform rotate-45 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Construction Elements */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-20 flex justify-center items-center space-x-8"
        >
          {[Wrench, Hammer, Cog, Ruler].map((Icon, index) => (
            <motion.div
              key={index}
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1],
              }}
              transition={{
                rotate: { duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                scale: { duration: 2, repeat: Number.POSITIVE_INFINITY, delay: index * 0.5 },
              }}
              className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center border border-orange-500/30"
            >
              <Icon className="w-6 h-6 text-orange-400" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
