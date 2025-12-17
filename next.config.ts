import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Your Next.js config here
  images: {
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

export default withPayload(nextConfig, { devBundleServerPackages: false })
