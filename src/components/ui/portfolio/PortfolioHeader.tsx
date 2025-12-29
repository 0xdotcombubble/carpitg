import React from 'react'

export function PortfolioHeader() {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12">
      <div className="flex items-center gap-3 mb-4">
        <span className="w-2 h-2 bg-accent"></span>
        <span className="text-accent/80 font-medium tracking-widest text-xs uppercase">
          PORTFÓLIÓ
        </span>
        <span className="w-2 h-2 bg-accent"></span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">Kiváló Munkáink</h2>
        <p className="text-white/70 leading-relaxed">
          Büszkék vagyunk minden elvégzett munkánkra. Húzd el a kártyát bármelyik irányba, hogy lásd
          a következő projektet.
        </p>
      </div>
    </div>
  )
}
