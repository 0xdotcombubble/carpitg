import { getPayload } from 'payload'
import config from './src/payload.config.ts'

const payload = await getPayload({ config })

// Fetch a few media items
const media = await payload.find({
  collection: 'media',
  limit: 5,
})

console.log('Media items:')
media.docs.forEach(item => {
  console.log(`ID: ${item.id}`)
  console.log(`Filename: ${item.filename}`)
  console.log(`URL: ${item.url}`)
  console.log(`MimeType: ${item.mimeType}`)
  console.log('---')
})

// Fetch a service with image
const services = await payload.find({
  collection: 'services',
  depth: 2,
  limit: 1,
})

if (services.docs.length > 0) {
  console.log('\nService image structure:')
  console.log(JSON.stringify(services.docs[0].image, null, 2))
}

process.exit(0)
