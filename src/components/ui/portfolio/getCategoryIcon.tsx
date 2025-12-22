import React from 'react'
import { ArrowUpRight, Sparkles, Star, DollarSign } from 'lucide-react'

export function getCategoryIcon(category: string) {
  switch (category.toLowerCase()) {
    case 'prémium':
    case 'premium':
      return <Star className="h-4 w-4 sm:h-5 sm:w-5" />
    case 'részletes':
    case 'detailing':
      return <Sparkles className="h-4 w-4 sm:h-5 sm:w-5" />
    case 'ápolás':
    case 'maintenance':
      return <DollarSign className="h-4 w-4 sm:h-5 sm:w-5" />
    default:
      return <ArrowUpRight className="h-4 w-4 sm:h-5 sm:w-5" />
  }
}
