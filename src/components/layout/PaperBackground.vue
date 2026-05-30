<script setup lang="ts">
const sparkles = [
  { color: 'purple', top: '14%', left: '28%', size: 14, delay: 0, duration: 2.6 },
  { color: 'green', top: '22%', left: '72%', size: 12, delay: 0.8, duration: 3.2 },
  { color: 'purple', top: '35%', left: '8%', size: 13, delay: 1.4, duration: 2.9 },
  { color: 'green', top: '18%', left: '48%', size: 15, delay: 0.3, duration: 3.5 },
  { color: 'purple', top: '48%', left: '88%', size: 16, delay: 2.1, duration: 2.7 },
  { color: 'green', top: '55%', left: '35%', size: 12, delay: 1.8, duration: 3.1 },
  { color: 'purple', top: '62%', left: '62%', size: 14, delay: 0.6, duration: 2.8 },
  { color: 'green', top: '72%', left: '18%', size: 15, delay: 2.4, duration: 3.4 },
  { color: 'purple', top: '28%', left: '92%', size: 12, delay: 1.6, duration: 3.3 },
  { color: 'green', top: '85%', left: '45%', size: 14, delay: 0.9, duration: 2.6 },
  { color: 'purple', top: '6%', left: '38%', size: 13, delay: 0.5, duration: 3.1 },
  { color: 'green', top: '30%', left: '64%', size: 12, delay: 0.7, duration: 2.5 },
  { color: 'purple', top: '58%', left: '46%', size: 14, delay: 0.2, duration: 3.5 },
  { color: 'green', top: '88%', left: '12%', size: 13, delay: 1.5, duration: 3.3 },
] as const
</script>

<template>
  <div class="paper-bg" aria-hidden="true">
    <div class="paper-bg__base" />
    <div class="paper-bg__blob paper-bg__blob--blush" />
    <div class="paper-bg__blob paper-bg__blob--sage" />
    <div class="paper-bg__blob paper-bg__blob--lavender" />

    <img
      class="paper-bg__pattern paper-bg__pattern--print1"
      src="/print-pattern1.png"
      alt=""
      width="2173"
      height="2064"
      decoding="async"
      fetchpriority="low"
    />
    <img
      class="paper-bg__pattern paper-bg__pattern--print2"
      src="/print-pattern2.png"
      alt=""
      width="2173"
      height="2064"
      decoding="async"
      fetchpriority="low"
    />

    <img
      class="paper-bg__star paper-bg__star--purple"
      src="/purple-star.png"
      alt=""
      width="240"
      height="240"
      decoding="async"
      fetchpriority="low"
    />
    <div class="paper-bg__veil" />

    <div class="paper-bg__sparkles">
      <span
        v-for="(sparkle, index) in sparkles"
        :key="index"
        class="paper-bg__sparkle"
        :class="`paper-bg__sparkle--${sparkle.color}`"
        :style="{
          top: sparkle.top,
          left: sparkle.left,
          '--sparkle-size': `${sparkle.size}px`,
          '--sparkle-delay': `${sparkle.delay}s`,
          '--sparkle-duration': `${sparkle.duration}s`,
        }"
      />
    </div>
  </div>
</template>

<style scoped>
.paper-bg {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
  isolation: isolate;
}

.paper-bg__base {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(
      165deg,
      var(--color-paper) 0%,
      #fdf9f4 28%,
      var(--color-paper-deep) 52%,
      #faf4ec 78%,
      var(--color-paper) 100%
    );
}

.paper-bg__blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(72px);
  opacity: 0.55;
}

.paper-bg__blob--blush {
  width: min(52vw, 28rem);
  height: min(52vw, 28rem);
  top: 8%;
  inset-inline-start: 18%;
  background: radial-gradient(circle, var(--color-blush) 0%, transparent 68%);
}

.paper-bg__blob--sage {
  width: min(48vw, 26rem);
  height: min(48vw, 26rem);
  bottom: 12%;
  inset-inline-end: 14%;
  background: radial-gradient(circle, var(--color-sage) 0%, transparent 70%);
}

.paper-bg__blob--lavender {
  width: min(44vw, 24rem);
  height: min(44vw, 24rem);
  top: 42%;
  left: 50%;
  transform: translateX(-50%);
  background: radial-gradient(circle, var(--color-lavender) 0%, transparent 72%);
  opacity: 0.42;
}

.paper-bg__pattern {
  position: absolute;
  width: min(50vw, 38rem);
  max-width: none;
  height: auto;
  top: 50%;
  opacity: 0.68;
  filter: saturate(1.08);
  mask-image: radial-gradient(ellipse 70% 66% at 50% 50%, #000 22%, transparent 74%);
  will-change: transform;
}

.paper-bg__pattern--print1 {
  inset-inline-start: -10%;
  transform: translateY(-50%) rotate(-10deg);
  animation: pattern-drift-left 30s ease-in-out infinite;
}

.paper-bg__pattern--print2 {
  inset-inline-end: -10%;
  transform: translateY(-50%) rotate(12deg);
  animation: pattern-drift-right 34s ease-in-out infinite;
}

.paper-bg__star {
  position: absolute;
  width: min(40vw, 22rem);
  height: auto;
  opacity: 0.78;
  will-change: transform;
}

.paper-bg__star--purple {
  top: clamp(0.25rem, 1vh, 0.5rem);
  inset-inline-start: clamp(0.25rem, 0.75vw, 0.5rem);
  animation: star-drift-purple 24s ease-in-out infinite;
}

.paper-bg__sparkles {
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
}

.paper-bg__sparkle {
  position: absolute;
  width: var(--sparkle-size);
  height: var(--sparkle-size);
  transform: translate(-50%, -50%);
  background: transparent;
  animation: sparkle-twinkle var(--sparkle-duration, 3s) ease-in-out infinite;
  animation-delay: var(--sparkle-delay, 0s);
  will-change: transform, opacity;
}

.paper-bg__sparkle::before {
  content: '';
  position: absolute;
  inset: -160%;
  border-radius: 50%;
  filter: blur(6px);
  pointer-events: none;
  animation: sparkle-glow var(--sparkle-duration, 3s) ease-in-out infinite;
  animation-delay: var(--sparkle-delay, 0s);
}

.paper-bg__sparkle::after {
  content: '';
  position: absolute;
  inset: 0;
  clip-path: polygon(
    50% 0%,
    61% 35%,
    98% 35%,
    68% 57%,
    79% 91%,
    50% 70%,
    21% 91%,
    32% 57%,
    2% 35%,
    39% 35%
  );
}

.paper-bg__sparkle--purple::after {
  background: linear-gradient(145deg, #f5effc 0%, #d4c5e8 50%, #b8a3d4 100%);
  box-shadow: 0 0 8px 2px rgba(184, 163, 212, 0.5);
}

.paper-bg__sparkle--purple::before {
  background: radial-gradient(
    circle,
    rgba(212, 197, 232, 0.55) 0%,
    rgba(184, 163, 212, 0.25) 40%,
    transparent 68%
  );
}

.paper-bg__sparkle--green::after {
  background: linear-gradient(145deg, #f2f9f0 0%, #c8d8c4 50%, #a8c4a2 100%);
  box-shadow: 0 0 8px 2px rgba(168, 196, 162, 0.5);
}

.paper-bg__sparkle--green::before {
  background: radial-gradient(
    circle,
    rgba(200, 216, 196, 0.55) 0%,
    rgba(168, 196, 162, 0.25) 40%,
    transparent 68%
  );
}

.paper-bg__veil {
  position: absolute;
  inset: 0;
  z-index: 1;
  background:
    radial-gradient(ellipse 85% 75% at 50% 48%, transparent 42%, var(--color-paper) 88%),
    linear-gradient(
      to bottom,
      rgba(251, 247, 240, 0.35) 0%,
      transparent 14%,
      transparent 86%,
      rgba(251, 247, 240, 0.35) 100%
    );
  opacity: 0.55;
}

@keyframes pattern-drift-left {
  0%,
  100% {
    transform: translateY(-50%) rotate(-10deg) translate(0, 0);
  }
  50% {
    transform: translateY(-50%) rotate(-8deg) translate(0.5rem, -0.4rem);
  }
}

@keyframes pattern-drift-right {
  0%,
  100% {
    transform: translateY(-50%) rotate(12deg) translate(0, 0);
  }
  50% {
    transform: translateY(-50%) rotate(10deg) translate(-0.5rem, 0.35rem);
  }
}

@keyframes star-drift-purple {
  0%,
  100% {
    transform: translate(0, 0) rotate(0deg);
  }
  50% {
    transform: translate(0.35rem, -0.3rem) rotate(4deg);
  }
}

@keyframes sparkle-twinkle {
  0%,
  100% {
    opacity: 0.65;
    transform: translate(-50%, -50%) scale(0.85) rotate(0deg);
  }
  45% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1.1) rotate(12deg);
  }
  70% {
    opacity: 0.8;
    transform: translate(-50%, -50%) scale(0.95) rotate(-8deg);
  }
}

@keyframes sparkle-glow {
  0%,
  100% {
    opacity: 0.2;
    transform: scale(0.8);
  }
  45% {
    opacity: 0.5;
    transform: scale(1);
  }
  70% {
    opacity: 0.3;
    transform: scale(0.88);
  }
}

@media (max-width: 768px) {
  .paper-bg__blob {
    filter: blur(56px);
    opacity: 0.48;
  }

  .paper-bg__pattern {
    width: min(68vw, 24rem);
    opacity: 0.55;
  }

  .paper-bg__pattern--print1 {
    inset-inline-start: -22%;
  }

  .paper-bg__pattern--print2 {
    inset-inline-end: -22%;
  }

  .paper-bg__star {
    width: min(52vw, 18rem);
    opacity: 0.65;
  }

  .paper-bg__star--purple {
    top: 0.2rem;
    inset-inline-start: 0.2rem;
  }

  .paper-bg__veil {
    opacity: 0.45;
  }

  .paper-bg__sparkle {
    width: calc(var(--sparkle-size) * 0.95);
    height: calc(var(--sparkle-size) * 0.95);
  }
}

@media (prefers-reduced-motion: reduce) {
  .paper-bg__pattern,
  .paper-bg__star {
    animation: none;
  }

  .paper-bg__sparkle {
    animation: none;
    opacity: 0.85;
    transform: translate(-50%, -50%) scale(1);
  }

  .paper-bg__sparkle::before {
    animation: none;
    opacity: 0.35;
    transform: scale(1);
  }
}
</style>
