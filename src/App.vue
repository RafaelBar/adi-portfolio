<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView, useRoute, useRouter } from 'vue-router'
import AppLoader from '@/components/ui/AppLoader.vue'
import PromotionWidget from '@/components/ui/PromotionWidget.vue'
import { useAppLoader } from '@/composables/useAppLoader'

const route = useRoute()
const router = useRouter()
const { markPortraitReady } = useAppLoader()

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
