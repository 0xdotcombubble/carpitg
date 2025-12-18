'use client'

import React, { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Check } from 'lucide-react'
import { PricingItem, SiteSettings } from './types'

interface PricingSectionProps {
  pricingItems?: PricingItem[]
  siteSettings: SiteSettings
}

const PricingSection: React.FC<PricingSectionProps> = ({ pricingItems = [], siteSettings }) => {
  const [isClient, setIsClient] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [scrollY, setScrollY] = useState(0)
  const containerRef = useRef<HTMLElement>(null)

  const getItemScale = (index: number): number => {
    if (!isClient || isMobile) {
      return 1 - index * 0.002
    }

    const targetScale = 1 - index * 0.005
    const range = index * 0.15
    const progress = Math.max(0, Math.min(1, (scrollProgress - range) / (1 - range)))
    return 1 - progress * (1 - targetScale)
  }

  const handleScroll = () => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const containerHeight = containerRef.current.offsetHeight
    const windowHeight = window.innerHeight

    const start = -rect.top
    setScrollProgress(Math.max(0, Math.min(1, start / (containerHeight - windowHeight))))
    setScrollY(window.pageYOffset)
  }

  useEffect(() => {
    setIsClient(true)

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('resize', checkMobile)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const parallaxY = !isClient || isMobile ? 0 : scrollY * 0.5

  return (
    <section ref={containerRef} id="pricing" className="relative md:bg-transparent bg-[#0D0D0D]">
      {/* Header Section */}
      <div className="py-24 md:py-32 relative overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 w-full h-full"
          style={
            !isClient || isMobile
              ? undefined
              : { transform: `translateY(${parallaxY}px)`, height: '120%' }
          }
        >
          <Image
            src={siteSettings.heroBackgroundImage}
            alt="Background"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/70 z-1"></div>
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <div className="space-y-4 mb-16 text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="w-2 h-2 bg-accent rounded-full"></span>
              <span className="text-accent/80 font-medium tracking-widest text-sm uppercase">
                ÁRLISTA
              </span>
              <span className="w-2 h-2 bg-accent rounded-full"></span>
            </div>

            <h2 className="text-4xl md:text-6xl font-bold text-balance">
              <span className="text-white">Transzparens </span>
              <span className="text-accent">Árképzés</span>
            </h2>

            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Válassz a csomagjaink közül - mindegyik tartalmazza az anyagköltséget és a munkadíjat.
            </p>
          </div>
        </div>
      </div>

      {/* Cards Parallax Section */}
      <div className="relative">
        {pricingItems.map((item, i) => {
          const scale = getItemScale(i)
          return (
            <div
              key={item.slug}
              style={{
                transform: `scale(${scale})`,
                top: !isClient || isMobile ? `${i * 20}px` : `calc(-2vh + ${i * 25}px)`,
              }}
              className={`flex ${
                !isClient || isMobile ? 'min-h-[450px]' : 'md:h-screen'
              } items-center justify-center sticky`}
            >
              <div className="max-w-4xl mx-auto px-4 md:px-8 w-full">
                <div
                  className={`relative bg-[#1A1A1A] border border-white/10 hover:border-accent transition-all duration-500 overflow-hidden ${
                    i % 2 === 0 ? 'md:rotate-[0.5deg]' : 'md:-rotate-[0.5deg]'
                  } group cursor-pointer`}
                >
                  {/* Corner accent element */}
                  <div className="absolute top-6 right-6 z-10">
                    <div className="w-12 h-12 border-2 border-accent/30 group-hover:border-accent/60 transition-all duration-500 flex items-center justify-center">
                      <div className="w-6 h-6 bg-accent/20 group-hover:bg-accent/40 transition-all duration-500"></div>
                    </div>
                  </div>

                  {item.metadata.popular && (
                    <div className="absolute bottom-6 left-6 z-10">
                      <span className="px-3 py-1 bg-accent text-white text-sm font-medium rounded-full">
                        NÉPSZERŰ
                      </span>
                    </div>
                  )}

                  <div
                    className={`${
                      !isClient || isMobile ? 'p-6 min-h-[400px]' : 'p-8 lg:p-12 min-h-[550px]'
                    } flex flex-col justify-between`}
                  >
                    <div className="flex-1 flex flex-col justify-center">
                      <div className="mb-4">
                        <span className="text-accent text-sm font-medium tracking-wide uppercase">
                          {item.metadata.category}
                        </span>
                      </div>

                      <h3 className="text-3xl lg:text-5xl font-bold text-white mb-4">
                        {item.metadata.title}
                      </h3>

                      <p className="text-white/60 mb-6 text-lg">{item.metadata.description}</p>

                      <div className="flex items-baseline gap-2 mb-8">
                        <p className="text-5xl lg:text-6xl font-bold text-accent">
                          {item.metadata.price}
                        </p>
                        {item.metadata.duration && (
                          <span className="text-white/50 text-sm">/ {item.metadata.duration}</span>
                        )}
                      </div>

                      {/* Feature list */}
                      <div className="space-y-4 grow mb-8">
                        {item.metadata.features.map((feature, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <Check className="w-6 h-6 text-accent shrink-0 mt-0.5" />
                            <span className="text-white text-lg">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTA button */}
                    <div className="mt-8">
                      <Link
                        href={`/pricing/${item.slug}`}
                        className="w-full py-4 px-8 bg-accent text-white font-semibold text-lg hover:bg-accent/90 transition-all duration-300 text-center block relative overflow-hidden group"
                      >
                        <span className="relative z-10">Részletek</span>
                      </Link>
                    </div>

                    {/* Hover glow effect */}
                    <div className="absolute inset-0 bg-accent/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-400"></div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Footer Section */}
      <div className="py-24 md:py-32 relative">
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative">
          <div className="p-8 rounded-lg bg-[#1A1A1A] border border-accent/30 relative overflow-hidden">
            <p className="text-center text-white text-lg relative z-10">
              Az árak átlagosan szennyezett, 5 személyes gépjárművekre vonatkoznak. Munkás autók,
              extrán szennyezett autók esetében az ár eltérhet.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PricingSection
