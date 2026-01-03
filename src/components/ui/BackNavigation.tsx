'use client'

import React from 'react'
import Link from 'next/link'

interface BackNavigationProps {
  href: string
  label?: string
}

export function BackNavigation({ href, label = 'Vissza' }: BackNavigationProps) {
  return (
    <div className="sticky top-0 z-50 bg-background/95 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <Link
          href={href}
          className="inline-flex items-center gap-2 text-white/70 hover:text-accent transition-colors"
          prefetch={true}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span className="font-medium">{label}</span>
        </Link>
      </div>
    </div>
  )
}
