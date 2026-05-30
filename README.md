# Adi Illustrator Portfolio

Bilingual (Hebrew / English) portfolio for Adi — children's book illustrator, fantasy artist, custom paintings, and graphic design. Built with Vue 3, TypeScript, and Vite.

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). The site redirects to `/he` or `/en` based on browser language. Share links like `/en#gallery` or `/he#contact` preserve the selected language.

## Add your images

1. **Portrait** — replace `public/adi-portrait.svg` with `public/adi-portrait.jpg` (or update `portrait` in `src/data/profile.ts`)
2. **Gallery** — add images to:
   - `public/portfolio/selected-work/`
   - `public/portfolio/full-book-spread/`
3. Run `npm run gallery:sync` to regenerate `src/data/gallery.ts` from the folders
4. **Contact info** — update email and social links in `src/data/profile.ts`

## Customize copy

All user-facing text lives in:

- `src/locales/en.json`
- `src/locales/he.json`

Experience, services, and gallery entries are driven by data files in `src/data/`.

## Build

```bash
npm run build
npm run preview
```

Deploy the `dist/` folder to Netlify, Vercel, or GitHub Pages. For SPA routing, ensure all paths fall back to `index.html`.
