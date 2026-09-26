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

---

## 10. DM Sans redesign (owner-directed; supersedes §§1–2, 4–5, 9 where they differ)

Direction: proportional warmth for voice and titles; mono stays where it reads honest
(dates, tags, micro-labels, code surfaces, figure interiors). Autopilot-subtle: soft
contrast + one ghost shape + air with purpose. No cards, no pills, no shadows, no accent.
Two families, two weights each max, neutral ramp untouched.

### 10.1 Fonts — DM Sans voice, Plex document (measured)

- **DM Sans, static instances, weights 400 + 500 only, latin.**
  `DM_Sans({ weight: ['400','500'], subsets: ['latin'], variable: '--font-dm-sans' })`
  — same loader shape as today's Plex loader, minimal diff. Static, not variable:
  with static instances the ladder is enforced by availability (a stray 600 falls back
  to 500 under `font-synthesis: none` instead of rendering); variable would ship a
  100–1000 range and let any 600/700 literal silently break the max-weight gate.
- **opsz omitted** (wght-only instances, no axes). At our scale — max 24px wordmark
  against an opsz 9–40 range — the optical delta is negligible; the axis buys file
  size and verification burden for ~zero visible effect. Revisit only if display type
  above 40px ever enters the system.
- **IBM Plex Mono retained, trimmed to weight 400 only**, for document registers
  (§10.3). Nothing on the page needs Plex 600 after the emphasis register moves to
  DM Sans 500 (figure interiors carry their own embedded subsets and never touch the
  page font). Payloads (latin woff2, desktop UA): Plex today ≈ 10KB; DM Sans static
  ≈ 37KB total; worst case still noise next to the ~146KB of figure payload.
- Nothing else sneaks in: latin subset + default preload (other subsets are
  unicode-range-gated and never fetch for our ASCII copy); style normal (no italics,
  matches the no-synthetic rule); display swap; adjustFontFallback stays on.
  `font-synthesis: none` stays as guardrail — anything missed degrades instead of
  faux-bolding, but the code says the right weight explicitly.
- Fallback stacks: DM Sans → `var(--font-dm-sans), ui-sans-serif, system-ui, sans-serif`;
  Plex keeps its mono stack. Body defaults to the DM Sans stack.

Measure (canvas-verified before speccing): DM Sans 400 averages **8.34px**/letter
(500: 8.54px) against Plex Mono's flat 9.6px — ~13% narrower. Body at 16px/624px
moves from 65ch to **~75ch**, the top of the 60–75 gate. Container stays 624;
proofing re-verifies on the running assembly (§10.8).

### 10.2 Ladder — role → family + step

| role        | family  | px / lh | weight | tracking | where                                        |
| ----------- | ------- | ------- | ------ | -------- | -------------------------------------------- |
| site title  | DM Sans | 24 / 32 | 500    | -0.02em  | wordmark (the handshake slot)                |
| page title  | DM Sans | 22 / 30 | 500    | -0.01em  | detail h1, list h1, home "Case Studies" head |
| sub-head    | DM Sans | 18 / 26 | 500    | 0        | md h2 — mt 40, mb 12                         |
| entry title | DM Sans | 16 / 26 | 500    | 0        | list rows, md h3 — mt 28, mb 8               |
| body        | DM Sans | 16 / 26 | 400    | 0        | prose, lede — p mb 16                        |
| meta        | Plex    | 14 / 20 | 400    | 0        | nav, back links, meta rows                   |
| micro       | Plex    | 12 / 16 | 400    | 0        | dates, tags                                  |

Rules (carry from §2, revised):
- Markdown headings map to these steps and **never exceed the page title**: md h2 = 18,
  md h3 = 16, md h1 (if ever used) = 22 max.
- Below the page title, **weight differentiates, not size** — entry titles and h3 are
  body-size at 500.
- **No weight above 500 anywhere on the page** (was: 600). `strong` in prose = 500.
  The emphasis register renames 600 → 500 ladder-wide: DM Sans 500 Medium carries the
  role Plex 600 did. (Curator's "Fig. N stays 600" lock is honored as the emphasis
  step — same anchor, new numeral; a literal 600 would render as 500 anyway.)
- Nothing below 12px.
- Split principle: narrative voice (titles, prose, captions, blockquote, links) in
  DM Sans; instrument panel (nav, dates, tags, meta rows) in Plex. Captions tie to the
  article, figures stay artifacts — caption sentence moves to DM Sans 400 14/20
  neutral-500, "Fig. N" prefix to DM Sans 500 neutral-600, same size, mt 12 unchanged.
  Figure SVGs untouched (embedded Plex stands).

### 10.3 Wrap locks (curator — verified at 1280 + 390, not in markup)

Order is data: no truncation, no clamping of list titles or descriptions; refunds
description runs full, punchline at the end.
- Merchant title (73 chars): natural break after the colon; never strand "API" alone
  on line three. `text-wrap: balance` on detail h1 + list entry titles serves this —
  pure CSS, no content change — proofing confirms.
- No-break joins (proofing checks; a break here is a finding, and any nbsp fix is a
  copy change for the curator, not the build): `Webhook-Based` together (E-wallet
  title); `Bundle 2` together; `PJP Category 1 Bundle 2` together in hero and title.

### 10.4 Surface — two elements only

- **Wash:** `background-image: radial-gradient(640px 260px at 50% 0%, #F5F5F5 0%,
  rgba(245,245,245,0) 70%)` on the hero element itself — never a separate positioned
  layer (backgrounds can't overflow; problem eliminated by construction). Stops
  restricted to neutral-100 → transparent (chroma gate holds). No `filter: blur()`
  (paints outside the box, costs a mobile compositor layer); plain gradient with
  transparent falloff only. Static — no animation, no transition. No viewport units,
  no negative offsets. Paper `#FFFFFF` everywhere else. Text contrast unchanged
  (ink on near-white).
- **Ghost RN:** removed per owner review — it read as a second wordmark at
  `160px` and competed with the name. The wash carries the warmth alone.
  Record only; no asset, no placement, no replacement mark.

### 10.5 States (revised for the 500 ceiling)

- **Hover:** the quietest ink in the element steps one notch toward ink (**400→500**).
  Text already at 500/ink never changes color. No scale, no shadow, no color.
- **Focus-visible:** unchanged — `outline: 2px solid var(--foreground);
  outline-offset: 2px`, one rule site-wide.
- **Nav:** resting neutral-600 (Plex 400); current page ink + underline,
  `aria-current="page"`. **Prose links:** ink text, underline neutral-400 offset 4 →
  hover decoration neutral-600.

### 10.6 Figures

Delivered SVGs ship untouched. The img→figure+figcaption map is font-agnostic, no
change needed. Caption register per §10.2. Scanner checks (chroma/weight/size) are
font-independent — no harness changes. Convention holds for future figures: keep
embedding the mono subsets; the renderer never needs to know.

Figure images are zoomable (owner directive): image renders as the trigger
(`cursor: zoom-in`, keyboard-operable, existing ink focus ring — no new focus
style); overlay is a paper scrim (`bg-background/[0.97]`) with the figure at
natural 624 (never upscaled) plus its caption in-register; dismiss via
click-away, Esc, or the close control; focus trap + focus return + scroll lock.
No thumbnail transform or shadow — the zoom is the feedback.

### 10.7 Implementation inventory (build lane)

- `app/layout.tsx`: loader swap (DM Sans static 400+500 latin `--font-dm-sans`;
  Plex trims to `['400']`); fallback stacks per §10.1.
- `app/globals.css`: body family → DM Sans stack; `b/strong` 600→500; `t-site`
  (DM Sans 500, tracking -0.02em), `t-page` (DM Sans 500, 22/30, -0.01em), `t-sub` /
  `t-entry` (DM Sans 500); `t-body` (DM Sans 400); `t-meta` / `t-micro` (Plex stack,
  explicit); `text-wrap: balance` on `t-page` + list entry titles; blockquote inherits
  voice; wash class; ghost placement.
- Caption renderer (figure map): figcaption DM Sans split per §10.2
  (`font-semibold` → `font-medium` on the prefix); `th` cells → 500.
- Sweep thresholds: max-weight 500, body-sans check. No renderer or content changes.

### 10.8 Acceptance — verify on the running assembly, not the diff

1. `document.fonts` shows DM Sans at **400 and 500 only** + Plex Mono 400; body
   computes to DM Sans 16px.
2. No hierarchy inversion: 24 > 22 > 18 > 16 (500) > 16 (400). No markdown heading
   larger than its page title.
3. No rendered weight above **500** anywhere (spot-check `strong` in tables,
   caption prefixes, `th`).
4. Measure 60–75ch in the 624px container, DM Sans body.
5. Chroma 0 (wash stops are neutral-100 → transparent); no `thead` fill; no
   synthetic italic; no ghost asset, no ghost refs.
6. Caption registers: sentence DM Sans 400/neutral-500, "Fig. N" DM Sans
   500/neutral-600, mt 12; all five figures render at natural size.
7. Wrap locks hold at 1280 + 390 (§10.3); page never overflows at 390
   (scrollW == innerWidth, figures contained as specced).
8. One focus rule on nav and links; hover 400→500 only, no transform/shadow.
9. No `.dark`, no `dark:` variants, no `!important` in `globals.css` (standing).
10. Lightbox: closed state renders nothing (no stray close control anywhere on
    the page); open state centers the figure at natural 624 with its caption,
    paper scrim, focus on the close control, scroll locked; Esc / click-away /
    close dismisses; focus returns to the triggering figure.

---

## 11. Warm cream editorial (owner-directed; supersedes §10 where they differ)

Direction: ElevenLabs style reference (`Downloads/DESIGN (1).md`) — warm eggshell
paper, black ink, whisper-weight display at 300, taupe cards, pill buttons,
hairlines, near-invisible shadows. Editorial restraint over marketing spectacle.
§10 freezes as the fallback; this section replaces its tokens, ladder top,
surfaces, and lightbox implementation. Content, order, figures, and states stay
quiet. No accent in UI. No copy changes.

### 11.1 Fonts — Inter whisper + voice, Plex instruments (measured)

- **Inter, static instances, weights 300 + 400 + 500, latin.**
  `Inter({ weight: ['300','400','500'], subsets: ['latin'] })`. Static, not
  variable: static pins exactly the three ladder weights, so the 300 floor and
  500 ceiling are enforced by availability under `font-synthesis: none`;
  variable would ship 100–900 and let any stray weight render.
  Payloads (Chrome UA, woff2, latin — build lane, measured): Inter static
  300+400+500 resolve to **one shared 48,432-byte file, single download**
  (all three weights serve the same URL); variable latin (opsz+wght) is
  73,016 bytes, ~1.5x. Compare last pass: DM Sans static two-weight ≈ 37KB
  vs variable 62.5KB. Preload count drops 2 → 1 while Plex stays non-preloaded
  as today (Inter contributes exactly 1 preload; 2 total only if Plex ever
  preloads). Net payload roughly neutral vs today (DM ~37KB + Plex ~10KB out;
  Inter ~48KB + Plex ~10KB in).
- **Weight-300 legibility caveat (build lane):** Inter 300 on eggshell is thin
  by construction — display-only at 32px+, never body.
- **IBM Plex Mono retained at 400** for instruments (nav, dates, tags, meta
  rows 13–14px) and figure interiors (embedded subsets untouched). Already
  loaded, zero new dependency. Geist Mono adds nothing here — not loaded.
- Fallback stacks: Inter → system sans; Plex keeps its mono stack.
  `font-synthesis: none` stays as guardrail.

### 11.2 Ladder — role → family + step

| role        | family | px / lh | weight | tracking | where                                        |
| ----------- | ------ | ------- | ------ | -------- | -------------------------------------------- |
| site title  | Inter  | 32 / 36 | 300    | -0.02em  | whisper wordmark (the one loud change)       |
| page title  | Inter  | 32 / 36 | 300    | -0.02em  | detail h1, list h1, home head; `balance` kept|
| sub-head    | Inter  | 20 / 27 | 400    | 0        | md h2 — never exceeds page title             |
| entry title | Inter  | 16 / 24 | 500    | 0        | list-card titles, md h3 — weight carries     |
| body        | Inter  | 16 / 24 | 400    | +0.01em  | prose, lede — p mb 16; measure re-proofed    |
| meta        | Plex   | 14 / 20 | 400    | 0        | nav, back links, meta rows                   |
| micro       | Plex   | 12 / 16 | 400    | 0        | dates, tags                                  |

Rules: markdown headings never exceed the page title (md h2 = 20 max).
**No weight above 500 anywhere** (`strong` = 500, `th` = 500, Fig-N prefix =
emphasis step, one above its sentence). Nothing below 12px. Voice (titles,
prose, captions, blockquote, links) in Inter; instruments in Plex.
Inter 14/16px body sizes carry +0.01em tracking per the reference.

### 11.3 Color — warm ramp, ash decorative-only

| token    | value     | role                                              |
| -------- | --------- | ------------------------------------------------- |
| eggshell | `#fdfcfc` | page canvas (replaces pure white; the warmth)     |
| taupe    | `#f5f3f1` | case-study cards, section bands — flat, borderless|
| stone    | `#ebe8e4` | hairlines, dividers (replaces neutral-200)        |
| ink      | `#000000` | primary text, filled pills                        |
| graphite | `#44403b` | secondary/emphasis text, Fig-N prefix             |
| smoke    | `#777169` | body-muted, descriptions, captions                |
| ash      | `#a59f97` | **never text — decorative only**                  |

Measured contrast on eggshell (build lane): ink 20.51, graphite 10.04,
smoke 4.71 (passes AA at 14–16px body), **ash 2.56 — fails at every text
size**. Captions stay smoke/graphite; ash never sets type.
**Violet `#0447ff` + ember `#ff4704` never enter `@theme`** (reference:
product-visuals-only; the portfolio has no product visuals; curator locks no
meaning by color — order, text, position carry everything). Cut, not tokenized.
Shadows default flat: the whisper stack (1px edge + 4% blur) is allowed on
exactly one surface — the open Dialog popup. A card needing separation gets
taupe, not shadow.

### 11.4 Surface & components (reference mapped to our templates)

- **Shell kept:** 624px narrow measure (`max-w-2xl` minus `px-6`) stays — it
  is the site's identity. The reference's 1280 shell is not followed; widening
  re-opens the measure gate for zero narrative gain.
- **Nav:** transparent 50px bar, wordmark left, links left-center as Inter
  14/500 ghost pills (`9999px`); LinkedIn/email wording unchanged → outline
  pills (`#fdfcfc` fill, ink text, 1px `#e5e5e5`). Pill shape only, no copy
  change (curator lock).
- **Hero (locked constraint):** asymmetric editorial — display line Inter 300
  36px left, body 16px smoke right. **Stacks below ~640px** (display above
  body; never side-by-side at 390 — side-by-side at 342 content width
  overflows by construction; stacked keeps scrollW == innerWidth).
- **List rows → taupe cards:** each case study `#f5f3f1`, 20px radius, 32px
  padding, no border, no shadow. Title Inter 500 16, description Inter 400 14
  smoke, date Plex mono. Arrow `→` stays; hover quiet only. Titles and
  descriptions run verbatim — no truncation, no clamping (curator lock).
- **Detail pages:** structure unchanged. `t-page` becomes whisper 32; md h2/h3
  step down per ladder; blockquote ink bar inherits voice; tables keep
  hairlines-only in stone.
- **Dividers:** `1px solid #ebe8e4` where sections need explicit separation,
  whitespace elsewhere.
- **Radii:** pills `9999px` (buttons, tags, nav), cards `20px`, hero/flagship
  panel `24px`. Nothing sharper than 8px on any panel.

### 11.5 Base UI — Dialog only, locked shape per-figure roots

The portfolio has exactly one interactive surface. `@base-ui/react` lands
there and nowhere else. Blast radius (build lane, measured): 1.8.0,
tree-shakable, zero global CSS, zero CSS-in-JS, React 19 in peer range, Next
16 + Turbopack clean, risk LOW; only new file `package.json` + lockfile.
- **Locked shape: per-figure `Dialog.Root` (five roots).** Each figure owns
  its Trigger/Portal/Popup — the `figure-zoom` event bus is deleted entirely.
  §10.8 item 10 (closed-renders-nothing) holds per root as regression gate.
- Carries over: figure at natural 624 capped `max-h-80vh`, caption
  in-register (Inter 400 smoke + Fig-N 500 graphite), zoom-in cursor +
  keyboard-operable native `<Dialog.Trigger>`, scrim-click-to-close on
  Backdrop with `stopPropagation` on the image.
- **Scrim hardcode (standing lesson): `bg-[#fdfcfc]/[0.97]`** — arbitrary
  value + opacity modifier, never a theme token (`bg-background/[0.97]`
  painted nothing in the prod bundle, §10 finding). Paint verified in the
  prod bundle at implementation.
- Setup (two inert base-layer lines, no render effect): `body { isolation:
  isolate; position: relative; }` — portals paint above content; absolute
  backdrops cover the visual viewport on iOS 26 post-scroll.
- Net: ~100 lines deleted, ~40 added; Portal, focus trap, Esc, scroll lock,
  initial/return focus free.

### 11.6 Figures & captions

SVGs ship untouched (embedded Plex stands; renderer stays font-agnostic).
Caption register: sentence Inter 400 14/20 smoke, "Fig. N" Inter 500
graphite, mt 12 unchanged. Captions tie to the article (prose face); figures
stay artifacts (curator lock). No copy change.

### 11.7 Wrap locks (curator — re-proof at 1280 + 390 on running assembly)

Order is data: no truncation, no clamping; refunds punchline at the end;
Merchant first. Merchant 73 chars breaks after the colon where measure allows;
never strand API alone on line three. `Webhook-Based` together, `Bundle 2`
together, `PJP Category 1 Bundle 2` together in hero and title. At 390 the
narrow measure wins. **A 1280 break on a locked join stays a finding.**

### 11.8 Implementation inventory (build lane)

`package.json` (+ lockfile: `@base-ui/react`) → `app/layout.tsx` (Inter
300/400/500 + Plex 400 loaders; body keeps `max-w-2xl`) → `app/globals.css`
(cream `@theme`, ladder, pills, taupe cards, base-layer
`isolation`/`relative`) → `components/header.tsx` + `nav-link.tsx` (pill nav)
→ `app/page.tsx` (asymmetric hero + taupe list cards) → list/detail templates
→ `components/markdown-content.tsx` (caption re-token) →
`components/figure-lightbox.tsx` (Dialog migration, five roots). No renderer
or content changes beyond tokens.

### 11.9 Acceptance — verify on the running assembly, not the diff

1. `document.fonts` shows Inter at **300, 400, 500 only** + Plex Mono 400;
   body computes to Inter 16px.
2. No hierarchy inversion: 32 > 20 > 16 (500) > 16 (400). No markdown heading
   larger than its page title.
3. No rendered weight above **500** anywhere (spot-check `strong` in tables,
   caption prefixes, `th`).
4. Measure 60–75ch in the 624px container, Inter body (canvas-proofed).
5. Chroma limited to ink/graphite/smoke on warm surfaces; **ash zero hits on
   text**; no `thead` fill; no synthetic italic; no violet/ember tokens
   reachable.
6. Caption registers: sentence Inter 400/smoke, "Fig. N" Inter 500/graphite,
   mt 12; all five figures render at natural size.
7. Wrap locks hold at 1280 + real-device 390 (§11.7); page never overflows at
   390 (scrollW == innerWidth; hero stacked; figures contained).
8. One focus rule; hover quiet (one notch toward ink), no transform/shadow.
9. No `.dark`, no `dark:` variants, no `!important` in `globals.css`.
10. Dialog (per root): closed renders nothing; open centers the figure at
    natural 624 with its caption on the `bg-[#fdfcfc]/[0.97]` scrim, focus on
    close, scroll locked; Esc / backdrop / close dismisses; focus returns to
    the triggering figure.
