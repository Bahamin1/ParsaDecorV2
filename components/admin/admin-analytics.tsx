"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  TrendingUp,
  TrendingDown,
  Users,
  Eye,
  Clock,
  Smartphone,
  Monitor,
  Calendar,
  Download,
  RefreshCw,
} from "lucide-react"

export default function AdminAnalytics() {
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d" | "1y">("30d")
  const [isLoading, setIsLoading] = useState(false)

  const stats = [
    {
      title: "Total Visitors",
      value: "24,567",
      change: "+12.5%",
      trend: "up",
      icon: Users,
      color: "blue",
    },
    {
      title: "Page Views",
      value: "89,234",
      change: "+8.2%",
      trend: "up",
      icon: Eye,
      color: "green",
    },
    {
      title: "Avg. Session Duration",
      value: "3m 42s",
      change: "-2.1%",
      trend: "down",
      icon: Clock,
      color: "yellow",
    },
    {
      title: "Bounce Rate",
      value: "34.2%",
      change: "-5.3%",
      trend: "up",
      icon: TrendingDown,
      color: "purple",
    },
  ]

  const topPages = [
    { page: "/en", views: 12450, percentage: 28.5 },
    { page: "/en/portfolio", views: 8920, percentage: 20.4 },
    { page: "/tr", views: 7650, percentage: 17.5 },
    { page: "/en/about", views: 5430, percentage: 12.4 },
    { page: "/en/contact", views: 4320, percentage: 9.9 },
    { page: "/fa", views: 3210, percentage: 7.3 },
    { page: "/en/services", views: 1890, percentage: 4.3 },
  ]

  const deviceStats = [
    { device: "Desktop", percentage: 52.3, icon: Monitor },
    { device: "Mobile", percentage: 38.7, icon: Smartphone },
    { device: "Tablet", percentage: 9.0, icon: Monitor },
  ]

  const countryStats = [
    { country: "Turkey", flag: "🇹🇷", visitors: 12450, percentage: 50.7 },
    { country: "Iran", flag: "🇮🇷", visitors: 4320, percentage: 17.6 },
    { country: "United States", flag: "🇺🇸", visitors: 2890, percentage: 11.8 },
    { country: "Germany", flag: "🇩🇪", visitors: 1650, percentage: 6.7 },
    { country: "United Kingdom", flag: "🇬🇧", visitors: 1230, percentage: 5.0 },
    { country: "Others", flag: "🌍", visitors: 2027, percentage: 8.2 },
  ]

  const refreshData = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Analytics</h1>
          <p className="text-slate-600 mt-1">Track your website performance and user engagement</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={refreshData}
            disabled={isLoading}
            className="flex items-center space-x-2 px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
            <Download className="w-4 h-4" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Time Range Selector */}
      <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-slate-400" />
            <span className="text-sm font-medium text-slate-700">Time Range:</span>
          </div>
          <div className="flex items-center bg-slate-100 rounded-lg p-1">
            {[
              { key: "7d", label: "7 Days" },
              { key: "30d", label: "30 Days" },
              { key: "90d", label: "90 Days" },
              { key: "1y", label: "1 Year" },
            ].map((range) => (
              <button
                key={range.key}
                onClick={() => setTimeRange(range.key as any)}
                className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                  timeRange === range.key ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
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
            className="bg-white rounded-lg p-6 shadow-sm border border-slate-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">{stat.title}</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
                <div className="flex items-center mt-2">
                  {stat.trend === "up" ? (
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                  )}
                  <span className={`text-sm font-medium ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                    {stat.change}
                  </span>
                </div>
              </div>
              <div className={`w-12 h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Pages */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-lg p-6 shadow-sm border border-slate-200"
        >
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Top Pages</h3>
          <div className="space-y-4">
            {topPages.map((page, index) => (
              <div key={page.page} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-slate-900">{page.page}</span>
                    <span className="text-sm text-slate-600">{page.views.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${page.percentage}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className="bg-orange-500 h-2 rounded-full"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Device Stats */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white rounded-lg p-6 shadow-sm border border-slate-200"
        >
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Device Breakdown</h3>
          <div className="space-y-4">
            {deviceStats.map((device, index) => (
              <div key={device.device} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <device.icon className="w-5 h-5 text-slate-600" />
                  <span className="text-sm font-medium text-slate-900">{device.device}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-24 bg-slate-200 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${device.percentage}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className="bg-blue-500 h-2 rounded-full"
                    />
                  </div>
                  <span className="text-sm text-slate-600 w-12 text-right">{device.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Geographic Data */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-white rounded-lg p-6 shadow-sm border border-slate-200"
      >
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Visitors by Country</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {countryStats.map((country, index) => (
            <div key={country.country} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{country.flag}</span>
                <div>
                  <p className="text-sm font-medium text-slate-900">{country.country}</p>
                  <p className="text-xs text-slate-600">{country.visitors.toLocaleString()} visitors</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-slate-900">{country.percentage}%</p>
                <div className="w-16 bg-slate-200 rounded-full h-1 mt-1">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${country.percentage}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className="bg-green-500 h-1 rounded-full"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Traffic Chart Placeholder */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="bg-white rounded-lg p-6 shadow-sm border border-slate-200"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-900">Traffic Overview</h3>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <span className="text-xs text-slate-600">Visitors</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-xs text-slate-600">Page Views</span>
            </div>
          </div>
        </div>
        <div className="h-64 bg-slate-50 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <TrendingUp className="w-12 h-12 text-slate-400 mx-auto mb-2" />
            <p className="text-slate-600">Traffic chart will be displayed here</p>
            <p className="text-sm text-slate-400">Integration with analytics service required</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
