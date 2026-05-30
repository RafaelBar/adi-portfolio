<script setup lang="ts">
import { useI18n } from 'vue-i18n'

defineProps<{
  labelKey: string
  titleKey: string
  subtitleKey?: string
}>()

const { t } = useI18n()
</script>

<template>
  <header class="heading">
    <span class="section-label">{{ t(labelKey) }}</span>
    <h2 class="section-title">{{ t(titleKey) }}</h2>
    <p v-if="subtitleKey" class="heading__subtitle">{{ t(subtitleKey) }}</p>
  </header>
</template>

<style scoped>
.heading {
  max-width: 40rem;
  margin-bottom: var(--space-2xl);
}

.heading__subtitle {
  margin-top: calc(var(--space-md) * -1);
  color: var(--color-ink-soft);
  font-size: 1.0625rem;
}
</style>
