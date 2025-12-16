import { getPayload } from 'payload'
import config from '@/payload.config'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const payload = await getPayload({ config })

    const services = await payload.find({
      collection: 'services',
      depth: 2,
      sort: 'order',
      limit: 50, // Reasonable limit
    })

    // Transform services to match frontend interface
    const transformedServices = services.docs.map(service => ({
      slug: service.slug,
      metadata: {
        title: service.title,
        description: service.description,
        price: service.price,
        category: service.category,
        order: service.order,
        slug: service.slug,
        features: service.features?.map(f => f.feature) || [],
        image: typeof service.image === 'object' ? service.image?.url : undefined,
        featured: service.featured || false,
      },
      content: '', // Not used in current frontend
    }))

    return NextResponse.json(transformedServices, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=86400',
      },
    })
  } catch (error) {
    console.error('Error fetching services:', error)

    // Return empty array if database is not available
    return NextResponse.json([], {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=3600',
      },
    })
  }
}