"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Home, User, Briefcase, Phone, ImageIcon, Settings, ShoppingBag } from "lucide-react"
import LanguageSelector from "./language-selector"

interface InteractiveNavigationProps {
  lang: string
  dict: any
}

export default function InteractiveNavigation({ lang, dict }: InteractiveNavigationProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const isRTL = lang === "fa"

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { href: `/${lang}`, label: dict?.nav?.home || "خانه", icon: Home },
    { href: `/${lang}/about`, label: dict?.nav?.about || "درباره ما", icon: User },
    { href: `/${lang}/portfolio`, label: dict?.nav?.portfolio || "نمونه کارها", icon: Briefcase },
    { href: `/${lang}/gallery`, label: dict?.nav?.gallery || "گالری", icon: ImageIcon },
    { href: `/${lang}/products`, label: dict?.nav?.products || "محصولات", icon: ShoppingBag },
    { href: `/${lang}/services`, label: dict?.nav?.services || "خدمات", icon: Settings },
    { href: `/${lang}/contact`, label: dict?.nav?.contact || "تماس", icon: Phone },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-lg parsa-shadow" : "bg-transparent"
      }`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-3 rtl:space-x-reverse">
            <Link href={`/${lang}`} className="flex items-center space-x-3 rtl:space-x-reverse">
              <div className="relative">
                <img
                  src="/images/parsa-decor-logo-new.png"
                  alt="Parsa Decor"
                  className="h-12 w-12 rounded-full parsa-shadow"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 opacity-0 hover:opacity-20 transition-opacity duration-300"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold parsa-gradient-text">Parsa Decor</span>
                <span className="text-xs text-gray-500">{dict?.nav?.tagline || "Interior Design"}</span>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8 rtl:space-x-reverse">
            {navItems.map((item, index) => {
              const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== `/${lang}`)
              return (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className={`group relative flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 rounded-full transition-all duration-300 hover:bg-gradient-to-r hover:from-pink-500/10 hover:via-red-500/10 hover:to-yellow-500/10 ${
                      isActive ? "bg-gradient-to-r from-pink-500/10 via-red-500/10 to-yellow-500/10" : ""
                    }`}
                  >
                    <item.icon
                      className={`w-4 h-4 transition-colors duration-300 ${
                        isActive ? "text-red-500" : "text-gray-600 group-hover:text-red-500"
                      }`}
                    />
                    <span
                      className={`font-medium transition-all duration-300 ${
                        isActive ? "parsa-gradient-text" : "text-gray-700 group-hover:parsa-gradient-text"
                      }`}
                    >
                      {item.label}
                    </span>
                    <div
                      className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded-full transition-transform duration-300 ${
                        isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    ></div>
                  </Link>
                </motion.div>
              )
            })}
          </div>

          {/* Language Selector & Mobile Menu */}
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <LanguageSelector lang={lang} />

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white parsa-shadow"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white/95 backdrop-blur-md border-t border-gray-200"
          >
            <div className="container mx-auto px-4 py-6">
              <div className="flex flex-col space-y-4">
                {navItems.map((item, index) => {
                  const isActive =
                    pathname === item.href || (pathname.startsWith(item.href) && item.href !== `/${lang}`)
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center space-x-3 rtl:space-x-reverse p-3 rounded-xl transition-all duration-300 group ${
                          isActive
                            ? "bg-gradient-to-r from-pink-500/10 via-red-500/10 to-yellow-500/10"
                            : "hover:bg-gradient-to-r hover:from-pink-500/10 hover:via-red-500/10 hover:to-yellow-500/10"
                        }`}
                      >
                        <div
                          className={`p-2 rounded-lg ${
                            isActive
                              ? "bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white"
                              : "bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white"
                          }`}
                        >
                          <item.icon className="w-4 h-4" />
                        </div>
                        <span
                          className={`font-medium ${
                            isActive ? "parsa-gradient-text" : "text-gray-700 group-hover:parsa-gradient-text"
                          }`}
                        >
                          {item.label}
                        </span>
                      </Link>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
