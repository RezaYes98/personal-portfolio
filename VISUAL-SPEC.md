# VISUAL-SPEC — rezanur portfolio

Direction: monochrome, rigid, nothing decorative. Every number below is measured from the
running site (home, /case-studies, /case-studies/pjp2-compliance, /projects; 1280px and 390px;
no horizontal overflow at 390).

Status: approved by Owner ("go ahead"); all-mono resolved (§1); favicon shipped (§3).
Implementation owned by Design Engineer; acceptance checks in §9.

---

## 0. Measured before-state (why these changes)

- **Two families, one of them accidental.** Body text renders in the OS UI font: `--font-geist-sans`
  is referenced in `@theme` (globals.css:9–10) but never defined anywhere. Headings are forced to
  IBM Plex Mono by an `!important` block (globals.css:125–127). `document.fonts` confirms: only
  Plex Mono 500/600/700 are ever loaded; 400 is never used because no body text is mono.
- **Hierarchy inversion in prose.** Markdown h2 renders **30px/700** against a page title of
  **24px/600**; markdown h3 renders **24px/600** — equal to the page title. A case study's section
  head outranks its own title, and on mobile it is the loudest element on the page.
- **`@tailwindcss/typography` is not installed**, and `.prose` is nested twice (page wrapper +
  MarkdownContent). Every `prose-*` class renders nothing; visible markdown styling comes from
  hard-coded classes in `components/markdown-content.tsx`.
- **Dark mode is unreachable.** `.dark` token block + ~60 `dark:` variants, but nothing ever applies
  the class (no provider, no script; `@custom-variant dark` is class-based, so OS dark mode never
  triggers it either). `--chart-1..5`, `--sidebar-*`, `--destructive`, `--accent` are unused — the
  only chroma in the CSS.
- **Measure:** 624px at 16px system sans ≈ **77 chars/line** (canvas-measured avg advance 8.16px) —
  above the 60–75 target. At 16px Plex Mono the same measure is **65ch** — inside it.
- **`<strong>` in a table computes 14px/900** (`bolder` resolved against a 600-weight `th` context).
- Only other chroma site-wide: favicon `#E74C3C`, and the `oneDark` syntax theme (never renders —
  no code fences exist in content).

## 1. Fonts — all-mono (decision resolved)

- **All-mono.** IBM Plex Mono, weights **400 + 600 only** (500/700 stop loading). 624px ÷ 9.6px
  advance = 65ch. One metrics system, zero new dependencies, minimum flex.
- The two-family alternative is off the table unless mono long-form is rejected later — it would
  cost a second metrics system and a narrower measure (~560px) to stay in the 65–70ch range.

Delete the undefined geist vars (`@theme` lines 9–10) and apply the family once in the base layer,
not via `!important`:

```css
/* globals.css @layer base */
body { font-family: var(--font-ibm-plex-mono), ui-monospace, SFMono-Regular, Menlo, monospace; }
```

## 2. Type ladder — role → step

| role        | px / line-height | weight | where                                            |
| ----------- | ---------------- | ------ | ------------------------------------------------ |
| site title  | 24 / 32          | 600    | wordmark                                         |
| page title  | 20 / 28          | 600    | detail h1, list h1, home "Case Studies" head     |
| sub-head    | 18 / 26          | 600    | md h2 — mt 40, mb 12                             |
| entry title | 16 / 26          | 600    | list rows, md h3 — mt 28, mb 8                   |
| body        | 16 / 26          | 400    | prose, lede — p mb 16                            |
| meta        | 14 / 20          | 400    | dates, nav, back links, meta rows                |
| micro       | 12 / 16          | 400    | tags                                             |

Rules:

- Markdown headings map to these steps and **never exceed the page title**: md h2 = 18, md h3 = 16,
  md h1 (if ever used) = 20 max. Current md h2 (30) and h3 (24) both violate this.
- Below the page title, **weight differentiates, not size** — entry titles and h3 are body-size at 600.
- No weight above 600 anywhere; `strong` in prose = 600 (it currently resolves to 900).
- Nothing below 12px.

Ship as named classes in globals.css (`t-site`, `t-page`, `t-sub`, `t-entry`, `t-body`, `t-meta`,
`t-micro`) so components stop carrying ad-hoc sizes.

## 3. Color — one ramp (values measured in the current render)

| token      | value     | role                                                          |
| ---------- | --------- | ------------------------------------------------------------- |
| ink        | `--foreground` (renders ≈ #0c0c0c) | all content text: titles, body, links |
| neutral-600| #515151   | descriptions, nav resting, back links, meta rows, blockquote  |
| neutral-500| #737373   | dates, tags                                                    |
| neutral-400| #a1a1a1   | decoration only: row arrows, underline color                   |
| neutral-200| #e5e5e5   | hairlines: table rules, blockquote bar                         |
| neutral-100| #f5f5f5   | inline-code surface                                            |
| paper      | #ffffff   | background                                                     |

The ramp mostly exists in the render; the fix is **assignment**: home hero and prose currently use
`neutral-800` while everything else inherits `--foreground` — unify to one ink. Then:

- Tables: horizontal hairlines only — **cut the `thead` fill** (renders #fafafa today).
- Blockquote: 1px ink bar, **no italic** (italic weight not loaded → synthetic slant).
- No accent anywhere. Delete the chart/sidebar/destructive/accent token dump.
- Favicon: ink disc + paper `RN` — **shipped**. `public/favicon.svg` carries the Plex Mono 600
  letterforms as outlines (no font dependency — renders identically everywhere), proofed at 16px
  against a tab strip; `public/favicon.ico` and `app/favicon.ico` regenerated at 16/32/48/256.
  `#E74C3C` is gone.

## 4. States — one rule each, site-wide

- **Hover:** the quietest ink in the element steps one notch toward ink (400→600, 600→900). Text
  already at ink never changes color. No scale, no shadow, no color.
- **Focus-visible:** `outline: 2px solid var(--foreground); outline-offset: 2px` — one rule for the
  whole site. (Currently `outline-ring/50`: mid-gray at 50% — replace.)
- **Nav:** resting neutral-600; current page ink + underline, `aria-current="page"`.
- **Prose links:** ink text, underline neutral-400 offset 4 → hover decoration neutral-600.

## 5. Rhythm

4px base. Section gap 64 (`mb-16`); list row gap 32 (`space-y-8`); wordmark mb 32; nav gap 24; body
padding 48/80. Measure stays 672 − 48 = 624px — it is correct once the body is mono (65ch).

## 6. Cuts (all verified unused)

- `globals.css`: geist font mappings, `!important` heading block, `.dark` block, shadcn token dump,
  `@custom-variant dark`, `tw-animate-css` import.
- `components/ui/*` (card, badge, button) and `components/case-study-card.tsx` — no importers; the
  card language renders nowhere, flat rows are the site's language. `components/footer.tsx` — an
  empty `<div>`; body padding carries the bottom.
- `public/{file,globe,next,vercel,window}.svg`.
- deps: `react-syntax-highlighter` (+types), `@radix-ui/react-slot`, `class-variance-authority`,
  `clsx`, `tailwind-merge`, `lucide-react`, `tw-animate-css`. README still references Geist — one line.
- `layout.tsx`: `IBM_Plex_Mono` weights → `['400','600']`.

## 7. Voids

/projects is an empty list once Hauselab is removed — a blank page under a heading today
(`content/projects/Hauselab.md` was still present when this was written; the content cut hasn't
landed). Recommendation: drop "projects" from the nav until something ships (if kept, Writer
supplies one line, same slot as the articles "Coming soon" pattern).

## 8. Optional (not blocking)

- Wordmark links to `/`; drop "home" from the nav (6 → 5 items).
- The three hero paragraphs are Writer's call — visually they are one 16/26 block; no change asked.

## 9. Acceptance — verify on the running site, not the diff

1. `document.fonts` shows IBM Plex Mono at weights **400 and 600 only**; body text computes to
   IBM Plex Mono at 16px.
2. No hierarchy inversion: site title 24 > page title 20 > md h2 18 > md h3 / entry 16 (600) >
   body 16 (400). No markdown heading renders larger than its page title.
3. No rendered weight above 600 anywhere (spot-check `strong` inside tables).
4. Measure: prose line length 60–75ch in the 672px container.
5. Chroma count = 0 outside the neutral ramp; no `thead` fill; no synthetic italic.
6. One focus rule visible on nav and links; hover never changes text color, scale, or shadow.
7. No `.dark` tokens, no `dark:` variants, no `!important` left in `globals.css`.
