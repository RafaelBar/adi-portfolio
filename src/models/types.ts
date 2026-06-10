export type LocaleCode = 'he' | 'en'

export type GalleryCategory = 'selected-work' | 'full-book-spread'

export interface GalleryItem {
  id: string
  category: GalleryCategory
  image: string
  width: number
  height: number
}

export interface ServiceItem {
  id: string
  icon: string
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
