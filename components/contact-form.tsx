"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Send, Phone, Mail, MapPin, Clock, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface ContactFormProps {
  lang: string
  dict: any
}

export default function ContactForm({ lang, dict }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    service: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errors, setErrors] = useState<Record<string, string>>({})
  const isRTL = lang === "fa"

  const services = [
    { value: "residential", label: dict?.services?.residential || "Residential Design" },
    { value: "commercial", label: dict?.services?.commercial || "Commercial Design" },
    { value: "renovation", label: dict?.services?.renovation || "Renovation" },
    { value: "consultation", label: dict?.services?.consultation || "Consultation" },
  ]

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = dict?.contact?.errors?.name || "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = dict?.contact?.errors?.email || "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = dict?.contact?.errors?.emailInvalid || "Please enter a valid email"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = dict?.contact?.errors?.phone || "Phone is required"
    }

    if (!formData.subject.trim()) {
      newErrors.subject = dict?.contact?.errors?.subject || "Subject is required"
    }

    if (!formData.message.trim()) {
      newErrors.message = dict?.contact?.errors?.message || "Message is required"
    } else if (formData.message.length < 10) {
      newErrors.message = dict?.contact?.errors?.messageShort || "Message must be at least 10 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          language: lang,
          timestamp: new Date().toISOString(),
        }),
      })

      if (response.ok) {
        setSubmitStatus("success")
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
          service: "",
        })
        setErrors({})
      } else {
        throw new Error("Failed to submit form")
      }
    } catch (error) {
      console.error("Form submission error:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  return (
    <div className={`${isRTL ? "rtl" : ""}`}>
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50"
        >
          <h3 className="text-2xl font-bold text-white mb-6">{dict?.contact?.form?.title || "Send us a message"}</h3>

          {submitStatus === "success" && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg flex items-center gap-3"
            >
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-green-400">
                {dict?.contact?.form?.success || "Message sent successfully! We'll get back to you soon."}
              </span>
            </motion.div>
          )}

          {submitStatus === "error" && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg flex items-center gap-3"
            >
              <AlertCircle className="w-5 h-5 text-red-400" />
              <span className="text-red-400">
                {dict?.contact?.form?.error || "Failed to send message. Please try again."}
              </span>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {dict?.contact?.form?.name || "Full Name"} *
              </label>
              <Input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className={`bg-slate-800/50 border-slate-600 text-white placeholder-gray-400 ${
                  errors.name ? "border-red-500" : ""
                }`}
                placeholder={dict?.contact?.form?.namePlaceholder || "Enter your full name"}
              />
              {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {dict?.contact?.form?.email || "Email Address"} *
              </label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className={`bg-slate-800/50 border-slate-600 text-white placeholder-gray-400 ${
                  errors.email ? "border-red-500" : ""
                }`}
                placeholder={dict?.contact?.form?.emailPlaceholder || "Enter your email address"}
              />
              {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {dict?.contact?.form?.phone || "Phone Number"} *
              </label>
              <Input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className={`bg-slate-800/50 border-slate-600 text-white placeholder-gray-400 ${
                  errors.phone ? "border-red-500" : ""
                }`}
                placeholder={dict?.contact?.form?.phonePlaceholder || "Enter your phone number"}
              />
              {errors.phone && <p className="mt-1 text-sm text-red-400">{errors.phone}</p>}
            </div>

            {/* Service */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {dict?.contact?.form?.service || "Service Interested In"}
              </label>
              <select
                value={formData.service}
                onChange={(e) => handleInputChange("service", e.target.value)}
                className="w-full bg-slate-800/50 border border-slate-600 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="">{dict?.contact?.form?.selectService || "Select a service"}</option>
                {services.map((service) => (
                  <option key={service.value} value={service.value}>
                    {service.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Subject */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {dict?.contact?.form?.subject || "Subject"} *
              </label>
              <Input
                type="text"
                value={formData.subject}
                onChange={(e) => handleInputChange("subject", e.target.value)}
                className={`bg-slate-800/50 border-slate-600 text-white placeholder-gray-400 ${
                  errors.subject ? "border-red-500" : ""
                }`}
                placeholder={dict?.contact?.form?.subjectPlaceholder || "Enter message subject"}
              />
              {errors.subject && <p className="mt-1 text-sm text-red-400">{errors.subject}</p>}
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {dict?.contact?.form?.message || "Message"} *
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                rows={5}
                className={`w-full bg-slate-800/50 border border-slate-600 text-white placeholder-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none ${
                  errors.message ? "border-red-500" : ""
                }`}
                placeholder={dict?.contact?.form?.messagePlaceholder || "Tell us about your project..."}
              />
              {errors.message && <p className="mt-1 text-sm text-red-400">{errors.message}</p>}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {dict?.contact?.form?.sending || "Sending..."}
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <Send className="w-4 h-4" />
                  {dict?.contact?.form?.send || "Send Message"}
                </div>
              )}
            </Button>
          </form>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-8"
        >
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">{dict?.contact?.info?.title || "Get in Touch"}</h3>
            <p className="text-gray-300 text-lg leading-relaxed">
              {dict?.contact?.info?.description ||
                "Ready to transform your space? Contact us today for a consultation and let's bring your vision to life."}
            </p>
          </div>

          {/* Contact Details */}
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6 text-orange-400" />
              </div>
              <div>
                <h4 className="text-white font-semibold mb-1">{dict?.contact?.info?.phone || "Phone"}</h4>
                <p className="text-gray-300">+90 212 555 0123</p>
                <p className="text-gray-300">+90 532 123 4567</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-orange-400" />
              </div>
              <div>
                <h4 className="text-white font-semibold mb-1">{dict?.contact?.info?.email || "Email"}</h4>
                <p className="text-gray-300">info@parsadecor.com</p>
                <p className="text-gray-300">projects@parsadecor.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-orange-400" />
              </div>
              <div>
                <h4 className="text-white font-semibold mb-1">{dict?.contact?.info?.address || "Address"}</h4>
                <p className="text-gray-300">
                  Beyoğlu, İstanbul
                  <br />
                  Turkey, 34430
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-orange-400" />
              </div>
              <div>
                <h4 className="text-white font-semibold mb-1">{dict?.contact?.info?.hours || "Working Hours"}</h4>
                <p className="text-gray-300">
                  {dict?.contact?.info?.weekdays || "Mon - Fri: 9:00 - 18:00"}
                  <br />
                  {dict?.contact?.info?.weekend || "Sat: 10:00 - 16:00"}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Contact */}
          <div className="bg-gradient-to-r from-orange-500/10 to-purple-500/10 rounded-2xl p-6 border border-orange-500/20">
            <h4 className="text-white font-semibold mb-3">{dict?.contact?.info?.quickContact || "Quick Contact"}</h4>
            <p className="text-gray-300 mb-4">
              {dict?.contact?.info?.quickContactDesc || "Need immediate assistance? Call us directly!"}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="tel:+902125550123"
                className="flex items-center justify-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
              >
                <Phone className="w-4 h-4" />
                {dict?.contact?.info?.callNow || "Call Now"}
              </a>
              <a
                href="mailto:info@parsadecor.com"
                className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
              >
                <Mail className="w-4 h-4" />
                {dict?.contact?.info?.emailUs || "Email Us"}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
