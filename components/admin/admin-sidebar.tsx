"use client"

import {
  Activity,
  BarChart3,
  Bell,
  FileText,
  Home,
  ImageIcon,
  LogOut,
  MessageSquare,
  Palette,
  Settings,
  Shield,
  Users,
  Video,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const AdminSidebar = () => {
  const pathname = usePathname()

  const menuItems = [
    {
      href: "/admin",
      icon: Home,
      label: "داشبورد",
      active: pathname === "/admin",
    },
    {
      href: "/admin/hero-settings",
      icon: Palette,
      label: "تنظیمات Hero",
      active: pathname === "/admin/hero-settings",
    },
    {
      href: "/admin/media",
      icon: ImageIcon,
      label: "مدیریت رسانه",
      active: pathname === "/admin/media",
    },
    {
      href: "/admin/videos",
      icon: Video,
      label: "مدیریت ویدیو",
      active: pathname === "/admin/videos",
    },
    {
      href: "/admin/projects",
      icon: FileText,
      label: "مدیریت پروژه‌ها",
      active: pathname === "/admin/projects",
    },
    {
      href: "/admin/analytics",
      icon: BarChart3,
      label: "آمار و گزارشات",
      active: pathname === "/admin/analytics",
    },
    {
      href: "/admin/contacts",
      icon: MessageSquare,
      label: "پیام‌های تماس",
      active: pathname === "/admin/contacts",
    },
    {
      href: "/admin/content",
      icon: FileText,
      label: "مدیریت محتوا",
      active: pathname === "/admin/content",
    },
    {
      href: "/admin/settings",
      icon: Settings,
      label: "تنظیمات",
      active: pathname === "/admin/settings",
    },
  ]

  const testItems = [
    {
      href: "/admin/test-performance",
      icon: Activity,
      label: "تست عملکرد",
      active: pathname === "/admin/test-performance",
    },
    {
      href: "/admin/health-check",
      icon: Shield,
      label: "بررسی سلامت",
      active: pathname === "/admin/health-check",
    },
  ]

  return (
    <div className="w-64 bg-slate-800 text-white h-full flex flex-col" dir="rtl">
      {/* Header */}
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center space-x-3 space-x-reverse">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">پ</span>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">پنل مدیریت</h2>
            <p className="text-slate-400 text-sm">پارسا دکور</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        {/* Main Menu */}
        <div className="mb-6">
          <h3 className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-3">منوی اصلی</h3>
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center space-x-3 space-x-reverse px-4 py-3 rounded-lg transition-all duration-200 group ${
                      item.active
                        ? "bg-orange-500 text-white shadow-lg"
                        : "text-slate-300 hover:bg-slate-700 hover:text-white"
                    }`}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span className="font-medium">{item.label}</span>
                    {item.active && <div className="w-2 h-2 bg-white rounded-full mr-auto opacity-75"></div>}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>

        {/* Test & Debug */}
        <div className="mb-6">
          <h3 className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-3">تست و دیباگ</h3>
          <ul className="space-y-2">
            {testItems.map((item) => {
              const Icon = item.icon
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center space-x-3 space-x-reverse px-4 py-3 rounded-lg transition-all duration-200 ${
                      item.active
                        ? "bg-orange-500 text-white shadow-lg"
                        : "text-slate-300 hover:bg-slate-700 hover:text-white"
                    }`}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>

        {/* Quick Actions */}
        <div className="bg-slate-700/50 rounded-lg p-4">
          <h3 className="text-slate-300 text-sm font-semibold mb-3">اقدامات سریع</h3>
          <div className="space-y-2">
            <button className="w-full flex items-center space-x-2 space-x-reverse text-slate-300 hover:text-white text-sm py-2 px-3 rounded hover:bg-slate-600 transition-colors">
              <Bell className="w-4 h-4" />
              <span>اعلان‌ها</span>
              <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full mr-auto">3</span>
            </button>
            <button className="w-full flex items-center space-x-2 space-x-reverse text-slate-300 hover:text-white text-sm py-2 px-3 rounded hover:bg-slate-600 transition-colors">
              <Users className="w-4 h-4" />
              <span>کاربران آنلاین</span>
              <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-full mr-auto">12</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-700">
        <button className="w-full flex items-center space-x-2 space-x-reverse text-slate-300 hover:text-red-400 text-sm py-2 px-3 rounded hover:bg-slate-700 transition-colors">
          <LogOut className="w-4 h-4" />
          <span>خروج</span>
        </button>
        <div className="text-center mt-3">
          <p className="text-slate-400 text-xs">نسخه ۱.۰.۰</p>
          <p className="text-slate-500 text-xs mt-1">© ۲۰۲۴ پارسا دکور</p>
        </div>
      </div>
    </div>
  )
}

export default AdminSidebar
