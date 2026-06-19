import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const publicDir = path.join(root, 'public')
const imagesDir = path.join(publicDir, 'images')
const portraitSource = path.join(publicDir, 'primary-image.png')
const portraitMetaPath = path.join(root, 'src', 'data', 'portrait.generated.json')

const PORTRAIT_WIDTHS = [48, 480, 768, 1200]
  await mkdir(imagesDir, { recursive: true })

  const source = sharp(portraitSource)
  const metadata = await source.metadata()

  if (!metadata.width || !metadata.height) {
    throw new Error('Could not read portrait dimensions')
  }

  const variants = []

  for (const width of PORTRAIT_WIDTHS) {
    const filename = `portrait-${width}.webp`
    const outputPath = path.join(imagesDir, filename)

    const pipeline = sharp(portraitSource).rotate().resize({
      width,
      withoutEnlargement: true,
    })

    if (width <= 48) {
      await pipeline.webp({ quality: 40, effort: 4 }).toFile(outputPath)
    } else {
      await pipeline.webp({ quality: width <= 768 ? 82 : 86, effort: 4 }).toFile(outputPath)
    }

    const info = await sharp(outputPath).metadata()
    variants.push({
      width: info.width ?? width,
      height: info.height ?? Math.round((metadata.height / metadata.width) * width),
      src: `/images/${filename}`,
    })
  }

  const meta = {
    width: metadata.width,
    height: metadata.height,
    fallback: '/primary-image.png',
    placeholder: variants.find((variant) => variant.width <= 48)?.src ?? variants[0].src,
    sources: variants.filter((variant) => variant.width > 48),
  }

  await writeFile(portraitMetaPath, `${JSON.stringify(meta, null, 2)}\n`, 'utf8')
  console.log(`  portrait: ${variants.length} WebP variant(s) → public/images/`)
}

async function main() {
  await ensurePortraitVariants()
  console.log('\nImage optimization complete.')
}

main().catch((error) => {
  console.error('images:optimize failed:', error)
  process.exit(1)
})
