'use client'

import React from 'react'
import { cn } from '../utils'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent/50'

    const variants = {
      primary: 'bg-accent text-white hover:bg-accent/90 shadow-lg hover:shadow-accent/20',
      secondary: 'bg-white/10 text-white hover:bg-white/20 border border-white/30',
      outline: 'border-2 border-accent text-accent hover:bg-accent hover:text-white',
      ghost: 'text-white hover:bg-white/5 border border-white/20 hover:border-accent'
    }

    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg'
    }

    return (
      <button
        className={cn(
          baseClasses,
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button