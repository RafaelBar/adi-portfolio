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

async function loadLocale(code) {
  const filePath = path.join(root, 'src', 'locales', `${code}.json`)
  const data = JSON.parse(await readFile(filePath, 'utf8'))
  return {
    title: i18nTitle(data.meta.title),
    description: data.meta.description,
    imageAlt: code === 'he' ? 'עדי בדש — מאיירת ספרי ילדים' : "Adi Badash — children's book illustrator",
  }
}

function applySeo(html, { lang, dir, title, description, imageAlt, url, ogLocale, altLocale }) {
  return html
    .replace(/<html lang="[^"]*"/, `<html lang="${lang}"`)
    .replace(/ dir="[^"]*"/, ` dir="${dir}"`)
    .replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
    .replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
      `<meta name="description" content="${description}" />`,
    )
    .replace(
      /<meta property="og:title" content="[^"]*"\s*\/?>/,
      `<meta property="og:title" content="${title}" />`,
    )
    .replace(
      /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/,
      `<meta property="og:description" content="${description}" />`,
    )
    .replace(
      /<meta property="og:url" content="[^"]*"\s*\/?>/,
      `<meta property="og:url" content="${url}" />`,
    )
    .replace(
      /<meta property="og:locale" content="[^"]*"\s*\/?>/,
      `<meta property="og:locale" content="${ogLocale}" />`,
    )
    .replace(
      /<meta property="og:locale:alternate" content="[^"]*"\s*\/?>/,
      `<meta property="og:locale:alternate" content="${altLocale}" />`,
    )
    .replace(
      /<meta property="og:image:alt" content="[^"]*"\s*\/?>/,
      `<meta property="og:image:alt" content="${imageAlt}" />`,
    )
    .replace(
      /<meta name="twitter:title" content="[^"]*"\s*\/?>/,
      `<meta name="twitter:title" content="${title}" />`,
    )
    .replace(
      /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/,
      `<meta name="twitter:description" content="${description}" />`,
    )
}

async function main() {
  const templatePath = path.join(distDir, 'index.html')
  const template = await readFile(templatePath, 'utf8')

  const he = await loadLocale('he')
  const en = await loadLocale('en')

  const heHtml = applySeo(template, {
    lang: 'he',
    dir: 'rtl',
    title: he.title,
    description: he.description,
    imageAlt: he.imageAlt,
    url: `${SITE_URL}/he`,
    ogLocale: 'he_IL',
    altLocale: 'en_US',
  })

  const enHtml = applySeo(template, {
    lang: 'en',
    dir: 'ltr',
    title: en.title,
    description: en.description,
    imageAlt: en.imageAlt,
    url: `${SITE_URL}/en`,
    ogLocale: 'en_US',
    altLocale: 'he_IL',
  })

  await writeFile(templatePath, heHtml, 'utf8')

  const enDir = path.join(distDir, 'en')
  await mkdir(enDir, { recursive: true })
  await writeFile(path.join(enDir, 'index.html'), enHtml, 'utf8')

  console.log('  seo: locale-specific HTML → dist/index.html (he), dist/en/index.html (en)')
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
