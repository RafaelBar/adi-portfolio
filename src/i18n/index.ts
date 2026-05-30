import { createI18n } from 'vue-i18n'
import en from '@/locales/en.json'
import he from '@/locales/he.json'
import type { LocaleCode } from '@/models/types'

export const LOCALE_STORAGE_KEY = 'adi-portfolio-locale'

export const i18n = createI18n({
  legacy: false,
  locale: 'en' as LocaleCode,
  fallbackLocale: 'en' as LocaleCode,
  messages: { en, he },
})

export function isLocaleCode(value: string): value is LocaleCode {
  return value === 'he' || value === 'en'
}

export function getPreferredLocale(): LocaleCode {
  const stored = localStorage.getItem(LOCALE_STORAGE_KEY)
  if (stored && isLocaleCode(stored)) return stored

  const browserLang = navigator.language.toLowerCase()
  return browserLang.startsWith('he') ? 'he' : 'en'
}

export function applyDocumentLocale(locale: LocaleCode): void {
  document.documentElement.lang = locale
  document.documentElement.dir = locale === 'he' ? 'rtl' : 'ltr'
}
