<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const el = ref<HTMLElement | null>(null)
const revealed = ref(false)
let observer: IntersectionObserver | null = null

onMounted(() => {
  if (!el.value) return

  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry?.isIntersecting) {
        revealed.value = true
        observer?.disconnect()
      }
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
  )

  observer.observe(el.value)
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>

<template>
  <div ref="el" class="reveal" :class="{ 'is-visible': revealed }">
    <slot />
  </div>
</template>
