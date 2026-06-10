<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { processSteps } from '@/data/process'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import ScrollReveal from '@/components/ui/ScrollReveal.vue'

const { t } = useI18n()
</script>

<template>
  <section id="process" class="process section">
    <div class="container">
      <ScrollReveal>
        <SectionHeading
          label-key="process.label"
          title-key="process.title"
          subtitle-key="process.subtitle"
        />
      </ScrollReveal>

      <ol class="process__list">
        <ScrollReveal v-for="(step, index) in processSteps" :key="step.id">
          <li class="process__item">
            <span class="process__step" aria-hidden="true">{{ index + 1 }}</span>
            <div class="process__content">
              <h3 class="process__title">{{ t(step.titleKey) }}</h3>
              <p class="process__description">{{ t(step.descriptionKey) }}</p>
            </div>
          </li>
        </ScrollReveal>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.process__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-lg);
  align-items: stretch;
}

.process__list > :deep(.reveal) {
  display: flex;
  height: 100%;
}

.process__item {
  display: flex;
  gap: var(--space-lg);
  width: 100%;
  height: 100%;
  padding: var(--space-xl);
  border-radius: var(--radius-lg);
  background: rgba(255, 255, 255, 0.72);
  border: 1px solid rgba(61, 58, 54, 0.08);
  box-shadow: var(--shadow-soft);
}

.process__step {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: var(--radius-full);
  font-family: var(--font-display);
  font-size: 1.125rem;
  font-weight: 600;
  background: var(--color-ink);
  color: var(--color-paper);
}

.process__content {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
}

.process__title {
  font-size: 1.125rem;
  margin-bottom: var(--space-sm);
}

.process__description {
  color: var(--color-ink-soft);
  font-size: 0.975rem;
}

@media (max-width: 1024px) {
  .process__list {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .process__list {
    grid-template-columns: 1fr;
  }
}
</style>
