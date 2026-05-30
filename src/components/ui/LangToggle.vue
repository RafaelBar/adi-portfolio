<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useLocale } from '@/composables/useLocale'
import type { LocaleCode } from '@/models/types'

const { t } = useI18n()
const { locale, setLocale } = useLocale()

const options = computed<{ code: LocaleCode; label: string }[]>(() => [
  { code: 'he', label: t('lang.toggleHe') },
  { code: 'en', label: t('lang.toggleEn') },
])
</script>

<template>
  <div
    class="lang-toggle"
    role="group"
    :aria-label="t('lang.ariaLabel')"
    :data-active="locale"
  >
    <span class="lang-toggle__indicator" aria-hidden="true" />
    <button
      v-for="option in options"
      :key="option.code"
      type="button"
      class="lang-toggle__btn"
      :class="{ 'lang-toggle__btn--active': locale === option.code }"
      :aria-pressed="locale === option.code"
      @click="setLocale(option.code)"
    >
      {{ option.label }}
    </button>
  </div>
</template>

<style scoped>
.lang-toggle {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  direction: ltr;
  width: 5.75rem;
  padding: 3px;
  border-radius: var(--radius-full);
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(61, 58, 54, 0.1);
}

.lang-toggle__indicator {
  position: absolute;
  top: 3px;
  bottom: 3px;
  left: 3px;
  width: calc(50% - 4.5px);
  border-radius: var(--radius-full);
  background: var(--color-ink);
  transition: transform var(--transition);
  pointer-events: none;
}

.lang-toggle[data-active='en'] .lang-toggle__indicator {
  transform: translateX(calc(100% + 3px));
}

.lang-toggle__btn {
  position: relative;
  z-index: 1;
  padding: 0.375rem 0;
  border-radius: var(--radius-full);
  font-size: 0.8125rem;
  font-weight: 800;
  text-align: center;
  color: var(--color-ink-soft);
  transition: color var(--transition);
}

.lang-toggle__btn--active {
  color: var(--color-paper);
}

.lang-toggle__btn:not(.lang-toggle__btn--active):hover {
  color: var(--color-ink);
}
</style>
