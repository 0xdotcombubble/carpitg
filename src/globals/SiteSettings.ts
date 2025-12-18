import type { GlobalConfig } from 'payload'
import { generateVCard } from '../lib/generateVCard'
import { uploadVCardToR2 } from '../lib/uploadVCardToR2'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  access: {
    read: () => true, // Allow public read access
    update: ({ req }) => Boolean(req.user), // Only authenticated users can update
  },
  hooks: {
    afterChange: [
      async ({ doc }) => {
        try {
          // Transform the document to match SiteSettings interface
          const settings = {
            heroTitle: doc.heroTitle || '',
            heroSubtitle: doc.heroSubtitle || '',
            heroDescription: doc.heroDescription || '',
            heroBackgroundImage:
              typeof doc.heroBackgroundImage === 'object'
                ? doc.heroBackgroundImage?.url || ''
                : doc.heroBackgroundImage || '',
            heroLogo:
              typeof doc.heroLogo === 'object' ? doc.heroLogo?.url || '' : doc.heroLogo || '',
            portfolioTitle: doc.portfolioTitle || '',
            portfolioSubtitle: doc.portfolioSubtitle || '',
            servicesTitle: doc.servicesTitle || '',
            servicesSubtitle: doc.servicesSubtitle || '',
            pricingTitle: doc.pricingTitle || '',
            pricingSubtitle: doc.pricingSubtitle || '',
            pricingNote: doc.pricingNote || '',
            phone: doc.phone || '',
            email: doc.email || '',
            address: doc.address || '',
            instagram: doc.instagram || '',
            facebook: doc.facebook || '',
            vcardCompanyName: doc.vcardCompanyName || 'CarPit Garage',
            vcardJobTitle: doc.vcardJobTitle || 'Professzionális Autókozmetika és Detailing',
            vcardWebsite: doc.vcardWebsite || 'https://carpitgarage.hu',
            vcardPhoto:
              typeof doc.vcardPhoto === 'object' && doc.vcardPhoto !== null
                ? doc.vcardPhoto?.url || ''
                : doc.vcardPhoto || '',
            vcardIncludeInstagram: doc.vcardIncludeInstagram ?? true,
            vcardIncludeFacebook: doc.vcardIncludeFacebook ?? true,
          }

          // Generate vCard content
          const vcardContent = generateVCard(settings)

          // Upload to R2
          const vcardUrl = await uploadVCardToR2(vcardContent)

          if (vcardUrl) {
            console.log('✓ vCard successfully generated and uploaded to R2:', vcardUrl)
          } else {
            console.error('✗ Failed to upload vCard to R2')
          }
        } catch (error) {
          console.error('Error in SiteSettings afterChange hook:', error)
        }

        return doc
      },
    ],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero Section',
          fields: [
            {
              name: 'heroTitle',
              type: 'text',
              label: 'Hero Title',
              defaultValue: 'AUTÓKOZMETIKA - DETAIL STUDIO',
              required: true,
            },
            {
              name: 'heroSubtitle',
              type: 'text',
              label: 'Hero Subtitle',
              defaultValue: 'Autód megérdemli a legjobbat',
              required: true,
            },
            {
              name: 'heroDescription',
              type: 'textarea',
              label: 'Hero Description',
              defaultValue:
                'Ahol a precizitás találkozik a szenvedéllyel. Minden autó egyedi, minden részlet számít',
              required: true,
            },
            {
              name: 'heroBackgroundImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Hero Background Image',
              required: true,
            },
            {
              name: 'heroLogo',
              type: 'upload',
              relationTo: 'media',
              label: 'Hero Logo',
              required: true,
            },
          ],
        },
        {
          label: 'Section Titles',
          fields: [
            {
              name: 'portfolioTitle',
              type: 'text',
              label: 'Portfolio Section Title',
              defaultValue: 'Elvégzett Munkáink',
              required: true,
            },
            {
              name: 'portfolioSubtitle',
              type: 'text',
              label: 'Portfolio Section Subtitle',
              defaultValue: 'Válogatás a legfrissebb projektjeinkből',
              required: true,
            },
            {
              name: 'servicesTitle',
              type: 'text',
              label: 'Services Section Title',
              defaultValue: 'Egyedi Megoldások',
              required: true,
            },
            {
              name: 'servicesSubtitle',
              type: 'textarea',
              label: 'Services Section Subtitle',
              defaultValue:
                'Modern technológiák és hagyományos kézműves technikák egyesítése. Minden autó egyedi kezelést érdemel.',
              required: true,
            },
            {
              name: 'pricingTitle',
              type: 'text',
              label: 'Pricing Section Title',
              defaultValue: 'Transzparens árképzés',
              required: true,
            },
            {
              name: 'pricingSubtitle',
              type: 'textarea',
              label: 'Pricing Section Subtitle',
              defaultValue:
                'Válassz a négy csomag közül - mindegyik tartalmazza az anyagköltséget és a munkadíjat.',
              required: true,
            },
            {
              name: 'pricingNote',
              type: 'textarea',
              label: 'Pricing Note',
              defaultValue:
                'Az árak átlagosan szennyezett, 5 személyes gépjárművekre vonatkoznak. Munkás autók, extrán szennyezett autók esetében az ár eltérhet.',
              required: true,
            },
          ],
        },
        {
          label: 'Contact Information',
          fields: [
            {
              name: 'phone',
              type: 'text',
              label: 'Phone Number',
              defaultValue: '+36703339809',
              required: true,
            },
            {
              name: 'email',
              type: 'email',
              label: 'Email Address',
              defaultValue: 'info@carpitgarage.hu',
              required: true,
            },
            {
              name: 'address',
              type: 'textarea',
              label: 'Address',
              defaultValue: '1172 Budapest\nCinkotai út 26.',
              required: true,
            },
          ],
        },
        {
          label: 'Social Media',
          fields: [
            {
              name: 'instagram',
              type: 'text',
              label: 'Instagram URL',
              defaultValue: 'https://www.instagram.com/carpit_grg',
            },
            {
              name: 'facebook',
              type: 'text',
              label: 'Facebook URL',
              defaultValue: 'https://www.facebook.com/share/16mtfkk7VR/',
            },
          ],
        },
        {
          label: 'vCard Settings',
          description: 'Configure the contact card (vCard) that users can download',
          fields: [
            {
              name: 'vcardCompanyName',
              type: 'text',
              label: 'Company Name',
              defaultValue: 'CarPit Garage',
              admin: {
                description: 'Company name shown in the vCard',
              },
            },
            {
              name: 'vcardJobTitle',
              type: 'text',
              label: 'Job Title / Description',
              defaultValue: 'Professzionális Autókozmetika és Detailing',
              admin: {
                description: 'Business description or job title',
              },
            },
            {
              name: 'vcardWebsite',
              type: 'text',
              label: 'Website URL',
              defaultValue: 'https://carpitgarage.hu',
              admin: {
                description: 'Website URL for the vCard',
              },
            },
            {
              name: 'vcardPhoto',
              type: 'upload',
              relationTo: 'media',
              label: 'vCard Photo',
              required: false,
              admin: {
                description:
                  'Image/logo shown in contact apps (recommended: square image, at least 256x256px)',
              },
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'vcardIncludeInstagram',
                  type: 'checkbox',
                  label: 'Include Instagram',
                  defaultValue: true,
                  admin: {
                    description: 'Add Instagram to vCard',
                  },
                },
                {
                  name: 'vcardIncludeFacebook',
                  type: 'checkbox',
                  label: 'Include Facebook',
                  defaultValue: true,
                  admin: {
                    description: 'Add Facebook to vCard',
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
