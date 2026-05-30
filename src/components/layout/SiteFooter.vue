<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { socialLinks } from '@/data/profile'
import SocialIcon from '@/components/ui/SocialIcon.vue'

const { t } = useI18n()
const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="footer__inner container">
      <div class="footer__brand">
        <p class="footer__name font-brand">{{ t('profile.name') }}</p>
        <p class="footer__tagline">{{ t('footer.tagline') }}</p>
      </div>

      <div class="footer__links">
        <a
          v-for="link in socialLinks"
          :key="link.id"
          :href="link.href"
          class="footer__link"
          :target="link.icon === 'email' ? undefined : '_blank'"
          :rel="link.icon === 'email' ? undefined : 'noopener noreferrer'"
        >
          <SocialIcon :name="link.icon" />
          <span>{{ t(link.labelKey) }}</span>
        </a>
      </div>

      <p class="footer__rights">© {{ year }} · {{ t('footer.rights') }}</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  position: relative;
  z-index: 1;
  padding-block: var(--space-3xl) var(--space-xl);
  border-top: 1px solid rgba(61, 58, 54, 0.08);
  background: rgba(243, 236, 224, 0.82);
  backdrop-filter: blur(8px);
}

.footer__inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: var(--space-lg);
}

.footer__name {
  font-size: 1.75rem;
  line-height: 1.1;
  margin-bottom: var(--space-xs);
}

.footer__tagline {
  color: var(--color-ink-soft);
  font-size: 0.9375rem;
}

.footer__links {
  display: flex;
  gap: var(--space-lg);
  flex-wrap: wrap;
  justify-content: center;
}

.footer__link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
  font-weight: 700;
  font-size: 0.875rem;
  color: var(--color-ink-soft);
  transition: color var(--transition);
}

.footer__link:hover {
  color: var(--color-ink);
}

.footer__rights {
  font-size: 0.8125rem;
  color: var(--color-ink-muted);
}
</style>
