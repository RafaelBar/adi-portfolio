import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import { getPreferredLocale, isLocaleCode, i18n, applyDocumentLocale, LOCALE_STORAGE_KEY } from '@/i18n'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: () => `/${getPreferredLocale()}`,
    },
    {
      path: '/:locale(he|en)',
      name: 'home',
      component: HomeView,
      props: (route) => ({ locale: route.params.locale }),
    },
    {
      path: '/:locale(he|en)/about',
      name: 'about',
      component: AboutView,
      props: (route) => ({ locale: route.params.locale }),
    },
    {
      path: '/:locale(he|en)/i/:imageId',
      redirect: (to) => {
        const imageId = String(to.params.imageId).replace(/\.html$/i, '')
        return {
          path: `/${String(to.params.locale)}`,
          hash: `#gallery/${imageId}`,
        }
      },
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: () => `/${getPreferredLocale()}`,
    },
  ],
  scrollBehavior(to) {
    const imageId = to.hash.match(/^#gallery\/([^/?#]+)$/)?.[1]
    if (imageId || to.hash.startsWith('#gallery')) {
      return { el: '#gallery', behavior: 'smooth', top: 80 }
    }
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth', top: 80 }
    }
    return { top: 0 }
  },
})

router.beforeEach((to) => {
  const raw = to.params.locale
  const value = Array.isArray(raw) ? raw[0] : raw
  if (value && isLocaleCode(value)) {
    i18n.global.locale.value = value
    applyDocumentLocale(value)
    localStorage.setItem(LOCALE_STORAGE_KEY, value)
  }
})

export default router

export function localeFromRouteParam(value: string | string[]): string | null {
  const raw = Array.isArray(value) ? value[0] : value
  return raw && isLocaleCode(raw) ? raw : null
}
