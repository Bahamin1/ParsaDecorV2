"use client"

import { useState } from "react"
import { MessageCircle, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface ModernLiveChatProps {
  lang: string
}

export default function ModernLiveChat({ lang }: ModernLiveChatProps) {
  const [isOpen, setIsOpen] = useState(false)

  const chatTexts = {
    en: {
      title: "Need Help?",
      subtitle: "Chat with us",
      whatsapp: "WhatsApp",
      email: "Email Us",
    },
    tr: {
      title: "Yardıma mı ihtiyacınız var?",
      subtitle: "Bizimle sohbet edin",
      whatsapp: "WhatsApp",
      email: "E-posta Gönder",
    },
    fa: {
      title: "به کمک نیاز دارید؟",
      subtitle: "با ما گپ بزنید",
      whatsapp: "واتساپ",
      email: "ایمیل",
    },
  }

  const text = chatTexts[lang as keyof typeof chatTexts] || chatTexts.en

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            className="bg-slate-800/90 backdrop-blur-md rounded-2xl border border-cyan-400/20 p-6 mb-4 w-80"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-light text-white">{text.title}</h3>
                <p className="text-sm text-gray-400 font-light">{text.subtitle}</p>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-cyan-400 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <a
                href="https://wa.me/90XXXXXXXXX"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 p-3 bg-green-500/10 border border-green-500/20 rounded-lg hover:bg-green-500/20 transition-all duration-300"
              >
                <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-green-400" />
                </div>
                <span className="font-light text-green-400">{text.whatsapp}</span>
              </a>

              <a
                href="mailto:info@parsadecor.com"
                className="flex items-center space-x-3 p-3 bg-cyan-400/10 border border-cyan-400/20 rounded-lg hover:bg-cyan-400/20 transition-all duration-300"
              >
                <div className="w-10 h-10 bg-cyan-400/20 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-cyan-400" />
                </div>
                <span className="font-light text-cyan-400">{text.email}</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-cyan-400/25 transition-all duration-300"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </motion.button>
    </div>
  )
}
