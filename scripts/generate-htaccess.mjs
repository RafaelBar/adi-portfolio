import { writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.resolve(__dirname, '..', 'dist')

const htaccess = `# Gallery share pages + locale SPA routing
<IfModule mod_rewrite.c>
  RewriteEngine On

  # OG share pages (pretty URLs without .html)
  RewriteRule ^(he|en)/i/([^/.]+)/?$ $1/i/$2.html [L]

  # English locale SPA
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^en/?(.*)$ /en/index.html [L]

  # Default Hebrew SPA
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^ index.html [L]
</IfModule>
`

async function main() {
  await writeFile(path.join(distDir, '.htaccess'), htaccess, 'utf8')
  console.log('  htaccess: dist/.htaccess')
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
