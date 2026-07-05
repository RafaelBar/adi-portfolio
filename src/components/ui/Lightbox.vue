<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { getGalleryCaption } from '@/data/gallery-captions'
import { buildGalleryShareUrl, shareGalleryImage } from '@/utils/gallery-share'
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
const shareFeedback = ref<'idle' | 'copied'>('idle')
let shareFeedbackTimer: ReturnType<typeof setTimeout> | undefined

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

async function shareCurrent() {
  if (!item.value) return

  const url = buildGalleryShareUrl(locale.value as LocaleCode, item.value.id)
  try {
    const result = await shareGalleryImage({ url, title: caption.value })
    if (result === 'copied') {
      shareFeedback.value = 'copied'
      clearTimeout(shareFeedbackTimer)
      shareFeedbackTimer = setTimeout(() => {
        shareFeedback.value = 'idle'
      }, 2000)
    }
  } catch {
    // User dismissed the native share sheet.
  }
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
  clearTimeout(shareFeedbackTimer)
})

watch(
  () => props.index,
  () => {
    imageViewport.value?.scrollTo({ top: 0 })
    shareFeedback.value = 'idle'
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
          class="lightbox__nav lightbox__nav--prev"
          :aria-label="t('gallery.prev')"
          @click="goPrev"
        >
          <svg class="lightbox__nav-icon" viewBox="0 0 24 24" aria-hidden="true">
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
          <button type="button" class="lightbox__close" :aria-label="t('gallery.close')" @click="emit('close')">
            <svg class="lightbox__close-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M7 7l10 10M17 7L7 17"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
          </button>

          <div class="lightbox__body">
            <div ref="imageViewport" class="lightbox__viewport">
              <img :src="item.image" :alt="caption" class="lightbox__image" />
            </div>
          </div>

          <p class="lightbox__caption">
            <span class="lightbox__caption-text">{{ caption }}</span>
            <button
              type="button"
              class="lightbox__share"
              :aria-label="t('gallery.share')"
              @click="shareCurrent"
            >
              <svg class="lightbox__share-icon" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98M18 4a2 2 0 100 4 2 2 0 000-4zM6 12a2 2 0 100 4 2 2 0 000-4zM18 16a2 2 0 100 4 2 2 0 000-4z"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.75"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <span>{{ shareFeedback === 'copied' ? t('gallery.shareCopied') : t('gallery.share') }}</span>
            </button>
          </p>
        </div>

        <button
          v-if="hasNext"
          type="button"
          class="lightbox__nav lightbox__nav--next"
          :aria-label="t('gallery.next')"
          @click="goNext"
        >
          <svg class="lightbox__nav-icon" viewBox="0 0 24 24" aria-hidden="true">
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
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(0.75rem, 2vw, 1.25rem);
  width: min(100%, calc(52rem + 7rem));
  max-width: 100%;
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
  max-height: calc(var(--lightbox-max-height) - 2 * var(--space-lg) - var(--space-md) - 3.5rem);
  padding-inline: var(--space-xl);
  -webkit-overflow-scrolling: touch;
}

.lightbox__close {
  position: absolute;
  top: var(--space-md);
  inset-inline-end: var(--space-md);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: var(--radius-full);
  background: rgba(255, 255, 255, 0.92);
  color: var(--color-ink);
  z-index: 2;
  box-shadow: var(--shadow-soft);
  transition:
    background var(--transition),
    transform var(--transition);
}

.lightbox__close:hover {
  background: #fff;
  transform: scale(1.04);
}

.lightbox__close-icon {
  width: 1.125rem;
  height: 1.125rem;
  display: block;
}

.lightbox__nav {
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

.lightbox__nav:hover {
  background: rgba(255, 255, 255, 0.24);
  border-color: rgba(255, 255, 255, 0.42);
  transform: scale(1.06);
}

.lightbox__nav-icon {
  width: 1.125rem;
  height: 1.125rem;
  display: block;
}

.lightbox__nav--prev .lightbox__nav-icon {
  transform: rotate(180deg);
}

:dir(rtl) .lightbox__nav--prev .lightbox__nav-icon {
  transform: none;
}

:dir(rtl) .lightbox__nav--next .lightbox__nav-icon {
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
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-sm);
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

.lightbox__share {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.5rem 0.875rem;
  border-radius: var(--radius-full);
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--color-ink);
  background: rgba(255, 255, 255, 0.85);
  border: 1px solid rgba(61, 58, 54, 0.12);
  box-shadow: var(--shadow-soft);
  transition:
    background var(--transition),
    transform var(--transition);
}

.lightbox__share:hover {
  background: #fff;
  transform: translateY(-1px);
}

.lightbox__share-icon {
  width: 1rem;
  height: 1rem;
  display: block;
}

@media (max-width: 768px) {
  .lightbox {
    padding: var(--space-md);
  }

  .lightbox__frame {
    position: relative;
    display: block;
    width: 100%;
  }

  .lightbox__panel {
    --lightbox-max-height: min(90vh, calc(100dvh - 2 * var(--space-md)));
  }

  .lightbox__nav {
    position: absolute;
    top: 50%;
    z-index: 3;
    width: 2.5rem;
    height: 2.5rem;
    background: rgba(255, 255, 255, 0.94);
    border: none;
    color: var(--color-ink);
    box-shadow: var(--shadow-soft);
    transform: translateY(-50%);
  }

  .lightbox__nav:hover {
    transform: translateY(-50%) scale(1.06);
  }

  .lightbox__nav--prev {
    inset-inline-start: var(--space-xs);
  }

  .lightbox__nav--next {
    inset-inline-end: var(--space-xs);
  }

  .lightbox__viewport {
    padding-inline: var(--space-lg);
  }
}
</style>
