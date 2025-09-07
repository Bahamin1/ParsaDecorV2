"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Globe, ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface NavigationProps {
  lang: string
  dict: any
}

export default function Navigation({ lang, dict }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [languageOpen, setLanguageOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { href: `/${lang}`, label: dict?.nav?.home || "Home" },
    { href: `/${lang}/about`, label: dict?.nav?.about || "About" },
    { href: `/${lang}/portfolio`, label: dict?.nav?.portfolio || "Portfolio" },
    { href: `/${lang}/gallery`, label: dict?.nav?.gallery || "Gallery" },
    { href: `/${lang}/products`, label: dict?.nav?.products || "Products" },
    { href: `/${lang}/services`, label: dict?.nav?.services || "Services" },
    { href: `/${lang}/contact`, label: dict?.nav?.contact || "Contact" },
  ]

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "tr", name: "Türkçe", flag: "🇹🇷" },
    { code: "fa", name: "فارسی", flag: "🇮🇷" },
  ]

  const switchLanguage = (newLang: string) => {
    const currentPath = pathname.replace(`/${lang}`, "")
    window.location.href = `/${newLang}${currentPath}`
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href={`/${lang}`} className="flex items-center space-x-3">
            <img src="/images/parsa-decor-logo-new.png" alt="Parsa Decor" className="h-12 w-12 rounded-full" />
            <span className="text-2xl font-bold text-gray-800">Parsa Decor</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== `/${lang}`)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                    isActive ? "text-blue-600" : "text-gray-700"
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setLanguageOpen(!languageOpen)}
                className="flex items-center space-x-2 px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm">{languages.find((l) => l.code === lang)?.flag}</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              <AnimatePresence>
                {languageOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full right-0 mt-2 py-2 bg-white rounded-lg shadow-lg border min-w-[140px]"
                  >
                    {languages.map((language) => (
                      <button
                        key={language.code}
                        onClick={() => {
                          switchLanguage(language.code)
                          setLanguageOpen(false)
                        }}
                        className={`flex items-center space-x-3 px-4 py-2 text-sm hover:bg-gray-100 w-full text-left ${
                          lang === language.code ? "text-blue-600 bg-blue-50" : "text-gray-700"
                        }`}
                      >
                        <span>{language.flag}</span>
                        <span>{language.name}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-gray-700 hover:text-blue-600 transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white/95 backdrop-blur-md border-t"
          >
            <div className="container mx-auto px-4 py-4">
              {navItems.map((item) => {
                const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== `/${lang}`)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`block py-3 text-sm font-medium transition-colors ${
                      isActive ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                    }`}
                  >
                    {item.label}
                  </Link>
                )
              })}

              <div className="border-t pt-4 mt-4">
                <p className="text-xs text-gray-500 mb-2">Language</p>
                {languages.map((language) => (
                  <button
                    key={language.code}
                    onClick={() => {
                      switchLanguage(language.code)
                      setIsOpen(false)
                    }}
                    className={`flex items-center space-x-3 py-2 text-sm w-full text-left ${
                      lang === language.code ? "text-blue-600" : "text-gray-700"
                    }`}
                  >
                    <span>{language.flag}</span>
                    <span>{language.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      {(languageOpen || isOpen) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setLanguageOpen(false)
            setIsOpen(false)
          }}
        />
      )}
    </motion.nav>
  )
}
