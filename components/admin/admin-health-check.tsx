"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  CheckCircle,
  XCircle,
  AlertCircle,
  RefreshCw,
  Database,
  Server,
  Shield,
  Mail,
  HardDrive,
  Wifi,
} from "lucide-react"

interface HealthCheck {
  name: string
  status: "healthy" | "warning" | "error"
  message: string
  lastChecked: string
  responseTime?: number
  icon: any
}

export default function AdminHealthCheck() {
  const [isChecking, setIsChecking] = useState(false)
  const [healthChecks, setHealthChecks] = useState<HealthCheck[]>([])
  const [overallHealth, setOverallHealth] = useState<"healthy" | "warning" | "error">("healthy")

  const runHealthCheck = async () => {
    setIsChecking(true)

    // Simulate health checks
    await new Promise((resolve) => setTimeout(resolve, 3000))

    const checks: HealthCheck[] = [
      {
        name: "Database Connection",
        status: "healthy",
        message: "PostgreSQL connection stable",
        lastChecked: new Date().toLocaleTimeString(),
        responseTime: 45,
        icon: Database,
      },
      {
        name: "Server Status",
        status: "healthy",
        message: "CPU: 12%, Memory: 68MB, Uptime: 99.9%",
        lastChecked: new Date().toLocaleTimeString(),
        responseTime: 23,
        icon: Server,
      },
      {
        name: "Authentication Service",
        status: "healthy",
        message: "JWT tokens valid, session management active",
        lastChecked: new Date().toLocaleTimeString(),
        responseTime: 67,
        icon: Shield,
      },
      {
        name: "API Endpoints",
        status: "healthy",
        message: "All endpoints responding normally",
        lastChecked: new Date().toLocaleTimeString(),
        responseTime: 156,
        icon: Wifi,
      },
      {
        name: "Media Storage",
        status: "healthy",
        message: "2.3GB/10GB used (23%)",
        lastChecked: new Date().toLocaleTimeString(),
        icon: HardDrive,
      },
      {
        name: "Email Service",
        status: "healthy",
        message: "SMTP server active, queue empty",
        lastChecked: new Date().toLocaleTimeString(),
        responseTime: 234,
        icon: Mail,
      },
    ]

    setHealthChecks(checks)
    setOverallHealth("healthy")
    setIsChecking(false)
  }

  useEffect(() => {
    runHealthCheck()

    // Auto-refresh every 30 seconds
    const interval = setInterval(runHealthCheck, 30000)
    return () => clearInterval(interval)
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "warning":
        return <AlertCircle className="w-5 h-5 text-yellow-500" />
      case "error":
        return <XCircle className="w-5 h-5 text-red-500" />
      default:
        return <AlertCircle className="w-5 h-5 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "bg-green-100 text-green-800"
      case "warning":
        return "bg-yellow-100 text-yellow-800"
      case "error":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const healthyCount = healthChecks.filter((check) => check.status === "healthy").length
  const totalChecks = healthChecks.length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">System Health Check</h1>
          <p className="text-gray-600">Monitor system components and services</p>
        </div>
        <Button onClick={runHealthCheck} disabled={isChecking}>
          {isChecking ? (
            <>
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              Checking...
            </>
          ) : (
            <>
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </>
          )}
        </Button>
      </div>

      {/* Overall Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            {getStatusIcon(overallHealth)}
            <span className="ml-2">Overall System Health</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-green-600">
                {healthyCount}/{totalChecks} Services Healthy
              </div>
              <p className="text-gray-600">All systems operational</p>
            </div>
            <Badge className={getStatusColor(overallHealth)}>{overallHealth.toUpperCase()}</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Health Checks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {healthChecks.map((check, index) => {
          const IconComponent = check.icon
          return (
            <Card key={index}>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-lg">
                  <IconComponent className="w-5 h-5 mr-2 text-gray-600" />
                  {check.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    {getStatusIcon(check.status)}
                    <Badge className={getStatusColor(check.status)}>{check.status.toUpperCase()}</Badge>
                  </div>

                  <p className="text-sm text-gray-600">{check.message}</p>

                  {check.responseTime && (
                    <div className="text-xs text-gray-500">Response Time: {check.responseTime}ms</div>
                  )}

                  <div className="text-xs text-gray-400">Last checked: {check.lastChecked}</div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* System Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>System Metrics</CardTitle>
          <CardDescription>Real-time system performance data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-blue-600">99.9%</div>
              <div className="text-sm text-gray-600">Uptime</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-green-600">156ms</div>
              <div className="text-sm text-gray-600">Avg Response</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-purple-600">68MB</div>
              <div className="text-sm text-gray-600">Memory Usage</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-orange-600">12%</div>
              <div className="text-sm text-gray-600">CPU Usage</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
