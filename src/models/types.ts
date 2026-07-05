export type LocaleCode = 'he' | 'en'

export type GalleryCategory = 'selected-work' | 'full-book-spread'

export interface GalleryItem {
  id: string
  category: GalleryCategory
  image: string
  display: string
  thumb: string
  width: number
  height: number
  displayWidth: number
  displayHeight: number
  thumbWidth: number
  thumbHeight: number
}

export type ServiceIconName = 'draw' | 'spread'

export interface ServiceItem {
  id: string
  icon: ServiceIconName
  titleKey: string
  descriptionKey: string
}

export interface WorkWithItem {
  id: string
  titleKey: string
  descriptionKey: string
}

export interface ProcessStep {
  id: string
  titleKey: string
  descriptionKey: string
}

export type SocialIconName = 'instagram' | 'facebook' | 'email' | 'phone'

export interface SocialLink {
  id: string
  labelKey: string
  href: string
  icon: SocialIconName
}

export interface Profile {
  email: string
  phone: string
  portrait: string
  instagram?: string
  facebook?: string
}
