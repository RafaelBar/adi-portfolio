<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { workWithItems } from '@/data/workWith'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import ScrollReveal from '@/components/ui/ScrollReveal.vue'

const { t } = useI18n()
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
          <article class="work-with__card">
            <h3 class="work-with__title">{{ t(item.titleKey) }}</h3>
            <p class="work-with__description">{{ t(item.descriptionKey) }}</p>
          </article>
        </ScrollReveal>
      </div>
    </div>
  </section>
</template>

<style scoped>
.work-with__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
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
}

.work-with__title {
  font-size: 1.25rem;
}

.work-with__description {
  flex: 1;
  color: var(--color-ink-soft);
  font-size: 0.975rem;
}

@media (max-width: 900px) {
  .work-with__grid {
    grid-template-columns: 1fr;
  }
}
</style>
