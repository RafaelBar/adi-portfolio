import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { i18n, applyDocumentLocale, getPreferredLocale } from './i18n'
import './assets/styles/global.css'

applyDocumentLocale(getPreferredLocale())

createApp(App).use(router).use(i18n).mount('#app')
