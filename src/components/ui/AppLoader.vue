<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useAppLoader } from '@/composables/useAppLoader'

const { isVisible, startLoader } = useAppLoader()

onMounted(() => {
  startLoader()
})

watch(isVisible, (visible) => {
  if (!visible) {
    document.documentElement.classList.remove('is-app-loading')
  }
})
</script>

<template>
  <Transition name="app-loader">
    <div
      v-if="isVisible"
      class="app-loader"
      role="status"
      aria-live="polite"
      aria-label="טוען את האתר"
    >
      <div class="app-loader__paper" aria-hidden="true" />

      <div class="app-loader__content">
        <svg class="app-loader__art" viewBox="0 0 220 120" aria-hidden="true">
          <path
            class="app-loader__stroke app-loader__stroke--lavender"
            d="M18 78 C48 28, 78 92, 108 54 S168 24, 198 42"
            pathLength="1"
          />
          <path
            class="app-loader__stroke app-loader__stroke--sage"
            d="M28 88 C58 62, 92 96, 126 68 S176 52, 202 64"
            pathLength="1"
          />
          <g class="app-loader__pencil">
            <path
              d="M188 34 L206 18 L212 24 L194 40 Z"
              fill="var(--color-lavender-deep)"
            />
            <path d="M186 36 L194 40 L188 46 Z" fill="#f0c9a6" />
            <circle cx="209" cy="21" r="2.5" fill="var(--color-ink-muted)" />
          </g>
          <path
            class="app-loader__star"
            d="M42 24 L44.8 30.8 L52 31.4 L46.6 36.2 L48.4 43.2 L42 39.4 L35.6 43.2 L37.4 36.2 L32 31.4 L39.2 30.8 Z"
            fill="var(--color-lavender)"
          />
        </svg>

        <p class="app-loader__label font-brand">עדי בדש</p>
        <p class="app-loader__hint">מאיירת ספרי ילדים</p>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.app-loader {
  position: fixed;
  inset: 0;
  z-index: 10000;
  display: grid;
  place-items: center;
  background: var(--color-paper);
  overflow: hidden;
}

.app-loader__paper {
  position: absolute;
  inset: 0;
  opacity: 0.45;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.35'/%3E%3C/svg%3E");
  pointer-events: none;
}

.app-loader__content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 2rem;
}

.app-loader__art {
  width: min(14rem, 72vw);
  height: auto;
  overflow: visible;
}

.app-loader__stroke {
  fill: none;
  stroke-width: 3.5;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  animation: app-loader-draw 1.8s ease-in-out infinite alternate;
}

.app-loader__stroke--lavender {
  stroke: var(--color-lavender-deep);
}

.app-loader__stroke--sage {
  stroke: var(--color-sage-deep);
  animation-delay: 0.25s;
}

.app-loader__pencil {
  transform-origin: 200px 22px;
  animation: app-loader-pencil 1.8s ease-in-out infinite alternate;
}

.app-loader__star {
  transform-origin: 42px 34px;
  animation: app-loader-star 1.6s ease-in-out infinite;
}

.app-loader__label {
  margin: 0;
  font-size: clamp(2rem, 8vw, 2.75rem);
  color: var(--color-ink);
  line-height: 1;
}

.app-loader__hint {
  margin: 0;
  font-size: 0.95rem;
  color: var(--color-ink-muted);
  letter-spacing: 0.04em;
}

.app-loader-enter-active,
.app-loader-leave-active {
  transition: opacity 0.55s ease, visibility 0.55s ease;
}

.app-loader-leave-to {
  opacity: 0;
}

@keyframes app-loader-draw {
  from {
    stroke-dashoffset: 1;
  }

  to {
    stroke-dashoffset: 0;
  }
}

@keyframes app-loader-pencil {
  from {
    transform: translate(0, 0) rotate(0deg);
  }

  to {
    transform: translate(10px, 8px) rotate(8deg);
  }
}

@keyframes app-loader-star {
  0%,
  100% {
    transform: scale(1) rotate(0deg);
    opacity: 0.75;
  }

  50% {
    transform: scale(1.12) rotate(12deg);
    opacity: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .app-loader__stroke,
  .app-loader__pencil,
  .app-loader__star {
    animation: none;
  }

  .app-loader__stroke {
    stroke-dashoffset: 0;
  }
}
</style>
