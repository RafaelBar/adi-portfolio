import { SITE_URL } from '@/data/seo'
import type { LocaleCode } from '@/models/types'

export const GALLERY_IMAGE_HASH_PREFIX = '#gallery/'

export function galleryImageHash(imageId: string): string {
  return `${GALLERY_IMAGE_HASH_PREFIX}${imageId}`
}

export function parseGalleryImageHash(hash: string): string | null {
  const match = hash.match(/^#gallery\/([^/?#]+)$/)
  return match?.[1] ?? null
}

export function buildGalleryShareUrl(locale: LocaleCode, imageId: string): string {
  return `${SITE_URL}/${locale}/i/${imageId}.html`
}

export async function shareGalleryImage(options: {
  url: string
  title: string
}): Promise<'shared' | 'copied'> {
  const shareData: ShareData = { url: options.url, title: options.title }

  if (typeof navigator.share === 'function') {
    if (typeof navigator.canShare === 'function' && !navigator.canShare(shareData)) {
      await navigator.clipboard.writeText(options.url)
      return 'copied'
    }

    try {
      await navigator.share(shareData)
      return 'shared'
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        throw error
      }
    }
  }

  await navigator.clipboard.writeText(options.url)
  return 'copied'
}
