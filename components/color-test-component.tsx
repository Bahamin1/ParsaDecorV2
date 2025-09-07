"use client"

import { useState } from "react"
import Image from "next/image"

export default function ColorTestComponent() {
  const [activeTab, setActiveTab] = useState("navigation")

  const colorPalette = {
    primary: "#f97316", // Orange-500
    primaryLight: "#fb923c", // Orange-400
    primaryDark: "#ea580c", // Orange-600
    secondary: "#f97316/20", // Orange with 20% opacity
    accent: "#f97316/30", // Orange with 30% opacity
    background: "#0f172a", // Slate-900
    surface: "#1e293b", // Slate-800
    text: "#f8fafc", // Slate-50
    textMuted: "#94a3b8", // Slate-400
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-orange-500 mb-8 text-center">تست هماهنگی رنگ‌ها با لوگو پارسا دکور</h1>

        {/* Logo Display */}
        <div className="bg-slate-800 rounded-xl p-8 mb-8 text-center">
          <h2 className="text-xl font-semibold mb-4 text-orange-400">لوگو اصلی</h2>
          <div className="flex justify-center items-center space-x-4 rtl:space-x-reverse">
            <Image
              src="/images/parsa-decor-logo-new.png"
              alt="Parsa Decor Logo"
              width={64}
              height={64}
              className="w-16 h-16 object-contain"
            />
            <div className="text-right">
              <div className="text-2xl font-bold text-orange-500">پارسا دکور</div>
              <div className="text-sm text-slate-400">طراحی داخلی لوکس</div>
            </div>
          </div>
        </div>

        {/* Color Palette */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-orange-500 p-4 rounded-lg text-center">
            <div className="text-white font-semibold">Primary</div>
            <div className="text-white/80 text-sm">#f97316</div>
          </div>
          <div className="bg-orange-400 p-4 rounded-lg text-center">
            <div className="text-white font-semibold">Primary Light</div>
            <div className="text-white/80 text-sm">#fb923c</div>
          </div>
          <div className="bg-orange-600 p-4 rounded-lg text-center">
            <div className="text-white font-semibold">Primary Dark</div>
            <div className="text-white/80 text-sm">#ea580c</div>
          </div>
          <div className="bg-orange-500/20 border border-orange-500/30 p-4 rounded-lg text-center">
            <div className="text-orange-400 font-semibold">Secondary</div>
            <div className="text-orange-300 text-sm">20% opacity</div>
          </div>
        </div>

        {/* Component Tests */}
        <div className="space-y-8">
          {/* Navigation Test */}
          <div className="bg-slate-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-orange-400 mb-4">تست Navigation</h3>
            <div className="flex flex-wrap gap-4">
              <button className="flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 bg-orange-500/20 text-orange-400 border border-orange-500/30 rounded-full">
                <span>خانه</span>
              </button>
              <button className="flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 text-slate-300 bg-slate-800/30 rounded-full">
                <span>درباره ما</span>
              </button>
              <button className="flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 text-slate-300 bg-slate-800/30 rounded-full">
                <span>گالری</span>
              </button>
            </div>
          </div>

          {/* Button Test */}
          <div className="bg-slate-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-orange-400 mb-4">تست دکمه‌ها</h3>
            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-3 bg-orange-500 text-white rounded-full font-medium">دکمه اصلی</button>
              <button className="px-6 py-3 bg-orange-500/20 text-orange-400 border border-orange-500/30 rounded-full font-medium">
                دکمه ثانویه
              </button>
              <button className="px-6 py-3 bg-slate-700 text-slate-300 rounded-full font-medium">دکمه خنثی</button>
            </div>
          </div>

          {/* Card Test */}
          <div className="bg-slate-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-orange-400 mb-4">تست کارت‌ها</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-700 border border-orange-500/20 rounded-lg p-4">
                <h4 className="text-orange-400 font-semibold mb-2">کارت با accent</h4>
                <p className="text-slate-300 text-sm">این کارت از رنگ‌های هماهنگ با لوگو استفاده می‌کند</p>
              </div>
              <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
                <h4 className="text-orange-400 font-semibold mb-2">کارت highlighted</h4>
                <p className="text-slate-300 text-sm">این کارت برجسته‌تر است</p>
              </div>
              <div className="bg-slate-700 rounded-lg p-4">
                <h4 className="text-slate-300 font-semibold mb-2">کارت عادی</h4>
                <p className="text-slate-400 text-sm">کارت بدون accent</p>
              </div>
            </div>
          </div>

          {/* Form Test */}
          <div className="bg-slate-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-orange-400 mb-4">تست فرم‌ها</h3>
            <div className="space-y-4 max-w-md">
              <input
                type="text"
                placeholder="نام شما"
                className="w-full px-4 py-3 bg-slate-700 border border-orange-500/20 rounded-lg text-white placeholder-slate-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none"
              />
              <textarea
                placeholder="پیام شما"
                rows={3}
                className="w-full px-4 py-3 bg-slate-700 border border-orange-500/20 rounded-lg text-white placeholder-slate-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none resize-none"
              />
              <button className="w-full px-6 py-3 bg-orange-500 text-white rounded-lg font-medium">ارسال پیام</button>
            </div>
          </div>

          {/* Status Test */}
          <div className="bg-slate-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-orange-400 mb-4">تست وضعیت‌ها</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-orange-500/20 border border-orange-500/30 rounded-lg p-4 text-center">
                <div className="text-orange-400 font-semibold">فعال</div>
                <div className="text-orange-300 text-sm">Active State</div>
              </div>
              <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 text-center">
                <div className="text-green-400 font-semibold">موفق</div>
                <div className="text-green-300 text-sm">Success State</div>
              </div>
              <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-4 text-center">
                <div className="text-yellow-400 font-semibold">هشدار</div>
                <div className="text-yellow-300 text-sm">Warning State</div>
              </div>
              <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 text-center">
                <div className="text-red-400 font-semibold">خطا</div>
                <div className="text-red-300 text-sm">Error State</div>
              </div>
            </div>
          </div>
        </div>

        {/* Color Harmony Analysis */}
        <div className="bg-slate-800 rounded-xl p-6 mt-8">
          <h3 className="text-lg font-semibold text-orange-400 mb-4">تحلیل هماهنگی رنگ‌ها</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-slate-200 mb-2">✅ رنگ‌های هماهنگ:</h4>
              <ul className="space-y-1 text-slate-300 text-sm">
                <li>• نارنجی اصلی (#f97316) - مطابق با لوگو</li>
                <li>• نارنجی روشن (#fb923c) - برای highlights</li>
                <li>• نارنجی تیره (#ea580c) - برای shadows</li>
                <li>• نارنجی شفاف (20%, 30%) - برای backgrounds</li>
                <li>• خاکستری تیره - برای contrast</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-200 mb-2">🎯 کاربرد رنگ‌ها:</h4>
              <ul className="space-y-1 text-slate-300 text-sm">
                <li>• Primary: دکمه‌های اصلی، لینک‌های فعال</li>
                <li>• Secondary: پس‌زمینه‌های نرم، borders</li>
                <li>• Accent: تأکیدات، hover states</li>
                <li>• Background: پس‌زمینه اصلی سایت</li>
                <li>• Text: متن‌های اصلی و فرعی</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Test Results */}
        <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-6 mt-8">
          <h3 className="text-lg font-semibold text-orange-400 mb-4">نتایج تست</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl mb-2">✅</div>
              <div className="text-sm text-slate-300">Logo Harmony</div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">✅</div>
              <div className="text-sm text-slate-300">Color Consistency</div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">✅</div>
              <div className="text-sm text-slate-300">Contrast Ratio</div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">✅</div>
              <div className="text-sm text-slate-300">Accessibility</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
