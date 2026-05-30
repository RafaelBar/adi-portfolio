import { onMounted, onUnmounted, ref, type Ref } from 'vue'

export function useScrollReveal(options?: IntersectionObserverInit) {
  const revealed = ref(false)
  let observer: IntersectionObserver | null = null
  let elementRef: Ref<HTMLElement | null> | null = null

  const defaultOptions: IntersectionObserverInit = {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px',
    ...options,
  }

  function observe(el: Ref<HTMLElement | null>) {
    elementRef = el
  }

  onMounted(() => {
    if (!elementRef?.value) return

    observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        revealed.value = true
        observer?.disconnect()
      }
    }, defaultOptions)

    observer.observe(elementRef.value)
  })

  onUnmounted(() => {
    observer?.disconnect()
  })

  return { revealed, observe }
}

export function useScrollRevealRef() {
  const el = ref<HTMLElement | null>(null)
  const revealed = ref(false)
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    if (!el.value) return

    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          revealed.value = true
          observer?.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    )

    observer.observe(el.value)
  })

  onUnmounted(() => {
    observer?.disconnect()
  })

  return { el, revealed }
}
