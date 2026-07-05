<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { getGalleryCaption } from '@/data/gallery-captions'
import type { GalleryItem, LocaleCode } from '@/models/types'
import OptimizedImage from '@/components/ui/OptimizedImage.vue'
import GalleryShareFooter from '@/components/ui/GalleryShareFooter.vue'

defineProps<{
  item: GalleryItem
}>()

const emit = defineEmits<{
  open: []
}>()

const { locale } = useI18n()

function itemCaption(item: GalleryItem) {
  return getGalleryCaption(item.id, locale.value as LocaleCode)
}
</script>

<template>
  <div class="gallery-card">
    <button type="button" class="gallery-card__open" @click="emit('open')">
      <OptimizedImage
        :src="item.thumb"
        :alt="itemCaption(item)"
        :width="item.thumbWidth"
        :height="item.thumbHeight"
        fit="cover"
        img-class="gallery-card__image"
      />
    </button>

    <GalleryShareFooter
      :image-id="item.id"
      :title="itemCaption(item)"
    />
  </div>
</template>

<style scoped>
.gallery-card {
  position: relative;
  border-radius: var(--radius-md);
  overflow: hidden;
  box-shadow: var(--shadow-soft);
  transition:
    transform var(--transition),
    box-shadow var(--transition);
}

.gallery-card:hover,
.gallery-card:focus-within {
  transform: translateY(-4px);
  box-shadow: var(--shadow-card);
}

.gallery-card:hover :deep(.gallery-share-footer),
.gallery-card:focus-within :deep(.gallery-share-footer) {
  opacity: 1;
}

.gallery-card__open {
  display: block;
  width: 100%;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
}

.gallery-card__open :deep(.optimized-image) {
  width: 100%;
}

.gallery-card__image {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
