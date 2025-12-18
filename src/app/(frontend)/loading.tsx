import React from 'react'
import Image from 'next/image'
import { getSiteSettings } from '@/lib/getPageData'

export default async function Loading() {
  // Fetch only the site settings for the logo
  const siteSettings = await getSiteSettings()

  return (
    <div className="fixed inset-0 bg-background z-50 flex items-center justify-center">
      {/* Background with subtle gradient */}
      <div className="absolute inset-0 bg-linear-to-br from-black/60 via-black/40 to-black/70"></div>
      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent"></div>

      {/* Content matching Hero layout */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-3 md:gap-6 text-center px-4">
        <div className="space-y-2 md:space-y-3">
          <div className="space-y-1 md:space-y-2">
            {/* Title */}
            <div className="text-accent/80 font-medium tracking-[0.2em] text-xs sm:text-sm md:text-base uppercase mb-1 md:mb-2">
              {siteSettings.heroTitle}
            </div>

            {/* Logo with pulse animation */}
            <div className="flex justify-center mb-2 md:mb-3">
              <div className="animate-pulse">
                <Image
                  src={siteSettings.heroLogo}
                  alt="CarPit Garage Logo"
                  width={256}
                  height={256}
                  priority
                  unoptimized={siteSettings.heroLogo.endsWith('.svg')}
                  className="h-28 sm:h-36 md:h-48 lg:h-56 xl:h-64 w-auto object-contain brightness-0 saturate-100"
                  style={{
                    filter:
                      'invert(27%) sepia(96%) saturate(5471%) hue-rotate(355deg) brightness(104%) contrast(94%)',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Loading indicator */}
          <div className="flex items-center justify-center gap-2 mt-8">
            <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    </div>
  )
}
