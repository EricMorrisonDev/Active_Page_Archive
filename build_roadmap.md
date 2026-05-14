# Build Roadmap — Demo Components

This is the component inventory for the demo build. Grouped by concern. Each item has a one-line purpose so we can knock them out top-down.

---

## 1. Project scaffolding

- **Next.js (App Router) + TypeScript** — the app shell. Use `create-next-app` with the App Router.
- **Tailwind CSS** — styling. Keeps us moving fast without writing custom CSS files.
- **Fonts** — `Source Serif 4` (body/display) and `Inter` (UI labels), loaded via `next/font/google`.
- **ESLint + Prettier** — baseline code hygiene. Use the Next.js defaults.
- **`.gitignore` + `README.md`** — standard. README should explain the demo's purpose and how to add new issues to `issues.json`.

## 2. Data layer (the abstraction that survives to production)

- **`data/issues.json`** — single source of truth for the demo. Schema matches the one in `project_plan.md`.
- **`lib/types.ts`** — TypeScript types: `Issue`, `FeaturedArticle`, `Tag`. Mirrors the eventual Postgres schema.
- **`lib/issues.ts`** — data access functions. Everything in the UI calls these, never reads JSON directly:
  - `getAllIssues()`
  - `getIssueById(id)`
  - `getIssuesByYear(year)`
  - `getAllTags()`
  - `searchIssues(query)`
- **Why this matters:** when we swap to Postgres/Supabase later, only `lib/issues.ts` changes. Components stay the same.

## 3. Static assets

- **`public/issues/`** — the placeholder PDFs (named `YYYY-MM.pdf` to match production convention).
- **`public/covers/`** — cover thumbnails (JPEG, ~3:4 aspect ratio, ~600px wide).
- **`public/og/`** — Open Graph preview image for nice link previews when the demo URL gets shared.

## 4. Routes (App Router)

- **`app/page.tsx`** — landing page. Masthead, one-line description, "Browse the Archive" CTA, maybe a featured-issue hero.
- **`app/archive/page.tsx`** — main browsing experience. Year nav + cover grid + filters.
- **`app/issues/[id]/page.tsx`** — issue reader. PDF takes over the screen with a thin metadata sidebar.
- **`app/about/page.tsx`** — about the magazine and the archive project.
- **`app/tags/[tag]/page.tsx`** — *(optional, nice-to-have)* issues filtered by a single tag.
- **`app/layout.tsx`** — root layout with `<SiteHeader>`, `<SiteFooter>`, font setup, metadata.
- **`app/not-found.tsx`** — 404 page styled to match.

## 5. UI components

### Layout
- **`SiteHeader`** — masthead with magazine name, nav links (Archive / About).
- **`SiteFooter`** — credit, "Powered by [your name/agency]" if appropriate.
- **`YearNav`** — the horizontal date-navigation bar (top of `/archive`). A row of year buttons; clicking one filters the grid to that year.

### Archive browsing
- **`IssueGrid`** — responsive grid of `IssueCard`s.
- **`IssueCard`** — single cover image + issue title + date. The primary visual unit.
- **`SearchBar`** — client-side text search over title, tags, and featured-article titles.
- **`TagChip`** — a single tag pill. Clickable, links to `/tags/[tag]`.
- **`FilterControls`** — wraps `SearchBar` + tag filters + year selector. Syncs state to URL query params (`?year=1998&tag=festival`) so links are shareable.
- **`EmptyState`** — shown when filters return no results.

### Reader
- **`PdfReader`** — wraps `react-pdf`. Page-by-page, with prev/next, page jump, zoom.
- **`ReaderToolbar`** — page indicator, download button, back-to-archive link.
- **`IssueMetaSidebar`** — collapsible sidebar with title, date, summary, tags, featured articles list.
- **`FeaturedArticleList`** — clickable list; clicking a featured article jumps the reader to that page.

### Generic primitives
- **`Button`**, **`IconButton`** — keep these minimal; mostly styled Tailwind.
- **`Link`** — a thin wrapper around `next/link` if we want consistent hover styles.

## 6. Client-side state / utilities

- **URL-synced filter state** — use `useSearchParams` + `useRouter` so the back button and shared links work correctly.
- **`react-pdf` worker setup** — one-time config in a client component to point PDF.js at the worker bundle.
- **Keyboard shortcuts** — arrow keys for page nav in the reader (small touch, feels professional in a live demo).

## 7. Styling / theme

- **`app/globals.css`** — Tailwind imports, CSS variables for theme tokens (one accent color, serif/sans font families).
- **`tailwind.config.ts`** — extend with our font families and a single accent color we can hand off to the magazine to swap later.

## 8. Tooling scripts (not part of the running app)

- **`scripts/extract-cover.sh`** — shell script wrapping `pdftoppm` to generate a cover JPEG from page 1 of a PDF. Saves time when seeding the demo.
- **`scripts/validate-issues.ts`** — *(optional)* lints `issues.json` to make sure every entry has a matching PDF and cover file in `public/`.

## 9. Deployment

- **Vercel project** — zero-config for Next.js. Connect the GitHub repo, auto-deploys on push.
- **Custom domain** — *(optional)* something like `demo.magazinename.com` makes the pitch feel real if we can get it set up.

---

## Suggested file tree

```
/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── not-found.tsx
│   ├── archive/page.tsx
│   ├── issues/[id]/page.tsx
│   ├── tags/[tag]/page.tsx
│   ├── about/page.tsx
│   └── globals.css
├── components/
│   ├── layout/
│   │   ├── SiteHeader.tsx
│   │   ├── SiteFooter.tsx
│   │   └── YearNav.tsx
│   ├── archive/
│   │   ├── IssueGrid.tsx
│   │   ├── IssueCard.tsx
│   │   ├── SearchBar.tsx
│   │   ├── TagChip.tsx
│   │   ├── FilterControls.tsx
│   │   └── EmptyState.tsx
│   └── reader/
│       ├── PdfReader.tsx
│       ├── ReaderToolbar.tsx
│       ├── IssueMetaSidebar.tsx
│       └── FeaturedArticleList.tsx
├── lib/
│   ├── types.ts
│   └── issues.ts
├── data/
│   └── issues.json
├── public/
│   ├── issues/         # PDFs
│   ├── covers/         # cover JPEGs
│   └── og/             # OG image
├── scripts/
│   ├── extract-cover.sh
│   └── validate-issues.ts
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## Suggested build order

When we're ready to start, I'd tackle it in this order so we have something demo-able as early as possible:

1. Scaffold (Next.js + Tailwind + fonts + types).
2. Stub `issues.json` with 2–3 fake entries and write `lib/issues.ts`.
3. Build `IssueCard` + `IssueGrid` and the `/archive` route — first visible milestone.
4. Build `SiteHeader` / layout / landing page.
5. Build the reader (`/issues/[id]` + `PdfReader`) — second visible milestone.
6. Add `YearNav` + `FilterControls` + URL-synced filters.
7. Polish: about page, 404, OG image, keyboard shortcuts.
8. Swap in real placeholder PDFs and covers, finalize `issues.json`.
9. Deploy to Vercel.
