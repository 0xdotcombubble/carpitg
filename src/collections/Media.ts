import type { CollectionConfig } from 'payload'
import sharp from 'sharp'
import path from 'path'
import fs from 'fs'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'blurDataURL',
      type: 'text',
      admin: {
        hidden: true,
      },
    },
  ],
  upload: {
    // These are not supported on Workers yet due to lack of sharp
    crop: false,
    focalPoint: false,
  },
  hooks: {
    afterChange: [
      async ({ doc, req }) => {
        // Only process images (not SVGs or other file types)
        if (!doc.mimeType?.startsWith('image/') || doc.mimeType === 'image/svg+xml') {
          return doc
        }

        try {
          // Get the file path
          const filePath = path.join(process.cwd(), 'public', doc.url || '')

          // Check if file exists
          if (!fs.existsSync(filePath)) {
            console.warn(`File not found: ${filePath}`)
            return doc
          }

          // Generate blur placeholder (20% quality, very small)
          const blurBuffer = await sharp(filePath)
            .resize(20) // Tiny thumbnail
            .jpeg({ quality: 20 })
            .toBuffer()

          // Convert to base64 data URL
          const blurDataURL = `data:image/jpeg;base64,${blurBuffer.toString('base64')}`

          // Update the document with blur data URL
          await req.payload.update({
            collection: 'media',
            id: doc.id,
            data: {
              blurDataURL,
            },
          })

          return { ...doc, blurDataURL }
        } catch (error) {
          console.error('Error generating blur placeholder:', error)
          return doc
        }
      },
    ],
  },
}
