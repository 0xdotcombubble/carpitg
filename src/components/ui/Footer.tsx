'use client'

import React from 'react'
import Image from 'next/image'
import { Facebook, Instagram } from 'lucide-react'
import { SiteSettings } from './types'

interface FooterProps {
  siteSettings: SiteSettings
}

const Footer: React.FC<FooterProps> = ({ siteSettings }) => {
  return (
    <footer className="relative border-t border-white/10 py-12 md:py-16 bg-[#0D0D0D]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12 text-center md:text-left">
          <div>
            <div className="flex justify-center md:justify-start mb-4">
              <Image
                src={siteSettings.heroLogo || '/logo.svg'}
                alt="CarPit Garage Logo"
                width={64}
                height={64}
                unoptimized={siteSettings.heroLogo?.endsWith('.svg')}
                className="h-12 sm:h-14 md:h-16 w-auto object-contain brightness-0 saturate-100"
                style={{
                  filter:
                    'invert(27%) sepia(96%) saturate(5471%) hue-rotate(355deg) brightness(104%) contrast(94%)',
                }}
              />
            </div>
            <p className="text-white/60">
              Professzionális autókozmetika és detailing. Az autód megérdemli a legjobbat -
              precizitás, gondosság és minőség.
            </p>
            <div className="flex justify-center md:justify-start gap-4 mt-6">
              <a
                href={siteSettings.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-accent/80 transition"
              >
                <Instagram size={20} />
              </a>
              <a
                href={siteSettings.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-accent/80 transition"
              >
                <Facebook size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Szolgáltatások</h4>
            <ul className="space-y-2 text-white/60">
              <li>
                <a href="#services" className="hover:text-accent transition">
                  Polírozás
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-accent transition">
                  Kerámia bevonat
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-accent transition">
                  Kárpittisztítás
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-accent transition">
                  Nano bevonat
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Cég</h4>
            <ul className="space-y-2 text-white/60">
              <li>
                <a href="#portfolio" className="hover:text-accent transition">
                  Portfólió
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-accent transition">
                  Árlista
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-accent transition">
                  Szolgáltatások
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-accent transition">
                  Kapcsolat
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Elérhetőség</h4>
            <ul className="space-y-2 text-white/60">
              <li>
                <a href={`tel:${siteSettings.phone}`} className="hover:text-accent transition">
                  {siteSettings.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${siteSettings.email}`} className="hover:text-accent transition">
                  {siteSettings.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between md:items-center text-white/60 text-sm">
          <p className="text-center md:text-left">
            &copy; 2025 Carpit Garage. Minden jog fenntartva.
          </p>
          <div className="flex justify-center md:justify-end gap-6 mt-4 md:mt-0">
            <a href="/adatvedelem" className="hover:text-accent transition">
              Adatvédelem
            </a>
            <a href="/aszf" className="hover:text-accent transition">
              ÁSZF
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
