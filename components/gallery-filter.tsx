"use client"

import { motion } from "framer-motion"

interface GalleryFilterProps {
  selectedCategory: string
  onCategoryChange: (category: string) => void
  lang: string
}

export default function GalleryFilter({ selectedCategory, onCategoryChange, lang }: GalleryFilterProps) {
  const categories = [
    { id: "all", name: lang === "fa" ? "همه" : lang === "tr" ? "Tümü" : "All" },
    { id: "living", name: lang === "fa" ? "پذیرایی" : lang === "tr" ? "Oturma" : "Living" },
    { id: "bedroom", name: lang === "fa" ? "خواب" : lang === "tr" ? "Yatak Odası" : "Bedroom" },
    { id: "kitchen", name: lang === "fa" ? "آشپزخانه" : lang === "tr" ? "Mutfak" : "Kitchen" },
    { id: "dining", name: lang === "fa" ? "غذاخوری" : lang === "tr" ? "Yemek Odası" : "Dining" },
    { id: "bathroom", name: lang === "fa" ? "حمام" : lang === "tr" ? "Banyo" : "Bathroom" },
    { id: "office", name: lang === "fa" ? "دفتر" : lang === "tr" ? "Ofis" : "Office" },
  ]

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <motion.button
          key={category.id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onCategoryChange(category.id)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
            selectedCategory === category.id
              ? "bg-amber-500 text-white shadow-lg"
              : "bg-slate-700 text-slate-300 hover:bg-slate-600"
          }`}
        >
          {category.name}
        </motion.button>
      ))}
    </div>
  )
}
