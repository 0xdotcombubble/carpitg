import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'

// Bundle analyzer for performance monitoring
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig: NextConfig = {
  // Your Next.js config here
  experimental: {
    reactCompiler: true, // Enable React Compiler for automatic memoization
    staleTimes: {
      dynamic: 0, // Don't cache dynamic pages (Payload admin needs fresh data)
      static: 180, // Cache static pages for 3 minutes
    },
  },
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|jpeg|png|gif|webp|mp4)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
  images: {
    unoptimized: true, // Required for Cloudflare Workers - R2 images served directly
    remotePatterns: [
      {
        protocol: 'https' as const,
        hostname: '**.r2.cloudflarestorage.com',
      },
      {
        protocol: 'https' as const,
        hostname: 'pub-*.r2.dev',
      },
      {
        protocol: 'https' as const,
        hostname: 'carpitgarage.hu',
      },
      {
        protocol: 'https' as const,
        hostname: 'carpitg.raphael-varszegi.workers.dev',
      },
      {
        protocol: 'http' as const,
        hostname: 'localhost',
        port: '3000',
      },
    ],
  },
  webpack: (webpackConfig: any) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
}

export default withBundleAnalyzer(withPayload(nextConfig, { devBundleServerPackages: false }))
