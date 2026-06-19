import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { i18n, applyDocumentLocale, getPreferredLocale } from './i18n'
import './assets/styles/global.css'

const preferredLocale = getPreferredLocale()
i18n.global.locale.value = preferredLocale
applyDocumentLocale(preferredLocale)

createApp(App).use(router).use(i18n).mount('#app')
