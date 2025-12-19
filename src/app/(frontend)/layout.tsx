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
        {/* Critical CSS for above-fold content */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              /* Critical hero styles for faster FCP */
              .bg-background { background-color: hsl(222.2 84% 4.9%); }
              .text-foreground { color: hsl(210 40% 98%); }
              .bg-accent { background-color: hsl(12 100% 50%); }
              .text-accent { color: hsl(12 100% 50%); }
              .antialiased { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
              .scroll-smooth { scroll-behavior: smooth; }
            `,
          }}
        />
      </head>
      <body className="bg-background text-foreground antialiased">{children}</body>
    </html>
  )
}
