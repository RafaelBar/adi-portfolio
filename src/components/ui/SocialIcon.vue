<script setup lang="ts">
import type { SocialIconName } from '@/models/types'

defineProps<{
  name: SocialIconName
}>()
</script>

<template>
  <svg class="social-icon" viewBox="0 0 24 24" aria-hidden="true">
    <path
      v-if="name === 'instagram'"
      fill="currentColor"
      d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 2A3.75 3.75 0 0 0 4 7.75v8.5A3.75 3.75 0 0 0 7.75 20h8.5A3.75 3.75 0 0 0 20 16.25v-8.5A3.75 3.75 0 0 0 16.25 4h-8.5zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm5.25-2.9a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3z"
    />
    <path
      v-else-if="name === 'facebook'"
      fill="currentColor"
      d="M13.5 22v-8h2.7l.5-3.5H13.5V8.9c0-1 .3-1.7 1.8-1.7H17V4.1C16.4 4 15.3 4 14.1 4 11.6 4 10 5.4 10 8.2V10.5H7v3.5h3V22h3.5z"
    />
    <path
      v-else-if="name === 'email'"
      fill="currentColor"
      d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"
    />
    <path
      v-else-if="name === 'phone'"
      fill="currentColor"
      d="M6.62 10.79a15.91 15.91 0 0 0 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"
    />
  </svg>
</template>

<style scoped>
.social-icon {
  width: 1.25rem;
  height: 1.25rem;
  flex-shrink: 0;
}
</style>
