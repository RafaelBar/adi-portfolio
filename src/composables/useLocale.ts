import { watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { LOCALE_STORAGE_KEY, applyDocumentLocale, isLocaleCode } from '@/i18n'
import type { LocaleCode } from '@/models/types'

export function useLocale() {
  const { locale } = useI18n()
  const route = useRoute()
  const router = useRouter()

  function setLocale(next: LocaleCode, options?: { replace?: boolean }) {
    if (locale.value === next && route.params.locale === next) {
      applyDocumentLocale(next)
      return
    }

    locale.value = next
    localStorage.setItem(LOCALE_STORAGE_KEY, next)
    applyDocumentLocale(next)

    const routeName = route.name === 'about' ? 'about' : 'home'
    const navigate = options?.replace ? router.replace : router.push
    navigate({
      name: routeName,
      params: { locale: next },
      hash: route.hash || undefined,
    })
  }

  function syncFromRoute() {
    const param = route.params.locale
    const raw = Array.isArray(param) ? param[0] : param
    if (raw && isLocaleCode(raw) && locale.value !== raw) {
      locale.value = raw
      localStorage.setItem(LOCALE_STORAGE_KEY, raw)
      applyDocumentLocale(raw)
    }
  }

  watch(
    () => route.params.locale,
    () => syncFromRoute(),
    { immediate: true },
  )

  return { locale, setLocale }
}

export function localePath(locale: LocaleCode, hash = '', page: 'home' | 'about' = 'home'): string {
  const base = page === 'about' ? `/${locale}/about` : `/${locale}`
  return `${base}${hash}`
}
