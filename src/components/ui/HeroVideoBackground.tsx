'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

const MUX_VIDEO_URL = 'https://stream.mux.com/KLG02jUfqzNOMqRi2c1BzWxIT8Y1iCjZ2Z126yQBY7Qs.m3u8'
const MUX_POSTER_URL =
  'https://image.mux.com/KLG02jUfqzNOMqRi2c1BzWxIT8Y1iCjZ2Z126yQBY7Qs/thumbnail.webp'

export function HeroVideoBackground() {
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false)

  useEffect(() => {
    // Check for prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      return // Skip video loading if user prefers reduced motion
    }

    // Wait for page to be interactive, then delay video loading
    const loadVideo = () => {
      // Delay video loading by 2 seconds after page load
      setTimeout(() => {
        setShouldLoadVideo(true)
      }, 2000)
    }

    if (document.readyState === 'complete') {
      loadVideo()
    } else {
      window.addEventListener('load', loadVideo)
      return () => window.removeEventListener('load', loadVideo)
    }
  }, [])

  return (
    <div className="absolute top-0 left-0 w-full h-full bg-black">
      {/* Static fallback image - loads immediately for fast LCP */}
      <Image
        src="/hero-background.jpg"
        alt="CarPit Garage Hero Background"
        fill
        sizes="100vw"
        className={`object-cover brightness-75 transition-opacity duration-1000 ${
          videoLoaded ? 'opacity-0' : 'opacity-100'
        }`}
        priority
        quality={90}
      />

      {/* Video - lazy loaded after page interactive from Mux CDN */}
      {shouldLoadVideo && (
        <video
          autoPlay
          loop
          muted
          playsInline
          poster={MUX_POSTER_URL}
          onCanPlay={() => setVideoLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover brightness-75 transition-opacity duration-1000 ${
            videoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <source src={MUX_VIDEO_URL} type="application/x-mpegURL" />
        </video>
      )}
    </div>
  )
}
