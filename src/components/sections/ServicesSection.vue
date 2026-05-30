<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { services } from '@/data/services'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import ScrollReveal from '@/components/ui/ScrollReveal.vue'

const { t } = useI18n()

const icons: Record<string, string> = {
  book: '📖',
  palette: '🎨',
  sparkle: '✨',
}
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
            <span class="services__icon" aria-hidden="true">{{ icons[service.icon] }}</span>
            <p class="services__audience">{{ t(service.audienceKey) }}</p>
            <p class="services__purpose">{{ t(service.purposeKey) }}</p>
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
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-lg);
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
  font-size: 1.75rem;
  display: block;
  margin-bottom: var(--space-md);
}

.services__audience {
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--color-ink-muted);
  margin-bottom: var(--space-sm);
}

.services__purpose {
  font-size: 0.9rem;
  font-weight: 600;
  line-height: 1.45;
  color: var(--color-ink);
  margin-bottom: var(--space-md);
}

:global(html[lang='he']) .services__audience {
  text-transform: none;
  letter-spacing: normal;
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
