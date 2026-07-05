import { watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { absoluteUrl, ogLocaleFor, OG_IMAGE_PATH } from '@/data/seo'
import type { LocaleCode } from '@/models/types'

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

export function useSeo() {
  const { t, locale } = useI18n()
  const route = useRoute()

  watchEffect(() => {
    locale.value
    const code = locale.value as LocaleCode
    const title = t('meta.title')
    const pageUrl = absoluteUrl(route.path)
    const altLocale = ogLocaleFor(code === 'he' ? 'en' : 'he')
    const imageAlt =
      code === 'he' ? 'עדי בדש — מאיירת ספרי ילדים' : "Adi Badash — children's book illustrator"

    document.title = title

    setMeta('property', 'og:title', title)
    setMeta('property', 'og:url', pageUrl)
    setMeta('property', 'og:locale', ogLocaleFor(code))
    setMeta('property', 'og:locale:alternate', altLocale)
    setMeta('property', 'og:image:alt', imageAlt)
    setMeta('name', 'twitter:title', title)
    setMeta('name', 'twitter:image', absoluteUrl(OG_IMAGE_PATH))
  })
}
