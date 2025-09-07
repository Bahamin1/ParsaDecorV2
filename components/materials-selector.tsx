"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, Check } from "lucide-react"

interface MaterialsSelectorProps {
  lang: string
  dict: any
}

export default function MaterialsSelector({ lang, dict }: MaterialsSelectorProps) {
  const [activeCategory, setActiveCategory] = useState("colors")
  const [selectedItems, setSelectedItems] = useState<number[]>([])
  const [favorites, setFavorites] = useState<number[]>([])
  const isRTL = lang === "fa"

  const categories = [
    { key: "colors", label: dict.materials.categories.colors },
    { key: "textures", label: dict.materials.categories.textures },
    { key: "materials", label: dict.materials.categories.materials },
    { key: "finishes", label: dict.materials.categories.finishes },
  ]

  const colorPalettes = [
    { id: 1, name: "رنگ‌های گرم", colors: ["#FF6B35", "#F7931E", "#FFD23F", "#EE4B2B"], category: "warm" },
    { id: 2, name: "رنگ‌های سرد", colors: ["#4A90E2", "#50C878", "#9B59B6", "#1ABC9C"], category: "cool" },
    { id: 3, name: "رنگ‌های خنثی", colors: ["#F5F5DC", "#D2B48C", "#A0A0A0", "#696969"], category: "neutral" },
    { id: 4, name: "رنگ‌های پررنگ", colors: ["#DC143C", "#FF1493", "#8A2BE2", "#FF4500"], category: "bold" },
  ]

  const materials = [
    { id: 5, name: "چوب بلوط", image: "/placeholder.svg?height=200&width=200", type: "wood" },
    { id: 6, name: "سنگ مرمر", image: "/placeholder.svg?height=200&width=200", type: "stone" },
    { id: 7, name: "فلز استیل", image: "/placeholder.svg?height=200&width=200", type: "metal" },
    { id: 8, name: "شیشه مات", image: "/placeholder.svg?height=200&width=200", type: "glass" },
    { id: 9, name: "پارچه مخمل", image: "/placeholder.svg?height=200&width=200", type: "fabric" },
    { id: 10, name: "سرامیک براق", image: "/placeholder.svg?height=200&width=200", type: "ceramic" },
  ]

  const toggleSelection = (id: number) => {
    setSelectedItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const renderColors = () => (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {colorPalettes.map((palette) => (
        <motion.div
          key={palette.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-800 rounded-xl p-6 hover:bg-slate-700 transition-colors cursor-pointer"
          onClick={() => toggleSelection(palette.id)}
        >
          <div className="flex flex-wrap gap-2 mb-4">
            {palette.colors.map((color, index) => (
              <div
                key={index}
                className="w-12 h-12 rounded-lg border-2 border-slate-600"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          <div className={`flex items-center justify-between ${isRTL ? "flex-row-reverse" : ""}`}>
            <h3 className={`font-semibold text-white ${isRTL ? "text-right" : "text-left"}`}>{palette.name}</h3>
            <div className={`flex gap-2 ${isRTL ? "space-x-reverse space-x-2" : "space-x-2"}`}>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  toggleFavorite(palette.id)
                }}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                  favorites.includes(palette.id) ? "bg-red-500 text-white" : "bg-slate-600 text-gray-400"
                }`}
              >
                <Heart className="w-4 h-4" />
              </button>
              {selectedItems.includes(palette.id) && (
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )

  const renderMaterials = () => (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {materials.map((material) => (
        <motion.div
          key={material.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-800 rounded-xl overflow-hidden hover:bg-slate-700 transition-colors cursor-pointer"
          onClick={() => toggleSelection(material.id)}
        >
          <div className="h-48 bg-slate-700 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-600 to-slate-800" />
            <div className={`absolute top-4 ${isRTL ? "left-4" : "right-4"} flex gap-2`}>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  toggleFavorite(material.id)
                }}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                  favorites.includes(material.id) ? "bg-red-500 text-white" : "bg-black/30 text-gray-400"
                }`}
              >
                <Heart className="w-4 h-4" />
              </button>
              {selectedItems.includes(material.id) && (
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
          </div>
          <div className="p-4">
            <h3 className={`font-semibold text-white mb-2 ${isRTL ? "text-right" : "text-left"}`}>{material.name}</h3>
            <div className={`flex gap-2 ${isRTL ? "justify-end" : "justify-start"}`}>
              <button className="px-3 py-1 bg-orange-500 text-white text-sm rounded-full hover:bg-orange-600 transition-colors">
                {dict.materials.request_sample}
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )

  return (
    <div className={isRTL ? "rtl" : ""}>
      {/* Category Tabs */}
      <div className={`flex flex-wrap justify-center gap-4 mb-12 ${isRTL ? "space-x-reverse" : ""}`}>
        {categories.map((category) => (
          <button
            key={category.key}
            onClick={() => setActiveCategory(category.key)}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
              activeCategory === category.key
                ? "bg-orange-500 text-white"
                : "bg-slate-800 text-gray-300 hover:bg-slate-700"
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Selected Items Counter */}
      {selectedItems.length > 0 && (
        <div className={`mb-8 p-4 bg-slate-800 rounded-xl ${isRTL ? "text-right" : "text-left"}`}>
          <p className="text-white">{selectedItems.length} مورد انتخاب شده</p>
          <button className="mt-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
            درخواست مشاوره
          </button>
        </div>
      )}

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {activeCategory === "colors" && renderColors()}
          {(activeCategory === "materials" || activeCategory === "textures" || activeCategory === "finishes") &&
            renderMaterials()}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
