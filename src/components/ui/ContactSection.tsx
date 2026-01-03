'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Mail, Phone, MapPin, Clock, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import Image from 'next/image'
import { SiteSettings } from './types'
import { blurDataURLs } from '@/lib/blurDataURL'

interface ContactFormData {
  name: string
  email: string
  phone: string
  message: string
}

interface ContactSectionProps {
  siteSettings: SiteSettings
}

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error'

declare global {
  interface Window {
    turnstile?: {
      render: (
        element: HTMLElement,
        options: {
          sitekey: string
          callback: (token: string) => void
          'error-callback': () => void
          theme?: 'light' | 'dark'
          size?: 'normal' | 'compact'
        },
      ) => string
      reset: (widgetId: string) => void
      remove: (widgetId: string) => void
    }
  }
}

const ContactSection = React.memo<ContactSectionProps>(({ siteSettings }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle')
  const [statusMessage, setStatusMessage] = useState<string>('')
  const [turnstileToken, setTurnstileToken] = useState<string>('')
  const turnstileRef = useRef<HTMLDivElement>(null)
  const turnstileWidgetId = useRef<string>('')

  // Load Turnstile script
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js'
    script.async = true
    script.defer = true
    script.onload = () => {
      if (turnstileRef.current && window.turnstile) {
        turnstileWidgetId.current = window.turnstile.render(turnstileRef.current, {
          sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '',
          callback: (token: string) => {
            setTurnstileToken(token)
          },
          'error-callback': () => {
            setTurnstileToken('')
            setStatusMessage('Bot ellenőrzési hiba történt. Kérjük, frissítsd az oldalt.')
            setSubmitStatus('error')
          },
          theme: 'dark',
          size: 'normal',
        })
      }
    }
    document.head.appendChild(script)

    return () => {
      if (window.turnstile && turnstileWidgetId.current) {
        window.turnstile.remove(turnstileWidgetId.current)
      }
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!turnstileToken) {
      setStatusMessage('Kérjük, végezd el a bot ellenőrzést.')
      setSubmitStatus('error')
      return
    }

    setSubmitStatus('submitting')
    setStatusMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          turnstileToken,
        }),
      })

      const data = (await response.json()) as {
        success?: boolean
        message?: string
        error?: string
      }

      if (!response.ok) {
        throw new Error(data.error || 'Hiba történt az üzenet küldése közben')
      }

      setSubmitStatus('success')
      setStatusMessage(data.message || 'Üzeneted sikeresen elküldve!')

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
      })

      // Reset Turnstile
      if (window.turnstile && turnstileWidgetId.current) {
        window.turnstile.reset(turnstileWidgetId.current)
      }
      setTurnstileToken('')

      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle')
        setStatusMessage('')
      }, 5000)
    } catch (error) {
      setSubmitStatus('error')
      setStatusMessage(
        error instanceof Error ? error.message : 'Hiba történt az üzenet küldése közben',
      )

      // Reset Turnstile on error
      if (window.turnstile && turnstileWidgetId.current) {
        window.turnstile.reset(turnstileWidgetId.current)
      }
      setTurnstileToken('')
    }
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
          sizes="100vw"
          className="object-cover"
          placeholder="blur"
          blurDataURL={blurDataURLs.dark}
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
            className="space-y-6 bg-[#1A1A1A] p-8 border border-white/10"
          >
            {statusMessage && (
              <div
                className={`p-4 flex items-start gap-3 ${
                  submitStatus === 'success'
                    ? 'bg-green-500/10 border border-green-500/20'
                    : 'bg-red-500/10 border border-red-500/20'
                }`}
              >
                {submitStatus === 'success' ? (
                  <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                )}
                <p
                  className={`text-sm ${
                    submitStatus === 'success' ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {statusMessage}
                </p>
              </div>
            )}

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
                className="w-full px-4 py-3 bg-[#0D0D0D] border border-white/20 text-white placeholder-white/50 focus:border-accent focus:outline-none transition"
                placeholder="Teljes név"
                required
                disabled={submitStatus === 'submitting'}
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
                className="w-full px-4 py-3 bg-[#0D0D0D] border border-white/20 text-white placeholder-white/50 focus:border-accent focus:outline-none transition"
                placeholder="email@example.com"
                required
                disabled={submitStatus === 'submitting'}
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
                className="w-full px-4 py-3 bg-[#0D0D0D] border border-white/20 text-white placeholder-white/50 focus:border-accent focus:outline-none transition"
                placeholder="+36 00 XXX XXXX"
                disabled={submitStatus === 'submitting'}
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
                className="w-full px-4 py-3 bg-[#0D0D0D] border border-white/20 text-white placeholder-white/50 focus:border-accent focus:outline-none transition resize-none h-32"
                placeholder="Írd le az autód típusát és az igényeidet..."
                required
                disabled={submitStatus === 'submitting'}
              />
            </div>

            {/* Turnstile Widget */}
            <div ref={turnstileRef} className="flex justify-center"></div>

            <button
              type="submit"
              disabled={submitStatus === 'submitting' || !turnstileToken}
              className="w-full px-6 py-4 bg-accent text-white font-semibold hover:bg-accent/90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {submitStatus === 'submitting' ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Küldés...
                </>
              ) : (
                'Üzenet küldése'
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
})

ContactSection.displayName = 'ContactSection'

export default ContactSection
