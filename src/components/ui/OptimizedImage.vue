<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

const props = withDefaults(
  defineProps<{
    src: string
    alt: string
    width: number
    height: number
    srcset?: string
    sizes?: string
    placeholder?: string
    priority?: boolean
    imgClass?: string
    fit?: 'contain' | 'cover'
    transparent?: boolean
  }>(),
  {
    srcset: undefined,
    sizes: undefined,
    placeholder: undefined,
    priority: false,
    imgClass: '',
    fit: 'contain',
    transparent: false,
  },
)

const emit = defineEmits<{
  load: []
}>()

const isLoaded = ref(false)
const imgRef = ref<HTMLImageElement | null>(null)

const aspectRatio = computed(() => `${props.width} / ${props.height}`)

function handleLoad() {
  if (isLoaded.value) return
  isLoaded.value = true
  emit('load')
}

onMounted(() => {
  const img = imgRef.value
  if (img?.complete && img.naturalWidth > 0) {
    handleLoad()
  }
})
</script>

<template>
  <div
    class="optimized-image"
    :class="{ 'optimized-image--transparent': transparent }"
    :style="transparent ? undefined : { aspectRatio }"
  >
    <div
      v-if="placeholder && !transparent"
      class="optimized-image__placeholder"
      :class="{ 'optimized-image__placeholder--hidden': isLoaded }"
      :style="{ backgroundImage: `url(${placeholder})` }"
      aria-hidden="true"
    />
    <div
      v-else-if="!transparent"
      class="optimized-image__shimmer"
      :class="{ 'optimized-image__shimmer--hidden': isLoaded }"
      aria-hidden="true"
    />

    <img
      ref="imgRef"
      :src="src"
      :srcset="srcset"
      :sizes="sizes"
      :alt="alt"
      :width="width"
      :height="height"
      class="optimized-image__img"
      :class="[imgClass, { 'optimized-image__img--loaded': isLoaded }]"
      :style="{ objectFit: fit }"
      :loading="priority ? 'eager' : 'lazy'"
      :fetchpriority="priority ? 'high' : 'auto'"
      decoding="async"
      @load="handleLoad"
    />
  </div>
</template>

<style scoped>
.optimized-image {
  position: relative;
  width: 100%;
  overflow: hidden;
  background: var(--color-paper-deep);
}

.optimized-image--transparent {
  overflow: visible;
  background: transparent;
}

.optimized-image--transparent .optimized-image__img {
  width: 100%;
  height: auto;
}

.optimized-image__placeholder,
.optimized-image__shimmer {
  position: absolute;
  inset: 0;
  transition: opacity 0.45s ease;
}

.optimized-image__placeholder {
  background-size: cover;
  background-position: center;
  filter: blur(14px);
  transform: scale(1.08);
}

.optimized-image__shimmer {
  background: linear-gradient(
    110deg,
    var(--color-paper-deep) 8%,
    #faf4ea 18%,
    var(--color-paper-deep) 33%
  );
  background-size: 200% 100%;
  animation: optimized-image-shimmer 1.4s ease-in-out infinite;
}

.optimized-image__placeholder--hidden,
.optimized-image__shimmer--hidden {
  opacity: 0;
}

.optimized-image__img {
  position: relative;
  z-index: 1;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  opacity: 0;
  transition: opacity 0.45s ease;
}

.optimized-image__img--loaded {
  opacity: 1;
}

@keyframes optimized-image-shimmer {
  0% {
    background-position: 100% 0;
  }

  100% {
    background-position: -100% 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .optimized-image__shimmer {
    animation: none;
  }

  .optimized-image__img,
  .optimized-image__placeholder,
  .optimized-image__shimmer {
    transition: none;
  }
}
</style>
