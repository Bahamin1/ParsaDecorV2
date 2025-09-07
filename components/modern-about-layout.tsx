"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Hammer, Wrench, Cog, Ruler, HardHat, Drill } from "lucide-react"

interface ModernAboutLayoutProps {
  lang: string
  dict: any
}

export default function ModernAboutLayout({ lang, dict }: ModernAboutLayoutProps) {
  const tools = [Hammer, Wrench, Cog, Ruler, HardHat, Drill]

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section - Asymmetric Layout */}
      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-12 gap-8 items-center min-h-[80vh]">
            {/* Left Content - Diagonal */}
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="col-span-12 lg:col-span-7 transform lg:-skew-y-2"
            >
              <div className="transform lg:skew-y-2">
                <h1 className="text-6xl md:text-8xl font-black text-white mb-8">
                  <span className="block">ABOUT</span>
                  <span className="block text-orange-400 ml-8">PARSA</span>
                  <span className="block ml-16">DECOR</span>
                </h1>

                <div className="max-w-2xl">
                  <p className="text-xl text-gray-300 font-light leading-relaxed mb-8">{dict.about.description}</p>
                </div>
              </div>
            </motion.div>

            {/* Right Side - Floating Tools */}
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="col-span-12 lg:col-span-5 relative"
            >
              <div className="relative h-96">
                {tools.map((Tool, index) => (
                  <motion.div
                    key={index}
                    animate={{
                      y: [0, -20, 0],
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{
                      duration: 3 + index * 0.5,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: index * 0.3,
                    }}
                    className="absolute w-16 h-16 bg-orange-500/20 rounded-lg flex items-center justify-center border border-orange-500/30"
                    style={{
                      top: `${Math.random() * 70}%`,
                      left: `${Math.random() * 70}%`,
                    }}
                  >
                    <Tool className="w-8 h-8 text-orange-400" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Team Section - Split Diagonal */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          {/* Mission Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-12 gap-8 mb-20"
          >
            <div className="col-span-12 lg:col-span-6">
              <div
                className="relative h-96 overflow-hidden"
                style={{ clipPath: "polygon(0 0, calc(100% - 60px) 0, 100% 100%, 0 100%)" }}
              >
                <Image src="/placeholder.svg?height=400&width=600" alt="Our Mission" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/30 to-transparent" />
              </div>
            </div>

            <div className="col-span-12 lg:col-span-6 flex items-center">
              <div className="transform lg:skew-y-2">
                <div className="transform lg:-skew-y-2">
                  <h2 className="text-4xl font-black text-white mb-6">
                    <span className="text-orange-400">OUR</span> MISSION
                  </h2>
                  <p className="text-lg text-gray-300 leading-relaxed">{dict.about.mission.description}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Team Section - Reversed */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-12 gap-8"
          >
            <div className="col-span-12 lg:col-span-6 order-2 lg:order-1 flex items-center">
              <div className="transform lg:-skew-y-2">
                <div className="transform lg:skew-y-2">
                  <h2 className="text-4xl font-black text-white mb-6">
                    <span className="text-orange-400">OUR</span> TEAM
                  </h2>
                  <p className="text-lg text-gray-300 leading-relaxed">{dict.about.team.description}</p>
                </div>
              </div>
            </div>

            <div className="col-span-12 lg:col-span-6 order-1 lg:order-2">
              <div
                className="relative h-96 overflow-hidden"
                style={{ clipPath: "polygon(60px 0, 100% 0, 100% 100%, 0 100%)" }}
              >
                <Image src="/placeholder.svg?height=400&width=600" alt="Our Team" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-bl from-orange-500/30 to-transparent" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section - Construction Theme */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: "150+", label: "Projects Completed", icon: Hammer },
              { number: "8+", label: "Years Experience", icon: HardHat },
              { number: "50+", label: "Happy Clients", icon: Wrench },
              { number: "24/7", label: "Support", icon: Cog },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="relative mb-4">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    className="w-16 h-16 bg-orange-500/20 rounded-lg flex items-center justify-center border border-orange-500/30 mx-auto mb-4"
                  >
                    <stat.icon className="w-8 h-8 text-orange-400" />
                  </motion.div>
                </div>

                <h3 className="text-3xl font-black text-white mb-2 group-hover:text-orange-400 transition-colors">
                  {stat.number}
                </h3>
                <p className="text-gray-300 font-light">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
