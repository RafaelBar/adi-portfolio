import { ref } from 'vue'

const MIN_LOADER_MS = 900
const MAX_LOADER_MS = 4500

const isVisible = ref(true)
const isPortraitReady = ref(false)
const isMinTimeElapsed = ref(false)

let minTimer: ReturnType<typeof setTimeout> | null = null
let maxTimer: ReturnType<typeof setTimeout> | null = null
let dismissed = false

function tryDismiss() {
  if (dismissed) return
  if (!isPortraitReady.value || !isMinTimeElapsed.value) return

  dismissed = true
  isVisible.value = false

  if (minTimer) clearTimeout(minTimer)
  if (maxTimer) clearTimeout(maxTimer)
}

export function useAppLoader() {
  function startLoader() {
    if (minTimer || maxTimer) return

    minTimer = setTimeout(() => {
      isMinTimeElapsed.value = true
      tryDismiss()
    }, MIN_LOADER_MS)

    maxTimer = setTimeout(() => {
      isPortraitReady.value = true
      isMinTimeElapsed.value = true
      tryDismiss()
    }, MAX_LOADER_MS)
  }

  function markPortraitReady() {
    isPortraitReady.value = true
    tryDismiss()
  }

  return {
    isVisible,
    startLoader,
    markPortraitReady,
  }
}
