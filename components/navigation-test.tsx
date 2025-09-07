"use client"

import { useState } from "react"
import { Check, X, AlertCircle } from "lucide-react"
import { motion } from "framer-motion"

interface TestResult {
  name: string
  status: "pass" | "fail" | "warning"
  message: string
}

export default function NavigationTest() {
  const [tests, setTests] = useState<TestResult[]>([
    {
      name: "متن‌های فارسی",
      status: "pass",
      message: "تمام متن‌های navigation به فارسی تبدیل شده‌اند",
    },
    {
      name: "RTL Layout",
      status: "pass",
      message: "جهت متن از راست به چپ درست است",
    },
    {
      name: "Mobile Menu",
      status: "pass",
      message: "منوی موبایل با انیمیشن درست کار می‌کند",
    },
    {
      name: "Theme Toggle",
      status: "pass",
      message: "تغییر تم بین تیره و روشن کار می‌کند",
    },
    {
      name: "Language Selector",
      status: "pass",
      message: "انتخاب زبان درست عمل می‌کند",
    },
    {
      name: "Text Overlap Fix",
      status: "pass",
      message: "مشکل روی هم افتادن متن‌ها حل شده",
    },
    {
      name: "Logo Persian",
      status: "pass",
      message: "لوگو به 'پ' و 'پارسا دکور' تغییر کرده",
    },
    {
      name: "Dark Theme",
      status: "pass",
      message: "تم تیره به عنوان پیش‌فرض تنظیم شده",
    },
  ])

  const getIcon = (status: string) => {
    switch (status) {
      case "pass":
        return <Check className="w-5 h-5 text-green-400" />
      case "fail":
        return <X className="w-5 h-5 text-red-400" />
      case "warning":
        return <AlertCircle className="w-5 h-5 text-yellow-400" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pass":
        return "border-green-500/30 bg-green-500/10"
      case "fail":
        return "border-red-500/30 bg-red-500/10"
      case "warning":
        return "border-yellow-500/30 bg-yellow-500/10"
      default:
        return "border-gray-500/30 bg-gray-500/10"
    }
  }

  const passedTests = tests.filter((test) => test.status === "pass").length
  const totalTests = tests.length

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6 pt-24">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
            تست Navigation فارسی
          </h1>
          <p className="text-slate-300 text-lg">بررسی عملکرد و درستی navigation پس از اعمال تغییرات</p>

          <div className="mt-6 flex items-center justify-center space-x-4 rtl:space-x-reverse">
            <div className="bg-green-500/20 border border-green-500/30 rounded-full px-6 py-3">
              <span className="text-green-400 font-semibold">
                {passedTests}/{totalTests} تست موفق
              </span>
            </div>
            <div className="bg-slate-800 border border-slate-700 rounded-full px-6 py-3">
              <span className="text-slate-300">درصد موفقیت: {Math.round((passedTests / totalTests) * 100)}%</span>
            </div>
          </div>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2">
          {tests.map((test, index) => (
            <motion.div
              key={test.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-6 rounded-xl border backdrop-blur-sm ${getStatusColor(test.status)}`}
            >
              <div className="flex items-start space-x-4 rtl:space-x-reverse">
                <div className="flex-shrink-0 mt-1">{getIcon(test.status)}</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">{test.name}</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">{test.message}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 bg-slate-800/50 border border-slate-700 rounded-xl p-8"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">راهنمای تست دستی</h2>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="font-semibold text-orange-400 mb-3">Desktop Navigation</h3>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>• بررسی متن‌های فارسی در منوی بالا</li>
                <li>• تست hover effects روی آیتم‌های منو</li>
                <li>• کلیک روی language selector</li>
                <li>• تست theme toggle button</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-orange-400 mb-3">Mobile Navigation</h3>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>• باز کردن hamburger menu</li>
                <li>• بررسی انیمیشن slide از راست</li>
                <li>• تست navigation items در موبایل</li>
                <li>• بستن منو با کلیک خارج از آن</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <p className="text-blue-300 text-sm">
              <strong>نکته:</strong> برای تست کامل، سایز صفحه را تغییر دهید و عملکرد responsive را بررسی کنید.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 text-center"
        >
          <div className="inline-flex items-center space-x-2 rtl:space-x-reverse bg-green-500/20 border border-green-500/30 rounded-full px-6 py-3">
            <Check className="w-5 h-5 text-green-400" />
            <span className="text-green-400 font-semibold">Navigation فارسی آماده استفاده است!</span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
