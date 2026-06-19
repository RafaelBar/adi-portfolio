<script setup lang="ts">
import SiteShell from '@/components/layout/SiteShell.vue'
import WorkWithSection from '@/components/sections/WorkWithSection.vue'
import ProcessSection from '@/components/sections/ProcessSection.vue'
import ServicesSection from '@/components/sections/ServicesSection.vue'
import AboutSection from '@/components/sections/AboutSection.vue'
import SectionSeparator from '@/components/ui/SectionSeparator.vue'
</script>

<template>
  <SiteShell>
    <WorkWithSection />
    <SectionSeparator />
    <ProcessSection />
    <SectionSeparator />
    <ServicesSection />
    <SectionSeparator />
    <AboutSection />
  </SiteShell>
</template>
