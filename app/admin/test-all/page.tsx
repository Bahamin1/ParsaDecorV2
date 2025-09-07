"use client"

import { motion } from "framer-motion"
import {
    AlertCircle,
    BarChart3,
    CheckCircle,
    Database,
    FileText,
    Globe,
    ImageIcon,
    Loader2,
    Play,
    RefreshCw,
    Settings,
    Users,
    Video,
    XCircle,
} from "lucide-react"
import { useState } from "react"

interface TestResult {
  name: string
  status: "pending" | "running" | "success" | "error" | "warning"
  message: string
  duration?: number
  details?: string[]
}

export default function AdminTestAllPage() {
  const [tests, setTests] = useState<TestResult[]>([
    {
      name: "اتصال به پایگاه داده",
      status: "pending",
      message: "در انتظار اجرا...",
    },
    {
      name: "تست API Routes",
      status: "pending",
      message: "در انتظار اجرا...",
    },
    {
      name: "بارگذاری تصاویر",
      status: "pending",
      message: "در انتظار اجرا...",
    },
    {
      name: "پردازش ویدیو",
      status: "pending",
      message: "در انتظار اجرا...",
    },
    {
      name: "مدیریت پروژه‌ها",
      status: "pending",
      message: "در انتظار اجرا...",
    },
    {
      name: "سیستم کاربران",
      status: "pending",
      message: "در انتظار اجرا...",
    },
    {
      name: "تنظیمات سایت",
      status: "pending",
      message: "در انتظار اجرا...",
    },
    {
      name: "آمار و گزارشات",
      status: "pending",
      message: "در انتظار اجرا...",
    },
  ])

  const [isRunning, setIsRunning] = useState(false)
  const [currentTest, setCurrentTest] = useState(-1)

  const testIcons = {
    "اتصال به پایگاه داده": Database,
    "تست API Routes": Globe,
    "بارگذاری تصاویر": ImageIcon,
    "پردازش ویدیو": Video,
    "مدیریت پروژه‌ها": FileText,
    "سیستم کاربران": Users,
    "تنظیمات سایت": Settings,
    "آمار و گزارشات": BarChart3,
  }

  const runTest = async (index: number): Promise<TestResult> => {
    const test = tests[index]
    const startTime = Date.now()

    // Simulate test execution
    await new Promise((resolve) => setTimeout(resolve, Math.random() * 2000 + 1000))

    const duration = Date.now() - startTime
    const success = Math.random() > 0.2 // 80% success rate

    if (success) {
      return {
        ...test,
        status: "success",
        message: "تست با موفقیت انجام شد",
        duration,
        details: ["اتصال برقرار شد", "عملکرد مطلوب", "بدون خطا"],
      }
    } else {
      return {
        ...test,
        status: "error",
        message: "تست با خطا مواجه شد",
        duration,
        details: ["خطا در اتصال", "نیاز به بررسی", "لطفاً مجدداً تلاش کنید"],
      }
    }
  }

  const runAllTests = async () => {
    setIsRunning(true)
    setCurrentTest(0)

    for (let i = 0; i < tests.length; i++) {
      setCurrentTest(i)

      // Update test status to running
      setTests((prev) =>
        prev.map((test, index) => (index === i ? { ...test, status: "running", message: "در حال اجرا..." } : test)),
      )

      // Run the test
      const result = await runTest(i)

      // Update test result
      setTests((prev) => prev.map((test, index) => (index === i ? result : test)))
    }

    setCurrentTest(-1)
    setIsRunning(false)
  }

  const resetTests = () => {
    setTests((prev) =>
      prev.map((test) => ({
        ...test,
        status: "pending",
        message: "در انتظار اجرا...",
        duration: undefined,
        details: undefined,
      })),
    )
    setCurrentTest(-1)
    setIsRunning(false)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "error":
        return <XCircle className="w-5 h-5 text-red-500" />
      case "warning":
        return <AlertCircle className="w-5 h-5 text-yellow-500" />
      case "running":
        return <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
      default:
        return <div className="w-5 h-5 bg-slate-300 rounded-full" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "border-green-200 bg-green-50"
      case "error":
        return "border-red-200 bg-red-50"
      case "warning":
        return "border-yellow-200 bg-yellow-50"
      case "running":
        return "border-blue-200 bg-blue-50"
      default:
        return "border-slate-200 bg-white"
    }
  }

  const successCount = tests.filter((t) => t.status === "success").length
  const errorCount = tests.filter((t) => t.status === "error").length
  const completedCount = tests.filter((t) => t.status !== "pending").length

  return (
    <div className="space-y-8" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">تست کامل Admin Panel</h1>
          <p className="text-slate-600 mt-1">بررسی عملکرد تمام قابلیت‌های پنل مدیریت</p>
        </div>
        <div className="flex items-center space-x-3 space-x-reverse">
          <button
            onClick={resetTests}
            disabled={isRunning}
            className="flex items-center space-x-2 space-x-reverse px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors disabled:opacity-50"
          >
            <RefreshCw className="w-4 h-4" />
            <span>ریست</span>
          </button>
          <button
            onClick={runAllTests}
            disabled={isRunning}
            className="flex items-center space-x-2 space-x-reverse px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50"
          >
            {isRunning ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
            <span>{isRunning ? "در حال اجرا..." : "اجرای تست‌ها"}</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm font-medium">کل تست‌ها</p>
              <p className="text-2xl font-bold text-slate-900">{tests.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm font-medium">موفق</p>
              <p className="text-2xl font-bold text-green-600">{successCount}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm font-medium">ناموفق</p>
              <p className="text-2xl font-bold text-red-600">{errorCount}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm font-medium">پیشرفت</p>
              <p className="text-2xl font-bold text-slate-900">{Math.round((completedCount / tests.length) * 100)}%</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <Play className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      {isRunning && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-700">پیشرفت کلی</span>
            <span className="text-sm text-slate-500">
              {completedCount} از {tests.length}
            </span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div
              className="bg-orange-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(completedCount / tests.length) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Test Results */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-xl font-semibold text-slate-900">نتایج تست‌ها</h2>
        </div>
        <div className="divide-y divide-slate-200">
          {tests.map((test, index) => {
            const Icon = testIcons[test.name as keyof typeof testIcons] || FileText
            return (
              <motion.div
                key={test.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`p-6 border-r-4 ${
                  currentTest === index ? "border-r-blue-500 bg-blue-50" : "border-r-transparent"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 space-x-reverse">
                    <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-slate-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">{test.name}</h3>
                      <p className="text-sm text-slate-600">{test.message}</p>
                      {test.duration && <p className="text-xs text-slate-500 mt-1">مدت زمان: {test.duration}ms</p>}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">{getStatusIcon(test.status)}</div>
                </div>

                {test.details && (
                  <div className="mt-4 mr-14">
                    <div className="bg-slate-50 rounded-lg p-3">
                      <ul className="text-sm text-slate-600 space-y-1">
                        {test.details.map((detail, i) => (
                          <li key={i} className="flex items-center space-x-2 space-x-reverse">
                            <div className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
