import type { Profile, SocialLink } from '@/models/types'

export const profile: Profile = {
  email: 'rafaelbar37@gmail.com',
  phone: '+972528823790',
  portrait: '/primary-image.png',
  instagram: 'https://www.instagram.com/',
  facebook: 'https://www.facebook.com/',
}

export function whatsappUrl(phone: string): string {
  const digits = phone.replace(/\D/g, '')
  return `https://wa.me/${digits}`
}

export const socialLinks: SocialLink[] = [
  {
    id: 'instagram',
    labelKey: 'social.instagram',
    href: profile.instagram ?? '#',
    icon: 'instagram',
  },
  {
    id: 'facebook',
    labelKey: 'social.facebook',
    href: profile.facebook ?? '#',
    icon: 'facebook',
  },
  {
    id: 'email',
    labelKey: 'social.email',
    href: `mailto:${profile.email}`,
    icon: 'email',
  },
]
