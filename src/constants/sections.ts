export const SECTION_IDS = [
  'hero',
  'gallery',
  'work-with',
  'process',
  'services',
  'about',
  'experience',
  'contact',
] as const

export type SectionId = (typeof SECTION_IDS)[number]

export type PageSection = {
  id: SectionId
  labelKey: string
}

export type PageNavLink = {
  id: string
  labelKey: string
  to: 'home' | 'about'
}

export const PAGE_NAV_LINKS: PageNavLink[] = [
  { to: 'home', labelKey: 'nav.home', id: 'home' },
  { to: 'about', labelKey: 'nav.about', id: 'about' },
]

export const HOME_PAGE_SECTIONS: PageSection[] = [
  { id: 'hero', labelKey: 'sectionNav.hero' },
  { id: 'gallery', labelKey: 'nav.gallery' },
  { id: 'contact', labelKey: 'nav.contact' },
]

export const ABOUT_PAGE_SECTIONS: PageSection[] = [
  { id: 'work-with', labelKey: 'nav.workWith' },
  { id: 'process', labelKey: 'nav.process' },
  { id: 'services', labelKey: 'nav.services' },
  { id: 'about', labelKey: 'nav.about' },
  { id: 'experience', labelKey: 'nav.experience' },
]
