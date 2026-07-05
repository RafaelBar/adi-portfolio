import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { i18n, applyDocumentLocale, getPreferredLocale, isLocaleCode } from './i18n'
import { redirectSharePathToHash } from './utils/gallery-share'
import './assets/styles/global.css'

function getInitialLocale() {
  const match = window.location.pathname.match(/^\/(he|en)(?:\/|$)/)
  if (match && isLocaleCode(match[1])) return match[1]
  return getPreferredLocale()
}

if (redirectSharePathToHash()) {
  // Navigation in progress — skip mounting until the hash URL loads.
} else {
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual'
  }

  const initialLocale = getInitialLocale()
  i18n.global.locale.value = initialLocale
  applyDocumentLocale(initialLocale)

  createApp(App).use(router).use(i18n).mount('#app')
}
