'use client'

import React, { useState } from 'react'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'
import Image from 'next/image'
import { SiteSettings } from './types'

interface ContactFormData {
  name: string
  email: string
  phone: string
  message: string
}

interface ContactSectionProps {
  siteSettings: SiteSettings
}

const ContactSection: React.FC<ContactSectionProps> = ({ siteSettings }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('Form submitted:', formData)

    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
    })
  }

  return (
    <section
      id="contact"
      className="relative py-20 md:py-32 overflow-hidden md:bg-transparent bg-[#0D0D0D]"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={siteSettings.heroBackgroundImage}
          alt="Contact Background"
          fill
          className="object-cover"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/80"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="text-accent text-lg md:text-xl font-semibold tracking-widest">
                KAPCSOLAT
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-balance text-white">
                Foglalj időpontot most
              </h2>
              <p className="text-lg text-white/60 leading-relaxed">
                Hívj fel vagy küldj üzenetet - szívesen segítünk az autód szépítésében.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="font-semibold text-white">Telefon</p>
                  <a
                    href={`tel:${siteSettings.phone}`}
                    className="text-accent hover:text-accent/80"
                  >
                    {siteSettings.phone}
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="font-semibold text-white">Email</p>
                  <a
                    href={`mailto:${siteSettings.email}`}
                    className="text-accent hover:text-accent/80"
                  >
                    {siteSettings.email}
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="font-semibold text-white">Cím</p>
                  <p className="text-white/60">{siteSettings.address}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="font-semibold text-white">Nyitva tartás</p>
                  <p className="text-white/60">H-P: 08:00-20:00</p>
                  <p className="text-white/60">Sz: 10:00-18:00</p>
                  <p className="text-white/60">V: Zárva</p>
                </div>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-6 bg-[#1A1A1A] p-8 rounded-lg border border-white/10"
          >
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-white mb-2">
                Név
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-[#0D0D0D] border border-white/20 rounded-sm text-white placeholder-white/50 focus:border-accent focus:outline-none transition"
                placeholder="Teljes név"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-white mb-2">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-[#0D0D0D] border border-white/20 rounded-sm text-white placeholder-white/50 focus:border-accent focus:outline-none transition"
                placeholder="email@example.com"
                required
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-white mb-2">
                Telefon
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-[#0D0D0D] border border-white/20 rounded-sm text-white placeholder-white/50 focus:border-accent focus:outline-none transition"
                placeholder="06 70 XXX XXXX"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-white mb-2">
                Üzenet
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-[#0D0D0D] border border-white/20 rounded-sm text-white placeholder-white/50 focus:border-accent focus:outline-none transition resize-none h-32"
                placeholder="Írd le az autód típusát és az igényeidet..."
                required
              />
            </div>

            <button
              type="submit"
              className="w-full px-6 py-4 bg-accent text-white font-semibold rounded-sm hover:bg-accent/90 transition"
            >
              Üzenet küldése
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
