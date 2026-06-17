import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { imageSize } from 'image-size'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const portfolioDir = path.join(root, 'public', 'portfolio')
const galleryTsPath = path.join(root, 'src', 'data', 'gallery.ts')
const enLocalePath = path.join(root, 'src', 'locales/en.json')
const heLocalePath = path.join(root, 'src', 'locales/he.json')

const CATEGORIES = ['selected-work', 'full-book-spread']
const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif'])
const THUMB_MAX_WIDTH = 800

function naturalCompare(a, b) {
  return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' })
}

/** Files like `_1.jpg`, `_2.jpg` — sorted first by their number. */
function priorityNumber(filename) {
  const stem = filename.replace(/\.[^.]+$/u, '')
  const match = stem.match(/^_\d+/u)
  return match ? Number(match[1]) : null
}

function rgbToHue(r, g, b) {
  const rn = r / 255
  const gn = g / 255
  const bn = b / 255
  const max = Math.max(rn, gn, bn)
  const min = Math.min(rn, gn, bn)
  const delta = max - min

  if (delta === 0) return 0

  let hue
  if (max === rn) hue = ((gn - bn) / delta) % 6
  else if (max === gn) hue = (bn - rn) / delta + 2
  else hue = (rn - gn) / delta + 4

  hue *= 60
  if (hue < 0) hue += 360
  return hue
}

async function extractHue(filePath) {
  const { data, info } = await sharp(filePath)
    .resize(32, 32, { fit: 'inside' })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  const pixels = info.width * info.height
  let rSum = 0
  let gSum = 0
  let bSum = 0

  for (let i = 0; i < data.length; i += info.channels) {
    const alpha = info.channels === 4 ? data[i + 3] / 255 : 1
    rSum += data[i] * alpha
    gSum += data[i + 1] * alpha
    bSum += data[i + 2] * alpha
  }

  return rgbToHue(rSum / pixels, gSum / pixels, bSum / pixels)
}

function compareByColorAndSize(a, b) {
  if (a.hue !== b.hue) return a.hue - b.hue

  const areaA = a.width * a.height
  const areaB = b.width * b.height
  if (areaA !== areaB) return areaB - areaA

  return naturalCompare(a.filename, b.filename)
}

function sortGalleryEntries(entries) {
  const priority = []
  const rest = []

  for (const entry of entries) {
    const number = priorityNumber(entry.filename)
    if (number !== null) priority.push({ entry, number })
    else rest.push(entry)
  }

  priority.sort((a, b) => a.number - b.number || naturalCompare(a.entry.filename, b.entry.filename))
  rest.sort(compareByColorAndSize)

  return [...priority.map(({ entry }) => entry), ...rest]
}

function isImageFile(name) {
  if (name.startsWith('.')) return false
  return IMAGE_EXTENSIONS.has(path.extname(name).toLowerCase())
}

function portfolioImage(category, filename) {
  return `/portfolio/${category}/${encodeURIComponent(filename)}`
}

function portfolioThumb(category, filename) {
  const stem = filename.replace(/\.[^.]+$/u, '')
  return `/portfolio/${category}/thumbs/${encodeURIComponent(`${stem}.webp`)}`
}

async function ensureThumb(category, filename, filePath) {
  const thumbDir = path.join(portfolioDir, category, 'thumbs')
  await mkdir(thumbDir, { recursive: true })

  const thumbFilename = `${filename.replace(/\.[^.]+$/u, '')}.webp`
  const thumbPath = path.join(thumbDir, thumbFilename)
  const metadata = await sharp(filePath).metadata()

  if (!metadata.width || !metadata.height) {
    throw new Error(`Could not read dimensions for ${filePath}`)
  }

  if (metadata.width <= THUMB_MAX_WIDTH) {
    await sharp(filePath).rotate().webp({ quality: 82, effort: 4 }).toFile(thumbPath)
    return {
      thumb: portfolioThumb(category, filename),
      thumbWidth: metadata.width,
      thumbHeight: metadata.height,
    }
  }

  const thumbMeta = await sharp(filePath)
    .rotate()
    .resize({ width: THUMB_MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: 82, effort: 4 })
    .toFile(thumbPath)

  return {
    thumb: portfolioThumb(category, filename),
    thumbWidth: thumbMeta.width,
    thumbHeight: thumbMeta.height,
  }
}

function escapeString(value) {
  return value.replace(/\\/g, '\\\\').replace(/'/g, "\\'")
}

async function scanCategory(category) {
  const dir = path.join(portfolioDir, category)
  let names = []

  try {
    names = await readdir(dir)
  } catch (error) {
    if (error && typeof error === 'object' && 'code' in error && error.code === 'ENOENT') {
      return []
    }
    throw error
  }

  const filenames = names.filter((name) => isImageFile(name) && name !== 'thumbs')
  const entries = []

  for (const filename of filenames) {
    const filePath = path.join(dir, filename)
    const buffer = await readFile(filePath)
    const dimensions = imageSize(buffer)

    if (!dimensions.width || !dimensions.height) {
      throw new Error(`Could not read dimensions for ${filePath}`)
    }

    const thumb = await ensureThumb(category, filename, filePath)

    entries.push({
      filename,
      width: dimensions.width,
      height: dimensions.height,
      hue: await extractHue(filePath),
      ...thumb,
    })
  }

  const sorted = sortGalleryEntries(entries)
  const usedIds = new Set()

  return sorted.map((entry, index) => {
    const slug = entry.filename
      .replace(/\.[^.]+$/u, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 48)

    const base = `${category}-${slug || String(index + 1).padStart(2, '0')}`
    let id = base
    let suffix = 2
    while (usedIds.has(id)) {
      id = `${base}-${suffix}`
      suffix += 1
    }
    usedIds.add(id)

    return {
      id,
      category,
      image: portfolioImage(category, entry.filename),
      thumb: entry.thumb,
      width: entry.width,
      height: entry.height,
      thumbWidth: entry.thumbWidth,
      thumbHeight: entry.thumbHeight,
      filename: entry.filename,
    }
  })
}

function renderGalleryTs(items) {
  const lines = items.map((item) => {
    const parts = [
      `    id: '${escapeString(item.id)}'`,
      `    category: '${item.category}'`,
      `    image: '${escapeString(item.image)}'`,
      `    thumb: '${escapeString(item.thumb)}'`,
      `    width: ${item.width}`,
      `    height: ${item.height}`,
      `    thumbWidth: ${item.thumbWidth}`,
      `    thumbHeight: ${item.thumbHeight}`,
    ]
    return `  {\n${parts.join(',\n')},\n  }`
  })

  return `import type { GalleryCategory, GalleryItem } from '@/models/types'

/** Auto-generated by \`npm run gallery:sync\` — do not edit by hand. */
export const GALLERY_CATEGORIES: GalleryCategory[] = ['selected-work', 'full-book-spread']

export const galleryItems: GalleryItem[] = [
${lines.join(',\n')}
]
`
}

async function updateLocale(localePath) {
  const raw = await readFile(localePath, 'utf8')
  const locale = JSON.parse(raw)

  if (!locale.gallery) {
    throw new Error(`Missing gallery section in ${localePath}`)
  }

  delete locale.gallery.untitled
  delete locale.gallery.viewWork
  delete locale.gallery.items

  await writeFile(localePath, `${JSON.stringify(locale, null, 2)}\n`, 'utf8')
}

async function main() {
  const allItems = []

  for (const category of CATEGORIES) {
    const items = await scanCategory(category)
    allItems.push(...items)
    console.log(`  ${category}: ${items.length} image(s)`)
  }

  await writeFile(galleryTsPath, renderGalleryTs(allItems), 'utf8')
  await updateLocale(enLocalePath)
  await updateLocale(heLocalePath)

  console.log(`\nSynced ${allItems.length} gallery image(s) → src/data/gallery.ts`)
}

main().catch((error) => {
  console.error('gallery:sync failed:', error)
  process.exit(1)
})
