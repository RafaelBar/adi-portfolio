<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { usePageSections } from '@/composables/usePageSections'

const { locale, t } = useI18n()
const { sections, activeId, sectionProgress, scrollToSection } = usePageSections()
</script>

<template>
  <nav
    class="section-progress"
    :class="`section-progress--${locale}`"
    :aria-label="t('sectionNav.label')"
    :style="{ '--scroll-progress': String(sectionProgress) }"
  >
    <ol class="section-progress__list">
      <li v-for="section in sections" :key="section.id" class="section-progress__item">
        <button
          type="button"
          class="section-progress__btn"
          :class="{ 'section-progress__btn--active': activeId === section.id }"
          :aria-label="t(section.labelKey)"
          :aria-current="activeId === section.id ? 'true' : undefined"
          @click="scrollToSection(section.id)"
        >
          <span class="section-progress__dot" aria-hidden="true" />
          <span class="section-progress__label">{{ t(section.labelKey) }}</span>
        </button>
      </li>
    </ol>
  </nav>
</template>

<style scoped>
.section-progress {
  --rail-width: 4px;
  --dot-size: 0.625rem;
  --tooltip-gap: 1.35rem;
  position: fixed;
  inset-inline-start: clamp(0.75rem, 2vw, 1.5rem);
  top: 50%;
  z-index: 90;
  transform: translateY(-50%);
}

.section-progress__list {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
  list-style: none;
  margin: 0;
  padding: var(--space-xs) 0;
}

.section-progress__list::before {
  content: '';
  position: absolute;
  inset-inline-start: calc((var(--dot-size) - var(--rail-width)) / 2);
  top: calc(var(--dot-size) / 2);
  bottom: calc(var(--dot-size) / 2);
  width: var(--rail-width);
  border-radius: var(--radius-full);
  background: rgba(61, 58, 54, 0.25);
}

.section-progress__list::after {
  content: '';
  position: absolute;
  inset-inline-start: calc((var(--dot-size) - var(--rail-width)) / 2);
  top: calc(var(--dot-size) / 2);
  width: var(--rail-width);
  height: calc((100% - var(--dot-size)) * var(--scroll-progress, 0));
  border-radius: var(--radius-full);
  background: var(--color-lavender-deep);
  transition: height 0.15s ease-out;
  pointer-events: none;
}

.section-progress__item {
  margin: 0;
}

.section-progress__btn {
  position: relative;
  display: block;
  width: var(--dot-size);
  height: var(--dot-size);
  padding: 0;
  border: none;
  background: transparent;
}

.section-progress__dot {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: var(--radius-full);
  border: 2px solid rgba(61, 58, 54, 0.4);
  background: var(--color-paper);
  box-shadow: 0 0 0 2px var(--color-paper);
  transition:
    background var(--transition),
    border-color var(--transition),
    transform var(--transition);
}

.section-progress__btn:hover .section-progress__dot,
.section-progress__btn:focus-visible .section-progress__dot {
  border-color: var(--color-ink-soft);
  transform: scale(1.1);
}

.section-progress__btn--active .section-progress__dot {
  background: var(--color-lavender-deep);
  border-color: var(--color-lavender-deep);
  transform: scale(1.15);
}

.section-progress__label {
  position: absolute;
  top: 50%;
  z-index: 2;
  padding: 0.35rem 0.625rem;
  border-radius: var(--radius-sm);
  font-size: 0.8125rem;
  font-weight: 700;
  line-height: 1.2;
  white-space: nowrap;
  color: var(--color-ink);
  background: rgba(251, 247, 240, 0.96);
  border: 1px solid rgba(61, 58, 54, 0.1);
  box-shadow: var(--shadow-soft);
  opacity: 0;
  pointer-events: none;
  transition: opacity var(--transition);
}

.section-progress--en .section-progress__label {
  left: calc(100% + var(--tooltip-gap));
  right: auto;
  transform: translateY(-50%);
}

.section-progress--he .section-progress__label {
  right: calc(100% + var(--tooltip-gap));
  left: auto;
  transform: translateY(-50%);
}

.section-progress__btn:hover .section-progress__label,
.section-progress__btn:focus-visible .section-progress__label {
  opacity: 1;
}

@media (max-width: 900px) {
  .section-progress {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .section-progress__list::after,
  .section-progress__dot,
  .section-progress__label {
    transition: none;
  }
}
</style>
