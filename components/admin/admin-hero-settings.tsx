"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Clock, Eye, EyeOff, ImageIcon, Palette, RefreshCw, Save, Settings, Trash2, Upload } from "lucide-react"
import { useState } from "react"

interface HeroImage {
  id: string
  url: string
  title: string
  active: boolean
  order: number
}

export default function AdminHeroSettings() {
  const [heroImages, setHeroImages] = useState<HeroImage[]>([
    {
      id: "1",
      url: "/images/gallery/modern-living-room.jpg",
      title: "اتاق نشیمن مدرن",
      active: true,
      order: 1,
    },
    {
      id: "2",
      url: "/images/gallery/luxury-bedroom.jpg",
      title: "اتاق خواب لوکس",
      active: true,
      order: 2,
    },
    {
      id: "3",
      url: "/images/gallery/modern-kitchen.jpg",
      title: "آشپزخانه مدرن",
      active: true,
      order: 3,
    },
    {
      id: "4",
      url: "/images/gallery/elegant-dining.jpg",
      title: "ناهارخوری شیک",
      active: true,
      order: 4,
    },
    {
      id: "5",
      url: "/images/gallery/bathroom-design.jpg",
      title: "طراحی حمام",
      active: true,
      order: 5,
    },
    {
      id: "6",
      url: "/images/gallery/office-interior.jpg",
      title: "دکوراسیون اداری",
      active: true,
      order: 6,
    },
  ])

  const [settings, setSettings] = useState({
    autoSlide: true,
    slideInterval: 5000,
    animationDuration: 1500,
    overlayOpacity: 60,
    showIndicators: true,
    enableParallax: true,
  })

  const toggleImageActive = (id: string) => {
    setHeroImages((prev) => prev.map((img) => (img.id === id ? { ...img, active: !img.active } : img)))
  }

  const deleteImage = (id: string) => {
    setHeroImages((prev) => prev.filter((img) => img.id !== id))
  }

  const updateImageTitle = (id: string, title: string) => {
    setHeroImages((prev) => prev.map((img) => (img.id === id ? { ...img, title } : img)))
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader()
        reader.onload = (e) => {
          const newImage: HeroImage = {
            id: Date.now().toString(),
            url: e.target?.result as string,
            title: file.name.split(".")[0],
            active: true,
            order: heroImages.length + 1,
          }
          setHeroImages((prev) => [...prev, newImage])
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const saveSettings = () => {
    // Save to database or localStorage
    console.log("Settings saved:", { heroImages, settings })
    alert("تنظیمات با موفقیت ذخیره شد!")
  }

  return (
    <div className="space-y-8" dir="rtl">
      {/* Settings Panel */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center space-x-3 space-x-reverse mb-6">
          <Settings className="w-6 h-6 text-orange-500" />
          <h2 className="text-2xl font-bold text-slate-900">تنظیمات عمومی</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Auto Slide */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 space-x-reverse">
              <input
                type="checkbox"
                checked={settings.autoSlide}
                onChange={(e) => setSettings((prev) => ({ ...prev, autoSlide: e.target.checked }))}
                className="w-4 h-4 text-orange-500 rounded focus:ring-orange-500"
              />
              <span className="text-slate-700 font-medium">اسلاید خودکار</span>
            </label>
          </div>

          {/* Slide Interval */}
          <div className="space-y-2">
            <label className="block text-slate-700 font-medium">
              <Clock className="w-4 h-4 inline ml-2" />
              فاصله زمانی (میلی‌ثانیه)
            </label>
            <input
              type="number"
              min="2000"
              max="10000"
              step="500"
              value={settings.slideInterval}
              onChange={(e) => setSettings((prev) => ({ ...prev, slideInterval: Number.parseInt(e.target.value) }))}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          {/* Animation Duration */}
          <div className="space-y-2">
            <label className="block text-slate-700 font-medium">
              <RefreshCw className="w-4 h-4 inline ml-2" />
              مدت انیمیشن (میلی‌ثانیه)
            </label>
            <input
              type="number"
              min="500"
              max="3000"
              step="100"
              value={settings.animationDuration}
              onChange={(e) => setSettings((prev) => ({ ...prev, animationDuration: Number.parseInt(e.target.value) }))}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          {/* Overlay Opacity */}
          <div className="space-y-2">
            <label className="block text-slate-700 font-medium">
              <Palette className="w-4 h-4 inline ml-2" />
              شفافیت پوشش ({settings.overlayOpacity}%)
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={settings.overlayOpacity}
              onChange={(e) => setSettings((prev) => ({ ...prev, overlayOpacity: Number.parseInt(e.target.value) }))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>

          {/* Show Indicators */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 space-x-reverse">
              <input
                type="checkbox"
                checked={settings.showIndicators}
                onChange={(e) => setSettings((prev) => ({ ...prev, showIndicators: e.target.checked }))}
                className="w-4 h-4 text-orange-500 rounded focus:ring-orange-500"
              />
              <span className="text-slate-700 font-medium">نمایش نشانگرها</span>
            </label>
          </div>

          {/* Enable Parallax */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 space-x-reverse">
              <input
                type="checkbox"
                checked={settings.enableParallax}
                onChange={(e) => setSettings((prev) => ({ ...prev, enableParallax: e.target.checked }))}
                className="w-4 h-4 text-orange-500 rounded focus:ring-orange-500"
              />
              <span className="text-slate-700 font-medium">افکت پارالکس</span>
            </label>
          </div>
        </div>
      </div>

      {/* Image Management */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3 space-x-reverse">
            <ImageIcon className="w-6 h-6 text-orange-500" />
            <h2 className="text-2xl font-bold text-slate-900">مدیریت تصاویر Hero</h2>
          </div>

          <label className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg cursor-pointer transition-colors duration-200 flex items-center space-x-2 space-x-reverse">
            <Upload className="w-4 h-4" />
            <span>آپلود تصویر</span>
            <input type="file" multiple accept="image/*" onChange={handleFileUpload} className="hidden" />
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {heroImages.map((image) => (
            <motion.div
              key={image.id}
              layout
              className={`relative bg-slate-50 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                image.active ? "border-orange-500" : "border-slate-200"
              }`}
            >
              <div className="aspect-video relative">
                <img src={image.url || "/placeholder.svg"} alt={image.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/20" />

                {/* Controls */}
                <div className="absolute top-2 left-2 flex space-x-2 space-x-reverse">
                  <button
                    onClick={() => toggleImageActive(image.id)}
                    className={`p-1.5 rounded-full transition-colors duration-200 ${
                      image.active ? "bg-green-500 text-white" : "bg-slate-500 text-white"
                    }`}
                  >
                    {image.active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>

                  <button
                    onClick={() => deleteImage(image.id)}
                    className="p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Order Badge */}
                <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {image.order}
                </div>
              </div>

              {/* Title Input */}
              <div className="p-4">
                <input
                  type="text"
                  value={image.title}
                  onChange={(e) => updateImageTitle(image.id, e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                  placeholder="عنوان تصویر"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-center">
        <button
          onClick={saveSettings}
          className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center space-x-2 space-x-reverse shadow-lg hover:shadow-xl"
        >
          <Save className="w-5 h-5" />
          <span>ذخیره تنظیمات</span>
        </button>
      </div>
    </div>
  )
}
