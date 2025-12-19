import React from 'react'
import Link from 'next/link'
import { Check } from 'lucide-react'
import { PricingItem } from './types'

interface PricingSectionProps {
  pricingItems?: PricingItem[]
}

const PricingSection: React.FC<PricingSectionProps> = ({ pricingItems = [] }) => {
  return (
    <section id="pricing" className="relative bg-[#0D0D0D]">
      {/* Header Section */}
      <div className="py-24 md:py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative">
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
        {pricingItems.map((item, i) => (
          <div
            key={item.slug}
            style={{
              top: `calc(-2vh + ${i * 25}px)`,
            }}
            className="flex md:h-screen min-h-112.5 items-center justify-center sticky"
          >
            <div className="max-w-4xl mx-auto px-4 md:px-8 w-full">
              <Link href={`/pricing/${item.slug}`} className="block">
                <div
                  className={`group relative bg-[#1A1A1A] border border-white/10 hover:border-accent/50 transition-all duration-500 overflow-hidden shadow-lg hover:shadow-xl cursor-pointer ${
                    i % 2 === 0 ? 'md:rotate-[0.5deg]' : 'md:-rotate-[0.5deg]'
                  }`}
                >
                  {/* Corner accent element */}
                  <div className="absolute top-6 right-6">
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

                  <div className="p-6 md:p-8 lg:p-12 min-h-137.5 flex flex-col justify-between relative">
                    <div className="flex-1 flex flex-col justify-center pr-16 pb-16">
                      <div className="mb-4">
                        <span className="text-accent text-sm font-medium tracking-wide uppercase">
                          {item.metadata.category}
                        </span>
                      </div>

                      <h3 className="text-3xl lg:text-5xl font-bold text-white mb-4 group-hover:text-accent transition-colors duration-300">
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

                    {/* Arrow element */}
                    <div className="absolute bottom-6 right-6 w-10 h-10 border border-accent/50 text-accent hover:bg-accent hover:text-white transition-all duration-300 flex items-center justify-center z-20">
                      <span className="text-xl transform group-hover:rotate-45 transition-transform duration-300">
                        →
                      </span>
                    </div>
                  </div>

                  {/* Hover glow effect */}
                  <div className="absolute inset-0 bg-linear-to-t from-accent/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                  <div className="absolute bottom-0 right-0 w-32 h-32 border-t-2 border-l-2 border-accent/20 group-hover:border-accent/40 transition-colors duration-500"></div>
                </div>
              </Link>
            </div>
          </div>
        ))}
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
