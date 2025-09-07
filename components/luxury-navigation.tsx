"use client"

import { AnimatePresence, motion } from "framer-motion"
import { Briefcase, Home, ImageIcon, Menu, Phone, Settings, ShoppingBag, User, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import LanguageSelector from "./language-selector"

interface LuxuryNavigationProps {
  lang: string
  dict: any
}

export default function LuxuryNavigation({ lang, dict }: LuxuryNavigationProps) {
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

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false)
        event.preventDefault()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (isOpen && !target.closest(".mobile-menu") && !target.closest(".mobile-menu-button")) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("click", handleClickOutside)
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.removeEventListener("click", handleClickOutside)
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  const navItems = [
    {
      href: `/${lang}`,
      label: dict?.nav?.home || "خانه",
      icon: Home,
    },
    {
      href: `/${lang}/about`,
      label: dict?.nav?.about || "درباره ما",
      icon: User,
    },
    {
      href: `/${lang}/portfolio`,
      label: dict?.nav?.portfolio || "نمونه کارها",
      icon: Briefcase,
    },
    {
      href: `/${lang}/gallery`,
      label: dict?.nav?.gallery || "گالری",
      icon: ImageIcon,
    },
    {
      href: `/${lang}/products`,
      label: dict?.nav?.products || "محصولات",
      icon: ShoppingBag,
    },
    {
      href: `/${lang}/services`,
      label: dict?.nav?.services || "خدمات",
      icon: Settings,
    },
    {
      href: `/${lang}/contact`,
      label: dict?.nav?.contact || "تماس با ما",
      icon: Phone,
    },
  ]

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "tr", name: "Türkçe", flag: "🇹🇷" },
    { code: "fa", name: "فارسی", flag: "🇮🇷" },
  ]

  const switchLanguage = (newLang: string) => {
    const segments = pathname.split("/")
    segments[1] = newLang
    const newPath = segments.join("/")
    window.location.href = newPath
  }

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-orange-500 text-white px-4 py-2 rounded-md z-50"
      >
        {lang === "fa" ? "پرش به محتوای اصلی" : lang === "tr" ? "Ana içeriğe atla" : "Skip to main content"}
      </a>

      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md border-b border-orange-500/20 shadow-2xl"
            : "bg-slate-900/95 backdrop-blur-md"
        }`}
        dir={isRTL ? "rtl" : "ltr"}
        role="navigation"
        aria-label={lang === "fa" ? "اصلی" : lang === "tr" ? "Ana navigasyon" : "Main navigation"}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo Section */}
            <div className="flex items-center space-x-3 rtl:space-x-reverse flex-shrink-0 min-w-0">
              <Link
                href={`/${lang}`}
                className="flex items-center space-x-3 rtl:space-x-reverse focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded-lg p-2"
                aria-label={
                  lang === "fa"
                    ? "پارسا دکور - صفحه اصلی"
                    : lang === "tr"
                      ? "Parsa Decor - Ana Sayfa"
                      : "Parsa Decor - Home"
                }
              >
                <div className="relative flex-shrink-0">
                  <Image
                    src="/images/parsa-decor-logo-new.png"
                    alt={lang === "fa" ? "لوگوی پارسا دکور" : lang === "tr" ? "Parsa Decor Logosu" : "Parsa Decor Logo"}
                    width={48}
                    height={48}
                    className="w-12 h-12 object-contain"
                  />
                </div>
                <div className="flex flex-col min-w-0">
                  <span
                    className={`text-xl font-bold whitespace-nowrap transition-colors duration-500 ${
                      scrolled ? "text-slate-900" : "text-orange-500"
                    }`}
                  >
                    پارسا دکور
                  </span>
                  <span
                    className={`text-xs whitespace-nowrap transition-colors duration-500 ${
                      scrolled ? "text-slate-600" : "text-slate-400"
                    }`}
                  >
                    {dict?.nav?.tagline || "طراحی داخلی لوکس"}
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex flex-1 justify-center px-8">
              <div className="flex items-center space-x-1 rtl:space-x-reverse" role="menubar">
                {navItems.map((item) => {
                  const isActive =
                    pathname === item.href || (pathname.startsWith(item.href) && item.href !== `/${lang}`)
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center space-x-2 rtl:space-x-reverse px-3 py-2 rounded-lg transition-all duration-300 whitespace-nowrap min-h-[44px] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 ${
                        isActive
                          ? scrolled
                            ? "bg-orange-500 text-white shadow-md"
                            : "bg-orange-500/20 text-orange-400 border border-orange-500/30"
                          : scrolled
                            ? "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                            : "text-slate-300 hover:bg-slate-800/50 hover:text-white"
                      }`}
                      role="menuitem"
                      aria-current={isActive ? "page" : undefined}
                    >
                      <item.icon className="w-4 h-4" aria-hidden="true" />
                      <span>{item.label}</span>
                    </Link>
                  )
                })}
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-3 rtl:space-x-reverse flex-shrink-0">
              {/* Language Selector */}
              <LanguageSelector currentLang={lang} />

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`mobile-menu-button lg:hidden p-3 rounded-lg border min-h-[44px] min-w-[44px] touch-manipulation focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 ${
                  scrolled
                    ? "bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200"
                    : "bg-slate-800/50 border-slate-600 text-slate-300 hover:bg-slate-700/50"
                }`}
                aria-label={
                  isOpen
                    ? lang === "fa"
                      ? "بستن منوی موبایل"
                      : lang === "tr"
                        ? "Mobil menüyü kapat"
                        : "Close mobile menu"
                    : lang === "fa"
                      ? "باز کردن منوی موبایل"
                      : lang === "tr"
                        ? "Mobil menüyü aç"
                        : "Open mobile menu"
                }
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
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
                      <X className="w-5 h-5" aria-hidden="true" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="w-5 h-5" aria-hidden="true" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className={`mobile-menu fixed top-20 left-0 right-0 z-50 lg:hidden backdrop-blur-md border-t shadow-xl ${
                scrolled ? "bg-white/98 border-slate-200" : "bg-slate-900/98 border-slate-700"
              }`}
              id="mobile-menu"
              role="menu"
              aria-label={lang === "fa" ? "منوی موبایل" : lang === "tr" ? "Mobil menü" : "Mobile menu"}
            >
              <div className="container mx-auto px-4 py-6 max-h-[calc(100vh-5rem)] overflow-y-auto">
                <div className="flex flex-col space-y-2">
                  {navItems.map((item, index) => {
                    const isActive =
                      pathname === item.href || (pathname.startsWith(item.href) && item.href !== `/${lang}`)
                    return (
                      <motion.div
                        key={item.href}
                        initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className={`flex items-center space-x-3 rtl:space-x-reverse p-4 rounded-lg transition-all duration-300 min-h-[56px] touch-manipulation focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 ${
                            isActive
                              ? scrolled
                                ? "bg-orange-500 text-white shadow-md"
                                : "bg-orange-500/20 text-orange-400 border border-orange-500/30"
                              : scrolled
                                ? "text-slate-700 hover:bg-slate-100"
                                : "text-slate-300 hover:bg-slate-800/50"
                          }`}
                          role="menuitem"
                          aria-current={isActive ? "page" : undefined}
                        >
                          <div
                            className={`p-2 rounded-lg ${
                              isActive
                                ? scrolled
                                  ? "bg-white/20 text-white"
                                  : "bg-orange-500 text-white"
                                : scrolled
                                  ? "bg-slate-200 text-slate-700"
                                  : "bg-slate-700 text-slate-300"
                            }`}
                            aria-hidden="true"
                          >
                            <item.icon className="w-4 h-4" />
                          </div>
                          <span className="font-medium whitespace-nowrap">{item.label}</span>
                        </Link>
                      </motion.div>
                    )
                  })}
                </div>

                <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
                  <p className={`text-sm mb-4 px-4 font-medium ${scrolled ? "text-slate-600" : "text-slate-400"}`}>
                    {lang === "fa" ? "زبان" : lang === "tr" ? "Dil" : "Language"}
                  </p>
                  <div
                    className="flex flex-col space-y-2"
                    role="group"
                    aria-label={lang === "fa" ? "انتخاب زبان" : lang === "tr" ? "Dil seçimi" : "Language selection"}
                  >
                    {languages.map((language) => (
                      <button
                        key={language.code}
                        onClick={() => {
                          switchLanguage(language.code)
                          setIsOpen(false)
                        }}
                        className={`flex items-center space-x-3 rtl:space-x-reverse p-4 rounded-lg transition-colors min-h-[56px] touch-manipulation focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 ${
                          lang === language.code
                            ? scrolled
                              ? "text-orange-600 bg-orange-50"
                              : "text-orange-400 bg-orange-500/10"
                            : scrolled
                              ? "text-slate-700 hover:bg-slate-100"
                              : "text-slate-300 hover:bg-slate-800/50"
                        }`}
                        aria-current={lang === language.code ? "true" : undefined}
                      >
                        <span className="text-lg" aria-hidden="true">
                          {language.flag}
                        </span>
                        <span className="whitespace-nowrap">{language.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
