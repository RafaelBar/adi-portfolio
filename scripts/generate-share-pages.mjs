import { readFile, writeFile, mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const distDir = path.join(root, 'dist')

const SITE_URL = 'https://adibadash.com'

function i18nTitle(raw) {
  return raw.replace(/\{'\|'\}/g, '|')
}

async function loadLocaleMeta(code) {
  const filePath = path.join(root, 'src', 'locales', `${code}.json`)
  const data = JSON.parse(await readFile(filePath, 'utf8'))
  return {
    siteTitle: i18nTitle(data.meta.title),
    ogLocale: code === 'he' ? 'he_IL' : 'en_US',
    altLocale: code === 'he' ? 'en_US' : 'he_IL',
    dir: code === 'he' ? 'rtl' : 'ltr',
  }
}

async function loadGalleryItems() {
  const filePath = path.join(root, 'src', 'data', 'gallery.ts')
  const source = await readFile(filePath, 'utf8')
  const items = []
  const blockRe =
    /id:\s*'([^']+)',\s*category:\s*'([^']+)',\s*image:\s*'([^']+)',\s*display:\s*'([^']+)',\s*thumb:\s*'([^']+)',\s*width:\s*(\d+),\s*height:\s*(\d+)/g

  for (const match of source.matchAll(blockRe)) {
    items.push({
      id: match[1],
      category: match[2],
      image: match[3],
      display: match[4],
      width: Number(match[6]),
      height: Number(match[7]),
    })
  }

  return items
}

async function loadCaptionOverrides() {
  const filePath = path.join(root, 'src', 'data', 'gallery-captions.ts')
  const source = await readFile(filePath, 'utf8')
  const overrides = {}
  const entryRe =
    /['"]([^'"]+)['"]\s*:\s*\{\s*he:\s*['"]([^'"]*)['"]\s*,\s*en:\s*['"]([^'"]*)['"]\s*\}/g

  for (const match of source.matchAll(entryRe)) {
    overrides[match[1]] = { he: match[2], en: match[3] }
  }

  return overrides
}

function getGalleryCaption(id, locale, index, overrides) {
  const override = overrides[id]?.[locale]
  if (override) return override
  return locale === 'he' ? `תיאור איור ${index}` : `Illustration caption ${index}`
}

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function buildSharePage({ locale, item, caption, meta }) {
  const title = `${caption} | ${meta.siteTitle}`
  const shareUrl = `${SITE_URL}/${locale}/i/${item.id}.html`
  const imageUrl = `${SITE_URL}${item.image}`
  const appUrl = `/${locale}#gallery/${item.id}`

  return `<!doctype html>
<html lang="${locale}" dir="${meta.dir}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(title)}</title>
    <link rel="canonical" href="${shareUrl}" />
    <meta property="og:type" content="article" />
    <meta property="og:site_name" content="Adi Badash" />
    <meta property="og:title" content="${escapeHtml(caption)}" />
    <meta property="og:description" content="${escapeHtml(caption)}" />
    <meta property="og:url" content="${shareUrl}" />
    <meta property="og:locale" content="${meta.ogLocale}" />
    <meta property="og:locale:alternate" content="${meta.altLocale}" />
    <meta property="og:image" content="${imageUrl}" />
    <meta property="og:image:width" content="${item.width}" />
    <meta property="og:image:height" content="${item.height}" />
    <meta property="og:image:alt" content="${escapeHtml(caption)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(caption)}" />
    <meta name="twitter:description" content="${escapeHtml(caption)}" />
    <meta name="twitter:image" content="${imageUrl}" />
    <meta http-equiv="refresh" content="0;url=${appUrl}" />
    <script>location.replace(${JSON.stringify(appUrl)})</script>
  </head>
  <body>
    <p><a href="${appUrl}">${escapeHtml(caption)}</a></p>
  </body>
</html>
`
}

async function main() {
  const items = await loadGalleryItems()
  const captionOverrides = await loadCaptionOverrides()
  const heMeta = await loadLocaleMeta('he')
  const enMeta = await loadLocaleMeta('en')

  for (const [index, item] of items.entries()) {
    for (const [locale, meta] of [
      ['he', heMeta],
      ['en', enMeta],
    ]) {
      const caption = getGalleryCaption(item.id, locale, index + 1, captionOverrides)
      const html = buildSharePage({ locale, item, caption, meta })
      const shareDir = path.join(distDir, locale, 'i')
      await mkdir(shareDir, { recursive: true })

      await writeFile(path.join(shareDir, `${item.id}.html`), html, 'utf8')

      const nestedDir = path.join(shareDir, item.id)
      await mkdir(nestedDir, { recursive: true })
      await writeFile(path.join(nestedDir, 'index.html'), html, 'utf8')
    }
  }

  console.log(`  share: ${items.length * 2} OG page(s) → dist/{he,en}/i/*.html`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
