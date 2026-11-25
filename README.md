# kutullo. — portfolio

Personal portfolio of Kutullo Moropane, Zoho Developer at Infolytics SA, software developer and founder of Code Tech Agency.

Built with Next.js (App Router), React and Tailwind CSS v4. The page ships in two designs that share the same markup and content:

- **01 Classic** — light editorial layout
- **02 Studio** — dark glass design with the kinetic hero field and the WebGL "systems universe"

Visitors switch with the toggle in the header, or with `?design=v1` / `?design=v2`. The choice is remembered in `localStorage`.

## Sections

Introduction · Focus · 3D universe · Work (live demos + products in development) · Experience and toolkit · Client work · About · Services · Contact

## Where to edit content

| What | File |
| --- | --- |
| Experience, client work, in-development products, toolkit, contact links | `app/career-content.ts` |
| Hero, focus, live demo projects, services | `app/page.tsx` |
| 3D universe nodes | `app/system-universe.tsx` |
| Command palette (⌘K / Ctrl K / `/`) destinations | `app/site-interactions.tsx` |
| Downloadable CV | `public/cv/Kutullo_Moropane_CV.pdf` |
| SEO metadata | `app/layout.tsx` |

Client names are intentionally left out of the client work section.

## Styles

`app/globals.css` holds the shared tokens (`--paper`, `--ink`, `--body`, `--olive`, `--rule`) and the Classic layout. Studio overrides live under `[data-portfolio-version="glass"]` in `glass.css`, `kinetic*.css` and `system-universe.css`. Styles for the experience, client work and in-development sections are in `app/career.css`.

## Development

```bash
npm install
npm run dev     # http://localhost:3000
npm run lint
npm run build
```

Project previews are captured live from each demo URL by `app/project-screenshot.tsx`; if a capture fails, a plain "preview unavailable" state is shown rather than a mock-up.
