<script setup lang="ts">
import { ref, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { isLocaleCode } from '@/i18n'
import type { LocaleCode } from '@/models/types'

const NAV_OFFSET = 88
const CLOSE_DELAY_MS = 500
const PROMOTION_DISMISSED_KEY = 'adi-portfolio-promotion-dismissed'

const { t, locale: i18nLocale } = useI18n()
const route = useRoute()
const router = useRouter()

function isDismissedInSession(): boolean {
  try {
    return sessionStorage.getItem(PROMOTION_DISMISSED_KEY) === '1'
  } catch {
    return false
  }
}

function markDismissedInSession() {
  try {
    sessionStorage.setItem(PROMOTION_DISMISSED_KEY, '1')
  } catch {
    /* ignore */
  }
}

const isOpen = ref(!isDismissedInSession())
let closeTimer: ReturnType<typeof setTimeout> | null = null

function dismissPromotion() {
  markDismissedInSession()
  isOpen.value = false
}

function closeWithDelay() {
  markDismissedInSession()
  if (closeTimer) clearTimeout(closeTimer)
  closeTimer = setTimeout(() => {
    isOpen.value = false
    closeTimer = null
  }, CLOSE_DELAY_MS)
}

function showPromotion() {
  try {
    sessionStorage.removeItem(PROMOTION_DISMISSED_KEY)
  } catch {
    /* ignore */
  }
  isOpen.value = true
}

onUnmounted(() => {
  if (closeTimer) clearTimeout(closeTimer)
})

function routeLocale(): LocaleCode {
  const raw = route.params.locale
  const value = Array.isArray(raw) ? raw[0] : raw
  return value && isLocaleCode(value) ? value : 'en'
}

function scrollToContact() {
  const el = document.getElementById('contact')
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET
  window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' })
}

async function goToContact() {
  const locale = routeLocale()
  closeWithDelay()

  if (route.name !== 'home') {
    await router.push({ name: 'home', params: { locale }, hash: '#contact' })
    return
  }

  if (route.hash !== '#contact') {
    await router.push({ hash: '#contact' })
  } else {
    scrollToContact()
  }
}
</script>

<template>
  <div class="promotion" :class="{ 'promotion--open': isOpen }">
    <button
      v-show="!isOpen"
      type="button"
      class="promotion__reopen"
      :aria-label="t('promotion.show')"
      @click="showPromotion"
    >
      <svg class="promotion__reopen-icon" viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M9 6l6 6-6 6"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>

    <aside class="promotion__panel" :aria-hidden="!isOpen">
      <div class="promotion__frame">
        <button
          type="button"
          class="promotion__close"
          :aria-label="t('promotion.close')"
          @click="dismissPromotion"
        >
          <svg class="promotion__close-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M7 7l10 10M17 7L7 17"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
            />
          </svg>
        </button>

        <a href="#contact" class="promotion__cta" @click.prevent="goToContact">
          <img
            class="promotion__image"
            src="/adi-promotion.png"
            alt=""
            width="2048"
            height="2048"
            decoding="async"
            fetchpriority="low"
          />

          <div class="promotion__sign">
            <span
              class="promotion__sign-text"
              :dir="i18nLocale === 'he' ? 'rtl' : 'ltr'"
            >
              {{ t('promotion.signText') }}
            </span>
          </div>
        </a>
      </div>
    </aside>
  </div>
</template>

<style scoped>
.promotion__panel {
  position: fixed;
  left: 0;
  bottom: clamp(0.5rem, 2vh, 1rem);
  z-index: 95;
  width: fit-content;
  max-width: min(22rem, 78vw);
  transform: translateX(-110%);
  transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
  pointer-events: none;
}

.promotion--open .promotion__panel {
  transform: translateX(0);
  pointer-events: auto;
}

.promotion__frame {
  position: relative;
  display: block;
  line-height: 0;
}

.promotion__cta {
  position: relative;
  display: block;
  line-height: 0;
  border-radius: var(--radius-md);
  transition: transform var(--transition);
}

.promotion__cta:hover {
  transform: translateY(-2px);
}

.promotion__cta:focus-visible {
  outline: 2px solid var(--color-lavender-deep);
  outline-offset: 4px;
}

.promotion__image {
  display: block;
  width: 100%;
  height: auto;
  pointer-events: none;
  user-select: none;
}

/* Overlay aligned to the pink sign in adi-promotion.png */
.promotion__sign {
  position: absolute;
  top: 28.5%;
  left: 41%;
  width: 37%;
  height: 27%;
  pointer-events: none;
}

.promotion__sign-text {
  position: absolute;
  top: 65px;
  left: 0;
  right: 33px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
  font-size: 14px;
  font-weight: 800;
  line-height: 25px;
  color: #3d3a36;
  text-align: center;
  white-space: pre-line;
}

.promotion__close {
  position: absolute;
  top: 28.5%;
  right: 22%;
  z-index: 3;
  display: grid;
  place-items: center;
  width: 1.5rem;
  height: 1.5rem;
  padding: 0;
  border-radius: 50%;
  color: var(--color-ink);
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid rgba(61, 58, 54, 0.14);
  box-shadow: var(--shadow-soft);
  pointer-events: auto;
  transform: translate(30%, -30%);
  transition:
    background var(--transition),
    transform var(--transition);
}

.promotion__close-icon {
  display: block;
  width: 0.7rem;
  height: 0.7rem;
}

.promotion__close:hover {
  background: #fff;
  transform: translate(30%, -30%) scale(1.05);
}

.promotion__reopen {
  position: fixed;
  left: 0;
  bottom: clamp(1.25rem, 8vh, 3rem);
  z-index: 95;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 4.5rem;
  padding: 0;
  border-radius: 0 var(--radius-md) var(--radius-md) 0;
  color: var(--color-ink);
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid rgba(61, 58, 54, 0.12);
  border-left: none;
  box-shadow: var(--shadow-soft);
  transition:
    background var(--transition),
    transform var(--transition);
}

.promotion__reopen:hover {
  background: #fff;
  transform: translateX(2px);
}

.promotion__reopen-icon {
  display: block;
  width: 1.125rem;
  height: 1.125rem;
  flex-shrink: 0;
}

@media (max-width: 768px) {
  .promotion__panel {
    max-width: min(16rem, 72vw);
  }

  .promotion__sign {
    top: 28%;
    left: 40.5%;
    width: 38%;
    height: 28%;
  }

  .promotion__sign-text {
    top: 47px;
    right: 24px;
    font-size: 10px;
    line-height: 18px;
  }

  .promotion__close {
    top: 28%;
    right: 21.5%;
    width: 1.35rem;
    height: 1.35rem;
    transform: translate(25%, -25%);
  }

  .promotion__close:hover {
    transform: translate(25%, -25%) scale(1.05);
  }

  .promotion__close-icon {
    width: 0.625rem;
    height: 0.625rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .promotion__panel,
  .promotion__cta,
  .promotion__close,
  .promotion__reopen {
    transition: none;
  }
}
</style>
