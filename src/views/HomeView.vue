<script setup lang="ts">
import SiteShell from '@/components/layout/SiteShell.vue'
import HeroSection from '@/components/sections/HeroSection.vue'
import GallerySection from '@/components/sections/GallerySection.vue'
import ContactSection from '@/components/sections/ContactSection.vue'
import SectionSeparator from '@/components/ui/SectionSeparator.vue'
</script>

<template>
  <SiteShell>
    <HeroSection />
    <SectionSeparator />
    <GallerySection />
    <SectionSeparator />
    <ContactSection />
  </SiteShell>
</template>
