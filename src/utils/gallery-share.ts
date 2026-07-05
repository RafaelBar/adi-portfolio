import { SITE_URL } from '@/data/seo'
import type { LocaleCode } from '@/models/types'

export const GALLERY_IMAGE_HASH_PREFIX = '#gallery/'

const GALLERY_SHARE_PATH_RE = /^\/(he|en)\/i\/([^/?#]+?)(?:\.html)?\/?$/i

export function galleryImageHash(imageId: string): string {
  return `${GALLERY_IMAGE_HASH_PREFIX}${imageId}`
}

export function parseGalleryImageHash(hash: string): string | null {
  const match = hash.match(/^#gallery\/([^/?#]+)$/)
  return match?.[1] ?? null
}

export function parseGallerySharePath(pathname: string): { locale: LocaleCode; imageId: string } | null {
  const match = pathname.match(GALLERY_SHARE_PATH_RE)
  if (!match?.[1] || !match[2]) return null

  const locale = match[1] as LocaleCode
  const imageId = match[2].replace(/\.html$/i, '')
  return { locale, imageId }
}

export function buildGalleryShareUrl(locale: LocaleCode, imageId: string): string {
  return `${SITE_URL}/${locale}/i/${imageId}.html`
}

/** Redirect /{locale}/i/{id}.html → /{locale}#gallery/{id} before the SPA boots. */
export function redirectSharePathToHash(): boolean {
  const parsed = parseGallerySharePath(window.location.pathname)
  if (!parsed) return false

  const targetPath = `/${parsed.locale}`
  const targetHash = galleryImageHash(parsed.imageId)
  if (window.location.pathname === targetPath && window.location.hash === targetHash) {
    return false
  }

  window.location.replace(`${targetPath}${targetHash}`)
  return true
}

export async function shareGalleryImage(options: {
  url: string
  title: string
}): Promise<'shared' | 'copied'> {
  if (typeof navigator.share === 'function') {
    const payloads: ShareData[] = [{ url: options.url, title: options.title }, { url: options.url }]

    for (const shareData of payloads) {
      if (typeof navigator.canShare === 'function' && !navigator.canShare(shareData)) {
        continue
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
  }

  await navigator.clipboard.writeText(options.url)
  return 'copied'
}
