import VCard from 'vcard-creator'
import { SiteSettings } from '@/components/ui/types'

/**
 * Parse address string into components
 * Format: "1172 Budapest\nCinkotai út 26."
 */
function parseAddress(address: string): {
  street: string
  city: string
  postalCode: string
  country: string
} {
  const lines = address.split('\n').map((line) => line.trim())

  // First line: postal code and city
  const firstLine = lines[0] || ''
  const postalCodeMatch = firstLine.match(/^(\d+)\s+(.+)$/)
  const postalCode = postalCodeMatch ? postalCodeMatch[1] : ''
  const city = postalCodeMatch ? postalCodeMatch[2] : firstLine

  // Second line: street
  const street = lines[1] || ''

  return {
    street,
    city,
    postalCode,
    country: 'Hungary',
  }
}

/**
 * Generate a vCard from SiteSettings data
 * Returns vCard content as a string in .vcf format
 */
export function generateVCard(siteSettings: SiteSettings): string {
  const vCard = new VCard()

  // Organization and company name
  vCard.addCompany('CarPit Garage')
  vCard.addName('', 'CarPit Garage')

  // Contact information
  vCard.addPhoneNumber(siteSettings.phone, 'WORK')
  vCard.addEmail(siteSettings.email, 'WORK')

  // Address
  const addressComponents = parseAddress(siteSettings.address)
  vCard.addAddress(
    '', // Name
    '', // Extended
    addressComponents.street,
    addressComponents.city,
    '', // Region
    addressComponents.postalCode,
    addressComponents.country,
    'WORK',
  )

  // Website URL
  vCard.addURL('https://carpitgarage.hu', 'WORK')

  // Social media profiles
  if (siteSettings.instagram) {
    vCard.addSocial(siteSettings.instagram, 'Instagram')
  }

  if (siteSettings.facebook) {
    vCard.addSocial(siteSettings.facebook, 'Facebook')
  }

  // Job title / role
  vCard.addJobtitle('Professzionális Autókozmetika és Detailing')

  // Build and return the vCard content
  return vCard.buildVCard()
}
