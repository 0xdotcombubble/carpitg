'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { PortfolioItem } from '../types'
import { blurDataURLs } from '@/lib/blurDataURL'

interface DesktopSlideshowProps {
  items: PortfolioItem[]
}

export function DesktopSlideshow({ items }: DesktopSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const touchStartY = useRef(0)
  const touchMoveY = useRef(0)

  // Auto-play interval (6 seconds)
  const autoPlayInterval = 6000
  // Minimum swipe distance (in px)
  const minSwipeDistance = 50

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1))
  }, [items.length])

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1))
  }, [items.length])

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index)
  }, [])

  // Auto-play functionality
  useEffect(() => {
    if (isHovering) return

    const intervalId = setInterval(goToNext, autoPlayInterval)
    return () => clearInterval(intervalId)
  }, [currentIndex, isHovering, goToNext])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goToPrevious()
      if (e.key === 'ArrowRight') goToNext()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [goToNext, goToPrevious])

  // Touch handlers with better vertical scroll detection
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(0)
    setTouchStart(e.targetTouches[0].clientX)
    touchStartY.current = e.targetTouches[0].clientY
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
    touchMoveY.current = e.targetTouches[0].clientY
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const horizontalDistance = touchStart - touchEnd
    const verticalDistance = Math.abs(touchStartY.current - touchMoveY.current)

    // Only trigger horizontal swipe if horizontal movement is greater than vertical
    if (
      Math.abs(horizontalDistance) > verticalDistance &&
      Math.abs(horizontalDistance) > minSwipeDistance
    ) {
      const isLeftSwipe = horizontalDistance > 0
      const isRightSwipe = horizontalDistance < 0

      if (isLeftSwipe) {
        goToNext()
      } else if (isRightSwipe) {
        goToPrevious()
      }
    }

    // Reset
    setTouchStart(0)
    setTouchEnd(0)
    touchStartY.current = 0
    touchMoveY.current = 0
  }

  return (
    <div onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
      <div className="relative">
        {/* Main Slideshow Container */}
        <div
          className="relative h-[60vh] md:h-[70vh] min-h-[500px] md:min-h-[600px] max-h-[800px] overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Slides */}
          <div className="relative h-full">
            {items.map((item, index) => {
              // Virtual sliding window: Only render current, previous, and next slides
              const distance = Math.abs(index - currentIndex)
              const shouldRender =
                distance <= 1 ||
                (currentIndex === 0 && index === items.length - 1) ||
                (currentIndex === items.length - 1 && index === 0)
              const isVisible = index === currentIndex

              if (!shouldRender) {
                return null // Don't render distant slides
              }

              return (
                <div
                  key={item.slug}
                  className={`absolute inset-0 transition-opacity duration-700 ${
                    isVisible ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
                >
                  <Link href={`/portfolio/${item.slug}`} className="block h-full group">
                    {/* Image */}
                    {item.metadata.image && (
                      <>
                        <Image
                          src={item.metadata.image}
                          alt={item.metadata.title}
                          fill
                          sizes="(min-width: 1024px) 1400px, 100vw"
                          className="object-cover"
                          placeholder="blur"
                          blurDataURL={blurDataURLs.darker}
                          priority={index === 0}
                          loading={index === 0 ? 'eager' : 'lazy'}
                        />
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
                      </>
                    )}

                    {/* Content Overlay */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 md:p-12 lg:p-16 pointer-events-none">
                      <div className="max-w-3xl pointer-events-auto">
                        {/* Category Badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-white/10 backdrop-blur-md mb-4 md:mb-6">
                          <span className="text-xs md:text-sm font-medium tracking-wider uppercase text-white/90">
                            {item.metadata.category}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-3 md:mb-4 group-hover:text-accent transition-colors duration-300">
                          {item.metadata.title}
                        </h3>

                        {/* Description */}
                        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/80 font-light leading-relaxed mb-6 md:mb-8 line-clamp-2 md:line-clamp-3">
                          {item.metadata.description}
                        </p>

                        {/* View More */}
                        <div className="inline-flex items-center gap-2 md:gap-3 text-white/70 group-hover:text-accent transition-colors duration-300">
                          <span className="text-sm md:text-base font-medium">
                            Részletek megtekintése
                          </span>
                          <svg
                            className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform duration-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              )
            })}
          </div>
        </div>

        {/* Thumbnails / Progress Navigation */}
        <div className="mt-6 md:mt-8 px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
          {items.map((item, index) => (
            <button
              key={item.slug}
              onClick={() => goToSlide(index)}
              className={`group relative aspect-video overflow-hidden border-2 transition-all duration-300 ${
                index === currentIndex
                  ? 'border-accent scale-105'
                  : 'border-white/20 opacity-60 hover:opacity-100 hover:border-white/40'
              }`}
              aria-label={`Go to ${item.metadata.title}`}
            >
              {item.metadata.image && (
                <>
                  <Image
                    src={item.metadata.image}
                    alt={item.metadata.title}
                    fill
                    sizes="300px"
                    className="object-cover"
                    placeholder="blur"
                    blurDataURL={blurDataURLs.darker}
                    loading="lazy"
                  />
                  <div
                    className={`absolute inset-0 bg-black/40 transition-all duration-300 ${
                      index === currentIndex ? 'bg-black/0' : 'group-hover:bg-black/20'
                    }`}
                  />
                </>
              )}

              {/* Title Overlay on Hover */}
              <div className="absolute inset-0 flex items-end p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/80 to-transparent">
                <span className="text-white text-xs font-medium line-clamp-2">
                  {item.metadata.title}
                </span>
              </div>

              {/* Active Indicator */}
              {index === currentIndex && (
                <div className="absolute top-2 right-2 w-2 h-2 bg-accent shadow-lg shadow-accent/50" />
              )}
            </button>
          ))}
        </div>

        {/* Slide Counter */}
        <div className="absolute top-4 right-4 md:top-6 md:right-6 lg:top-8 lg:right-8 z-20 bg-black/40 backdrop-blur-md px-3 py-1.5 md:px-4 md:py-2">
          <span className="text-white text-sm md:text-base font-medium tabular-nums">
            {String(currentIndex + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
          </span>
        </div>
      </div>
    </div>
  )
}
