import React from 'react'

export function PricingHeader() {
  return (
    <div className="mb-12">
      <div className="flex items-center gap-3 mb-4">
        <span className="w-2 h-2 bg-accent"></span>
        <span className="text-accent/80 font-medium tracking-widest text-xs uppercase">
          ÁRLISTA
        </span>
        <span className="w-2 h-2 bg-accent"></span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
          Külső - Belső csomag ajánlatok
        </h2>
        <p className="text-white/70 leading-relaxed">
          Válassz a csomagjaink közül - mindegyik tartalmazza az anyagköltséget és a munkadíjat.
        </p>
      </div>
    </div>
  )
}
