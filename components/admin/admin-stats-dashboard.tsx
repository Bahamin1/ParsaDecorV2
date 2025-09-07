"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { TrendingUp, Users, MessageSquare, Calculator, Mail, Eye, Calendar, DollarSign } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface DashboardStats {
  totalContacts: number
  newContacts: number
  totalQuotes: number
  pendingQuotes: number
  totalSubscribers: number
  activeSubscribers: number
  monthlyGrowth: number
  responseRate: number
}

export default function AdminStatsDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalContacts: 0,
    newContacts: 0,
    totalQuotes: 0,
    pendingQuotes: 0,
    totalSubscribers: 0,
    activeSubscribers: 0,
    monthlyGrowth: 0,
    responseRate: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      setLoading(true)

      // Fetch all data in parallel
      const [contactsRes, quotesRes, newsletterRes] = await Promise.all([
        fetch("/api/contact"),
        fetch("/api/quote"),
        fetch("/api/newsletter"),
      ])

      const [contactsData, quotesData, newsletterData] = await Promise.all([
        contactsRes.ok ? contactsRes.json() : { data: [] },
        quotesRes.ok ? quotesRes.json() : { data: [] },
        newsletterRes.ok ? newsletterRes.json() : { data: [] },
      ])

      const contacts = contactsData.data || []
      const quotes = quotesData.data || []
      const subscribers = newsletterData.data || []

      // Calculate stats
      const newContacts = contacts.filter((c: any) => c.status === "new").length
      const pendingQuotes = quotes.filter((q: any) => q.status === "new").length
      const activeSubscribers = subscribers.filter((s: any) => s.status === "active").length

      // Calculate monthly growth (simplified)
      const thisMonth = new Date().getMonth()
      const thisMonthContacts = contacts.filter((c: any) => new Date(c.created_at).getMonth() === thisMonth).length
      const lastMonthContacts = contacts.filter((c: any) => new Date(c.created_at).getMonth() === thisMonth - 1).length

      const monthlyGrowth =
        lastMonthContacts > 0 ? ((thisMonthContacts - lastMonthContacts) / lastMonthContacts) * 100 : 0

      // Calculate response rate
      const repliedContacts = contacts.filter((c: any) => c.status === "replied").length
      const responseRate = contacts.length > 0 ? (repliedContacts / contacts.length) * 100 : 0

      setStats({
        totalContacts: contacts.length,
        newContacts,
        totalQuotes: quotes.length,
        pendingQuotes,
        totalSubscribers: subscribers.length,
        activeSubscribers,
        monthlyGrowth: Math.round(monthlyGrowth),
        responseRate: Math.round(responseRate),
      })
    } catch (error) {
      console.error("Failed to fetch stats:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className="animate-pulse bg-gray-200 h-32 rounded-lg"></div>
        ))}
      </div>
    )
  }

  const statCards = [
    {
      title: "Total Contacts",
      value: stats.totalContacts,
      change: `${stats.newContacts} new`,
      icon: MessageSquare,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Quote Requests",
      value: stats.totalQuotes,
      change: `${stats.pendingQuotes} pending`,
      icon: Calculator,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Newsletter Subscribers",
      value: stats.totalSubscribers,
      change: `${stats.activeSubscribers} active`,
      icon: Mail,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Monthly Growth",
      value: `${stats.monthlyGrowth}%`,
      change: "vs last month",
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
    {
      title: "Response Rate",
      value: `${stats.responseRate}%`,
      change: "of contacts replied",
      icon: Eye,
      color: "text-indigo-600",
      bgColor: "bg-indigo-100",
    },
    {
      title: "This Week",
      value: "24",
      change: "new inquiries",
      icon: Calendar,
      color: "text-pink-600",
      bgColor: "bg-pink-100",
    },
    {
      title: "Avg. Project Value",
      value: "$85K",
      change: "estimated",
      icon: DollarSign,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
    {
      title: "Active Projects",
      value: "12",
      change: "in progress",
      icon: Users,
      color: "text-red-600",
      bgColor: "bg-red-100",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <div className={`p-2 rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.change}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Progress Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Contact Response Progress</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Replied to Contacts</span>
                <span>{stats.responseRate}%</span>
              </div>
              <Progress value={stats.responseRate} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Active Subscribers</span>
                <span>{Math.round((stats.activeSubscribers / stats.totalSubscribers) * 100)}%</span>
              </div>
              <Progress value={Math.round((stats.activeSubscribers / stats.totalSubscribers) * 100)} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quote Conversion</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Quotes Processed</span>
                <span>{Math.round(((stats.totalQuotes - stats.pendingQuotes) / stats.totalQuotes) * 100)}%</span>
              </div>
              <Progress
                value={Math.round(((stats.totalQuotes - stats.pendingQuotes) / stats.totalQuotes) * 100)}
                className="h-2"
              />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Monthly Growth</span>
                <span>{Math.abs(stats.monthlyGrowth)}%</span>
              </div>
              <Progress value={Math.min(Math.abs(stats.monthlyGrowth), 100)} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
