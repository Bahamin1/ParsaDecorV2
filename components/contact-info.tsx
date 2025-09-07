"use client"

import { motion } from "framer-motion"
import { MapPin, Phone, Mail, MessageCircle, Clock, Globe, Instagram, Facebook } from "lucide-react"

interface ContactInfoProps {
  lang: string
  dict: any
}

export default function ContactInfo({ lang, dict }: ContactInfoProps) {
  const isRTL = lang === "fa"

  const contactItems = [
    {
      icon: MapPin,
      title: dict?.contact?.info?.addressTitle || "Address",
      content: dict?.contact?.info?.address || "Beyoğlu, Istanbul, Turkey",
      link: "https://maps.app.goo.gl/dAs122gjvCJnnkFS6",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Phone,
      title: dict?.contact?.info?.phoneTitle || "Phone",
      content: "+90 534 423 2551",
      link: "tel:+905344232551",
      color: "from-green-500 to-green-600",
    },
    {
      icon: MessageCircle,
      title: dict?.contact?.info?.whatsappTitle || "WhatsApp",
      content: "+90 534 423 2551",
      link: "https://wa.me/905344232551",
      color: "from-green-400 to-green-500",
    },
    {
      icon: Mail,
      title: dict?.contact?.info?.emailTitle || "Email",
      content: "info@parsadecor.com",
      link: "mailto:info@parsadecor.com",
      color: "from-red-500 to-red-600",
    },
    {
      icon: Clock,
      title: dict?.contact?.info?.hoursTitle || "Working Hours",
      content: dict?.contact?.info?.hours || "Mon-Sat: 9:00 AM - 6:00 PM",
      link: null,
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: Globe,
      title: dict?.contact?.info?.websiteTitle || "Website",
      content: "www.parsadecor.com",
      link: "https://parsadecor.com",
      color: "from-orange-500 to-orange-600",
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="space-y-8"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Contact Information Cards */}
      <div className="space-y-6">
        {contactItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl p-6 rounded-2xl border border-gray-800 hover:border-orange-500/50 transition-all duration-300 group"
          >
            <div className={`flex items-start ${isRTL ? "space-x-reverse" : ""} space-x-4`}>
              <div
                className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}
              >
                <item.icon className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                {item.link ? (
                  <a
                    href={item.link}
                    target={item.link.startsWith("http") ? "_blank" : "_self"}
                    rel={item.link.startsWith("http") ? "noopener noreferrer" : ""}
                    className="text-gray-300 hover:text-orange-400 transition-colors duration-300 break-words block"
                  >
                    {item.content}
                  </a>
                ) : (
                  <p className="text-gray-300 break-words">{item.content}</p>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Google Map */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        viewport={{ once: true }}
        className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl p-6 rounded-2xl border border-gray-800"
      >
        <h3 className="text-xl font-semibold text-white mb-4">{dict?.contact?.info?.mapTitle || "Find Us"}</h3>
        <div className="h-64 rounded-xl overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3008.8267!2d28.9784!3d41.0082!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDAwJzI5LjUiTiAyOMKwNTgnNDIuMiJF!5e0!3m2!1sen!2str!4v1234567890"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-xl"
          />
        </div>
        <div className="mt-4">
          <a
            href="https://maps.app.goo.gl/dAs122gjvCJnnkFS6"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 text-orange-400 hover:text-orange-300 transition-colors duration-300"
          >
            <MapPin className="w-4 h-4" />
            <span>{dict?.contact?.info?.viewOnMaps || "View on Google Maps"}</span>
          </a>
        </div>
      </motion.div>

      {/* Social Media */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        viewport={{ once: true }}
        className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl p-6 rounded-2xl border border-gray-800"
      >
        <h3 className="text-xl font-semibold text-white mb-4">{dict?.contact?.info?.followUs || "Follow Us"}</h3>
        <div className={`flex space-x-4 ${isRTL ? "flex-row-reverse space-x-reverse" : ""}`}>
          <a
            href="https://instagram.com/parsadecor"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center hover:scale-110 transition-transform duration-300"
          >
            <Instagram className="w-6 h-6 text-white" />
          </a>
          <a
            href="https://wa.me/905344232551"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center hover:scale-110 transition-transform duration-300"
          >
            <MessageCircle className="w-6 h-6 text-white" />
          </a>
          <a
            href="https://facebook.com/parsadecor"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center hover:scale-110 transition-transform duration-300"
          >
            <Facebook className="w-6 h-6 text-white" />
          </a>
        </div>
      </motion.div>
    </motion.div>
  )
}
