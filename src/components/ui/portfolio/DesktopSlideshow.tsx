'use client'

import React, { useReducer, useCallback, useRef, useEffect } from 'react'
import Image from 'next/image'
import { PortfolioItem } from '../types'
import { blurDataURLs } from '@/lib/blurDataURL'

interface DesktopSlideshowProps {
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

// Module-level variable to avoid closure issues
let itemsLength = 0

export function DesktopSlideshow({ items }: DesktopSlideshowProps) {
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

    autoPlayTimerRef.current = setInterval(goToNext, 6000)

    return () => {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current)
      }
    }
  }, [state.isHovering, goToNext])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goToPrevious()
      if (e.key === 'ArrowRight') goToNext()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [goToNext, goToPrevious])

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
    <div onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
      <div className="relative">
        {/* Main Slideshow Container */}
        <div
          className="relative min-h-[500px] md:min-h-[600px] max-h-[800px] overflow-hidden"
          style={{ height: '60dvh' }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Slides */}
          <div className="relative h-full">
            {items.map((item, index) => {
              // Virtual sliding window: Only render current, previous, and next slides
              const distance = Math.abs(index - state.currentIndex)
              const shouldRender =
                distance <= 1 ||
                (state.currentIndex === 0 && index === items.length - 1) ||
                (state.currentIndex === items.length - 1 && index === 0)
              const isVisible = index === state.currentIndex

              if (!shouldRender) {
                return null
              }

              return (
                <div
                  key={item.slug}
                  className={`absolute inset-0 transition-opacity duration-700 ${
                    isVisible ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
                >
                  <div className="h-full">
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
                    <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 md:p-12 lg:p-16">
                      <div className="max-w-3xl">
                        {/* Category Badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-white/10 backdrop-blur-md mb-4 md:mb-6">
                          <span className="text-xs md:text-sm font-medium tracking-wider uppercase text-white/90">
                            {item.metadata.category}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-3 md:mb-4">
                          {item.metadata.title}
                        </h3>

                        {/* Description */}
                        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/80 font-light leading-relaxed line-clamp-2 md:line-clamp-3">
                          {item.metadata.description}
                        </p>
                      </div>
                    </div>
                  </div>
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
              className={`group relative aspect-video overflow-hidden border-2 transition-all duration-300 cursor-pointer ${
                index === state.currentIndex
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
                    loading="eager"
                  />
                  <div
                    className={`absolute inset-0 bg-black/40 transition-all duration-300 ${
                      index === state.currentIndex ? 'bg-black/0' : 'group-hover:bg-black/20'
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
              {index === state.currentIndex && (
                <div className="absolute top-2 right-2 w-2 h-2 bg-accent shadow-lg shadow-accent/50" />
              )}
            </button>
          ))}
        </div>

        {/* Slide Counter */}
        <div className="absolute top-4 right-4 md:top-6 md:right-6 lg:top-8 lg:right-8 z-20 bg-black/40 backdrop-blur-md px-3 py-1.5 md:px-4 md:py-2">
          <span className="text-white text-sm md:text-base font-medium tabular-nums">
            {String(state.currentIndex + 1).padStart(2, '0')} /{' '}
            {String(items.length).padStart(2, '0')}
          </span>
        </div>
      </div>
    </div>
  )
}
