import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { HOME_PAGE_SECTIONS, ABOUT_PAGE_SECTIONS } from '@/constants/sections'

const NAV_OFFSET = 88

export function usePageSections() {
  const route = useRoute()
  const activeId = ref('hero')
  const scrollProgress = ref(0)

  const sections = computed(() =>
    route.name === 'about' ? ABOUT_PAGE_SECTIONS : HOME_PAGE_SECTIONS,
  )

  function scrollToSection(id: string) {
    const el = document.getElementById(id)
    if (!el) return
    activeId.value = id
    const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' })
  }

  function updateActiveSectionFromScroll() {
    const marker = window.scrollY + NAV_OFFSET + 24
    let current = sections.value[0]?.id ?? ''

    for (const section of sections.value) {
      const el = document.getElementById(section.id)
      if (!el) continue
      const top = el.getBoundingClientRect().top + window.scrollY
      if (top <= marker) current = section.id
    }

    activeId.value = current
  }

  function updateScrollProgress() {
    const max = document.documentElement.scrollHeight - window.innerHeight
    scrollProgress.value = max > 0 ? Math.min(1, window.scrollY / max) : 0
  }

  function onScroll() {
    updateScrollProgress()
    updateActiveSectionFromScroll()
  }

  function resetForRoute() {
    activeId.value = sections.value[0]?.id ?? ''
    requestAnimationFrame(() => {
      updateActiveSectionFromScroll()
      updateScrollProgress()
    })
  }

  onMounted(() => {
    resetForRoute()
    window.addEventListener('scroll', onScroll, { passive: true })
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
  })

  watch(() => route.name, resetForRoute)

  const activeIndex = computed(() => {
    const index = sections.value.findIndex((section) => section.id === activeId.value)
    return index >= 0 ? index : 0
  })

  const sectionProgress = computed(() => {
    if (sections.value.length <= 1) return 1
    return activeIndex.value / (sections.value.length - 1)
  })

  return {
    sections,
    activeId,
    scrollProgress,
    sectionProgress,
    scrollToSection,
  }
}
