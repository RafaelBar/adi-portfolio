<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { getGalleryCaption } from '@/data/gallery-captions'
import GalleryShareFooter from '@/components/ui/GalleryShareFooter.vue'
import GalleryShareButton from '@/components/ui/GalleryShareButton.vue'
import type { GalleryItem } from '@/models/types'
import type { LocaleCode } from '@/models/types'

const props = defineProps<{
  items: GalleryItem[]
  index: number
}>()

const emit = defineEmits<{
  close: []
  navigate: [index: number]
}>()

const { t, locale } = useI18n()
const imageViewport = ref<HTMLElement | null>(null)

const item = computed(() => props.items[props.index] ?? null)
const caption = computed(() =>
  item.value ? getGalleryCaption(item.value.id, locale.value as LocaleCode) : '',
)
const hasPrev = computed(() => props.index > 0)
const hasNext = computed(() => props.index < props.items.length - 1)

function goPrev() {
  if (hasPrev.value) emit('navigate', props.index - 1)
}

function goNext() {
  if (hasNext.value) emit('navigate', props.index + 1)
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    emit('close')
    return
  }

  if (event.key === 'ArrowLeft') {
    event.preventDefault()
    locale.value === 'he' ? goNext() : goPrev()
    return
  }

  if (event.key === 'ArrowRight') {
    event.preventDefault()
    locale.value === 'he' ? goPrev() : goNext()
  }
}

onMounted(() => {
  document.body.style.overflow = 'hidden'
  window.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  document.body.style.overflow = ''
  window.removeEventListener('keydown', onKeydown)
})

watch(
  () => props.index,
  () => {
    imageViewport.value?.scrollTo({ top: 0 })
  },
)
</script>

<template>
  <Teleport to="body">
    <div
      v-if="item"
      class="lightbox"
      role="dialog"
      aria-modal="true"
      :aria-label="t('gallery.label')"
      @click.self="emit('close')"
    >
      <div class="lightbox__frame">
        <button
          v-if="hasPrev"
          type="button"
          class="lightbox__control lightbox__nav lightbox__nav--prev"
          :aria-label="t('gallery.prev')"
          @click="goPrev"
        >
          <svg class="lightbox__control-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M9 6l6 6-6 6"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>

        <div class="lightbox__panel">
          <button
            type="button"
            class="lightbox__control lightbox__close"
            :aria-label="t('gallery.close')"
            @click="emit('close')"
          >
            <svg class="lightbox__control-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M8 8l8 8M16 8l-8 8"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>

          <div class="lightbox__body">
            <div ref="imageViewport" class="lightbox__viewport">
              <figure class="lightbox__figure">
                <img :src="item.image" :alt="caption" class="lightbox__image" />
                <GalleryShareFooter
                  class="lightbox__share-overlay"
                  :image-id="item.id"
                  :title="caption"
                />
              </figure>
            </div>
          </div>

          <p class="lightbox__caption">
            <span class="lightbox__caption-text">{{ caption }}</span>
            <GalleryShareButton
              class="lightbox__share-inline"
              variant="card"
              :image-id="item.id"
              :title="caption"
            />
          </p>
        </div>

        <button
          v-if="hasNext"
          type="button"
          class="lightbox__control lightbox__nav lightbox__nav--next"
          :aria-label="t('gallery.next')"
          @click="goNext"
        >
          <svg class="lightbox__control-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M9 6l6 6-6 6"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.lightbox {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-xl);
  background: rgba(61, 58, 54, 0.72);
  backdrop-filter: blur(6px);
}

.lightbox__frame {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(0.75rem, 2vw, 1.25rem);
  width: min(100%, calc(52rem + 7rem));
  max-width: 100%;
  pointer-events: none;
}

.lightbox__panel,
.lightbox__control {
  pointer-events: auto;
}

.lightbox__control {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-radius: var(--radius-full);
  background: rgba(255, 255, 255, 0.14);
  border: 1px solid rgba(255, 255, 255, 0.28);
  color: #fff;
  backdrop-filter: blur(8px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  transition:
    background var(--transition),
    border-color var(--transition),
    transform var(--transition);
}

.lightbox__control:hover {
  background: rgba(255, 255, 255, 0.24);
  border-color: rgba(255, 255, 255, 0.42);
  transform: scale(1.06);
}

.lightbox__control-icon {
  width: 1.125rem;
  height: 1.125rem;
  display: block;
}

.lightbox__close,
.lightbox__nav {
  width: 2.875rem;
  height: 2.875rem;
  background: rgba(255, 255, 255, 0.96);
  border: 1px solid rgba(61, 58, 54, 0.14);
  color: var(--color-ink-soft);
  box-shadow:
    0 2px 8px rgba(61, 58, 54, 0.08),
    0 8px 24px rgba(61, 58, 54, 0.1);
  backdrop-filter: blur(6px);
}

.lightbox__close .lightbox__control-icon,
.lightbox__nav .lightbox__control-icon {
  width: 1.2rem;
  height: 1.2rem;
}

.lightbox__close:hover,
.lightbox__nav:hover {
  background: #fff;
  border-color: rgba(61, 58, 54, 0.2);
  color: var(--color-ink);
  transform: scale(1.04);
  box-shadow:
    0 4px 12px rgba(61, 58, 54, 0.1),
    0 10px 28px rgba(61, 58, 54, 0.12);
}

.lightbox__close {
  position: absolute;
  top: var(--space-md);
  inset-inline-end: var(--space-md);
  z-index: 5;
}

.lightbox__nav {
  position: relative;
}

.lightbox__panel {
  --lightbox-max-height: min(90vh, calc(100dvh - 2 * var(--space-xl)));
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  width: min(100%, 52rem);
  flex: 1 1 auto;
  min-width: 0;
  max-height: var(--lightbox-max-height);
  overflow: hidden;
  border-radius: var(--radius-lg);
  background: var(--color-paper);
  box-shadow: var(--shadow-lift);
  padding: var(--space-lg);
}

.lightbox__body {
  position: relative;
  flex: 0 1 auto;
  min-height: 0;
}

.lightbox__viewport {
  overflow-y: auto;
  overflow-x: hidden;
  max-height: calc(var(--lightbox-max-height) - 2 * var(--space-lg) - var(--space-md) - 2.75rem);
  padding-inline: var(--space-xl);
  -webkit-overflow-scrolling: touch;
}

.lightbox__figure {
  position: relative;
  margin: 0;
}

.lightbox__figure:hover :deep(.gallery-share-footer),
.lightbox__figure:focus-within :deep(.gallery-share-footer) {
  opacity: 1;
}

.lightbox__nav--prev .lightbox__control-icon {
  transform: rotate(180deg);
}

:dir(rtl) .lightbox__nav--prev .lightbox__control-icon {
  transform: none;
}

:dir(rtl) .lightbox__nav--next .lightbox__control-icon {
  transform: rotate(180deg);
}

.lightbox__image {
  display: block;
  width: 100%;
  height: auto;
  max-width: 100%;
  border-radius: var(--radius-md);
}

.lightbox__caption {
  flex-shrink: 0;
  margin: 0;
  padding-top: var(--space-md);
  border-top: 1px solid rgba(61, 58, 54, 0.1);
  font-size: 0.9375rem;
  line-height: 1.5;
  color: var(--color-ink-soft);
  text-align: center;
}

.lightbox__caption-text {
  max-width: 36rem;
}

.lightbox__share-inline {
  display: none;
}

@media (max-width: 768px) {
  .lightbox {
    padding: var(--space-md);
  }

  .lightbox__frame {
    position: relative;
    display: block;
    width: 100%;
    padding-top: 0;
  }

  .lightbox__panel {
    --lightbox-max-height: min(90vh, calc(100dvh - 2 * var(--space-md)));
  }

  .lightbox__nav {
    position: absolute;
    top: 50%;
    z-index: 10;
    transform: translateY(-50%);
  }

  .lightbox__nav:hover {
    transform: translateY(-50%) scale(1.04);
  }

  .lightbox__nav--prev {
    inset-inline-start: 0.25rem;
  }

  .lightbox__nav--next {
    inset-inline-end: 0.25rem;
  }

  .lightbox__viewport {
    padding-inline: var(--space-lg);
  }

  .lightbox__share-overlay {
    display: none;
  }

  .lightbox__caption {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-sm);
  }

  .lightbox__caption-text {
    flex: 0 1 auto;
  }

  .lightbox__share-inline {
    display: inline-flex;
    flex-shrink: 0;
  }
}
</style>
