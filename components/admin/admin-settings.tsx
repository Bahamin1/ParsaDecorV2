"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Save, Globe, Phone, Shield, Database, Bell, Monitor } from "lucide-react"

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState("general")
  const [hasChanges, setHasChanges] = useState(false)

  const [settings, setSettings] = useState({
    general: {
      siteName: "Parsa Decor",
      siteDescription: "Professional Interior Design Services in Istanbul",
      defaultLanguage: "en",
      timezone: "Europe/Istanbul",
      dateFormat: "DD/MM/YYYY",
      currency: "EUR",
    },
    contact: {
      email: "info@parsadecor.com",
      phone: "+90 XXX XXX XXXX",
      address: "Istanbul, Turkey",
      socialMedia: {
        instagram: "@parsadecor",
        whatsapp: "+90XXXXXXXXX",
      },
    },
    seo: {
      metaTitle: "Parsa Decor - Interior Design Istanbul",
      metaDescription:
        "Professional interior design services in Istanbul. Transform your space with modern, elegant designs.",
      keywords: "interior design, Istanbul, decoration, renovation, 3D design",
      googleAnalytics: "GA-XXXXXXXXX",
      googleTagManager: "GTM-XXXXXXX",
    },
    security: {
      twoFactorAuth: true,
      sessionTimeout: 30,
      passwordPolicy: "strong",
      loginAttempts: 5,
      ipWhitelist: "",
    },
    notifications: {
      emailNotifications: true,
      newProjectAlerts: true,
      systemUpdates: true,
      securityAlerts: true,
      weeklyReports: false,
    },
    backup: {
      autoBackup: true,
      backupFrequency: "daily",
      retentionPeriod: 30,
      backupLocation: "cloud",
    },
  })

  const tabs = [
    { id: "general", label: "General", icon: Monitor },
    { id: "contact", label: "Contact Info", icon: Phone },
    { id: "seo", label: "SEO & Analytics", icon: Globe },
    { id: "security", label: "Security", icon: Shield },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "backup", label: "Backup", icon: Database },
  ]

  const updateSetting = (category: string, key: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [key]: value,
      },
    }))
    setHasChanges(true)
  }

  const updateNestedSetting = (category: string, parentKey: string, key: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [parentKey]: {
          ...(prev[category as keyof typeof prev] as any)[parentKey],
          [key]: value,
        },
      },
    }))
    setHasChanges(true)
  }

  const saveSettings = async () => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setHasChanges(false)
    // Show success message
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
          <p className="text-slate-600 mt-1">Configure your website and admin panel preferences</p>
        </div>
        {hasChanges && (
          <button
            onClick={saveSettings}
            className="flex items-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>Save Changes</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 text-left rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? "bg-orange-50 text-orange-600 border border-orange-200"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            {activeTab === "general" && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <h3 className="text-lg font-semibold text-slate-900">General Settings</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Site Name</label>
                    <input
                      type="text"
                      value={settings.general.siteName}
                      onChange={(e) => updateSetting("general", "siteName", e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Default Language</label>
                    <select
                      value={settings.general.defaultLanguage}
                      onChange={(e) => updateSetting("general", "defaultLanguage", e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      <option value="en">English</option>
                      <option value="tr">Türkçe</option>
                      <option value="fa">فارسی</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Site Description</label>
                  <textarea
                    value={settings.general.siteDescription}
                    onChange={(e) => updateSetting("general", "siteDescription", e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Timezone</label>
                    <select
                      value={settings.general.timezone}
                      onChange={(e) => updateSetting("general", "timezone", e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      <option value="Europe/Istanbul">Europe/Istanbul</option>
                      <option value="UTC">UTC</option>
                      <option value="America/New_York">America/New_York</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Date Format</label>
                    <select
                      value={settings.general.dateFormat}
                      onChange={(e) => updateSetting("general", "dateFormat", e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Currency</label>
                    <select
                      value={settings.general.currency}
                      onChange={(e) => updateSetting("general", "currency", e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      <option value="EUR">EUR (€)</option>
                      <option value="USD">USD ($)</option>
                      <option value="TRY">TRY (₺)</option>
                    </select>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "contact" && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <h3 className="text-lg font-semibold text-slate-900">Contact Information</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      value={settings.contact.email}
                      onChange={(e) => updateSetting("contact", "email", e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={settings.contact.phone}
                      onChange={(e) => updateSetting("contact", "phone", e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Address</label>
                  <input
                    type="text"
                    value={settings.contact.address}
                    onChange={(e) => updateSetting("contact", "address", e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Instagram Handle</label>
                    <input
                      type="text"
                      value={settings.contact.socialMedia.instagram}
                      onChange={(e) => updateNestedSetting("contact", "socialMedia", "instagram", e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">WhatsApp Number</label>
                    <input
                      type="tel"
                      value={settings.contact.socialMedia.whatsapp}
                      onChange={(e) => updateNestedSetting("contact", "socialMedia", "whatsapp", e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "security" && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <h3 className="text-lg font-semibold text-slate-900">Security Settings</h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-slate-700">Two-Factor Authentication</label>
                      <p className="text-xs text-slate-500">Add an extra layer of security to your account</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.security.twoFactorAuth}
                      onChange={(e) => updateSetting("security", "twoFactorAuth", e.target.checked)}
                      className="w-4 h-4 text-orange-600 border-slate-300 rounded focus:ring-orange-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Session Timeout (minutes)</label>
                      <input
                        type="number"
                        value={settings.security.sessionTimeout}
                        onChange={(e) => updateSetting("security", "sessionTimeout", Number.parseInt(e.target.value))}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Max Login Attempts</label>
                      <input
                        type="number"
                        value={settings.security.loginAttempts}
                        onChange={(e) => updateSetting("security", "loginAttempts", Number.parseInt(e.target.value))}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Password Policy</label>
                    <select
                      value={settings.security.passwordPolicy}
                      onChange={(e) => updateSetting("security", "passwordPolicy", e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      <option value="basic">Basic (8+ characters)</option>
                      <option value="strong">Strong (8+ chars, numbers, symbols)</option>
                      <option value="very-strong">Very Strong (12+ chars, mixed case, numbers, symbols)</option>
                    </select>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "notifications" && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <h3 className="text-lg font-semibold text-slate-900">Notification Preferences</h3>

                <div className="space-y-4">
                  {Object.entries(settings.notifications).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium text-slate-700 capitalize">
                          {key.replace(/([A-Z])/g, " $1").trim()}
                        </label>
                        <p className="text-xs text-slate-500">
                          {key === "emailNotifications" && "Receive notifications via email"}
                          {key === "newProjectAlerts" && "Get notified when new projects are added"}
                          {key === "systemUpdates" && "Receive system maintenance and update notifications"}
                          {key === "securityAlerts" && "Get alerts for security-related events"}
                          {key === "weeklyReports" && "Receive weekly analytics reports"}
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        checked={value as boolean}
                        onChange={(e) => updateSetting("notifications", key, e.target.checked)}
                        className="w-4 h-4 text-orange-600 border-slate-300 rounded focus:ring-orange-500"
                      />
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "backup" && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <h3 className="text-lg font-semibold text-slate-900">Backup Settings</h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-slate-700">Automatic Backup</label>
                      <p className="text-xs text-slate-500">Automatically backup your data</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.backup.autoBackup}
                      onChange={(e) => updateSetting("backup", "autoBackup", e.target.checked)}
                      className="w-4 h-4 text-orange-600 border-slate-300 rounded focus:ring-orange-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Backup Frequency</label>
                      <select
                        value={settings.backup.backupFrequency}
                        onChange={(e) => updateSetting("backup", "backupFrequency", e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      >
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Retention Period (days)</label>
                      <input
                        type="number"
                        value={settings.backup.retentionPeriod}
                        onChange={(e) => updateSetting("backup", "retentionPeriod", Number.parseInt(e.target.value))}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Backup Location</label>
                    <select
                      value={settings.backup.backupLocation}
                      onChange={(e) => updateSetting("backup", "backupLocation", e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      <option value="cloud">Cloud Storage</option>
                      <option value="local">Local Server</option>
                      <option value="both">Both Cloud and Local</option>
                    </select>
                  </div>

                  <div className="bg-slate-50 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-slate-900 mb-2">Manual Backup</h4>
                    <p className="text-xs text-slate-600 mb-3">Create a backup of your current data</p>
                    <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
                      Create Backup Now
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
