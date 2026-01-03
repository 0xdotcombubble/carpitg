'use client'

import React, { useReducer, useCallback, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { PortfolioItem } from '../types'
import { blurDataURLs } from '@/lib/blurDataURL'

interface MobileSlideshowProps {
  items: PortfolioItem[]
}

// Use reducer instead of multiple useState calls
type State = {
  currentIndex: number
  isHovering: boolean
}

type Action =
  | { type: 'NEXT' }
  | { type: 'PREV' }
  | { type: 'GO_TO'; index: number }
  | { type: 'SET_HOVER'; isHovering: boolean }

// Module-level variable
let itemsLength = 0

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'NEXT':
      return { ...state, currentIndex: (state.currentIndex + 1) % itemsLength }
    case 'PREV':
      return {
        ...state,
        currentIndex: state.currentIndex === 0 ? itemsLength - 1 : state.currentIndex - 1,
      }
    case 'GO_TO':
      return { ...state, currentIndex: action.index }
    case 'SET_HOVER':
      return { ...state, isHovering: action.isHovering }
    default:
      return state
  }
}

export function MobileSlideshow({ items }: MobileSlideshowProps) {
  itemsLength = items.length

  const [state, dispatch] = useReducer(reducer, {
    currentIndex: 0,
    isHovering: false,
  })

  const touchStartX = useRef(0)
  const touchStartY = useRef(0)
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null)

  const minSwipeDistance = 50

  const goToNext = useCallback(() => {
    dispatch({ type: 'NEXT' })
  }, [])

  const goToPrevious = useCallback(() => {
    dispatch({ type: 'PREV' })
  }, [])

  const goToSlide = useCallback((index: number) => {
    dispatch({ type: 'GO_TO', index })
  }, [])

  const setIsHovering = useCallback((isHovering: boolean) => {
    dispatch({ type: 'SET_HOVER', isHovering })
  }, [])

  // Auto-play using ref-based timer
  useEffect(() => {
    if (state.isHovering) {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current)
        autoPlayTimerRef.current = null
      }
      return
    }

    autoPlayTimerRef.current = setInterval(goToNext, 5000)

    return () => {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current)
      }
    }
  }, [state.isHovering, goToNext])

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX
    touchStartY.current = e.targetTouches[0].clientY
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX
    const touchEndY = e.changedTouches[0].clientY

    const horizontalDistance = touchStartX.current - touchEndX
    const verticalDistance = Math.abs(touchStartY.current - touchEndY)

    // Only trigger horizontal swipe if horizontal movement is greater than vertical
    if (
      Math.abs(horizontalDistance) > verticalDistance &&
      Math.abs(horizontalDistance) > minSwipeDistance
    ) {
      if (horizontalDistance > 0) {
        goToNext()
      } else {
        goToPrevious()
      }
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
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${state.currentIndex * 100}%)` }}
          >
            {items.map((card, index) => {
              // Only render current slide and adjacent slides (prev/next)
              // This prevents loading all images at once during SSR
              const prevIndex = state.currentIndex === 0 ? items.length - 1 : state.currentIndex - 1
              const nextIndex = state.currentIndex === items.length - 1 ? 0 : state.currentIndex + 1
              const shouldRender =
                index === state.currentIndex || index === prevIndex || index === nextIndex

              return (
                <div key={card.slug} className="w-full shrink-0">
                  {shouldRender ? (
                    <Slide card={card} isFirst={index === 0} />
                  ) : (
                    // Placeholder for unrendered slides to maintain layout
                    <div
                      className="relative min-h-[600px] max-h-[800px] bg-background"
                      style={{ height: '85dvh' }}
                    />
                  )}
                </div>
              )
            })}
          </div>
        </div>

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
                  index === state.currentIndex ? 'w-full' : 'w-0'
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
      <div
        className="relative min-h-[600px] max-h-[800px] overflow-hidden"
        style={{ height: '85dvh' }}
      >
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
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
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
