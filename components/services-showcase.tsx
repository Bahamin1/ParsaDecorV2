"use client"

import { motion } from "framer-motion"
import { Home, Building2, Users, ArrowRight } from "lucide-react"
import Link from "next/link"

interface ServicesShowcaseProps {
  lang: string
  dict: any
}

export default function ServicesShowcase({ lang, dict }: ServicesShowcaseProps) {
  const isRTL = lang === "fa"

  const services = [
    {
      icon: Home,
      title: dict?.services?.residential?.title || "Residential Design",
      description:
        dict?.services?.residential?.description || "Transform your home into a beautiful and functional space",
      image: "/images/projects/modern-living-1.jpg",
      color: "from-blue-500 to-purple-600",
    },
    {
      icon: Building2,
      title: dict?.services?.commercial?.title || "Commercial Design",
      description:
        dict?.services?.commercial?.description || "Professional spaces that inspire productivity and success",
      image: "/images/projects/office-space-1.jpg",
      color: "from-green-500 to-teal-600",
    },
    {
      icon: Users,
      title: dict?.services?.consultation?.title || "Design Consultation",
      description: dict?.services?.consultation?.description || "Expert advice to guide your design decisions",
      image: "/images/projects/luxury-bedroom-1.jpg",
      color: "from-orange-500 to-red-600",
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
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            {dict?.services?.title || "Our Services"}
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            {dict?.services?.subtitle || "Comprehensive interior design solutions"}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              >
                {/* Background Image */}
                <div className="relative h-48 sm:h-64 overflow-hidden">
                  <img
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-80`} />
                  <div className="absolute inset-0 bg-black/20" />

                  {/* Icon */}
                  <div className="absolute top-4 sm:top-6 left-4 sm:left-6">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 group-hover:text-orange-500 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-4 leading-relaxed">{service.description}</p>

                  <button className="flex items-center space-x-2 rtl:space-x-reverse text-orange-500 font-medium group-hover:text-orange-600 transition-colors text-sm sm:text-base">
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-12 sm:mt-16"
        >
          <Link
            href={`/${lang}/services`}
            className="inline-flex items-center space-x-2 rtl:space-x-reverse px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-full hover:scale-105 transition-transform duration-300 text-sm sm:text-base"
          >
            <span>View All Services</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
