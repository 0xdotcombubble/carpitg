import React from 'react'
import { ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { SiteSettings } from './types'
import { HeroVideoBackground } from './HeroVideoBackground'

interface HeroProps {
  siteSettings: SiteSettings
}

// Server Component - fast rendering with static content
const Hero: React.FC<HeroProps> = ({ siteSettings }) => {
  return (
    <section className="relative h-screen overflow-hidden bg-black">
      {/* Background Video - Client Component (non-blocking) */}
      <HeroVideoBackground />

      {/* Premium gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-br from-black/60 via-black/40 to-black/70 z-10"></div>
      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent z-10"></div>

      <div className="flex items-center justify-center h-full py-8 md:py-12 px-4 sm:px-6 md:px-12 relative z-20">
        <div className="max-w-6xl w-full flex flex-col items-center justify-center gap-3 md:gap-6 text-center">
          {/* Enhanced typography with luxury spacing */}
          <div className="space-y-2 md:space-y-3">
            <div className="space-y-1 md:space-y-2">
              <div className="text-accent/80 font-medium tracking-[0.2em] text-xs sm:text-sm md:text-base uppercase mb-1 md:mb-2">
                {siteSettings.heroTitle}
              </div>

              {/* Logo */}
              <div className="flex justify-center mb-2 md:mb-3">
                <Image
                  src={siteSettings.heroLogo}
                  alt="CarPit Garage Logo"
                  width={256}
                  height={256}
                  sizes="(max-width: 640px) 112px, (max-width: 768px) 144px, (max-width: 1024px) 192px, (max-width: 1280px) 224px, 256px"
                  priority
                  unoptimized={siteSettings.heroLogo.endsWith('.svg')}
                  className="h-28 sm:h-36 md:h-48 lg:h-56 xl:h-64 w-auto object-contain brightness-0 saturate-100 logo-accent-filter"
                />
              </div>
            </div>

            <div className="w-16 md:w-24 h-px bg-linear-to-r from-transparent via-accent to-transparent mx-auto"></div>

            <div className="text-white/80 font-light tracking-[0.15em] text-sm md:text-lg lg:text-xl uppercase">
              {siteSettings.heroSubtitle}
            </div>
          </div>

          {/* Description */}
          <p className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed max-w-3xl font-light tracking-wide px-4">
            {siteSettings.heroDescription}
          </p>

          {/* Call-to-action buttons */}
          <div className="flex flex-col w-full max-w-md mx-auto gap-3 sm:max-w-none sm:flex-row sm:justify-center sm:gap-4 mt-2 md:mt-3 px-4">
            <a
              href={`tel:${siteSettings.phone}`}
              className="group px-8 sm:px-10 py-4 sm:py-5 bg-accent text-white font-semibold text-base sm:text-lg border-2 border-accent hover:bg-transparent hover:text-accent transition-all duration-300 flex items-center justify-center gap-3 shadow-2xl hover:shadow-accent/20 w-full sm:w-auto"
            >
              <span>Kapcsolat</span>
              <ChevronRight
                size={18}
                className="group-hover:translate-x-1 transition-transform duration-300"
              />
            </a>
            <a
              href="#portfolio"
              className="px-8 sm:px-10 py-4 sm:py-5 text-white font-medium text-base sm:text-lg hover:bg-white/5 transition-all duration-300 border-2 border-white/30 hover:border-white/60 backdrop-blur-sm w-full sm:w-auto"
            >
              Portfólió
            </a>
            <a
              href="#services"
              className="px-8 sm:px-10 py-4 sm:py-5 text-white font-medium text-base sm:text-lg hover:bg-white/5 transition-all duration-300 border-2 border-white/30 hover:border-white/60 backdrop-blur-sm w-full sm:w-auto"
            >
              Szolgáltatások
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
