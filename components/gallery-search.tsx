"use client"

import { Search } from "lucide-react"

interface GallerySearchProps {
  searchTerm: string
  onSearchChange: (term: string) => void
  lang: string
}

export default function GallerySearch({ searchTerm, onSearchChange, lang }: GallerySearchProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
      <input
        type="text"
        placeholder={lang === "fa" ? "جستجو در گالری..." : lang === "tr" ? "Galeride ara..." : "Search gallery..."}
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-10 pr-4 py-2 bg-slate-700 text-white placeholder-slate-400 rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300 w-64"
      />
    </div>
  )
}
