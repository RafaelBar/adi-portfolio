<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView, useRoute, useRouter } from 'vue-router'
import AppLoader from '@/components/ui/AppLoader.vue'
import PromotionWidget from '@/components/ui/PromotionWidget.vue'
import { useAppLoader } from '@/composables/useAppLoader'
import { useSeo } from '@/composables/useSeo'

const route = useRoute()
const router = useRouter()
const { markPortraitReady } = useAppLoader()

useSeo()

onMounted(async () => {
  await router.isReady()
  if (route.name !== 'home') {
    markPortraitReady()
  }
})
</script>

<template>
  <AppLoader />
  <RouterView />
  <PromotionWidget />
</template>
