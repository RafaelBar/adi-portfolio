import { watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'

export function useSeo() {
  const { t, locale } = useI18n()

  watchEffect(() => {
    locale.value
    document.title = t('meta.title')

    let description = document.querySelector('meta[name="description"]')
    if (!description) {
      description = document.createElement('meta')
      description.setAttribute('name', 'description')
      document.head.appendChild(description)
    }
    description.setAttribute('content', t('meta.description'))
  })
}
