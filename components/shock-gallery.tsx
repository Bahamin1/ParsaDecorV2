"use client"

import { AnimatePresence, motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Download, Eye, Grid, Heart, List, Share2, X } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"
import GalleryFilter from "./gallery-filter"
import GallerySearch from "./gallery-search"
import GalleryStats from "./gallery-stats"
import ModernFooter from "./modern-footer"

interface ShockGalleryProps {
  lang: string
  dict: any
}

interface GalleryItem {
  id: number
  src: string
  title: string
  category: string
  description: string
  views: number
  likes: number
  downloads: number
  shares: number
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    src: "/images/gallery/modern-living-room.jpg",
    title: "Modern Living Room",
    category: "living",
    description: "Contemporary living space with minimalist design",
    views: 1250,
    likes: 89,
    downloads: 45,
    shares: 23,
  },
  {
    id: 2,
    src: "/images/gallery/luxury-bedroom.jpg",
    title: "Luxury Bedroom",
    category: "bedroom",
    description: "Elegant bedroom with premium finishes",
    views: 980,
    likes: 67,
    downloads: 32,
    shares: 18,
  },
  {
    id: 3,
    src: "/images/gallery/modern-kitchen.jpg",
    title: "Modern Kitchen",
    category: "kitchen",
    description: "State-of-the-art kitchen design",
    views: 1450,
    likes: 102,
    downloads: 58,
    shares: 31,
  },
  {
    id: 4,
    src: "/images/gallery/elegant-dining.jpg",
    title: "Elegant Dining",
    category: "dining",
    description: "Sophisticated dining room setup",
    views: 875,
    likes: 54,
    downloads: 28,
    shares: 15,
  },
  {
    id: 5,
    src: "/images/gallery/bathroom-design.jpg",
    title: "Luxury Bathroom",
    category: "bathroom",
    description: "Premium bathroom with modern fixtures",
    views: 720,
    likes: 41,
    downloads: 22,
    shares: 12,
  },
  {
    id: 6,
    src: "/images/gallery/office-interior.jpg",
    title: "Office Interior",
    category: "office",
    description: "Professional office space design",
    views: 650,
    likes: 38,
    downloads: 19,
    shares: 10,
  },
]

export default function ShockGallery({ lang, dict }: ShockGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null)
  const [filteredItems, setFilteredItems] = useState(galleryItems)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [isLoading, setIsLoading] = useState(true)

  const isRTL = lang === "fa"

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    let filtered = galleryItems

    if (selectedCategory !== "all") {
      filtered = filtered.filter((item) => item.category === selectedCategory)
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    setFilteredItems(filtered)
  }, [selectedCategory, searchTerm])

  const totalStats = galleryItems.reduce(
    (acc, item) => ({
      views: acc.views + item.views,
      likes: acc.likes + item.likes,
      downloads: acc.downloads + item.downloads,
      shares: acc.shares + item.shares,
    }),
    { views: 0, likes: 0, downloads: 0, shares: 0 },
  )

  const nextImage = () => {
    if (!selectedImage) return
    const currentIndex = filteredItems.findIndex((item) => item.id === selectedImage.id)
    const nextIndex = (currentIndex + 1) % filteredItems.length
    setSelectedImage(filteredItems[nextIndex])
  }

  const prevImage = () => {
    if (!selectedImage) return
    const currentIndex = filteredItems.findIndex((item) => item.id === selectedImage.id)
    const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length
    setSelectedImage(filteredItems[prevIndex])
  }

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Escape") setSelectedImage(null)
    if (e.key === "ArrowRight") nextImage()
    if (e.key === "ArrowLeft") prevImage()
  }

  useEffect(() => {
    if (selectedImage) {
      document.addEventListener("keydown", handleKeyPress)
      document.body.style.overflow = "hidden"
    } else {
      document.removeEventListener("keydown", handleKeyPress)
      document.body.style.overflow = "unset"
    }

    return () => {
      document.removeEventListener("keydown", handleKeyPress)
      document.body.style.overflow = "unset"
    }
  }, [selectedImage])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-400 mx-auto mb-4"></div>
          <p className="text-white text-xl">
            {lang === "fa" ? "در حال بارگذاری گالری..." : lang === "tr" ? "Galeri yükleniyor..." : "Loading Gallery..."}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen bg-slate-900 ${isRTL ? "rtl" : ""}`}>
      {/* Header */}
      <div className="pt-20 pb-8">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              {dict?.gallery?.title ||
                (lang === "fa" ? "گالری پروژه‌ها" : lang === "tr" ? "Proje Galerisi" : "Project Gallery")}
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              {dict?.gallery?.subtitle ||
                (lang === "fa"
                  ? "مجموعه‌ای از بهترین پروژه‌های طراحی داخلی ما"
                  : lang === "tr"
                    ? "En iyi iç tasarım projelerimizin koleksiyonu"
                    : "A collection of our finest interior design projects")}
            </p>
          </motion.div>

          {/* Stats */}
          <GalleryStats
            totalViews={totalStats.views}
            totalLikes={totalStats.likes}
            totalDownloads={totalStats.downloads}
            totalShares={totalStats.shares}
            lang={lang}
          />

          {/* Controls */}
          <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between">
            <div className="flex gap-4 items-center">
              <GalleryFilter selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} lang={lang} />

              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "grid" ? "bg-amber-500 text-white" : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "list" ? "bg-amber-500 text-white" : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>

            <GallerySearch searchTerm={searchTerm} onSearchChange={setSearchTerm} lang={lang} />
          </div>

          {/* Gallery Grid */}
          <motion.div
            className={`${viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" : "space-y-6"}`}
            layout
          >
            <AnimatePresence>
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ delay: index * 0.1 }}
                  className={`group cursor-pointer ${
                    viewMode === "list" ? "flex gap-6 bg-slate-800 rounded-xl p-6" : ""
                  }`}
                  onClick={() => setSelectedImage(item)}
                >
                  <div
                    className={`relative overflow-hidden rounded-xl ${
                      viewMode === "list" ? "w-48 h-32 flex-shrink-0" : "aspect-[4/3]"
                    }`}
                  >
                    <Image
                      src={item.src || "/placeholder.svg"}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Overlay Icons */}
                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-black/50 backdrop-blur-sm rounded-full p-2">
                        <Eye className="w-4 h-4 text-white" />
                      </div>
                      <div className="bg-black/50 backdrop-blur-sm rounded-full p-2">
                        <Heart className="w-4 h-4 text-white" />
                      </div>
                    </div>

                    {/* Stats Overlay */}
                    <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex justify-between text-white text-sm">
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {item.views}
                        </span>
                        <span className="flex items-center gap-1">
                          <Heart className="w-3 h-3" />
                          {item.likes}
                        </span>
                      </div>
                    </div>
                  </div>

                  {viewMode === "list" && (
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                      <p className="text-slate-300 mb-4">{item.description}</p>
                      <div className="flex gap-4 text-sm text-slate-400">
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {item.views}
                        </span>
                        <span className="flex items-center gap-1">
                          <Heart className="w-3 h-3" />
                          {item.likes}
                        </span>
                        <span className="flex items-center gap-1">
                          <Download className="w-3 h-3" />
                          {item.downloads}
                        </span>
                      </div>
                    </div>
                  )}

                  {viewMode === "grid" && (
                    <div className="mt-4">
                      <h3 className="text-lg font-semibold text-white mb-1">{item.title}</h3>
                      <p className="text-slate-400 text-sm">{item.description}</p>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredItems.length === 0 && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-white mb-2">
                {lang === "fa" ? "نتیجه‌ای یافت نشد" : lang === "tr" ? "Sonuç bulunamadı" : "No results found"}
              </h3>
              <p className="text-slate-400">
                {lang === "fa"
                  ? "لطفاً جستجوی خود را تغییر دهید"
                  : lang === "tr"
                    ? "Lütfen aramanızı değiştirin"
                    : "Please try a different search"}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl max-h-[90vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 bg-black/50 backdrop-blur-sm rounded-full p-2 text-white hover:bg-black/70 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Navigation Buttons */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 backdrop-blur-sm rounded-full p-2 text-white hover:bg-black/70 transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 backdrop-blur-sm rounded-full p-2 text-white hover:bg-black/70 transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Image */}
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                <Image
                  src={selectedImage.src || "/placeholder.svg"}
                  alt={selectedImage.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Info Panel */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-xl">
                <h3 className="text-2xl font-bold text-white mb-2">{selectedImage.title}</h3>
                <p className="text-slate-300 mb-4">{selectedImage.description}</p>

                <div className="flex items-center justify-between">
                  <div className="flex gap-6 text-sm text-slate-300">
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {selectedImage.views}
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      {selectedImage.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <Download className="w-4 h-4" />
                      {selectedImage.downloads}
                    </span>
                    <span className="flex items-center gap-1">
                      <Share2 className="w-4 h-4" />
                      {selectedImage.shares}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      {lang === "fa" ? "دانلود" : lang === "tr" ? "İndir" : "Download"}
                    </button>
                    <button className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
                      <Share2 className="w-4 h-4" />
                      {lang === "fa" ? "اشتراک" : lang === "tr" ? "Paylaş" : "Share"}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ModernFooter lang={lang} dict={dict} />
    </div>
  )
}
