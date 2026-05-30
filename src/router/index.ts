import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import { getPreferredLocale, isLocaleCode } from '@/i18n'

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
      path: '/:pathMatch(.*)*',
      redirect: () => `/${getPreferredLocale()}`,
    },
  ],
  scrollBehavior(to) {
    if (to.hash.startsWith('#gallery')) {
      return { el: '#gallery', behavior: 'smooth', top: 80 }
    }
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth', top: 80 }
    }
    return { top: 0 }
  },
})

export default router

export function localeFromRouteParam(value: string | string[]): string | null {
  const raw = Array.isArray(value) ? value[0] : value
  return raw && isLocaleCode(raw) ? raw : null
}
