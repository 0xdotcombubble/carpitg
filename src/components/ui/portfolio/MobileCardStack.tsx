'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { PortfolioItem } from '../types'
import { blurDataURLs } from '@/lib/blurDataURL'
import { getCategoryIcon } from './getCategoryIcon'

interface MobileCardStackProps {
  items: PortfolioItem[]
}

export function MobileCardStack({ items }: MobileCardStackProps) {
  const [cards, setCards] = useState<PortfolioItem[]>(items)

  const removeCard = (slug: string) => {
    setCards((prevCards) => {
      const removedCard = prevCards.find((card) => card.slug === slug)
      if (!removedCard) return prevCards

      const newCards = prevCards.filter((card) => card.slug !== slug)
      // Add the removed card to the end
      return [...newCards, removedCard]
    })
  }

  return (
    <div className="md:hidden max-w-sm mx-auto px-4">
      <div className="relative h-[500px] sm:h-[550px] w-full">
        <AnimatePresence mode="popLayout">
          {cards.slice(0, 3).map((card, index) => (
            <MobileCard
              key={card.slug}
              card={card}
              index={index}
              removeCard={removeCard}
              totalCards={Math.min(cards.length, 3)}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

// Individual Mobile Card Component
interface MobileCardProps {
  card: PortfolioItem
  index: number
  removeCard: (slug: string) => void
  totalCards: number
}

function MobileCard({ card, index, removeCard, totalCards }: MobileCardProps) {
  const [isDragging, setIsDragging] = useState(false)
  const zIndex = totalCards - index
  const yOffset = index * 20
  const xOffset = index * 3

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 100, x: xOffset }}
      animate={{
        opacity: 1,
        y: yOffset,
        x: xOffset,
        scale: 1 - index * 0.03,
        rotateZ: index * -2,
      }}
      exit={{
        opacity: 0,
        transition: { duration: 0.2 },
      }}
      transition={{
        type: 'spring',
        stiffness: 500,
        damping: 50,
        mass: 1,
      }}
      style={{
        zIndex,
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
        backgroundColor: '#1a1a1a',
      }}
      className="absolute left-0 top-0 h-full w-full overflow-hidden rounded-xl cursor-grab active:cursor-grabbing"
      drag={index === 0}
      dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
      dragElastic={0.6}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={(_, info) => {
        setIsDragging(false)
        if (index === 0) {
          const distance = Math.sqrt(Math.pow(info.offset.x, 2) + Math.pow(info.offset.y, 2))
          if (distance > 100) {
            removeCard(card.slug)
          }
        }
      }}
      whileDrag={{
        scale: 1.05,
        boxShadow: '0 15px 40px rgba(0, 0, 0, 0.6)',
      }}
    >
      <Link
        href={`/portfolio/${card.slug}`}
        className="block h-full w-full"
        onClick={(e) => {
          if (isDragging || index !== 0) {
            e.preventDefault()
          }
        }}
      >
        <div className="relative flex h-full flex-col overflow-hidden rounded-xl text-white">
          {/* Card Header */}
          <div className="flex items-center justify-between p-3">
            <div className="rounded-full bg-white/10 p-1.5">{getCategoryIcon(card.metadata.category)}</div>
            <div className="rounded-full bg-white/10 p-1.5">
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </div>

          {/* Card Title */}
          <div className="px-3 py-1">
            <h2 className="text-xl font-bold line-clamp-2">{card.metadata.title}</h2>
            <h3 className="text-base font-medium mt-1 text-white/60">{card.metadata.category}</h3>
          </div>

          {/* Card Image */}
          {card.metadata.image && (
            <div className="mt-2 overflow-hidden px-3 flex-1 min-h-0">
              <div className="relative h-full w-full overflow-hidden rounded-lg">
                <Image
                  src={card.metadata.image}
                  alt={card.metadata.title}
                  fill
                  sizes="100vw"
                  className="object-cover"
                  placeholder="blur"
                  blurDataURL={blurDataURLs.darker}
                />
              </div>
            </div>
          )}

          {/* Card Footer */}
          <div className="mt-auto p-3">
            <div className="rounded-full px-2.5 py-1 text-xs bg-white/10 inline-flex items-center gap-1">
              {getCategoryIcon(card.metadata.category)}
              {card.metadata.category}
            </div>
            <p className="mt-2 text-xs opacity-80 line-clamp-2">{card.metadata.description}</p>
          </div>

          {/* Drag indicator for the top card */}
          {index === 0 && (
            <div className="absolute bottom-1 left-1/2 flex -translate-x-1/2 flex-col items-center">
              <motion.div
                className="h-0.5 w-8 rounded-full bg-white/40"
                animate={{ y: [0, 5, 0] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
              />
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  )
}
