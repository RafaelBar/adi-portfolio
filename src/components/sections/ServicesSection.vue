<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { services } from '@/data/services'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import ScrollReveal from '@/components/ui/ScrollReveal.vue'
import ServiceIcon from '@/components/ui/ServiceIcon.vue'

const { t } = useI18n()
</script>

<template>
  <section id="services" class="services section">
    <div class="container">
      <ScrollReveal>
        <SectionHeading
          label-key="services.label"
          title-key="services.title"
          subtitle-key="services.subtitle"
        />
      </ScrollReveal>

      <div class="services__grid">
        <ScrollReveal v-for="service in services" :key="service.id">
          <article class="services__card">
            <ServiceIcon :name="service.icon" class="services__icon" />
            <h3 class="services__title">{{ t(service.titleKey) }}</h3>
            <p class="services__description">{{ t(service.descriptionKey) }}</p>
          </article>
        </ScrollReveal>
      </div>
    </div>
  </section>
</template>

<style scoped>
.services__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-lg);
  max-width: 56rem;
  margin-inline: auto;
}

.services__card {
  padding: var(--space-xl);
  border-radius: var(--radius-lg);
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.9), rgba(245, 213, 208, 0.25));
  border: 1px solid rgba(61, 58, 54, 0.08);
  box-shadow: var(--shadow-soft);
  min-height: 100%;
}

.services__icon {
  display: block;
  margin-bottom: var(--space-md);
}

.services__title {
  font-size: 1.25rem;
  margin-bottom: var(--space-md);
}

.services__description {
  color: var(--color-ink-soft);
  font-size: 0.975rem;
}

@media (max-width: 900px) {
  .services__grid {
    grid-template-columns: 1fr;
  }
}
</style>
