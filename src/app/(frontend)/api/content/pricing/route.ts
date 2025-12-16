import { getPayload } from 'payload'
import config from '@/payload.config'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const payload = await getPayload({ config })

    const pricing = await payload.find({
      collection: 'pricing',
      depth: 2,
      sort: 'order',
      limit: 50,
    })

    // Transform pricing to match frontend interface
    const transformedPricing = pricing.docs.map(item => ({
      slug: item.slug,
      metadata: {
        title: item.title,
        category: item.category,
        description: item.description,
        price: item.price,
        duration: item.duration,
        image: item.image?.url,
        order: item.order,
        popular: item.popular || false,
        features: item.features?.map(f => f.feature) || [],
        slug: item.slug,
        vehicleTypes: item.vehicleTypes || [],
        notes: item.notes,
        services: item.services || [],
      },
      content: '', // Not used in current frontend
    }))

    return NextResponse.json(transformedPricing, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=86400',
      },
    })
  } catch (error) {
    console.error('Error fetching pricing:', error)

    // Return empty array if database is not available
    return NextResponse.json([], {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=3600',
      },
    })
  }
}