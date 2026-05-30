<script setup lang="ts">
import PaperBackground from '@/components/layout/PaperBackground.vue'
import SiteNav from '@/components/layout/SiteNav.vue'
import SiteFooter from '@/components/layout/SiteFooter.vue'
import SectionProgress from '@/components/ui/SectionProgress.vue'
</script>

<template>
  <div class="site-shell">
    <PaperBackground />
    <SiteNav />
    <SectionProgress />
    <main class="site-shell__main">
      <slot />
    </main>
    <SiteFooter />
  </div>
</template>

<style scoped>
.site-shell {
  position: relative;
  min-height: 100vh;
}

.site-shell__main {
  position: relative;
  z-index: 1;
}
</style>
