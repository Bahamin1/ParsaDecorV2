"use client"

import { motion } from "framer-motion"
import { MapPin, Navigation, Phone } from "lucide-react"

interface ContactMapProps {
  lang: string
  dict: any
}

export default function ContactMap({ lang, dict }: ContactMapProps) {
  const isRTL = lang === "fa"

  return (
    <section className="py-16 bg-black">
      <div className="container mx-auto px-4" dir={isRTL ? "rtl" : "ltr"}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-4">{dict.contact.map.title}</h2>
          <p className="text-gray-300 text-lg">{dict.contact.map.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl p-6 rounded-3xl border border-gray-800">
              <div className="h-96 rounded-2xl overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3008.8267!2d28.9784!3d41.0082!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDAwJzI5LjUiTiAyOMKwNTgnNDIuMiJF!5e0!3m2!1sen!2str!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-2xl"
                />
              </div>
              <div className="mt-6 flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{dict.contact.map.officeTitle}</h3>
                  <p className="text-gray-300">{dict.contact.info.address}</p>
                </div>
                <a
                  href="https://maps.app.goo.gl/dAs122gjvCJnnkFS6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl transition-colors duration-300"
                >
                  <Navigation className="w-5 h-5" />
                  <span>{dict.contact.map.directions}</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Office Hours */}
            <div className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl p-6 rounded-2xl border border-gray-800">
              <h3 className="text-xl font-semibold text-white mb-4">{dict.contact.info.hoursTitle}</h3>
              <div className="space-y-3 text-gray-300">
                <div className="flex justify-between">
                  <span>{dict.contact.hours.weekdays}</span>
                  <span>9:00 - 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span>{dict.contact.hours.saturday}</span>
                  <span>10:00 - 16:00</span>
                </div>
                <div className="flex justify-between">
                  <span>{dict.contact.hours.sunday}</span>
                  <span className="text-red-400">{dict.contact.hours.closed}</span>
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-gradient-to-br from-red-900/20 to-orange-900/20 backdrop-blur-xl p-6 rounded-2xl border border-red-800/50">
              <h3 className="text-xl font-semibold text-white mb-4">{dict.contact.emergency.title}</h3>
              <p className="text-gray-300 mb-4">{dict.contact.emergency.description}</p>
              <a
                href="tel:+905344232551"
                className="flex items-center space-x-3 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl transition-colors duration-300"
              >
                <Phone className="w-5 h-5" />
                <span>+90 534 423 2551</span>
              </a>
            </div>

            {/* Service Areas */}
            <div className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl p-6 rounded-2xl border border-gray-800">
              <h3 className="text-xl font-semibold text-white mb-4">{dict.contact.serviceAreas.title}</h3>
              <div className="space-y-2 text-gray-300">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-orange-500" />
                  <span>Istanbul - Beyoğlu</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-orange-500" />
                  <span>Istanbul - Şişli</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-orange-500" />
                  <span>Istanbul - Beşiktaş</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-orange-500" />
                  <span>Istanbul - Kadıköy</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
