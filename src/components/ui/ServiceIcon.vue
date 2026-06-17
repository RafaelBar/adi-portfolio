<script setup lang="ts">
import type { ServiceIconName } from '@/models/types'

defineProps<{
  name: ServiceIconName
}>()
</script>

<template>
  <svg class="service-icon" viewBox="0 0 64 64" aria-hidden="true">
    <!-- Illustration — drawing on paper -->
    <g v-if="name === 'draw'" class="service-icon__draw">
      <path
        class="service-icon__wash service-icon__wash--lavender"
        d="M12 14 C12 11, 15 9, 19 9 L45 9 C49 9, 52 11, 52 14 L52 48 C52 51, 49 53, 45 53 L19 53 C15 53, 12 51, 12 48 Z"
      />
      <path
        class="service-icon__stroke"
        d="M12 14 C12 11, 15 9, 19 9 L45 9 C49 9, 52 11, 52 14 L52 48 C52 51, 49 53, 45 53 L19 53 C15 53, 12 51, 12 48 Z"
      />
      <path
        class="service-icon__wash service-icon__wash--sage"
        d="M22 38 C26 30, 34 28, 40 34 C42 36, 40 40, 36 41 C30 42, 24 41, 22 38 Z"
      />
      <path
        class="service-icon__stroke service-icon__stroke--light"
        d="M22 38 C26 30, 34 28, 40 34 C42 36, 40 40, 36 41"
      />
      <circle class="service-icon__fill service-icon__fill--blush" cx="34" cy="24" r="4.5" />
      <path
        class="service-icon__stroke service-icon__stroke--light"
        d="M34 19 L34 17 M34 29 L34 31 M29 24 L27 24 M39 24 L41 24 M30 20 L28.5 18.5 M38 20 L39.5 18.5 M30 28 L28.5 29.5 M38 28 L39.5 29.5"
      />
      <path
        class="service-icon__stroke service-icon__stroke--accent"
        d="M18 46 C22 42, 28 40, 34 42"
      />
      <path
        class="service-icon__stroke"
        d="M44 46 L56 34 L58 36 L46 48 Z"
      />
      <path class="service-icon__fill service-icon__fill--wood" d="M56 34 L58 36 L57 37 L55 35 Z" />
      <path
        class="service-icon__stroke service-icon__stroke--accent"
        d="M8 18 C6 20, 7 23, 9 24 M54 18 C56 20, 55 23, 53 24"
      />
    </g>

    <!-- Illustration + graphic design — book spread with layout -->
    <g v-else class="service-icon__spread">
      <path
        class="service-icon__wash service-icon__wash--lavender"
        d="M10 18 C10 14, 14 12, 20 13 L32 16 L44 13 C50 12, 54 14, 54 18 L54 46 C54 50, 50 52, 44 51 L32 48 L20 51 C14 52, 10 50, 10 46 Z"
      />
      <path
        class="service-icon__stroke"
        d="M10 18 C10 14, 14 12, 20 13 L32 16 L44 13 C50 12, 54 14, 54 18 L54 46 C54 50, 50 52, 44 51 L32 48 L20 51 C14 52, 10 50, 10 46 Z"
      />
      <path class="service-icon__stroke" d="M32 16 L32 48" />
      <circle class="service-icon__fill service-icon__fill--blush" cx="21" cy="28" r="5" />
      <path
        class="service-icon__stroke service-icon__stroke--light"
        d="M16 36 C18 34, 22 33, 26 35 M17 40 C20 39, 24 40, 27 42"
      />
      <path
        class="service-icon__stroke service-icon__stroke--light"
        d="M38 24 L50 24 M38 29 L48 29 M38 34 L50 34 M38 39 L46 39"
      />
      <path
        class="service-icon__stroke service-icon__stroke--accent"
        d="M36 20 L52 20 M36 44 L50 44"
      />
      <path
        class="service-icon__stroke service-icon__stroke--accent"
        d="M8 20 C6 22, 7 25, 9 26 M56 20 C58 22, 57 25, 55 26"
      />
      <path
        class="service-icon__stroke service-icon__stroke--light"
        d="M40 16 L40 48 M52 16 L52 48"
      />
    </g>
  </svg>
</template>

<style scoped>
.service-icon {
  display: block;
  width: 3.25rem;
  height: 3.25rem;
  overflow: visible;
}

.service-icon__stroke {
  fill: none;
  stroke: var(--color-ink);
  stroke-width: 2.25;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.service-icon__stroke--light {
  stroke: var(--color-ink-soft);
  stroke-width: 1.75;
  opacity: 0.85;
}

.service-icon__stroke--accent {
  stroke: var(--color-lavender-deep);
  stroke-width: 1.85;
}

.service-icon__wash {
  stroke: none;
  opacity: 0.55;
}

.service-icon__wash--lavender {
  fill: var(--color-lavender);
}

.service-icon__wash--sage {
  fill: var(--color-sage);
  opacity: 0.45;
}

.service-icon__fill {
  stroke: var(--color-ink);
  stroke-width: 1.5;
}

.service-icon__fill--blush {
  fill: var(--color-blush-deep);
}

.service-icon__fill--wood {
  fill: #e8b88a;
  stroke: var(--color-ink);
  stroke-width: 1.25;
}

.service-icon__draw,
.service-icon__spread {
  transform-origin: 32px 32px;
  animation: service-icon-float 4.5s ease-in-out infinite;
}

.service-icon__spread {
  animation-delay: 0.4s;
}

@keyframes service-icon-float {
  0%,
  100% {
    transform: rotate(-1.5deg) translateY(0);
  }

  50% {
    transform: rotate(1.5deg) translateY(-2px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .service-icon__draw,
  .service-icon__spread {
    animation: none;
  }
}
</style>
