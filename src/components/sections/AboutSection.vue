<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import {
  portraitAssets,
  portraitDefaultSrc,
  portraitSizes,
  portraitSrcset,
} from '@/data/portrait'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import OptimizedImage from '@/components/ui/OptimizedImage.vue'
import ScrollReveal from '@/components/ui/ScrollReveal.vue'

const { t } = useI18n()
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
            <OptimizedImage
              :src="portraitDefaultSrc"
              :srcset="portraitSrcset()"
              :sizes="portraitSizes"
              :width="portraitAssets.width"
              :height="portraitAssets.height"
              :alt="t('profile.name')"
              img-class="about__portrait"
              transparent
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div class="about__text">
            <p class="about__tagline">{{ t('hero.tagline') }}</p>
            <p class="about__paragraph about__paragraph--pre">{{ t('hero.hook') }}</p>
            <p class="about__paragraph about__paragraph--pre">{{ t('hero.invitation') }}</p>
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
  width: 100%;
  max-width: 48rem;
}

.about__portrait {
  max-width: 48rem;
}

.about__text {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

.about__tagline {
  font-size: clamp(1.125rem, 2.4vw, 1.375rem);
  color: var(--color-ink-soft);
}

.about__paragraph {
  color: var(--color-ink-soft);
  font-size: 1.0625rem;
}

.about__paragraph--pre {
  white-space: pre-line;
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
