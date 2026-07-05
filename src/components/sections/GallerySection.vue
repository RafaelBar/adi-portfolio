<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { galleryItems, GALLERY_CATEGORIES } from '@/data/gallery'
import { galleryImageHash, parseGalleryImageHash, parseGallerySharePath } from '@/utils/gallery-share'
import type { GalleryCategory, GalleryItem } from '@/models/types'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import ScrollReveal from '@/components/ui/ScrollReveal.vue'
import GalleryCard from '@/components/ui/GalleryCard.vue'
import Lightbox from '@/components/ui/Lightbox.vue'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()

type FilterValue = GalleryCategory

const GALLERY_INITIAL_COUNT = 10

const activeFilter = ref<FilterValue>('selected-work')
const selectedIndex = ref<number | null>(null)
const visibleCount = ref(GALLERY_INITIAL_COUNT)

const filters: { value: FilterValue; labelKey: string }[] = GALLERY_CATEGORIES.map((category) => ({
  value: category,
  labelKey: `gallery.categories.${category}`,
}))

const filteredItems = computed(() =>
  galleryItems.filter((item) => item.category === activeFilter.value),
)

const visibleItems = computed(() => filteredItems.value.slice(0, visibleCount.value))

/** Assign each image to the shorter column — balanced layout, stable on "show more". */
const balancedColumns = computed(() => {
  const left: GalleryItem[] = []
  const right: GalleryItem[] = []
  let leftHeight = 0
  let rightHeight = 0

  for (const item of visibleItems.value) {
    const relativeHeight = item.height / item.width

    if (leftHeight <= rightHeight) {
      left.push(item)
      leftHeight += relativeHeight
    } else {
      right.push(item)
      rightHeight += relativeHeight
    }
  }

  return { left, right }
})

const hasMoreItems = computed(() => filteredItems.value.length > visibleCount.value)

function setFilter(value: FilterValue) {
  activeFilter.value = value
  if (selectedIndex.value !== null) {
    selectedIndex.value = null
    syncGalleryHash(null)
  }
}

function showMore() {
  visibleCount.value = Math.min(
    visibleCount.value + GALLERY_INITIAL_COUNT,
    filteredItems.value.length,
  )
}

function openLightbox(item: GalleryItem) {
  const index = filteredItems.value.findIndex((entry) => entry.id === item.id)
  if (index >= 0) {
    selectedIndex.value = index
    syncGalleryHash(item.id)
  }
}

function closeLightbox() {
  selectedIndex.value = null
  syncGalleryHash(null)
}

function navigateLightbox(index: number) {
  selectedIndex.value = index
  const item = filteredItems.value[index]
  if (item) syncGalleryHash(item.id)
}

function syncGalleryHash(imageId: string | null) {
  const locale = typeof route.params.locale === 'string' ? route.params.locale : 'he'
  const nextHash = imageId ? galleryImageHash(imageId) : `#gallery-${activeFilter.value}`
  if (route.path === `/${locale}` && route.hash === nextHash) return
  router.replace({ path: `/${locale}`, hash: nextHash })
}

function findGalleryItem(imageId: string): GalleryItem | undefined {
  return galleryItems.find((item) => item.id === imageId)
}

function ensureItemVisible(item: GalleryItem) {
  const itemsInCategory = galleryItems.filter((entry) => entry.category === item.category)
  const index = itemsInCategory.findIndex((entry) => entry.id === item.id)
  if (index >= 0 && index >= visibleCount.value) {
    visibleCount.value = index + 1
  }
}

async function openLightboxFromImageId(imageId: string) {
  const item = findGalleryItem(imageId)
  if (!item) return

  activeFilter.value = item.category
  ensureItemVisible(item)
  await nextTick()
  await nextTick()

  const index = filteredItems.value.findIndex((entry) => entry.id === item.id)
  if (index >= 0) selectedIndex.value = index
}

function resolveDeepLinkImageId(): string | null {
  const fromHash = parseGalleryImageHash(route.hash || window.location.hash)
  if (fromHash) return fromHash

  const fromPath = parseGallerySharePath(route.path || window.location.pathname)
  return fromPath?.imageId ?? null
}

function parseHashFilter(hash: string): FilterValue | null {
  if (hash === '#gallery-selected-work') return 'selected-work'
  if (hash === '#gallery-full-book-spread') return 'full-book-spread'
  return null
}

async function applyGalleryDeepLink() {
  const imageId = resolveDeepLinkImageId()
  if (imageId) {
    const locale =
      typeof route.params.locale === 'string'
        ? route.params.locale
        : parseGallerySharePath(window.location.pathname)?.locale ?? 'he'

    await openLightboxFromImageId(imageId)

    const nextHash = galleryImageHash(imageId)
    if (route.path !== `/${locale}` || route.hash !== nextHash) {
      router.replace({ path: `/${locale}`, hash: nextHash })
    }
    return
  }

  selectedIndex.value = null
  const filter = parseHashFilter(route.hash || window.location.hash)
  if (filter) activeFilter.value = filter
}

function onHashChange() {
  void applyGalleryDeepLink()
}

onMounted(() => {
  void router.isReady().then(() => applyGalleryDeepLink())
  window.addEventListener('hashchange', onHashChange)
})

onUnmounted(() => {
  window.removeEventListener('hashchange', onHashChange)
})

watch(
  () => route.hash,
  () => {
    void applyGalleryDeepLink()
  },
)

watch(
  () => route.path,
  () => {
    void applyGalleryDeepLink()
  },
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

      <ul class="gallery__list gallery__list--mobile">
        <li v-for="item in visibleItems" :key="item.id" class="gallery__list-item">
          <GalleryCard :item="item" @open="openLightbox(item)" />
        </li>
      </ul>

      <div class="gallery__columns">
        <ul class="gallery__list">
          <li v-for="item in balancedColumns.left" :key="item.id" class="gallery__list-item">
            <GalleryCard :item="item" @open="openLightbox(item)" />
          </li>
        </ul>

        <ul class="gallery__list">
          <li v-for="item in balancedColumns.right" :key="item.id" class="gallery__list-item">
            <GalleryCard :item="item" @open="openLightbox(item)" />
          </li>
        </ul>
      </div>

      <div v-if="hasMoreItems" class="gallery__more-wrap">
        <button type="button" class="btn btn--secondary gallery__more" @click="showMore">
          {{ t('gallery.showMore') }}
        </button>
      </div>
    </div>

    <Lightbox
      v-if="selectedIndex !== null"
      :items="filteredItems"
      :index="selectedIndex"
      @close="closeLightbox"
      @navigate="navigateLightbox"
    />
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

.gallery__columns {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-lg);
  align-items: start;
}

.gallery__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

.gallery__list--mobile {
  display: none;
}

.gallery__list-item {
  margin: 0;
}

.gallery__more-wrap {
  display: flex;
  justify-content: center;
  margin-top: var(--space-2xl);
}

@media (max-width: 768px) {
  .gallery__columns {
    display: none;
  }

  .gallery__list--mobile {
    display: flex;
  }
}
</style>
