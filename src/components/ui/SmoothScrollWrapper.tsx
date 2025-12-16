'use client'

import React, { useEffect, ReactNode } from 'react'

interface SmoothScrollWrapperProps {
  children: ReactNode
}

const SmoothScrollWrapper: React.FC<SmoothScrollWrapperProps> = ({ children }) => {
  useEffect(() => {
    // Add smooth scrolling behavior
    const style = document.createElement('style')
    style.textContent = `
      html {
        scroll-behavior: smooth;
      }
    `
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [])

  return <div className="smooth-scroll-wrapper">{children}</div>
}

export default SmoothScrollWrapper