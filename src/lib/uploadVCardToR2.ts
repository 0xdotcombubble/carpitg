import { getCloudflareContext } from '@opennextjs/cloudflare'

/**
 * Upload vCard content to Cloudflare R2 storage
 * Returns the public URL to access the vCard file
 */
export async function uploadVCardToR2(vcardContent: string): Promise<string | null> {
  try {
    // Get Cloudflare context to access R2 bucket
    const cloudflare = await getCloudflareContext()
    const r2Bucket = cloudflare.env.R2

    if (!r2Bucket) {
      console.error('R2 bucket not available in Cloudflare context')
      return null
    }

    // Upload vCard to R2
    await r2Bucket.put('contact.vcf', vcardContent, {
      httpMetadata: {
        contentType: 'text/vcard',
      },
    })

    console.log('vCard uploaded successfully to R2: contact.vcf')

    // Return the public URL to access the file
    // Payload CMS serves R2 files through its media endpoint
    return '/api/media/file/contact.vcf'
  } catch (error) {
    console.error('Error uploading vCard to R2:', error)
    return null
  }
}
