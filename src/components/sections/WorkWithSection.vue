<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { workWithItems } from '@/data/workWith'
import { localePath } from '@/composables/useLocale'
import { isLocaleCode } from '@/i18n'
import type { LocaleCode } from '@/models/types'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import ScrollReveal from '@/components/ui/ScrollReveal.vue'

const { t } = useI18n()
const route = useRoute()

const locale = computed<LocaleCode>(() => {
  const raw = route.params.locale
  const value = Array.isArray(raw) ? raw[0] : raw
  return value && isLocaleCode(value) ? value : 'en'
})

function galleryHref(hash: string): string {
  return localePath(locale.value, hash, 'home')
}
</script>

<template>
  <section id="work-with" class="work-with section">
    <div class="container">
      <ScrollReveal>
        <SectionHeading
          label-key="workWith.label"
          title-key="workWith.title"
          subtitle-key="workWith.subtitle"
        />
      </ScrollReveal>

      <div class="work-with__grid">
        <ScrollReveal v-for="item in workWithItems" :key="item.id">
          <a :href="galleryHref(item.link)" class="work-with__card">
            <p class="work-with__purpose">{{ t(item.purposeKey) }}</p>
            <h3 class="work-with__title">{{ t(item.titleKey) }}</h3>
            <p class="work-with__description">{{ t(item.descriptionKey) }}</p>
            <p class="work-with__outcome">{{ t(item.outcomeKey) }}</p>
            <span class="work-with__arrow" aria-hidden="true">→</span>
          </a>
        </ScrollReveal>
      </div>
    </div>
  </section>
</template>

<style scoped>
.work-with__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-lg);
}

.work-with__card {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  padding: var(--space-xl);
  min-height: 100%;
  border-radius: var(--radius-lg);
  background: rgba(255, 255, 255, 0.72);
  border: 1px solid rgba(61, 58, 54, 0.08);
  box-shadow: var(--shadow-soft);
  transition:
    transform var(--transition),
    box-shadow var(--transition);
}

.work-with__card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-card);
}

.work-with__purpose {
  font-size: 0.8125rem;
  font-weight: 700;
  line-height: 1.45;
  color: var(--color-ink-muted);
  font-style: italic;
}

.work-with__title {
  font-size: 1.25rem;
  margin-top: var(--space-xs);
}

.work-with__description {
  flex: 1;
  color: var(--color-ink-soft);
  font-size: 0.975rem;
}

.work-with__outcome {
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--color-ink);
  margin-top: var(--space-sm);
}

.work-with__arrow {
  margin-top: var(--space-sm);
  font-size: 1.25rem;
  color: var(--color-ink-muted);
  transition: transform var(--transition);
}

.work-with__card:hover .work-with__arrow {
  transform: translateX(4px);
}

[dir='rtl'] .work-with__card:hover .work-with__arrow {
  transform: translateX(-4px);
}

@media (max-width: 900px) {
  .work-with__grid {
    grid-template-columns: 1fr;
  }
}
</style>
