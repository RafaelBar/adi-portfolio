<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { galleryItems, GALLERY_CATEGORIES } from '@/data/gallery'
import type { GalleryCategory, GalleryItem } from '@/models/types'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import ScrollReveal from '@/components/ui/ScrollReveal.vue'
import Lightbox from '@/components/ui/Lightbox.vue'

const { t } = useI18n()
const route = useRoute()

type FilterValue = GalleryCategory

const GALLERY_INITIAL_COUNT = 10

const activeFilter = ref<FilterValue>('selected-work')
const selectedItem = ref<GalleryItem | null>(null)
const visibleCount = ref(GALLERY_INITIAL_COUNT)

const filters: { value: FilterValue; labelKey: string }[] = GALLERY_CATEGORIES.map((category) => ({
  value: category,
  labelKey: `gallery.categories.${category}`,
}))

const filteredItems = computed(() =>
  galleryItems.filter((item) => item.category === activeFilter.value),
)

const visibleItems = computed(() => filteredItems.value.slice(0, visibleCount.value))

const hasMoreItems = computed(() => filteredItems.value.length > visibleCount.value)

function setFilter(value: FilterValue) {
  activeFilter.value = value
}

function showMore() {
  visibleCount.value = Math.min(
    visibleCount.value + GALLERY_INITIAL_COUNT,
    filteredItems.value.length,
  )
}

function openLightbox(item: GalleryItem) {
  selectedItem.value = item
}

function closeLightbox() {
  selectedItem.value = null
}

function parseHashFilter(hash: string): FilterValue | null {
  if (hash === '#gallery-selected-work') return 'selected-work'
  if (hash === '#gallery-full-book-spread') return 'full-book-spread'
  return null
}

function applyHashFilter() {
  const hash = window.location.hash || route.hash
  const filter = parseHashFilter(hash)
  if (filter) activeFilter.value = filter
}

onMounted(() => {
  applyHashFilter()
  window.addEventListener('hashchange', applyHashFilter)
})

onUnmounted(() => {
  window.removeEventListener('hashchange', applyHashFilter)
})

watch(
  () => route.hash,
  () => applyHashFilter(),
)

watch(activeFilter, () => {
  visibleCount.value = GALLERY_INITIAL_COUNT
})
</script>

<template>
  <section id="gallery" class="gallery section">
    <div class="container">
      <ScrollReveal>
        <SectionHeading
          label-key="gallery.label"
          title-key="gallery.title"
          subtitle-key="gallery.subtitle"
        />
      </ScrollReveal>

      <ScrollReveal>
        <div class="gallery__filters" role="tablist" :aria-label="t('gallery.label')">
          <button
            v-for="filter in filters"
            :key="filter.value"
            type="button"
            role="tab"
            class="gallery__filter"
            :class="{ 'gallery__filter--active': activeFilter === filter.value }"
            :aria-selected="activeFilter === filter.value"
            @click="setFilter(filter.value)"
          >
            {{ t(filter.labelKey) }}
          </button>
        </div>
      </ScrollReveal>

      <ul class="gallery__list">
        <li v-for="item in visibleItems" :key="item.id" class="gallery__list-item">
          <button type="button" class="gallery__card" @click="openLightbox(item)">
            <img
              :src="item.image"
              alt=""
              class="gallery__image"
              :width="item.width"
              :height="item.height"
              loading="lazy"
              decoding="async"
            />
          </button>
        </li>
      </ul>

      <div v-if="hasMoreItems" class="gallery__more-wrap">
        <button type="button" class="btn btn--secondary gallery__more" @click="showMore">
          {{ t('gallery.showMore') }}
        </button>
      </div>
    </div>

    <Lightbox v-if="selectedItem" :item="selectedItem" @close="closeLightbox" />
  </section>
</template>

<style scoped>
.gallery__filters {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm);
  margin-bottom: var(--space-2xl);
}

.gallery__filter {
  padding: 0.625rem 1.125rem;
  border-radius: var(--radius-full);
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--color-ink-soft);
  background: rgba(255, 255, 255, 0.65);
  border: 1px solid rgba(61, 58, 54, 0.1);
  transition:
    background var(--transition),
    color var(--transition),
    border-color var(--transition);
}

.gallery__filter:hover,
.gallery__filter--active {
  background: var(--color-ink);
  color: var(--color-paper);
  border-color: var(--color-ink);
}

.gallery__list {
  list-style: none;
  margin: 0;
  padding: 0;
  column-count: 2;
  column-gap: var(--space-lg);
}

.gallery__list-item {
  break-inside: avoid;
  margin-bottom: var(--space-lg);
}

.gallery__card {
  display: block;
  width: 100%;
  padding: 0;
  border: none;
  border-radius: var(--radius-md);
  overflow: hidden;
  box-shadow: var(--shadow-soft);
  cursor: pointer;
  transition:
    transform var(--transition),
    box-shadow var(--transition);
}

.gallery__card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-card);
}

.gallery__image {
  display: block;
  width: 100%;
  height: auto;
}

.gallery__more-wrap {
  display: flex;
  justify-content: center;
  margin-top: var(--space-2xl);
}

@media (max-width: 768px) {
  .gallery__list {
    column-count: 1;
  }
}
</style>
