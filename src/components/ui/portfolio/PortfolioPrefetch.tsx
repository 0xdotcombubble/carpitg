'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import type { PortfolioItem } from '../types'

interface PortfolioPrefetchProps {
  items: PortfolioItem[]
}

/**
 * Prefetches all portfolio pages in the background for instant navigation
 * This component renders nothing but triggers Next.js router prefetching
 */
export function PortfolioPrefetch({ items }: PortfolioPrefetchProps) {
  const router = useRouter()

  useEffect(() => {
    if (items.length === 0) return

    // Prefetch all portfolio pages after a short delay to not block initial render
    const prefetchTimer = setTimeout(() => {
      items.forEach((item) => {
        router.prefetch(`/portfolio/${item.slug}`)
      })
    }, 100)

    return () => clearTimeout(prefetchTimer)
  }, [items, router])

  return null
}
