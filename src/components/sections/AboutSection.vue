<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { profile } from '@/data/profile'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import ScrollReveal from '@/components/ui/ScrollReveal.vue'

const { t, tm } = useI18n()

const paragraphs = tm('about.paragraphs') as string[]
</script>

<template>
  <section id="about" class="about section">
    <div class="container">
      <ScrollReveal>
        <SectionHeading label-key="about.label" title-key="about.title" />
      </ScrollReveal>

      <div class="about__grid">
        <ScrollReveal>
          <div class="about__portrait-wrap">
            <img :src="profile.portrait" :alt="t('profile.name')" class="about__portrait" />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div class="about__text">
            <p v-for="(paragraph, index) in paragraphs" :key="index" class="about__paragraph">
              {{ paragraph }}
            </p>
          </div>
        </ScrollReveal>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about__grid {
  display: grid;
  grid-template-columns: 0.85fr 1.15fr;
  gap: clamp(2rem, 4vw, 3.5rem);
  align-items: center;
}

.about__portrait-wrap {
  display: flex;
  justify-content: center;
}

.about__portrait {
  display: block;
  width: 100%;
  max-width: 48rem;
  height: auto;
  object-fit: contain;
}

.about__text {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

.about__paragraph {
  color: var(--color-ink-soft);
  font-size: 1.0625rem;
}

@media (max-width: 768px) {
  .about__grid {
    grid-template-columns: 1fr;
  }

  .about__portrait-wrap {
    max-width: 48rem;
    margin-inline: auto;
  }
}
</style>
