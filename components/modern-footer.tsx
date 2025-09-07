"use client"

import { motion } from "framer-motion"
import { ArrowUp, Clock, Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

interface FooterProps {
  lang: string
  dict: any
}

export default function ModernFooter({ lang, dict }: FooterProps) {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const isRTL = lang === "fa"

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const quickLinks = [
    { name: dict?.nav?.home || "خانه", href: `/${lang}` },
    { name: dict?.nav?.about || "درباره ما", href: `/${lang}/about` },
    { name: dict?.nav?.services || "خدمات", href: `/${lang}/services` },
    { name: dict?.nav?.portfolio || "نمونه کارها", href: `/${lang}/portfolio` },
    { name: dict?.nav?.gallery || "گالری", href: `/${lang}/gallery` },
    { name: dict?.nav?.contact || "تماس", href: `/${lang}/contact` },
  ]

  const services = [
    { name: "طراحی داخلی", href: `/${lang}/services/interior-design` },
    { name: "بازسازی", href: `/${lang}/services/renovation` },
    { name: "مشاوره", href: `/${lang}/services/consultation` },
    { name: "طراحی آشپزخانه", href: `/${lang}/services/kitchen-design` },
  ]

  const socialLinks = [
    { name: "Instagram", icon: Instagram, href: "#", color: "hover:text-pink-400" },
    { name: "Facebook", icon: Facebook, href: "#", color: "hover:text-blue-400" },
    { name: "Twitter", icon: Twitter, href: "#", color: "hover:text-sky-400" },
    { name: "LinkedIn", icon: Linkedin, href: "#", color: "hover:text-blue-600" },
  ]

  return (
    <footer className={`relative bg-slate-900 border-t border-slate-800 ${isRTL ? "rtl" : ""}`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 opacity-50" />

      <div className="relative">
        {/* Main Footer Content */}
        <div className="container mx-auto px-4 sm:px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Company Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-1"
            >
              <div className={`flex items-center ${isRTL ? "space-x-reverse" : ""} space-x-3 mb-6`}>
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 p-0.5">
                  <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">پ</span>
                  </div>
                </div>
                <h3 className="text-2xl font-light text-white">
                  <span className="bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent">
                    پارسا
                  </span>
                  <span className="text-white/90 mr-1">دکور</span>
                </h3>
              </div>

              <p className="text-slate-300 leading-relaxed mb-6">
                {dict?.footer?.description || "پارسا دکور، ارائه‌دهنده خدمات طراحی داخلی لوکس در استانبول"}
              </p>

              {/* Social Links */}
              <div className={`flex items-center ${isRTL ? "space-x-reverse" : ""} space-x-4`}>
                {socialLinks.map((social) => {
                  const Icon = social.icon
                  return (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      whileHover={{ scale: 1.1, y: -2 }}
                      className={`p-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/70 transition-all duration-300 ${social.color}`}
                    >
                      <Icon className="w-5 h-5" />
                    </motion.a>
                  )
                })}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h4 className="text-lg font-semibold text-white mb-6">{dict?.footer?.quick_links || "لینک‌های سریع"}</h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-slate-300 hover:text-orange-400 transition-colors duration-300 block py-1"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Services */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h4 className="text-lg font-semibold text-white mb-6">خدمات</h4>
              <ul className="space-y-3">
                {services.map((service) => (
                  <li key={service.href}>
                    <Link
                      href={service.href}
                      className="text-slate-300 hover:text-orange-400 transition-colors duration-300 block py-1"
                    >
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h4 className="text-lg font-semibold text-white mb-6">{dict?.footer?.contact_info || "اطلاعات تماس"}</h4>
              <div className="space-y-4">
                <div className={`flex items-start ${isRTL ? "space-x-reverse" : ""} space-x-3`}>
                  <MapPin className="w-5 h-5 text-orange-400 mt-1 flex-shrink-0" />
                  <p className="text-slate-300 text-sm leading-relaxed">
                    استانبول، ترکیه
                    <br />
                    منطقه بیشیکتاش، خیابان اصلی
                  </p>
                </div>

                <div className={`flex items-center ${isRTL ? "space-x-reverse" : ""} space-x-3`}>
                  <Phone className="w-5 h-5 text-orange-400 flex-shrink-0" />
                  <p className="text-slate-300 text-sm">+90 212 555 0123</p>
                </div>

                <div className={`flex items-center ${isRTL ? "space-x-reverse" : ""} space-x-3`}>
                  <Mail className="w-5 h-5 text-orange-400 flex-shrink-0" />
                  <p className="text-slate-300 text-sm">info@parsadecor.com</p>
                </div>

                <div className={`flex items-start ${isRTL ? "space-x-reverse" : ""} space-x-3`}>
                  <Clock className="w-5 h-5 text-orange-400 mt-1 flex-shrink-0" />
                  <div className="text-slate-300 text-sm">
                    <p>شنبه - پنج‌شنبه: ۹:۰۰ - ۱۸:۰۰</p>
                    <p>جمعه: تعطیل</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800">
          <div className="container mx-auto px-4 sm:px-6 py-6">
            <div
              className={`flex flex-col md:flex-row items-center justify-between ${isRTL ? "md:flex-row-reverse" : ""}`}
            >
              <p className="text-slate-400 text-sm text-center md:text-left">
                © ۲۰۲۴ پارسا دکور. {dict?.footer?.rights || "تمامی حقوق محفوظ است"}
              </p>

              <div className={`flex items-center ${isRTL ? "space-x-reverse" : ""} space-x-6 mt-4 md:mt-0`}>
                <Link href="/privacy" className="text-slate-400 hover:text-orange-400 text-sm transition-colors">
                  حریم خصوصی
                </Link>
                <Link href="/terms" className="text-slate-400 hover:text-orange-400 text-sm transition-colors">
                  شرایط استفاده
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: showScrollTop ? 1 : 0,
          scale: showScrollTop ? 1 : 0,
        }}
        onClick={scrollToTop}
        className={`fixed bottom-8 ${isRTL ? "left-8" : "right-8"} z-50 p-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110`}
      >
        <ArrowUp className="w-5 h-5" />
      </motion.button>
    </footer>
  )
}
