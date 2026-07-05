import type { LocaleCode } from '@/models/types'
import { galleryItems } from '@/data/gallery'

/**
 * Per-image captions for the gallery.
 * Edit the text here — keys match `GalleryItem.id` from gallery.ts.
 */
export const galleryCaptionOverrides: Partial<Record<string, Record<LocaleCode, string>>> = {
  // Example:
  // 'selected-work-1': { he: 'תיאור האיור', en: 'Illustration caption' },
}

export function getGalleryCaption(id: string, locale: LocaleCode): string {
  const override = galleryCaptionOverrides[id]?.[locale]
  if (override) return override

  const index = galleryItems.findIndex((item) => item.id === id) + 1
  return locale === 'he' ? `תיאור איור ${index}` : `Illustration caption ${index}`
}
