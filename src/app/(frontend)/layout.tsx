import React from 'react'
import type { Metadata, Viewport } from 'next'
import './global.css'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL || 'https://carpitgarage.hu'),
  title: 'CarPit Garage - Professzionális Autóápolás',
  description:
    'Professzionális autókozmetika és detailing szolgáltatások Budapesten. Polírozás, kerámia bevonat, kárpittisztítás.',
  keywords:
    'autókozmetika, detailing, polírozás, kerámia bevonat, kárpittisztítás, Budapest, CarPit Garage',
  authors: [{ name: 'CarPit Garage' }],
  openGraph: {
    title: 'CarPit Garage - Professzionális Autóápolás',
    description:
      'Professzionális autókozmetika és detailing szolgáltatások Budapesten. Polírozás, kerámia bevonat, kárpittisztítás.',
    url: 'https://carpitgarage.hu',
    siteName: 'CarPit Garage',
    locale: 'hu_HU',
    type: 'website',
    images: [
      {
        url: '/logo.svg',
        width: 1200,
        height: 630,
        alt: 'CarPit Garage Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CarPit Garage - Professzionális Autóápolás',
    description: 'Professzionális autókozmetika és detailing szolgáltatások Budapesten.',
    images: ['/logo.svg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/logo.svg',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hu" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-background text-foreground antialiased">{children}</body>
    </html>
  )
}
