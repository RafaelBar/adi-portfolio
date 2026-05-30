<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { experienceEntries } from '@/data/experience'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import ScrollReveal from '@/components/ui/ScrollReveal.vue'

const { t } = useI18n()
</script>

<template>
  <section id="experience" class="experience section">
    <div class="container">
      <ScrollReveal>
        <SectionHeading label-key="experience.label" title-key="experience.title" />
      </ScrollReveal>

      <ol class="experience__list">
        <ScrollReveal v-for="entry in experienceEntries" :key="entry.id">
          <li class="experience__item">
            <span class="experience__year">{{ entry.year }}</span>
            <div class="experience__content">
              <h3 class="experience__title">{{ t(entry.titleKey) }}</h3>
              <p class="experience__description">{{ t(entry.descriptionKey) }}</p>
            </div>
          </li>
        </ScrollReveal>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.experience__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

.experience__item {
  display: grid;
  grid-template-columns: 5rem 1fr;
  gap: var(--space-xl);
  padding: var(--space-xl);
  border-radius: var(--radius-lg);
  background: rgba(255, 255, 255, 0.65);
  border: 1px solid rgba(61, 58, 54, 0.08);
}

.experience__year {
  font-family: var(--font-display);
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-ink-muted);
}

.experience__title {
  font-size: 1.125rem;
  margin-bottom: var(--space-sm);
}

.experience__description {
  color: var(--color-ink-soft);
  font-size: 0.975rem;
}

@media (max-width: 600px) {
  .experience__item {
    grid-template-columns: 1fr;
    gap: var(--space-sm);
  }
}
</style>
