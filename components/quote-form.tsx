"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Send, Calculator, User, Mail, Phone, MapPin } from "lucide-react"

interface QuoteFormProps {
  lang: string
  dict: any
}

export default function QuoteForm({ lang, dict }: QuoteFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    budget: "",
    timeline: "",
    description: "",
    location: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")

  const isRTL = lang === "fa"

  const projectTypes = [
    { value: "residential", label: dict.quote.projectTypes.residential },
    { value: "commercial", label: dict.quote.projectTypes.commercial },
    { value: "office", label: dict.quote.projectTypes.office },
    { value: "restaurant", label: dict.quote.projectTypes.restaurant },
    { value: "hotel", label: dict.quote.projectTypes.hotel },
    { value: "renovation", label: dict.quote.projectTypes.renovation },
  ]

  const budgetRanges = [
    { value: "under-50k", label: dict.quote.budgetRanges.under50k },
    { value: "50k-100k", label: dict.quote.budgetRanges.range50k100k },
    { value: "100k-250k", label: dict.quote.budgetRanges.range100k250k },
    { value: "250k-500k", label: dict.quote.budgetRanges.range250k500k },
    { value: "over-500k", label: dict.quote.budgetRanges.over500k },
  ]

  const timelines = [
    { value: "urgent", label: dict.quote.timelines.urgent },
    { value: "1-3months", label: dict.quote.timelines.months1to3 },
    { value: "3-6months", label: dict.quote.timelines.months3to6 },
    { value: "6-12months", label: dict.quote.timelines.months6to12 },
    { value: "flexible", label: dict.quote.timelines.flexible },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setStatus("success")
        setFormData({
          name: "",
          email: "",
          phone: "",
          projectType: "",
          budget: "",
          timeline: "",
          description: "",
          location: "",
        })
      } else {
        setStatus("error")
      }
    } catch (error) {
      setStatus("error")
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setStatus("idle"), 5000)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl p-8 rounded-3xl border border-gray-800"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Calculator className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-4">{dict.quote.title}</h2>
        <p className="text-gray-300">{dict.quote.description}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative">
            <label className="block text-sm font-medium text-gray-300 mb-2">{dict.quote.form.name}</label>
            <div className="relative">
              <User
                className={`absolute top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 ${isRTL ? "right-4" : "left-4"}`}
              />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className={`w-full bg-gray-800/50 border border-gray-700 rounded-xl py-4 text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 ${isRTL ? "pr-12 pl-4" : "pl-12 pr-4"}`}
                placeholder={dict.quote.form.namePlaceholder}
              />
            </div>
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-300 mb-2">{dict.quote.form.email}</label>
            <div className="relative">
              <Mail
                className={`absolute top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 ${isRTL ? "right-4" : "left-4"}`}
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={`w-full bg-gray-800/50 border border-gray-700 rounded-xl py-4 text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 ${isRTL ? "pr-12 pl-4" : "pl-12 pr-4"}`}
                placeholder={dict.quote.form.emailPlaceholder}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative">
            <label className="block text-sm font-medium text-gray-300 mb-2">{dict.quote.form.phone}</label>
            <div className="relative">
              <Phone
                className={`absolute top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 ${isRTL ? "right-4" : "left-4"}`}
              />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full bg-gray-800/50 border border-gray-700 rounded-xl py-4 text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 ${isRTL ? "pr-12 pl-4" : "pl-12 pr-4"}`}
                placeholder={dict.quote.form.phonePlaceholder}
              />
            </div>
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-300 mb-2">{dict.quote.form.location}</label>
            <div className="relative">
              <MapPin
                className={`absolute top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 ${isRTL ? "right-4" : "left-4"}`}
              />
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className={`w-full bg-gray-800/50 border border-gray-700 rounded-xl py-4 text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 ${isRTL ? "pr-12 pl-4" : "pl-12 pr-4"}`}
                placeholder={dict.quote.form.locationPlaceholder}
              />
            </div>
          </div>
        </div>

        {/* Project Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">{dict.quote.form.projectType}</label>
            <select
              name="projectType"
              value={formData.projectType}
              onChange={handleChange}
              required
              className="w-full bg-gray-800/50 border border-gray-700 rounded-xl py-4 px-4 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
            >
              <option value="">{dict.quote.form.selectProjectType}</option>
              {projectTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">{dict.quote.form.budget}</label>
            <select
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className="w-full bg-gray-800/50 border border-gray-700 rounded-xl py-4 px-4 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
            >
              <option value="">{dict.quote.form.selectBudget}</option>
              {budgetRanges.map((budget) => (
                <option key={budget.value} value={budget.value}>
                  {budget.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">{dict.quote.form.timeline}</label>
            <select
              name="timeline"
              value={formData.timeline}
              onChange={handleChange}
              className="w-full bg-gray-800/50 border border-gray-700 rounded-xl py-4 px-4 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
            >
              <option value="">{dict.quote.form.selectTimeline}</option>
              {timelines.map((timeline) => (
                <option key={timeline.value} value={timeline.value}>
                  {timeline.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Project Description */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">{dict.quote.form.description}</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={5}
            className="w-full bg-gray-800/50 border border-gray-700 rounded-xl py-4 px-4 text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 resize-none"
            placeholder={dict.quote.form.descriptionPlaceholder}
          />
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-orange-600 hover:to-red-700 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          ) : (
            <>
              <span>{dict.quote.form.submit}</span>
              <Send className="w-5 h-5" />
            </>
          )}
        </motion.button>

        {/* Status Messages */}
        {status === "success" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-green-400 text-center font-medium"
          >
            {dict.quote.form.successMessage}
          </motion.div>
        )}

        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-400 text-center font-medium"
          >
            {dict.quote.form.errorMessage}
          </motion.div>
        )}
      </form>
    </motion.div>
  )
}
