import React from 'react'

interface LoadingSkeletonProps {
  type: 'portfolio' | 'pricing' | 'services' | 'contact' | 'footer'
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ type }) => {
  if (type === 'portfolio' || type === 'pricing' || type === 'services') {
    return (
      <section className="relative py-24 md:py-32 bg-[#0D0D0D]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="animate-pulse">
            {/* Header skeleton */}
            <div className="mb-16 text-center">
              <div className="h-4 w-32 bg-white/10 rounded mx-auto mb-6"></div>
              <div className="h-12 w-96 bg-white/10 rounded mx-auto mb-4"></div>
              <div className="h-6 w-full max-w-2xl bg-white/10 rounded mx-auto"></div>
            </div>

            {/* Cards skeleton */}
            <div className="space-y-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-[#1A1A1A] border border-white/10 p-8 md:p-12 rounded">
                  <div className="h-8 w-64 bg-white/10 rounded mb-4"></div>
                  <div className="h-4 w-full bg-white/10 rounded mb-2"></div>
                  <div className="h-4 w-3/4 bg-white/10 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (type === 'contact') {
    return (
      <section className="relative py-20 md:py-32 bg-[#0D0D0D]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="animate-pulse grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="h-10 w-48 bg-white/10 rounded"></div>
              <div className="h-6 w-full bg-white/10 rounded"></div>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded"></div>
                    <div className="flex-1">
                      <div className="h-4 w-24 bg-white/10 rounded mb-2"></div>
                      <div className="h-4 w-32 bg-white/10 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-[#1A1A1A] p-8 rounded-lg border border-white/10">
              <div className="space-y-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i}>
                    <div className="h-4 w-20 bg-white/10 rounded mb-2"></div>
                    <div className="h-12 w-full bg-white/10 rounded"></div>
                  </div>
                ))}
                <div className="h-12 w-full bg-accent/20 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (type === 'footer') {
    return (
      <footer className="relative border-t border-white/10 py-12 md:py-16 bg-[#0D0D0D]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="animate-pulse">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
              {[1, 2, 3, 4].map((i) => (
                <div key={i}>
                  <div className="h-6 w-32 bg-white/10 rounded mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-4 w-full bg-white/10 rounded"></div>
                    <div className="h-4 w-3/4 bg-white/10 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </footer>
    )
  }

  return null
}

export default LoadingSkeleton
