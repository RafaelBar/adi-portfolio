import generated from './portrait.generated.json'

export interface PortraitSource {
  width: number
  height: number
  src: string
}

export interface PortraitAssets {
  width: number
  height: number
  fallback: string
  placeholder: string
  sources: PortraitSource[]
}

export const portraitAssets = generated as PortraitAssets

export function portraitSrcset(sources: PortraitSource[] = portraitAssets.sources): string {
  return sources.map((source) => `${source.src} ${source.width}w`).join(', ')
}

export const portraitSizes =
  '(max-width: 480px) 100vw, (max-width: 768px) min(100vw, 40rem), min(56rem, 50vw)'

export const portraitDefaultSrc =
  portraitAssets.sources.find((source) => source.width >= 768)?.src ??
  portraitAssets.sources.at(-1)?.src ??
  portraitAssets.fallback
