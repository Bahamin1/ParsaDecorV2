"use client"

import { getDictionary } from "../dictionaries"
import Image from "next/image"
import AnimatedSection from "@/components/animated-section"
import { useEffect, useState } from "react"

export default function AboutPageClient({ lang }: { lang: string }) {
  const [dict, setDict] = useState<any>(null)

  useEffect(() => {
    const loadDictionary = async () => {
      const dictionary = await getDictionary(lang as "en" | "tr" | "fa")
      setDict(dictionary)
    }

    loadDictionary()
  }, [lang])

  if (!dict) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <AnimatedSection className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-[#1E1E1E] mb-6">{dict.about.title}</h1>
            <p className="text-xl text-gray-600 mb-8">{dict.about.subtitle}</p>
            <p className="text-lg text-gray-700 leading-relaxed">{dict.about.description}</p>
          </div>
        </div>
      </AnimatedSection>

      {/* Team Image */}
      <AnimatedSection className="py-20 bg-[#F2F2F2]">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden mb-12">
              <Image
                src="/placeholder.svg?height=500&width=1200"
                alt="Parsa Decor Team"
                fill
                className="object-cover"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold text-[#1E1E1E] mb-6">{dict.about.mission.title}</h2>
                <p className="text-lg text-gray-700 leading-relaxed">{dict.about.mission.description}</p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-[#1E1E1E] mb-6">{dict.about.team.title}</h2>
                <p className="text-lg text-gray-700 leading-relaxed">{dict.about.team.description}</p>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  )
}
