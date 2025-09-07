"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Globe } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface ModernNavigationProps {
  lang: string
  dict: any
}

export default function ModernNavigation({ lang, dict }: ModernNavigationProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
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
    { code: "en", name: "EN" },
    { code: "tr", name: "TR" },
    { code: "fa", name: "فا" },
  ]

  const switchLanguage = (newLang: string) => {
    const currentPath = pathname.replace(`/${lang}`, "")
    window.location.href = `/${newLang}${currentPath}`
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "bg-slate-900/80 backdrop-blur-md border-b border-cyan-400/20" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href={`/${lang}`} className="text-2xl font-light text-white tracking-wider">
            PARSA DECOR
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== `/${lang}`)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative text-sm font-light transition-colors hover:text-cyan-400 ${
                    isActive ? "text-cyan-400" : "text-gray-300"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                    />
                  )}
                </Link>
              )
            })}

            {/* Language Switcher */}
            <div className="relative group">
              <button className="flex items-center space-x-1 text-sm font-light text-gray-300 hover:text-cyan-400 transition-colors">
                <Globe className="w-4 h-4" />
                <span>{languages.find((l) => l.code === lang)?.name}</span>
              </button>
              <div className="absolute top-full right-0 mt-2 bg-slate-800/90 backdrop-blur-md rounded-lg border border-cyan-400/20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                {languages.map((language) => (
                  <button
                    key={language.code}
                    onClick={() => switchLanguage(language.code)}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-cyan-400/10 first:rounded-t-lg last:rounded-b-lg transition-colors ${
                      lang === language.code ? "text-cyan-400" : "text-gray-300"
                    }`}
                  >
                    {language.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-gray-300 hover:text-cyan-400 transition-colors"
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
            className="lg:hidden bg-slate-900/95 backdrop-blur-md border-t border-cyan-400/20"
          >
            <div className="container mx-auto px-4 py-4">
              {navItems.map((item) => {
                const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== `/${lang}`)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`block py-3 text-sm font-light transition-colors ${
                      isActive ? "text-cyan-400" : "text-gray-300 hover:text-cyan-400"
                    }`}
                  >
                    {item.label}
                  </Link>
                )
              })}

              <div className="border-t border-gray-700 pt-4 mt-4">
                <p className="text-xs text-gray-500 mb-2">Language</p>
                {languages.map((language) => (
                  <button
                    key={language.code}
                    onClick={() => switchLanguage(language.code)}
                    className={`block py-2 text-sm font-light transition-colors ${
                      lang === language.code ? "text-cyan-400" : "text-gray-300 hover:text-cyan-400"
                    }`}
                  >
                    {language.name}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
