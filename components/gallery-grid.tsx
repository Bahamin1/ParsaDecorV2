"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Download, Share2, Eye, X } from "lucide-react"

interface GalleryGridProps {
  lang: string
  dict: any
}

export default function GalleryGrid({ lang, dict }: GalleryGridProps) {
  const [activeFilter, setActiveFilter] = useState("all")
  const [selectedImage, setSelectedImage] = useState<any>(null)
  const isRTL = lang === "fa"

  const images = [
    {
      id: 1,
      title: "سالن پذیرایی مدرن",
      category: "rooms",
      image: "/images/gallery/modern-living-room.jpg",
      project: "آپارتمان مدرن در بی‌اوغلو",
    },
    {
      id: 2,
      title: "اتاق خواب لوکس",
      category: "rooms",
      image: "/images/gallery/luxury-bedroom.jpg",
      project: "پنت‌هاوس در نیشان‌تاشی",
    },
    {
      id: 3,
      title: "آشپزخانه مدرن",
      category: "rooms",
      image: "/images/gallery/modern-kitchen.jpg",
      project: "آپارتمان مدرن در بی‌اوغلو",
    },
    {
      id: 4,
      title: "اتاق غذاخوری شیک",
      category: "rooms",
      image: "/images/gallery/elegant-dining.jpg",
      project: "هتل بوتیک در سلطان احمد",
    },
    {
      id: 5,
      title: "حمام طراحی شده",
      category: "details",
      image: "/images/gallery/bathroom-design.jpg",
      project: "آپارتمان مدرن در بی‌اوغلو",
    },
    {
      id: 6,
      title: "دفتر کار مدرن",
      category: "rooms",
      image: "/images/gallery/office-interior.jpg",
      project: "دفتر لوکس در لونت",
    },
    {
      id: 7,
      title: "فرآیند ساخت",
      category: "process",
      image: "/images/gallery/construction-process.jpg",
      project: "پروژه در حال ساخت",
    },
    {
      id: 8,
      title: "جزئیات کابینت",
      category: "details",
      image: "/images/gallery/cabinet-details.jpg",
      project: "آپارتمان مدرن در بی‌اوغلو",
    },
    {
      id: 9,
      title: "قبل از بازسازی",
      category: "before_after",
      image: "/images/gallery/before-renovation.jpg",
      project: "دفتر لوکس در لونت",
    },
    {
      id: 10,
      title: "بعد از بازسازی",
      category: "before_after",
      image: "/images/gallery/after-renovation.jpg",
      project: "دفتر لوکس در لونت",
    },
    {
      id: 11,
      title: "نمای پنت‌هاوس",
      category: "rooms",
      image: "/images/gallery/penthouse-view.jpg",
      project: "پنت‌هاوس در نیشان‌تاشی",
    },
    {
      id: 12,
      title: "لابی هتل",
      category: "rooms",
      image: "/images/gallery/hotel-lobby.jpg",
      project: "هتل بوتیک در سلطان احمد",
    },
  ]

  const filters = [
    { key: "all", label: dict.gallery.categories.all },
    { key: "before_after", label: dict.gallery.categories.before_after },
    { key: "process", label: dict.gallery.categories.process },
    { key: "details", label: dict.gallery.categories.details },
    { key: "rooms", label: dict.gallery.categories.rooms },
  ]

  const filteredImages = activeFilter === "all" ? images : images.filter((img) => img.category === activeFilter)

  return (
    <div className={isRTL ? "rtl" : ""}>
      {/* Filter Buttons */}
      <div className={`flex flex-wrap justify-center gap-4 mb-12 ${isRTL ? "space-x-reverse" : ""}`}>
        {filters.map((filter) => (
          <button
            key={filter.key}
            onClick={() => setActiveFilter(filter.key)}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
              activeFilter === filter.key ? "bg-orange-500 text-white" : "bg-slate-800 text-gray-300 hover:bg-slate-700"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Images Grid */}
      <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredImages.map((image) => (
            <motion.div
              key={image.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4 }}
              className="group cursor-pointer relative overflow-hidden rounded-xl bg-slate-800"
              onClick={() => setSelectedImage(image)}
            >
              <Image
                src={image.image || "/placeholder.svg"}
                alt={image.title}
                width={600}
                height={400}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-colors duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Eye className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className={`text-white font-semibold mb-1 ${isRTL ? "text-right" : "text-left"}`}>{image.title}</h3>
                <p className={`text-gray-300 text-sm ${isRTL ? "text-right" : "text-left"}`}>{image.project}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className={`absolute top-4 ${isRTL ? "left-4" : "right-4"} z-10 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors`}
              >
                <X className="w-5 h-5" />
              </button>

              <Image
                src={selectedImage.image || "/placeholder.svg"}
                alt={selectedImage.title}
                width={800}
                height={600}
                className="w-full h-auto rounded-lg"
              />

              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent rounded-b-lg">
                <div className={`flex items-center justify-between ${isRTL ? "flex-row-reverse" : ""}`}>
                  <div className={isRTL ? "text-right" : "text-left"}>
                    <h3 className="text-white text-xl font-bold mb-2">{selectedImage.title}</h3>
                    <p className="text-gray-300">{selectedImage.project}</p>
                  </div>
                  <div className={`flex gap-3 ${isRTL ? "space-x-reverse space-x-3" : "space-x-3"}`}>
                    <button className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                      <Download className="w-5 h-5" />
                    </button>
                    <button className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
