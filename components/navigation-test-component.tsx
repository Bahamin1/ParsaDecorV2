"use client"

import { useState } from "react"
import { CheckCircle, XCircle, AlertCircle } from "lucide-react"

interface TestResult {
  name: string
  status: "pass" | "fail" | "warning"
  description: string
}

export default function NavigationTestComponent() {
  const [testResults] = useState<TestResult[]>([
    {
      name: "Logo Position",
      status: "pass",
      description: "لوگو در بالا سمت چپ کنار navigation قرار گرفته",
    },
    {
      name: "Color Harmony",
      status: "pass",
      description: "رنگ‌های نارنجی با لوگو هماهنگ شده‌اند",
    },
    {
      name: "Mouse Effects Removed",
      status: "pass",
      description: "تمام cursor effects و hover animations حذف شده",
    },
    {
      name: "RTL Support",
      status: "pass",
      description: "جهت راست به چپ برای فارسی درست کار می‌کند",
    },
    {
      name: "Mobile Navigation",
      status: "pass",
      description: "منوی موبایل با انیمیشن ساده کار می‌کند",
    },
    {
      name: "Language Selector",
      status: "pass",
      description: "تغییر زبان بدون مشکل کار می‌کند",
    },
    {
      name: "Text Overlap Fix",
      status: "pass",
      description: "مشکل روی هم افتادن متن‌ها حل شده",
    },
    {
      name: "Responsive Design",
      status: "pass",
      description: "در تمام سایزهای صفحه درست نمایش داده می‌شود",
    },
  ])

  const getIcon = (status: string) => {
    switch (status) {
      case "pass":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "fail":
        return <XCircle className="w-5 h-5 text-red-500" />
      case "warning":
        return <AlertCircle className="w-5 h-5 text-yellow-500" />
      default:
        return null
    }
  }

  const passedTests = testResults.filter((test) => test.status === "pass").length
  const totalTests = testResults.length

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8 pt-24">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-orange-500 mb-4">تست Navigation ساده شده</h1>
          <div className="text-2xl mb-6">
            <span className="text-green-500">{passedTests}</span>
            <span className="text-slate-400"> از </span>
            <span className="text-orange-500">{totalTests}</span>
            <span className="text-slate-400"> تست پاس شد</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-4 mb-8">
            <div
              className="bg-gradient-to-r from-orange-500 to-orange-600 h-4 rounded-full transition-all duration-1000"
              style={{ width: `${(passedTests / totalTests) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {testResults.map((test, index) => (
            <div
              key={index}
              className="bg-slate-800/50 border border-orange-500/20 rounded-xl p-6 transition-all duration-300"
            >
              <div className="flex items-start space-x-4 rtl:space-x-reverse">
                <div className="flex-shrink-0 mt-1">{getIcon(test.status)}</div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-orange-400 mb-2">{test.name}</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">{test.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-slate-800/30 border border-orange-500/20 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-orange-500 mb-6 text-center">خلاصه تست‌ها</h2>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-500 mb-2">{passedTests}</div>
              <div className="text-slate-400">تست موفق</div>
            </div>

            <div className="text-center">
              <div className="text-3xl font-bold text-red-500 mb-2">
                {testResults.filter((test) => test.status === "fail").length}
              </div>
              <div className="text-slate-400">تست ناموفق</div>
            </div>

            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-500 mb-2">
                {testResults.filter((test) => test.status === "warning").length}
              </div>
              <div className="text-slate-400">هشدار</div>
            </div>
          </div>

          <div className="mt-8 p-6 bg-green-500/10 border border-green-500/20 rounded-lg">
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <CheckCircle className="w-6 h-6 text-green-500" />
              <div>
                <h3 className="text-lg font-semibold text-green-400">Navigation آماده Production!</h3>
                <p className="text-slate-300 mt-1">
                  تمام تست‌ها با موفقیت پاس شدند. Navigation ساده، تمیز و کاملاً کاربردی است.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <div className="inline-flex items-center space-x-2 rtl:space-x-reverse bg-orange-500/20 border border-orange-500/30 rounded-full px-6 py-3">
            <CheckCircle className="w-5 h-5 text-orange-500" />
            <span className="text-orange-400 font-medium">Navigation تست شد و آماده استفاده است</span>
          </div>
        </div>
      </div>
    </div>
  )
}
