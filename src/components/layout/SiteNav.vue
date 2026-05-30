<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { PAGE_NAV_LINKS } from '@/constants/sections'
import { isLocaleCode } from '@/i18n'
import type { LocaleCode } from '@/models/types'
import LangToggle from '@/components/ui/LangToggle.vue'

const { t } = useI18n()
const route = useRoute()
const menuOpen = ref(false)
const scrolled = ref(false)

const locale = computed<LocaleCode>(() => {
  const raw = route.params.locale
  const value = Array.isArray(raw) ? raw[0] : raw
  return value && isLocaleCode(value) ? value : 'en'
})

function closeMenu() {
  menuOpen.value = false
}

function onScroll() {
  scrolled.value = window.scrollY > 24
}

function isActivePage(name: 'home' | 'about'): boolean {
  return route.name === name
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <header class="nav" :class="['nav--' + locale, { 'nav--scrolled': scrolled }]">
    <div class="nav__inner container">
      <div class="nav__brand-cluster">
        <RouterLink :to="{ name: 'home', params: { locale } }" class="nav__brand font-brand" @click="closeMenu">
          {{ t('profile.name') }}
        </RouterLink>
        <div class="nav__lang-wrap">
          <LangToggle />
        </div>
      </div>

      <button
        class="nav__toggle"
        type="button"
        :aria-expanded="menuOpen"
        :aria-label="t('nav.menu')"
        @click="menuOpen = !menuOpen"
      >
        <span class="nav__toggle-bar" />
        <span class="nav__toggle-bar" />
        <span class="nav__toggle-bar" />
      </button>

      <nav class="nav__links" :class="{ 'nav__links--open': menuOpen }">
        <RouterLink
          v-for="link in PAGE_NAV_LINKS"
          :key="link.id"
          :to="{ name: link.to, params: { locale } }"
          class="nav__link"
          :class="{ 'nav__link--active': isActivePage(link.to) }"
          @click="closeMenu"
        >
          {{ t(link.labelKey) }}
        </RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.nav {
  position: sticky;
  top: 0;
  z-index: 100;
  height: var(--nav-height);
  background: rgba(251, 247, 240, 0.88);
  backdrop-filter: blur(12px);
  transition:
    background var(--transition),
    backdrop-filter var(--transition);
}

.nav::after {
  content: '';
  position: absolute;
  inset-inline: 0;
  bottom: 0;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(184, 163, 212, 0.45) 50%,
    transparent
  );
  pointer-events: none;
}

.nav--scrolled {
  background: rgba(251, 247, 240, 0.94);
}

/* Physical L/R layout (not flipped by page RTL) */
.nav__inner {
  display: flex;
  flex-direction: row;
  direction: ltr;
  align-items: center;
  height: 100%;
  gap: var(--space-lg);
}

.nav--en .nav__links {
  order: 1;
}

.nav__brand-cluster {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  flex-shrink: 0;
}

.nav__lang-wrap {
  direction: ltr;
  unicode-bidi: isolate;
  flex-shrink: 0;
}

/* EN: toggle left of name · HE: toggle right of name */
.nav--en .nav__brand-cluster {
  order: 2;
  flex-direction: row-reverse;
  margin-left: auto;
}

.nav--en .nav__toggle {
  order: 3;
}

.nav--he .nav__brand-cluster {
  order: 1;
  flex-direction: row;
}

.nav--he .nav__links {
  order: 2;
  flex-direction: row-reverse;
  margin-left: auto;
}

.nav--he .nav__toggle {
  order: 3;
  margin-left: var(--space-md);
}

.nav__brand {
  font-size: 1.5rem;
  line-height: 1;
  color: var(--color-ink);
  transition: color var(--transition);
}

.nav__brand:hover {
  color: var(--color-ink-soft);
}

.nav__toggle {
  display: none;
  flex-direction: column;
  gap: 5px;
  padding: var(--space-xs);
  flex-shrink: 0;
}

.nav__toggle-bar {
  display: block;
  width: 22px;
  height: 2px;
  background: var(--color-ink);
  border-radius: 1px;
  transition: transform var(--transition);
}

.nav__links {
  display: flex;
  align-items: center;
  gap: var(--space-lg);
}

.nav__link {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-ink-soft);
  transition: color var(--transition);
}

.nav__link:hover,
.nav__link--active {
  color: var(--color-ink);
}

@media (max-width: 860px) {
  .nav__toggle {
    display: flex;
  }

  .nav--en .nav__brand-cluster {
    margin-left: auto;
  }

  .nav--he .nav__toggle {
    margin-left: auto;
  }

  .nav--he .nav__links {
    flex-direction: column;
  }

  .nav__links {
    position: fixed;
    left: 0;
    right: 0;
    top: var(--nav-height);
    flex-direction: column;
    align-items: stretch;
    padding: var(--space-xl);
    gap: var(--space-md);
    background: rgba(251, 247, 240, 0.97);
    backdrop-filter: blur(16px);
    border-bottom: 1px solid rgba(61, 58, 54, 0.08);
    transform: translateY(-110%);
    opacity: 0;
    pointer-events: none;
    transition:
      transform var(--transition),
      opacity var(--transition);
  }

  .nav__links--open {
    transform: translateY(0);
    opacity: 1;
    pointer-events: auto;
  }

  .nav__link {
    padding-block: var(--space-sm);
    font-size: 1.25rem;
  }
}
</style>
