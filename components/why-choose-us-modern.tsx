"use client"

import { motion } from "framer-motion"
import { Award, Users, Clock, Shield } from "lucide-react"

interface WhyChooseUsProps {
  lang: string
  dict: any
}

export default function WhyChooseUsModern({ lang, dict }: WhyChooseUsProps) {
  const isRTL = lang === "fa"

  const features = [
    {
      icon: Award,
      title: "Expert Team",
      description: "Professional designers with years of experience",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Users,
      title: "Client Focused",
      description: "Your vision is our priority from start to finish",
      color: "from-green-500 to-green-600",
    },
    {
      icon: Clock,
      title: "On Time Delivery",
      description: "Projects completed within agreed timelines",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: Shield,
      title: "Quality Guarantee",
      description: "Premium materials and craftsmanship assured",
      color: "from-orange-500 to-orange-600",
    },
  ]

  return (
    <section className={`py-12 sm:py-20 bg-white ${isRTL ? "rtl" : ""}`}>
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">Why Choose Us</h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            We deliver exceptional interior design services with attention to detail and client satisfaction
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div
                  className={`w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">{feature.title}</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed px-2">{feature.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
