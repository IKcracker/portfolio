# kutullo. — portfolio

Personal portfolio of Kutullo Moropane, Zoho Developer at Infolytics SA, software developer and founder of Code Tech Agency.

Built with Next.js (App Router), React and Tailwind CSS v4.

## Sections

Introduction · Focus · Work (live demos + products in development) · Experience and toolkit · Client work · About · Services · Contact

## Where to edit content

| What | File |
| --- | --- |
| Experience, client work, in-development products, toolkit, contact links | `app/career-content.ts` |
| Hero, focus, live demo projects, services | `app/page.tsx` |
| Command palette (⌘K / Ctrl K / `/`) destinations | `app/site-interactions.tsx` |
| Downloadable CV | `public/cv/Kutullo_Moropane_CV.pdf` |
| SEO metadata | `app/layout.tsx` |

Client names are intentionally left out of the client work section.

## Styles

`app/globals.css` holds the design tokens (`--paper`, `--ink`, `--body`, `--olive`, `--rule`) and the main layout. `app/career.css` styles the experience, client work and in-development sections, and `app/discovery.css` the ⌘K explorer and scroll reveals. `app/theme.css` holds the dark theme; `app/theme-toggle.tsx` switches it and the inline script in `layout.tsx` applies the saved or system theme before the first paint.

## Development

```bash
npm install
npm run dev     # http://localhost:3000
npm run lint
npm run build
```

Project previews are captured live from each demo URL by `app/project-screenshot.tsx`; if a capture fails, a plain "preview unavailable" state is shown rather than a mock-up.
