"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Send, Check } from "lucide-react"

interface NewsletterSignupProps {
  lang: string
  dict: any
}

export default function NewsletterSignup({ lang, dict }: NewsletterSignupProps) {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const isRTL = lang === "fa"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, name }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus("success")
        setMessage(dict.newsletter.successMessage)
        setEmail("")
        setName("")
      } else {
        setStatus("error")
        setMessage(data.error || dict.newsletter.errorMessage)
      }
    } catch (error) {
      setStatus("error")
      setMessage(dict.newsletter.errorMessage)
    } finally {
      setIsSubmitting(false)
      setTimeout(() => {
        setStatus("idle")
        setMessage("")
      }, 5000)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="bg-gradient-to-br from-orange-500/10 to-red-600/10 backdrop-blur-xl p-8 rounded-3xl border border-orange-500/20"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Mail className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">{dict.newsletter.title}</h3>
        <p className="text-gray-300">{dict.newsletter.description}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder={dict.newsletter.namePlaceholder}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
          />
          <input
            type="email"
            placeholder={dict.newsletter.emailPlaceholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
          />
        </div>

        <motion.button
          type="submit"
          disabled={isSubmitting || !email}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-red-700 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          ) : status === "success" ? (
            <>
              <Check className="w-5 h-5" />
              <span>{dict.newsletter.subscribed}</span>
            </>
          ) : (
            <>
              <span>{dict.newsletter.subscribe}</span>
              <Send className="w-5 h-5" />
            </>
          )}
        </motion.button>

        {message && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-center font-medium ${status === "success" ? "text-green-400" : "text-red-400"}`}
          >
            {message}
          </motion.div>
        )}
      </form>
    </motion.div>
  )
}
