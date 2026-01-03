import React from 'react'

export function ServicesHeader() {
  return (
    <div className="mb-16 md:mb-24">
      {/* Accent Label */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-[2px] bg-gradient-to-r from-accent to-transparent"></div>
        <span className="text-accent font-semibold tracking-[0.2em] text-xs uppercase">
          Szolgáltatások
        </span>
        <div className="w-12 h-[2px] bg-gradient-to-l from-accent to-transparent"></div>
      </div>

      {/* Title and Description */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-end">
        <div className="lg:col-span-3">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white leading-[1.1]">
            Egyedi
            <br className="hidden md:block" />
            <span className="text-accent"> Igények</span>
          </h2>
        </div>
        <div className="lg:col-span-2">
          <p className="text-white/60 leading-relaxed text-base md:text-lg">
            Csomagok és szolgáltatások, amelyek megfelelnek az egyedi igényeknek és
            követelményeknek.
          </p>
        </div>
      </div>

      {/* Decorative Line */}
      <div className="mt-8 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
    </div>
  )
}
