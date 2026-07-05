<script setup lang="ts">
import GalleryShareButton from '@/components/ui/GalleryShareButton.vue'

defineProps<{
  imageId: string
  title: string
}>()
</script>

<template>
  <div class="gallery-share-footer">
    <GalleryShareButton
      :image-id="imageId"
      :title="title"
      variant="card"
    />
  </div>
</template>

<style scoped>
.gallery-share-footer {
  position: absolute;
  inset-inline: 0;
  bottom: 0;
  z-index: 2;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  padding: 2.75rem var(--space-md) var(--space-md);
  background: linear-gradient(
    to top,
    rgba(61, 58, 54, 0.42) 0%,
    rgba(61, 58, 54, 0.12) 45%,
    transparent 100%
  );
  opacity: 0;
  pointer-events: none;
  transition: opacity var(--transition);
  border-radius: 0 0 var(--radius-md) var(--radius-md);
}

.gallery-share-footer :deep(.gallery-share) {
  pointer-events: auto;
}

@media (max-width: 768px) {
  .gallery-share-footer {
    opacity: 1;
    padding-top: 2.25rem;
    background: linear-gradient(
      to top,
      rgba(61, 58, 54, 0.34) 0%,
      rgba(61, 58, 54, 0.08) 50%,
      transparent 100%
    );
  }
}
</style>
