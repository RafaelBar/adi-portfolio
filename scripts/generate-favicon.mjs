import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const outputPath = path.join(root, 'public', 'favicon.png')

const CREAM = '#F3ECE0'

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <defs>
    <clipPath id="round">
      <rect width="64" height="64" rx="14" ry="14"/>
    </clipPath>
  </defs>
  <g clip-path="url(#round)">
    <rect width="64" height="64" fill="${CREAM}"/>

  <path
    d="M14 22 C14 19, 17 17, 21 18 L32 21 L43 18 C47 17, 50 19, 50 22 V42 C50 45, 47 47, 43 46 L32 43 L21 46 C17 47, 14 45, 14 42 Z"
    fill="#D4C5E8"
    fill-opacity="0.35"
    stroke="#3D3A36"
    stroke-width="1.6"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
  <path
    d="M32 21 V43"
    stroke="#3D3A36"
    stroke-width="1.35"
    stroke-linecap="round"
  />

  <circle cx="23" cy="30" r="3.2" fill="#F5D5D0" stroke="#3D3A36" stroke-width="1.1"/>
  <path
    d="M19 36 C21 34, 25 34, 27 36"
    fill="none"
    stroke="#6B6560"
    stroke-width="1.1"
    stroke-linecap="round"
  />

  <path
    d="M37 28 H45 M37 32 H44 M37 36 H45"
    fill="none"
    stroke="#6B6560"
    stroke-width="1.05"
    stroke-linecap="round"
  />

  <path
    d="M40 14 L41.4 17.2 L44.8 17.8 L42.2 20 L42.9 23.4 L40 21.6 L37.1 23.4 L37.8 20 L35.2 17.8 L38.6 17.2 Z"
    fill="#C8D8C4"
    stroke="#3D3A36"
    stroke-width="1"
    stroke-linejoin="round"
  />

  <path
    d="M46 38 C49 36, 52 38, 51 41"
    fill="none"
    stroke="#B8A3D4"
    stroke-width="1.8"
    stroke-linecap="round"
  />
  <path
    d="M48 40 L51 37"
    fill="none"
    stroke="#3D3A36"
    stroke-width="1.5"
    stroke-linecap="round"
  />
  </g>
</svg>`

await sharp(Buffer.from(svg))
  .resize(128, 128)
  .png()
  .toFile(outputPath)

console.log('Generated public/favicon.png')
