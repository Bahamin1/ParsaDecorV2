"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Eye, Heart, Share2, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"

interface Project {
  id: number
  title: string
  category: string
  image: string
  description: string
  likes: number
  views: number
}

interface InteractiveFeaturedProjectsProps {
  lang: string
  dict: any
}

export default function InteractiveFeaturedProjects({ lang, dict }: InteractiveFeaturedProjectsProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const router = useRouter()
  const isRTL = lang === "fa"

  const [likedProjects, setLikedProjects] = useState<number[]>([])

  const projects: Project[] = [
    {
      id: 1,
      title: dict?.projects?.modern_living || "نشیمن مدرن",
      category: dict?.projects?.residential || "مسکونی",
      image: "/images/projects/modern-living-1.jpg",
      description: dict?.projects?.modern_desc || "طراحی مدرن و شیک",
      likes: 124,
      views: 1250,
    },
    {
      id: 2,
      title: dict?.projects?.luxury_bedroom || "اتاق خواب لوکس",
      category: dict?.projects?.residential || "مسکونی",
      image: "/images/projects/luxury-bedroom-1.jpg",
      description: dict?.projects?.luxury_desc || "فضای آرام و لوکس",
      likes: 98,
      views: 890,
    },
    {
      id: 3,
      title: dict?.projects?.modern_kitchen || "آشپزخانه مدرن",
      category: dict?.projects?.residential || "مسکونی",
      image: "/images/projects/modern-kitchen-1.jpg",
      description: dict?.projects?.kitchen_desc || "آشپزخانه کاربردی و زیبا",
      likes: 156,
      views: 1680,
    },
    {
      id: 4,
      title: dict?.projects?.office_space || "فضای اداری",
      category: dict?.projects?.commercial || "تجاری",
      image: "/images/projects/office-space-1.jpg",
      description: dict?.projects?.office_desc || "محیط کار مدرن",
      likes: 87,
      views: 720,
    },
  ]

  const handleLike = (projectId: number) => {
    setLikedProjects((prev) =>
      prev.includes(projectId) ? prev.filter((id) => id !== projectId) : [...prev, projectId],
    )
  }

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-pink-50 via-white to-yellow-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="inline-block mb-4"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded-full flex items-center justify-center">
              <Eye className="w-8 h-8 text-white" />
            </div>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold mb-4 parsa-gradient-text">
            {dict?.projects?.title || "نمونه کارهای ما"}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {dict?.projects?.subtitle || "مجموعه‌ای از بهترین پروژه‌های طراحی داخلی ما"}
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
              whileHover={{ y: -10 }}
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex space-x-2 rtl:space-x-reverse opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleLike(project.id)}
                    className={`p-2 rounded-full backdrop-blur-sm transition-colors duration-300 ${
                      likedProjects.includes(project.id)
                        ? "bg-red-500 text-white"
                        : "bg-white/20 text-white hover:bg-red-500"
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${likedProjects.includes(project.id) ? "fill-current" : ""}`} />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 rounded-full bg-white/20 text-white hover:bg-blue-500 backdrop-blur-sm transition-colors duration-300"
                  >
                    <Share2 className="w-4 h-4" />
                  </motion.button>
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white text-xs font-semibold rounded-full">
                    {project.category}
                  </span>
                </div>

                {/* Stats */}
                <div className="absolute bottom-4 left-4 right-4 flex justify-between text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex items-center space-x-1 rtl:space-x-reverse">
                    <Heart className="w-4 h-4" />
                    <span>{project.likes + (likedProjects.includes(project.id) ? 1 : 0)}</span>
                  </div>
                  <div className="flex items-center space-x-1 rtl:space-x-reverse">
                    <Eye className="w-4 h-4" />
                    <span>{project.views}</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:parsa-gradient-text transition-all duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>

                {/* View Project Button */}
                <motion.button
                  onClick={() => router.push(`/${lang}/portfolio/${project.id}`)}
                  whileHover={{ x: isRTL ? -5 : 5 }}
                  className="flex items-center space-x-2 rtl:space-x-reverse text-sm font-semibold parsa-gradient-text group-hover:text-red-600 transition-colors duration-300"
                >
                  <span>{dict?.projects?.view_project || "مشاهده پروژه"}</span>
                  <ArrowRight className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
                </motion.button>
              </div>

              {/* Hover Border Effect */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-gradient-to-r group-hover:from-pink-500 group-hover:via-red-500 group-hover:to-yellow-500 rounded-2xl transition-all duration-300 pointer-events-none" />
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-12"
        >
          <motion.button
            onClick={() => router.push(`/${lang}/portfolio`)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <span>{dict?.projects?.view_all || "مشاهده همه پروژه‌ها"}</span>
              <ArrowRight className={`w-5 h-5 ${isRTL ? "rotate-180" : ""}`} />
            </div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
