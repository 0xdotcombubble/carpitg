import { getPayload } from 'payload'
import config from '@/payload.config'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const payload = await getPayload({ config })

    const portfolio = await payload.find({
      collection: 'portfolio',
      depth: 2,
      sort: 'order',
      limit: 50,
    })

    // Transform portfolio to match frontend interface
    const transformedPortfolio = portfolio.docs.map(item => ({
      slug: item.slug,
      metadata: {
        title: item.title,
        category: item.category,
        description: item.description,
        image: typeof item.image === 'object' ? item.image?.url || '' : '',
        order: item.order,
        featured: item.featured || false,
        slug: item.slug,
        gallery: item.gallery?.map(g => ({
          image: typeof g.image === 'object' ? g.image?.url : undefined,
          caption: g.caption,
        })) || [],
        beforeAfter: {
          before: typeof item.beforeAfter?.before === 'object' ? item.beforeAfter.before?.url : undefined,
          after: typeof item.beforeAfter?.after === 'object' ? item.beforeAfter.after?.url : undefined,
        },
        vehicleInfo: item.vehicleInfo || {},
        services: item.services || [],
      },
      content: '', // Not used in current frontend
    }))

    return NextResponse.json(transformedPortfolio, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=86400',
      },
    })
  } catch (error) {
    console.error('Error fetching portfolio:', error)

    // Return empty array if database is not available
    return NextResponse.json([], {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=3600',
      },
    })
  }
}