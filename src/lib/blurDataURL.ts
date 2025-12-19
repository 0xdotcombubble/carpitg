/**
 * Generates a simple blur data URL for image placeholders
 * This creates a tiny solid color SVG to prevent layout shift
 */
export function getBlurDataURL(color: string = '#1A1A1A'): string {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 8">
      <filter id="b" color-interpolation-filters="sRGB">
        <feGaussianBlur stdDeviation="1" />
      </filter>
      <rect width="8" height="8" fill="${color}" filter="url(#b)" />
    </svg>
  `
  const base64 = Buffer.from(svg).toString('base64')
  return `data:image/svg+xml;base64,${base64}`
}

// Preset blur data URLs for common backgrounds
export const blurDataURLs = {
  dark: getBlurDataURL('#0D0D0D'),
  darker: getBlurDataURL('#1A1A1A'),
  accent: getBlurDataURL('#FF5500'),
}
