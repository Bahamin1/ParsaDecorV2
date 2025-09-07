"use client"

import { motion } from "framer-motion"
import {
  ArrowUpRight,
  BarChart3,
  Bell,
  Calendar,
  Eye,
  FolderOpen,
  ImageIcon,
  Settings,
  TrendingUp,
  Users,
  Video,
} from "lucide-react"
import Link from "next/link"

export default function AdminDashboard() {
  const stats = [
    {
      title: "کل بازدیدها",
      value: "24,567",
      change: "+12.5%",
      trend: "up",
      icon: Eye,
      color: "blue",
    },
    {
      title: "کاربران فعال",
      value: "1,234",
      change: "+8.2%",
      trend: "up",
      icon: Users,
      color: "green",
    },
    {
      title: "پروژه‌ها",
      value: "32",
      change: "+3",
      trend: "up",
      icon: FolderOpen,
      color: "orange",
    },
    {
      title: "فایل‌های رسانه",
      value: "456",
      change: "+24",
      trend: "up",
      icon: ImageIcon,
      color: "purple",
    },
  ]

  const recentActivity = [
    {
      id: 1,
      action: "پروژه جدید آپلود شد",
      user: "مدیر",
      time: "2 دقیقه پیش",
      type: "project",
    },
    {
      id: 2,
      action: "ویدیو پردازش شد",
      user: "سیستم",
      time: "1 ساعت پیش",
      type: "video",
    },
    {
      id: 3,
      action: "کاربر جدید ثبت نام کرد",
      user: "john@example.com",
      time: "3 ساعت پیش",
      type: "user",
    },
    {
      id: 4,
      action: "تصویر بهینه سازی شد",
      user: "سیستم",
      time: "5 ساعت پیش",
      type: "media",
    },
  ]

  const quickActions = [
    {
      title: "آپلود رسانه",
      description: "افزودن تصاویر یا ویدیوهای جدید",
      icon: ImageIcon,
      href: "/admin/media",
      color: "blue",
    },
    {
      title: "ایجاد پروژه",
      description: "افزودن پروژه جدید به نمونه کارها",
      icon: FolderOpen,
      href: "/admin/projects",
      color: "green",
    },
    {
      title: "مدیریت ویدیوها",
      description: "آپلود و سازماندهی ویدیوها",
      icon: Video,
      href: "/admin/videos",
      color: "purple",
    },
    {
      title: "تنظیمات Hero",
      description: "مدیریت تصاویر صفحه اصلی",
      icon: Settings,
      href: "/admin/hero-settings",
      color: "orange",
    },
  ]

  return (
    <div className="space-y-8" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">داشبورد مدیریت</h1>
          <p className="text-slate-600 mt-1">به پنل مدیریت پارسا دکور خوش آمدید</p>
        </div>
        <div className="flex items-center space-x-3 space-x-reverse">
          <button className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors">
            <Bell className="w-5 h-5" />
          </button>
          <Link
            href="/admin/test-all"
            className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <BarChart3 className="w-4 h-4" />
            <span>تست کامل</span>
          </Link>
          <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
            گزارش خروجی
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-slate-600 text-sm font-medium">{stat.title}</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-green-500 ml-1" />
                  <span className="text-green-600 text-sm font-medium">{stat.change}</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <stat.icon className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickActions.map((action, index) => (
          <motion.div
            key={action.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
          >
            <Link
              href={action.href}
              className="block bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md hover:border-orange-200 transition-all group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                  <action.icon className="w-6 h-6 text-orange-600" />
                </div>
                <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-orange-500 transition-colors" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">{action.title}</h3>
              <p className="text-sm text-slate-600">{action.description}</p>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="lg:col-span-2"
        >
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900 flex items-center">
                <Calendar className="w-5 h-5 ml-2 text-orange-500" />
                فعالیت‌های اخیر
              </h3>
              <Link href="/admin/analytics" className="text-orange-600 hover:text-orange-700 text-sm font-medium">
                مشاهده همه
              </Link>
            </div>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center space-x-3 space-x-reverse p-3 hover:bg-slate-50 rounded-lg transition-colors"
                >
                  <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center">
                    {activity.type === "project" && <FolderOpen className="w-4 h-4 text-slate-600" />}
                    {activity.type === "video" && <Video className="w-4 h-4 text-slate-600" />}
                    {activity.type === "user" && <Users className="w-4 h-4 text-slate-600" />}
                    {activity.type === "media" && <ImageIcon className="w-4 h-4 text-slate-600" />}
                  </div>
                  <div className="flex-1 text-right">
                    <p className="text-sm font-medium text-slate-900">{activity.action}</p>
                    <p className="text-xs text-slate-600">توسط {activity.user}</p>
                  </div>
                  <div className="text-xs text-slate-400">{activity.time}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* System Status */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="lg:col-span-1"
        >
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
              <BarChart3 className="w-5 h-5 ml-2 text-orange-500" />
              وضعیت سیستم
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">وب سایت</span>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">آنلاین</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">پایگاه داده</span>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">متصل</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">سرویس ایمیل</span>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">فعال</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">فضای ذخیره</span>
                <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">75%</span>
              </div>
              <div className="pt-4 border-t border-slate-200">
                <Link
                  href="/admin/health-check"
                  className="w-full flex items-center justify-center space-x-2 space-x-reverse px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
                >
                  <Settings className="w-4 h-4" />
                  <span>بررسی کامل</span>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Performance Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="bg-white rounded-xl p-6 shadow-sm border border-slate-200"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-900 flex items-center">
            <TrendingUp className="w-5 h-5 ml-2 text-orange-500" />
            عملکرد وب سایت
          </h3>
          <div className="flex items-center space-x-2 space-x-reverse">
            <button className="px-3 py-1 text-sm bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors">
              7 روز
            </button>
            <button className="px-3 py-1 text-sm bg-orange-100 text-orange-600 rounded-lg">30 روز</button>
            <button className="px-3 py-1 text-sm bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors">
              90 روز
            </button>
          </div>
        </div>
        <div className="h-64 bg-slate-50 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <TrendingUp className="w-12 h-12 text-slate-400 mx-auto mb-2" />
            <p className="text-slate-600">نمودار عملکرد در اینجا نمایش داده خواهد شد</p>
            <p className="text-sm text-slate-400">نیاز به اتصال با سرویس آنالیتیکس</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
