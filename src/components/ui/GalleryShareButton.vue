<script setup lang="ts">
import { onUnmounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { buildGalleryShareUrl, shareGalleryImage } from '@/utils/gallery-share'
import type { LocaleCode } from '@/models/types'

const props = withDefaults(
  defineProps<{
    imageId: string
    title: string
    variant?: 'card' | 'caption'
  }>(),
  {
    variant: 'caption',
  },
)

const { t, locale } = useI18n()
const copied = ref(false)
let copiedTimer: ReturnType<typeof setTimeout> | undefined

async function onShare(event: MouseEvent) {
  event.stopPropagation()
  event.preventDefault()

  const url = buildGalleryShareUrl(locale.value as LocaleCode, props.imageId)

  try {
    const result = await shareGalleryImage({ url, title: props.title })
    if (result === 'copied') {
      copied.value = true
      clearTimeout(copiedTimer)
      copiedTimer = setTimeout(() => {
        copied.value = false
      }, 2000)
    }
  } catch {
    // User dismissed the native share sheet.
  }
}

onUnmounted(() => {
  clearTimeout(copiedTimer)
})
</script>

<template>
  <button
    type="button"
    class="gallery-share"
    :class="`gallery-share--${variant}`"
    :aria-label="copied ? t('gallery.shareCopied') : t('gallery.share')"
    @click="onShare"
  >
    <svg class="gallery-share__icon" viewBox="0 0 24 24" aria-hidden="true">
      <template v-if="variant === 'card'">
        <circle cx="18" cy="5" r="2.75" fill="none" stroke="currentColor" stroke-width="1.75" />
        <circle cx="6" cy="12" r="2.75" fill="none" stroke="currentColor" stroke-width="1.75" />
        <circle cx="18" cy="19" r="2.75" fill="none" stroke="currentColor" stroke-width="1.75" />
        <path
          d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98"
          fill="none"
          stroke="currentColor"
          stroke-width="1.75"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </template>
      <template v-else>
        <path
          d="M12 16V4m0 0L8 8m4-4 4 4"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M5 20h14"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
        />
      </template>
    </svg>
    <span v-if="variant === 'caption'" class="gallery-share__label">
      {{ copied ? t('gallery.shareCopied') : t('gallery.share') }}
    </span>
    <span
      v-else
      class="gallery-share__tooltip"
      role="tooltip"
    >
      {{ copied ? t('gallery.shareCopied') : t('gallery.share') }}
    </span>
  </button>
</template>

<style scoped>
.gallery-share {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  transition:
    background var(--transition),
    border-color var(--transition),
    color var(--transition),
    transform var(--transition),
    box-shadow var(--transition),
    opacity var(--transition);
}

.gallery-share__icon {
  display: block;
  flex-shrink: 0;
}

.gallery-share__tooltip {
  position: absolute;
  z-index: 3;
  padding: 0.35rem 0.625rem;
  border-radius: var(--radius-sm);
  font-size: 0.75rem;
  font-weight: 700;
  line-height: 1.2;
  white-space: nowrap;
  color: var(--color-ink);
  background: rgba(251, 247, 240, 0.96);
  border: 1px solid rgba(61, 58, 54, 0.1);
  box-shadow: var(--shadow-soft);
  opacity: 0;
  pointer-events: none;
  transition: opacity var(--transition);
}

.gallery-share--card .gallery-share__tooltip {
  bottom: calc(100% + 0.5rem);
  left: 50%;
  transform: translateX(-50%);
}

.gallery-share:hover .gallery-share__tooltip,
.gallery-share:focus-visible .gallery-share__tooltip {
  opacity: 1;
}

@media (hover: none) {
  .gallery-share__tooltip {
    display: none;
  }
}

.gallery-share--caption {
  gap: 0.5rem;
  padding: 0.625rem 1.125rem;
  border-radius: var(--radius-full);
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-ink);
  background: rgba(255, 255, 255, 0.96);
  border: 1px solid rgba(61, 58, 54, 0.14);
  box-shadow:
    0 2px 8px rgba(61, 58, 54, 0.06),
    0 8px 20px rgba(61, 58, 54, 0.08);
}

.gallery-share--caption .gallery-share__icon {
  width: 1.05rem;
  height: 1.05rem;
}

.gallery-share--caption:hover {
  background: #fff;
  border-color: rgba(61, 58, 54, 0.22);
  transform: translateY(-1px);
  box-shadow:
    0 4px 12px rgba(61, 58, 54, 0.08),
    0 10px 24px rgba(61, 58, 54, 0.1);
}

.gallery-share--card {
  width: 2.875rem;
  height: 2.875rem;
  border-radius: var(--radius-full);
  color: var(--color-ink-soft);
  background: rgba(255, 255, 255, 0.96);
  border: 1px solid rgba(61, 58, 54, 0.14);
  backdrop-filter: blur(6px);
  box-shadow:
    0 2px 8px rgba(61, 58, 54, 0.08),
    0 8px 24px rgba(61, 58, 54, 0.1);
}

.gallery-share--card .gallery-share__icon {
  width: 1.2rem;
  height: 1.2rem;
}

.gallery-share--card:hover {
  background: #fff;
  border-color: rgba(61, 58, 54, 0.2);
  color: var(--color-ink);
  transform: scale(1.04);
  box-shadow:
    0 4px 12px rgba(61, 58, 54, 0.1),
    0 10px 28px rgba(61, 58, 54, 0.12);
}
</style>
