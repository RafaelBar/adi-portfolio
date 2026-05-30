import { watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'

export function useSeo() {
  const { t } = useI18n()

  watchEffect(() => {
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
