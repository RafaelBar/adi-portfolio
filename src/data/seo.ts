export const SITE_URL = 'https://adibadash.com'
export const OG_IMAGE_PATH = '/primary-image.png'
export const OG_IMAGE_WIDTH = 2064
export const OG_IMAGE_HEIGHT = 1950

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}

export function ogLocaleFor(code: 'he' | 'en'): string {
  return code === 'he' ? 'he_IL' : 'en_US'
}
