<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import type { GalleryItem } from '@/models/types'

defineProps<{
  item: GalleryItem
}>()

const emit = defineEmits<{
  close: []
}>()

const { t } = useI18n()

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') emit('close')
}

onMounted(() => {
  document.body.style.overflow = 'hidden'
})

onUnmounted(() => {
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <div
      class="lightbox"
      role="dialog"
      aria-modal="true"
      :aria-label="t('gallery.label')"
      @click.self="emit('close')"
      @keydown="onKeydown"
    >
      <div class="lightbox__panel">
        <button type="button" class="lightbox__close" :aria-label="t('gallery.close')" @click="emit('close')">
          ×
        </button>
        <img :src="item.image" alt="" class="lightbox__image" />
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.lightbox {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-xl);
  background: rgba(61, 58, 54, 0.72);
  backdrop-filter: blur(6px);
}

.lightbox__panel {
  position: relative;
  width: min(100%, 52rem);
  max-height: 90vh;
  overflow: auto;
  border-radius: var(--radius-lg);
  background: var(--color-paper);
  box-shadow: var(--shadow-lift);
  padding: var(--space-lg);
}

.lightbox__close {
  position: absolute;
  top: var(--space-md);
  inset-inline-end: var(--space-md);
  width: 2.5rem;
  height: 2.5rem;
  border-radius: var(--radius-full);
  background: rgba(255, 255, 255, 0.9);
  font-size: 1.5rem;
  line-height: 1;
  color: var(--color-ink);
  z-index: 1;
}

.lightbox__image {
  width: 100%;
  border-radius: var(--radius-md);
}
</style>
