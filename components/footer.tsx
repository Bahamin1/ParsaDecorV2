"use client"

import Link from "next/link"
import { Instagram, MessageCircle, Mail, Phone } from "lucide-react"

interface FooterProps {
  lang: string
  dict: any
}

export default function Footer({ lang, dict }: FooterProps) {
  const isRTL = lang === "fa"

  const navItems = [
    { href: `/${lang}`, label: dict.nav.home },
    { href: `/${lang}/about`, label: dict.nav.about },
    { href: `/${lang}/portfolio`, label: dict.nav.portfolio },
    { href: `/${lang}/services`, label: dict.nav.services },
    { href: `/${lang}/contact`, label: dict.nav.contact },
  ]

  return (
    <footer className={`bg-[#1E1E1E] text-white py-16 ${isRTL ? "rtl" : ""}`}>
      <div className="container mx-auto px-4">
        <div className={`grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 ${isRTL ? "text-right" : "text-left"}`}>
          {/* Brand */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold mb-4">{lang === "fa" ? "پارسا دکور" : "Parsa Decor"}</h3>
            <p className="text-gray-300 mb-6 max-w-md">{dict.footer.description}</p>
            <div className={`flex ${isRTL ? "space-x-reverse space-x-4" : "space-x-4"}`}>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#EA3E27] transition-colors duration-300"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#EA3E27] transition-colors duration-300"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{dict.footer.links}</h4>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-gray-300 hover:text-white transition-colors duration-300">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{lang === "fa" ? "تماس" : "Contact"}</h4>
            <div className="space-y-3">
              <div className={`flex items-center ${isRTL ? "space-x-reverse space-x-3" : "space-x-3"}`}>
                <Phone className="w-4 h-4 text-[#EA3E27]" />
                <span className="text-gray-300 text-sm">+90 XXX XXX XXXX</span>
              </div>
              <div className={`flex items-center ${isRTL ? "space-x-reverse space-x-3" : "space-x-3"}`}>
                <Mail className="w-4 h-4 text-[#EA3E27]" />
                <span className="text-gray-300 text-sm">info@parsadecor.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center">
          <p className="text-gray-400 text-sm">{dict.footer.copyright}</p>
        </div>
      </div>
    </footer>
  )
}
