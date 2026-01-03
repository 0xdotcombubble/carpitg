'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
//import { ChevronLeft, ChevronRight } from 'lucide-react'
import { PortfolioItem } from '../types'
import { blurDataURLs } from '@/lib/blurDataURL'

interface MobileSlideshowProps {
  items: PortfolioItem[]
}

export function MobileSlideshow({ items }: MobileSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const [isHovering, setIsHovering] = useState(false)

  // Minimum swipe distance (in px) to trigger slide change
  const minSwipeDistance = 50

  // Auto-play interval (5 seconds)
  const autoPlayInterval = 5000

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
  }, [currentIndex, isHovering, goToNext, autoPlayInterval])

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(0)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      goToNext()
    } else if (isRightSwipe) {
      goToPrevious()
    }
  }

  return (
    <div
      className="md:hidden max-w-full mx-auto"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="relative">
        {/* Slides Container */}
        <div
          className="overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {items.map((card, index) => (
              <div key={card.slug} className="w-full shrink-0">
                <Slide card={card} isFirst={index === 0} />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows - Elegant minimal design */}
        {/*<button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/40 backdrop-blur-md hover:bg-black/60 rounded-full p-3 transition-all duration-300 group"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-6 w-6 text-white group-hover:scale-110 transition-transform" />
        </button>

        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/40 backdrop-blur-md hover:bg-black/60 rounded-full p-3 transition-all duration-300 group"
          aria-label="Next slide"
        >
          <ChevronRight className="h-6 w-6 text-white group-hover:scale-110 transition-transform" />
        </button>*/}

        {/* Minimal Progress Bars */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 px-4 z-10">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className="group relative h-1 flex-1 max-w-16 bg-white/20 backdrop-blur-sm overflow-hidden rounded-full transition-all duration-300 hover:bg-white/30"
              aria-label={`Go to slide ${index + 1}`}
            >
              <div
                className={`h-full bg-accent transition-all duration-300 ${
                  index === currentIndex ? 'w-full' : 'w-0'
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// Modern, elegant slide design
interface SlideProps {
  card: PortfolioItem
  isFirst: boolean
}

function Slide({ card, isFirst }: SlideProps) {
  return (
    <Link href={`/portfolio/${card.slug}`} className="block relative group">
      <div className="relative h-[85vh] min-h-[600px] max-h-[800px] overflow-hidden">
        {/* Full-screen Image with Overlay */}
        {card.metadata.image && (
          <>
            <Image
              src={card.metadata.image}
              alt={card.metadata.title}
              fill
              sizes="100vw"
              className="object-cover"
              placeholder="blur"
              blurDataURL={blurDataURLs.darker}
              priority={isFirst}
              loading={isFirst ? 'eager' : 'lazy'}
            />
            {/* Gradient Overlay for readability */}
            <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent" />
          </>
        )}

        {/* Content Overlay - Bottom aligned */}
        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 pb-20">
          {/* Category Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full mb-4">
            <span className="text-xs font-medium tracking-wider uppercase text-white/90">
              {card.metadata.category}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-3xl sm:text-4xl font-bold text-white mb-3 group-hover:text-accent transition-colors duration-300">
            {card.metadata.title}
          </h3>

          {/* Description */}
          <p className="text-base sm:text-lg text-white/80 font-light leading-relaxed max-w-2xl line-clamp-2">
            {card.metadata.description}
          </p>

          {/* View More Indicator */}
          <div className="mt-6 inline-flex items-center gap-2 text-white/70 group-hover:text-accent transition-colors duration-300">
            <span className="text-sm font-medium">Részletek megtekintése</span>
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  )
}
