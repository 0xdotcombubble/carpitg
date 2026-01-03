import React from 'react'
import { notFound } from 'next/navigation'
import { getPricingBySlug, getPricing } from '@/lib/getPageData'
import Image from 'next/image'
import Link from 'next/link'
import { BackNavigation } from '@/components/ui/BackNavigation'

// Enable dynamic params (allows routes not in generateStaticParams)
export const dynamicParams = true

// Revalidate every hour (ISR)
export const revalidate = 3600

// Generate static params for all pricing items
export async function generateStaticParams() {
  try {
    const pricing = await getPricing()
    return pricing.map((item) => ({
      slug: item.slug,
    }))
  } catch (error) {
    console.error('Error generating static params for pricing:', error)
    return []
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const item = await getPricingBySlug(slug)

  if (!item) {
    return {
      title: 'Package Not Found',
    }
  }

  return {
    title: `${item.metadata.title} - CarPit Garage Árak`,
    description: item.metadata.description,
  }
}

export default async function PricingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const item = await getPricingBySlug(slug)

  if (!item) {
    notFound()
  }

  const { metadata } = item

  return (
    <div className="min-h-screen bg-background">
      {/* Back Navigation */}
      <BackNavigation href="/#pricing" label="Vissza az árakhoz" />

      {/* Header */}
      <div className="relative h-[40vh] min-h-[300px] bg-linear-to-t from-background to-background/80">
        {metadata.image && (
          <Image
            src={metadata.image}
            alt={metadata.title}
            fill
            sizes="100vw"
            className="object-cover opacity-20"
            priority
            quality={75}
          />
        )}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4">
            {metadata.popular && (
              <span className="inline-block bg-accent text-white px-4 py-1 rounded-full text-sm font-semibold mb-4">
                Népszerű választás
              </span>
            )}
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{metadata.title}</h1>
            <p className="text-xl text-white/70">{metadata.category}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Price and Duration */}
        <div className="bg-white/5 p-8 mb-12 text-center">
          <p className="text-5xl font-bold text-accent mb-2">{metadata.price}</p>
          {metadata.duration && <p className="text-white/60">Időtartam: {metadata.duration}</p>}
        </div>

        {/* Description */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Leírás</h2>
          <p className="text-white/80 text-lg leading-relaxed">{metadata.description}</p>
        </div>

        {/* Features */}
        {metadata.features && metadata.features.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Mit tartalmaz a csomag?</h2>
            <ul className="space-y-3">
              {metadata.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <svg
                    className="w-6 h-6 text-accent mr-3 mt-0.5 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-white/80">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Services included */}
        {metadata.services && metadata.services.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Szolgáltatások</h2>
            <div className="grid md:grid-cols-2 gap-3">
              {metadata.services.map((service, index) => (
                <div key={index} className="flex items-start bg-white/5 p-4">
                  <svg
                    className="w-5 h-5 text-accent mr-3 mt-0.5 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-white/80 text-sm">{service}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Vehicle Types */}
        {metadata.vehicleTypes && metadata.vehicleTypes.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">Alkalmas járművek</h2>
            <div className="flex flex-wrap gap-2">
              {metadata.vehicleTypes.map((type, index) => (
                <span key={index} className="bg-white/10 text-white px-4 py-2 text-sm">
                  {type}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Notes */}
        {metadata.notes && (
          <div className="mb-12">
            <div className="bg-accent/10 border border-accent/20 p-6">
              <h3 className="text-white font-semibold mb-2 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Fontos információ
              </h3>
              <p className="text-white/80 text-sm">{metadata.notes}</p>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="border-t border-white/10 pt-12">
          <div className="bg-white/5 p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Foglald le időpontodat még ma!</h3>
            <p className="text-white/70 mb-6">
              Hívj minket vagy írj üzenetet, és egyeztessük a részleteket
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+36703339809"
                className="inline-block bg-accent text-white px-8 py-3 font-semibold hover:bg-accent/90 transition-colors"
              >
                +36 70 333 9809
              </a>
              <Link
                href="/#contact"
                className="inline-block border border-white/20 text-white px-8 py-3 font-semibold hover:bg-white/5 transition-colors"
              >
                Üzenet küldése
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
