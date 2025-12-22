import React from 'react'

export function PortfolioFooter() {
  return (
    <div className="py-16 sm:py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative">
        <div className="bg-linear-to-r from-[#1A1A1A]/20 to-[#1A1A1A]/10 border border-white/10 p-6 sm:p-8 lg:p-12 backdrop-blur-sm relative overflow-hidden rounded-xl sm:rounded-2xl">
          <h3 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-3 sm:mb-4">
            Inspirálódj munkáinkból!
          </h3>

          <p className="text-sm sm:text-base text-white/70 font-light leading-relaxed mb-6 sm:mb-8">
            Minden autó egyedi történet. Nézd meg, hogyan változtattuk át ügyfeleink járműveit
            valódi ékszerekké.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <a
              href="#contact"
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-accent text-white font-semibold hover:bg-accent/90 transition-colors duration-300 relative overflow-hidden group text-center rounded-lg"
            >
              <span className="relative z-10">Kérj Ajánlatot</span>
            </a>

            <a
              href="tel:+36703339809"
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border border-white/30 text-white hover:border-accent hover:text-accent font-medium transition-all duration-300 flex items-center justify-center gap-2 rounded-lg"
            >
              <span>+36 70 333 9809</span>
              <span>📞</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
