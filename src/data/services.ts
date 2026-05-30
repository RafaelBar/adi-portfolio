import type { ServiceItem } from '@/models/types'

export const services: ServiceItem[] = [
  {
    id: 'books',
    icon: 'book',
    purposeKey: 'services.items.books.purpose',
    titleKey: 'services.items.books.title',
    descriptionKey: 'services.items.books.description',
    audienceKey: 'services.items.books.audience',
  },
  {
    id: 'custom',
    icon: 'palette',
    purposeKey: 'services.items.custom.purpose',
    titleKey: 'services.items.custom.title',
    descriptionKey: 'services.items.custom.description',
    audienceKey: 'services.items.custom.audience',
  },
  {
    id: 'graphic-design',
    icon: 'sparkle',
    purposeKey: 'services.items.design.purpose',
    titleKey: 'services.items.design.title',
    descriptionKey: 'services.items.design.description',
    audienceKey: 'services.items.design.audience',
  },
]
