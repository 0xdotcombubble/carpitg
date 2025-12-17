import React from 'react'
import { notFound } from 'next/navigation'
import { getServiceBySlug, getServices } from '@/lib/getPageData'
import Image from 'next/image'
import Link from 'next/link'

// Generate static params for all services
export async function generateStaticParams() {
  const services = await getServices()
  return services.map((service) => ({
    slug: service.slug,
  }))
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = await getServiceBySlug(slug)

  if (!service) {
    return {
      title: 'Service Not Found',
    }
  }

  return {
    title: `${service.metadata.title} - CarPit Garage`,
    description: service.metadata.description,
  }
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = await getServiceBySlug(slug)

  if (!service) {
    notFound()
  }

  const { metadata } = service

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="relative h-[40vh] min-h-[300px] bg-linear-to-t from-background to-background/80">
        {metadata.image && (
          <Image
            src={metadata.image}
            alt={metadata.title}
            fill
            className="object-cover opacity-20"
            priority
          />
        )}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{metadata.title}</h1>
            <p className="text-xl text-white/70">{metadata.category}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Description */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Részletek</h2>
          <p className="text-white/80 text-lg leading-relaxed">{metadata.description}</p>
        </div>

        {/* Price */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Ár</h2>
          <p className="text-3xl font-bold text-accent">{metadata.price}</p>
        </div>

        {/* Features */}
        {metadata.features && metadata.features.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Mit tartalmaz?</h2>
            <ul className="space-y-3">
              {metadata.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <svg
                    className="w-6 h-6 text-accent mr-3 mt-0.5 flex-shrink-0"
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

        {/* CTA */}
        <div className="border-t border-white/10 pt-12">
          <div className="bg-white/5 rounded-lg p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Érdekel ez a szolgáltatás?</h3>
            <p className="text-white/70 mb-6">
              Vedd fel velünk a kapcsolatot időpont egyeztetéshez
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+36703339809"
                className="inline-block bg-accent text-white px-8 py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors"
              >
                Hívj most
              </a>
              <Link
                href="/#contact"
                className="inline-block border border-white/20 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/5 transition-colors"
              >
                Üzenet küldése
              </Link>
            </div>
          </div>
        </div>

        {/* Back link */}
        <div className="mt-12 text-center">
          <Link
            href="/#services"
            className="text-accent hover:text-accent/80 transition-colors inline-flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Vissza a szolgáltatásokhoz
          </Link>
        </div>
      </div>
    </div>
  )
}
