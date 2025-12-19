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
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200], // Mobile-first sizes
    imageSizes: [16, 32, 48, 64, 96, 128, 256], // Smaller default sizes
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: 'https' as const,
        hostname: 'carpitgarage.hu',
        pathname: '/api/media/file/**',
      },
      {
        protocol: 'https' as const,
        hostname: 'carpitg.raphael-varszegi.workers.dev',
        pathname: '/api/media/file/**',
      },
      {
        protocol: 'http' as const,
        hostname: 'localhost',
        port: '3000',
        pathname: '/api/media/file/**',
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
