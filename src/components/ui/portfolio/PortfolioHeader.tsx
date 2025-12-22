import React from 'react'

export function PortfolioHeader() {
  return (
    <div className="py-16 sm:py-24 md:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative">
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-accent rounded-full"></span>
            <span className="text-accent/80 font-medium tracking-wider text-xs sm:text-sm uppercase">
              Portfólió
            </span>
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-accent rounded-full"></span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[0.9] mb-4 sm:mb-6">
            Kiváló Munkáink
          </h2>

          <p className="text-base sm:text-lg text-white/70 font-light leading-relaxed max-w-2xl mx-auto px-4">
            Büszkék vagyunk minden elvégzett munkánkra.{' '}
            <span className="md:hidden">
              Húzd el a kártyát bármelyik irányba, hogy lásd a következő projektet.
            </span>
            <span className="hidden md:inline">Tekintsd meg legjobb munkáinkat.</span>
          </p>

          <div className="w-24 sm:w-32 h-0.5 bg-linear-to-r from-transparent via-accent to-transparent mx-auto mt-6 sm:mt-8"></div>
        </div>
      </div>
    </div>
  )
}
