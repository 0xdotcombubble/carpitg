'use client'

import React, { useEffect, useState, useRef } from 'react'
import { ServiceItem, SiteSettings } from './types'

interface ServicesSectionProps {
  siteSettings: SiteSettings
  services?: ServiceItem[]
}

const ServicesSection: React.FC<ServicesSectionProps> = ({ siteSettings, services = [] }) => {
  const [isMobile, setIsMobile] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [_scrollY, _setScrollY] = useState(0)
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    setIsClient(true)

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    const handleScroll = () => {
      _setScrollY(window.pageYOffset)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('resize', checkMobile)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const getCardScale = (index: number): number => {
    if (!isClient || isMobile) {
      return 1 - index * 0.002
    }

    const containerRect = containerRef.current?.getBoundingClientRect()
    const scrollProgress = containerRect
      ? Math.max(
          0,
          Math.min(
            1,
            (window.innerHeight - containerRect.top) /
              (window.innerHeight + containerRect.height)
          )
        )
      : 0

    const targetScale = 1 - index * 0.005
    const range = [index * 0.15, 1]
    const progress = Math.max(
      0,
      Math.min(1, (scrollProgress - range[0]) / (range[1] - range[0]))
    )
    return 1 + progress * (targetScale - 1)
  }

  const getCardTop = (index: number): string => {
    return isMobile ? `${index * 20}px` : `calc(-2vh + ${index * 25}px)`
  }

  return (
    <section ref={containerRef} id="services" className="relative md:bg-transparent bg-background">
      {/* Header Section */}
      <div className="py-24 md:py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative">
          <div className="mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-accent rounded-full"></span>
                  <span className="text-accent/80 font-medium tracking-wider text-sm uppercase">
                    Szolgáltatások
                  </span>
                </div>
                <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[0.9]">
                  {siteSettings.servicesTitle}
                </h2>
              </div>
              <div className="lg:text-right">
                <p className="text-lg text-white/70 font-light leading-relaxed max-w-lg lg:ml-auto">
                  {siteSettings.servicesSubtitle}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cards Parallax Section */}
      <div className="relative">
        {services.map((service, i) => (
          <div
            key={service.slug}
            style={{
              transform: `scale(${getCardScale(i)})`,
              top: getCardTop(i)
            }}
            className={`flex ${
              isMobile ? 'min-h-[400px]' : 'md:h-screen'
            } items-center justify-center sticky`}
          >
            <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
              <a href={`/services/${service.metadata.slug}`} className="block">
                <div
                  className={`group relative bg-[#1A1A1A] border border-white/20 hover:border-accent/50 transition-all duration-500 overflow-hidden shadow-lg hover:shadow-xl cursor-pointer ${
                    isMobile
                      ? 'mx-4'
                      : i % 2 === 0
                        ? 'md:rotate-[0.5deg]'
                        : 'md:-rotate-[0.5deg]'
                  }`}
                >
                  {/* Corner accent element */}
                  <div className="absolute top-6 right-6">
                    <div className="w-12 h-12 border-2 border-accent/30 group-hover:border-accent/60 transition-all duration-500 flex items-center justify-center">
                      <div className="w-6 h-6 bg-accent/20 group-hover:bg-accent/40 transition-all duration-500"></div>
                    </div>
                  </div>

                  <div
                    className={`flex flex-col justify-between ${
                      isMobile
                        ? 'p-4 min-h-[300px]'
                        : 'p-6 md:p-8 lg:p-12 min-h-[400px]'
                    }`}
                  >
                    <div className="flex-1 flex flex-col justify-center">
                      <h3 className="font-display text-2xl lg:text-4xl font-bold text-white mb-4 group-hover:text-accent transition-colors duration-300">
                        {service.metadata.title}
                      </h3>
                      <div className="w-16 h-[2px] bg-gradient-to-r from-accent to-accent/30 mb-4 group-hover:w-24 transition-all duration-500"></div>
                      <p className="text-white/70 font-light leading-relaxed text-base lg:text-lg mb-6">
                        {service.metadata.description}
                      </p>
                    </div>

                    <div className="mt-6">
                      <div className="bg-accent/10 px-4 py-2 border border-accent/20 backdrop-blur-sm inline-block mb-4">
                        <span className="text-accent font-semibold text-sm tracking-wide">
                          {service.metadata.price}
                        </span>
                      </div>
                    </div>

                    <div className="mt-6">
                      <div className="absolute bottom-6 right-6 w-10 h-10 border border-accent/50 text-accent hover:bg-accent hover:text-white transition-all duration-300 flex items-center justify-center">
                        <span className="text-xl transform group-hover:rotate-45 transition-transform duration-300">
                          →
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-accent/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                  <div className="absolute bottom-0 right-0 w-32 h-32 border-t-2 border-l-2 border-accent/20 group-hover:border-accent/40 transition-colors duration-500"></div>
                </div>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Section */}
      <div className="py-24 md:py-32 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative">
          <div className="bg-gradient-to-r from-card/30 to-card/10 border border-white/10 p-8 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="font-display text-2xl lg:text-3xl font-bold text-white mb-4">
                  Egyedi igények?
                </h3>
                <p className="text-white/70 font-light leading-relaxed">
                  Minden autó különleges. Kérj személyre szabott ajánlatot, hogy autód a
                  legjobb kezelést kapja.
                </p>
              </div>
              <div className="lg:text-right">
                <a
                  href={`tel:${siteSettings.phone}`}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-accent text-white font-semibold tracking-wide hover:bg-accent/90 transition-colors duration-300"
                >
                  <span>Ajánlatkérés</span>
                  <span className="text-xl">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ServicesSection