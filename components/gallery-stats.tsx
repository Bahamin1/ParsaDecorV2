"use client"

import { motion } from "framer-motion"
import { Download, Eye, Heart, Share2 } from "lucide-react"

interface GalleryStatsProps {
  totalViews: number
  totalLikes: number
  totalDownloads: number
  totalShares: number
  lang: string
}

export default function GalleryStats({ totalViews, totalLikes, totalDownloads, totalShares, lang }: GalleryStatsProps) {
  const stats = [
    {
      icon: Eye,
      value: totalViews.toLocaleString(),
      label: lang === "fa" ? "بازدید" : lang === "tr" ? "Görüntüleme" : "Views",
    },
    {
      icon: Heart,
      value: totalLikes.toLocaleString(),
      label: lang === "fa" ? "لایک" : lang === "tr" ? "Beğeni" : "Likes",
    },
    {
      icon: Download,
      value: totalDownloads.toLocaleString(),
      label: lang === "fa" ? "دانلود" : lang === "tr" ? "İndirme" : "Downloads",
    },
    {
      icon: Share2,
      value: totalShares.toLocaleString(),
      label: lang === "fa" ? "اشتراک" : lang === "tr" ? "Paylaşım" : "Shares",
    },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="text-center bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700"
        >
          <stat.icon className="w-8 h-8 text-amber-400 mx-auto mb-3" />
          <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
          <div className="text-slate-400 text-sm">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  )
}
