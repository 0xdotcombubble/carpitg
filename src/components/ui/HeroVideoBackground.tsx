'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Hls from 'hls.js'

const MUX_VIDEO_URL = 'https://stream.mux.com/KLG02jUfqzNOMqRi2c1BzWxIT8Y1iCjZ2Z126yQBY7Qs.m3u8'
const MUX_POSTER_URL =
  'https://image.mux.com/KLG02jUfqzNOMqRi2c1BzWxIT8Y1iCjZ2Z126yQBY7Qs/thumbnail.webp'

export function HeroVideoBackground() {
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // Check for prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      return // Skip video loading if user prefers reduced motion
    }

    // Load video immediately (no delay)
    setShouldLoadVideo(true)
  }, [])

  useEffect(() => {
    if (!shouldLoadVideo || !videoRef.current) return

    const video = videoRef.current

    // Check if HLS is natively supported (Safari)
    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = MUX_VIDEO_URL
      video.addEventListener('loadeddata', () => setVideoLoaded(true))
    } else if (Hls.isSupported()) {
      // Use hls.js for other browsers
      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: false,
        backBufferLength: 90,
      })

      hls.loadSource(MUX_VIDEO_URL)
      hls.attachMedia(video)

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {
          // Auto-play was prevented, video will still load
        })
      })

      hls.on(Hls.Events.ERROR, (event, data) => {
        if (data.fatal) {
          console.error('HLS fatal error:', data)
        }
      })

      video.addEventListener('loadeddata', () => setVideoLoaded(true))

      return () => {
        hls.destroy()
      }
    }
  }, [shouldLoadVideo])

  return (
    <div className="absolute top-0 left-0 w-full h-full bg-black">
      {/* Static fallback image - loads immediately for fast LCP */}
      <Image
        src="/hero-background.jpg"
        alt="CarPit Garage Hero Background"
        fill
        sizes="100vw"
        className={`object-cover brightness-75 transition-opacity duration-500 ${
          videoLoaded ? 'opacity-0' : 'opacity-100'
        }`}
        priority
        quality={90}
      />

      {/* Video - loaded with hls.js for cross-browser support */}
      {shouldLoadVideo && (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          poster={MUX_POSTER_URL}
          className={`absolute inset-0 w-full h-full object-cover brightness-75 transition-opacity duration-500 ${
            videoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}
    </div>
  )
}
