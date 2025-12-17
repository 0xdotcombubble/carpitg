import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config here
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'carpitgarage.hu',
        pathname: '/api/media/file/**',
      },
      {
        protocol: 'https',
        hostname: 'carpitg.raphael-varszegi.workers.dev',
        pathname: '/api/media/file/**',
      },
      {
        protocol: 'http',
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
