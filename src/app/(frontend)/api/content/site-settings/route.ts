import { getPayload } from 'payload'
import config from '@/payload.config'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const payload = await getPayload({ config })

    const siteSettings = await payload.findGlobal({
      slug: 'site-settings',
      depth: 2, // Include related media
    })

    // Transform image uploads to include URLs
    const transformedSettings = {
      ...siteSettings,
      heroBackgroundImage: siteSettings.heroBackgroundImage?.url || '/background.jpg',
      heroLogo: siteSettings.heroLogo?.url || '/logo.svg',
    }

    return NextResponse.json(transformedSettings, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=86400', // Cache for 5 minutes
      },
    })
  } catch (error) {
    console.error('Error fetching site settings:', error)

    // Return fallback data if database is not available
    return NextResponse.json({
      heroTitle: 'AUTÓKOZMETIKA - DETAIL STUDIO',
      heroSubtitle: 'Autód megérdemli a legjobbat',
      heroDescription: 'Ahol a precizitás találkozik a szenvedéllyel. Minden autó egyedi, minden részlet számít',
      heroBackgroundImage: '/background.jpg',
      heroLogo: '/logo.svg',
      portfolioTitle: 'Elvégzett Munkáink',
      portfolioSubtitle: 'Válogatás a legfrissebb projektjeinkből',
      servicesTitle: 'Egyedi Megoldások',
      servicesSubtitle: 'Modern technológiák és hagyományos kézműves technikák egyesítése. Minden autó egyedi kezelést érdemel.',
      pricingTitle: 'Transzparens árképzés',
      pricingSubtitle: 'Válassz a négy csomag közül - mindegyik tartalmazza az anyagköltséget és a munkadíjat.',
      pricingNote: 'Az árak átlagosan szennyezett, 5 személyes gépjárművekre vonatkoznak. Munkás autók, extrán szennyezett autók esetében az ár eltérhet.',
      phone: '+36703339809',
      email: 'info@carpitgarage.hu',
      address: '1172 Budapest\nCinkotai út 26.',
      instagram: 'https://www.instagram.com/carpit_grg',
      facebook: 'https://www.facebook.com/share/16mtfkk7VR/',
    }, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=3600',
      },
    })
  }
}