"use client"

import { motion } from "framer-motion"
import { Users, Award, Clock, Star } from "lucide-react"

interface ContactStatsProps {
  lang: string
  dict: any
}

export default function ContactStats({ lang, dict }: ContactStatsProps) {
  const isRTL = lang === "fa"

  const stats = [
    {
      icon: Users,
      number: "500+",
      label: dict.contact.stats.clients,
      color: "blue",
    },
    {
      icon: Award,
      number: "15+",
      label: dict.contact.stats.awards,
      color: "orange",
    },
    {
      icon: Clock,
      number: "10+",
      label: dict.contact.stats.experience,
      color: "green",
    },
    {
      icon: Star,
      number: "4.9",
      label: dict.contact.stats.rating,
      color: "yellow",
    },
  ]

  return (
    <section className="py-16 bg-gradient-to-r from-gray-900 to-black">
      <div className="container mx-auto px-4" dir={isRTL ? "rtl" : "ltr"}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-4">{dict.contact.stats.title}</h2>
          <p className="text-gray-300 text-lg">{dict.contact.stats.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div
                className={`w-20 h-20 bg-gradient-to-br from-${stat.color}-500 to-${stat.color}-600 rounded-full flex items-center justify-center mx-auto mb-4`}
              >
                <stat.icon className="w-10 h-10 text-white" />
              </div>
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                viewport={{ once: true }}
                className="text-4xl font-bold text-white mb-2"
              >
                {stat.number}
              </motion.div>
              <p className="text-gray-300">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
