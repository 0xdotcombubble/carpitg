import React from 'react'
import { notFound } from 'next/navigation'
import { getPortfolioBySlug, getPortfolio } from '@/lib/getPageData'
import Image from 'next/image'
import Link from 'next/link'

// Enable dynamic params (allows routes not in generateStaticParams)
export const dynamicParams = true

// Generate static params for all portfolio items
export async function generateStaticParams() {
  try {
    const portfolio = await getPortfolio()
    return portfolio.map((item) => ({
      slug: item.slug,
    }))
  } catch (error) {
    console.error('Error generating static params for portfolio:', error)
    return []
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const item = await getPortfolioBySlug(slug)

  if (!item) {
    return {
      title: 'Portfolio Not Found',
    }
  }

  return {
    title: `${item.metadata.title} - CarPit Garage Portfolio`,
    description: item.metadata.description,
  }
}

export default async function PortfolioPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const item = await getPortfolioBySlug(slug)

  if (!item) {
    notFound()
  }

  const { metadata } = item

  return (
    <div className="min-h-screen bg-background">
      {/* Header with main image */}
      <div className="relative h-[60vh] min-h-[400px]">
        {metadata.image && (
          <Image src={metadata.image} alt={metadata.title} fill className="object-cover" priority />
        )}
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-6xl mx-auto">
            <p className="text-accent font-semibold mb-2">{metadata.category}</p>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{metadata.title}</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Description */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-6">A Projektről</h2>
          <p className="text-white/80 text-lg leading-relaxed max-w-3xl">{metadata.description}</p>
        </div>

        {/* Before/After */}
        {metadata.beforeAfter?.before && metadata.beforeAfter?.after && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-6">Előtte / Utána</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-white/60 mb-2 uppercase text-sm font-semibold">Előtte</p>
                <div className="relative aspect-video rounded-lg overflow-hidden">
                  <Image
                    src={metadata.beforeAfter.before}
                    alt="Előtte"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div>
                <p className="text-white/60 mb-2 uppercase text-sm font-semibold">Utána</p>
                <div className="relative aspect-video rounded-lg overflow-hidden">
                  <Image
                    src={metadata.beforeAfter.after}
                    alt="Utána"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Gallery */}
        {metadata.gallery && metadata.gallery.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-6">Galéria</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {metadata.gallery.map(
                (item, index) =>
                  item.image && (
                    <div key={index} className="group">
                      <div className="relative aspect-square rounded-lg overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.caption || `Galéria kép ${index + 1}`}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      {item.caption && <p className="text-white/60 text-sm mt-2">{item.caption}</p>}
                    </div>
                  ),
              )}
            </div>
          </div>
        )}

        {/* Vehicle Info */}
        {metadata.vehicleInfo && Object.keys(metadata.vehicleInfo).length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-6">Jármű Információk</h2>
            <div className="bg-white/5 rounded-lg p-6">
              <dl className="grid md:grid-cols-2 gap-4">
                {Object.entries(metadata.vehicleInfo).map(([key, value]) => (
                  <div key={key} className="border-b border-white/10 pb-4">
                    <dt className="text-white/60 text-sm uppercase mb-1">{key}</dt>
                    <dd className="text-white font-semibold">{String(value)}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        )}

        {/* Services performed */}
        {metadata.services && metadata.services.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-6">Elvégzett Szolgáltatások</h2>
            <ul className="space-y-3">
              {metadata.services.map((service, index) => (
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
                  <span className="text-white/80">{service}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* CTA */}
        <div className="border-t border-white/10 pt-12">
          <div className="bg-white/5 rounded-lg p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Szeretnél hasonló eredményt?</h3>
            <p className="text-white/70 mb-6">
              Vedd fel velünk a kapcsolatot, és mi is átvarázsolhatjuk az autódat
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
            href="/#portfolio"
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
            Vissza a portfólióhoz
          </Link>
        </div>
      </div>
    </div>
  )
}
