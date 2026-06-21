import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { i18n, applyDocumentLocale, getPreferredLocale, isLocaleCode } from './i18n'
import './assets/styles/global.css'

function getInitialLocale() {
  const match = window.location.pathname.match(/^\/(he|en)(?:\/|$)/)
  if (match && isLocaleCode(match[1])) return match[1]
  return getPreferredLocale()
}

const initialLocale = getInitialLocale()
i18n.global.locale.value = initialLocale
applyDocumentLocale(initialLocale)

createApp(App).use(router).use(i18n).mount('#app')
