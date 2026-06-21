<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import {
  portraitAssets,
  portraitDefaultSrc,
  portraitSizes,
  portraitSrcset,
} from '@/data/portrait'
import { useAppLoader } from '@/composables/useAppLoader'
import OptimizedImage from '@/components/ui/OptimizedImage.vue'
import ScrollReveal from '@/components/ui/ScrollReveal.vue'

const { t } = useI18n()
const { markPortraitReady } = useAppLoader()
</script>

<template>
  <section id="hero" class="hero section">
    <div class="hero__inner container">
      <div class="hero__copy">
        <ScrollReveal class="hero__area-intro">
          <div class="hero__intro">
            <p class="hero__greeting">{{ t('hero.greeting') }}</p>
            <h1 class="hero__name font-brand">{{ t('profile.name') }}</h1>
            <p class="hero__tagline">{{ t('hero.tagline') }}</p>
          </div>
        </ScrollReveal>

        <ScrollReveal class="hero__area-hook">
          <p class="hero__hook">{{ t('hero.hook') }}</p>
        </ScrollReveal>

        <ScrollReveal class="hero__area-invitation">
          <p class="hero__invitation">{{ t('hero.invitation') }}</p>
        </ScrollReveal>

        <ScrollReveal class="hero__area-actions">
          <div class="hero__actions">
            <a href="#gallery" class="btn btn--primary">{{ t('hero.ctaGallery') }}</a>
            <a href="#contact" class="btn btn--project">{{ t('hero.ctaContact') }}</a>
          </div>
        </ScrollReveal>
      </div>

      <ScrollReveal class="hero__area-visual">
        <div class="hero__visual" aria-hidden="true">
          <div class="hero__frame">
            <OptimizedImage
              :src="portraitDefaultSrc"
              :srcset="portraitSrcset()"
              :sizes="portraitSizes"
              :width="portraitAssets.width"
              :height="portraitAssets.height"
              :alt="t('profile.name')"
              img-class="hero__portrait"
              priority
              transparent
              @load="markPortraitReady"
            />
          </div>
          <div class="hero__accent hero__accent--1" />
          <div class="hero__accent hero__accent--2" />
        </div>
      </ScrollReveal>
    </div>
  </section>
</template>

<style scoped>
.hero {
  padding-top: clamp(1.5rem, 4vw, 2.5rem);
  padding-bottom: clamp(1.5rem, 3vw, 2.5rem);
}

.hero__inner {
  display: grid;
  grid-template-columns: 0.92fr 1.15fr;
  grid-template-areas: 'copy visual';
  align-items: center;
  gap: clamp(2rem, 5vw, 4rem);
}

.hero__copy {
  grid-area: copy;
  display: flex;
  flex-direction: column;
}

.hero__area-visual {
  grid-area: visual;
}

.hero__greeting {
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-ink-muted);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: var(--space-sm);
  white-space: pre-line;
}

:global(html[lang='he']) .hero__greeting {
  text-transform: none;
  letter-spacing: 0.02em;
}

.hero__name {
  font-family: var(--font-hero-name);
  font-size: clamp(3rem, 8vw, 5rem);
  line-height: 1.05;
  margin-bottom: var(--space-md);
  color: var(--color-lavender-deep);
}

.hero__tagline {
  font-size: clamp(1.25rem, 2.8vw, 1.5rem);
  color: var(--color-ink-soft);
  margin-bottom: var(--space-lg);
}

.hero__hook,
.hero__invitation {
  max-width: 34rem;
  color: var(--color-ink-soft);
  white-space: pre-line;
}

.hero__hook {
  margin-bottom: var(--space-md);
}

.hero__invitation {
  margin-bottom: 0;
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-md);
  overflow: visible;
  margin-bottom: 0;
}

.hero__actions .btn--project {
  color: var(--color-ink);
  border: none;
  box-shadow: none;
  background: linear-gradient(
    135deg,
    var(--color-lavender),
    #ebe4f8,
    #dce8d9,
    var(--color-sage),
    #c8d8c4,
    var(--color-lavender)
  );
  background-size: 220% 220%;
  animation: hero-project-colors 9s ease-in-out infinite;
}

@keyframes hero-project-colors {
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.hero__actions .btn--project:hover {
  transform: translateY(-2px);
  box-shadow: none;
}

@media (prefers-reduced-motion: reduce) {
  .hero__actions .btn--project {
    animation: none;
    background-position: 50% 50%;
  }
}

.hero__visual {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.hero__frame {
  position: relative;
  z-index: 1;
  width: min(100%, 56rem);
}

.hero__portrait {
  max-height: min(95vh, 64rem);
}

.hero__accent {
  position: absolute;
  border-radius: 50%;
  opacity: 0.55;
  z-index: 0;
}

.hero__accent--1 {
  width: 6.5rem;
  height: 6.5rem;
  top: -1.25rem;
  inset-inline-end: 0.5rem;
  background: var(--color-lavender);
}

.hero__accent--2 {
  width: 4.5rem;
  height: 4.5rem;
  bottom: 1.5rem;
  inset-inline-start: -0.25rem;
  background: var(--color-sage);
}

@media (min-width: 769px) {
  .hero__invitation {
    margin-bottom: var(--space-xl);
  }
}

@media (max-width: 768px) {
  .hero__inner {
    display: flex;
    flex-direction: column;
    gap: clamp(1.5rem, 4vw, 2rem);
  }

  .hero__copy {
    display: contents;
  }

  .hero__area-intro {
    order: 1;
  }

  .hero__area-visual {
    order: 2;
  }

  .hero__area-hook {
    order: 3;
  }

  .hero__area-invitation {
    order: 4;
  }

  .hero__area-actions {
    order: 5;
  }

  .hero__tagline {
    margin-bottom: 0;
  }

  .hero__invitation {
    margin-bottom: var(--space-xl);
  }

  .hero__actions {
    flex-wrap: nowrap;
    gap: var(--space-sm);
    margin-bottom: 0;
  }

  .hero__actions :deep(.btn) {
    flex: 1 1 0;
    min-width: 0;
    padding: 0.75rem 0.875rem;
    font-size: 0.8125rem;
    line-height: 1.2;
    text-align: center;
  }

  .hero__frame {
    width: min(100%, 40rem);
  }

  .hero__accent--1 {
    width: 5.5rem;
    height: 5.5rem;
  }

  .hero__accent--2 {
    width: 4rem;
    height: 4rem;
  }
}
</style>
