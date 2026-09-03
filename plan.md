# Portfolio Website — Build Plan

Owner: Hanzala Saleem — Software Engineer @ JFreaks Software Solutions

## 1. Goal

Rebuild the personal portfolio from scratch. Design language inspired by [firecrawl.dev](https://www.firecrawl.dev/) — dark, developer-first, bold accent color, code-forward, generous whitespace, rich micro-interactions. Content is sourced from the resume plus real production products built at JFreaks, not the outdated resume alone.

**Confirmed stack: Next.js + TypeScript + Tailwind CSS.** This is a fixed decision, not open for alternatives during build.

## 2. Tech Stack

- **Framework**: Next.js (App Router), TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion (scroll reveals, hover states, page transitions)
- **Icons**: lucide-react (or similar lightweight icon set)
- **Theme switching**: `next-themes` for light/dark toggle with system-preference detection and no flash-of-wrong-theme on load
- **Fonts**: a bold display sans-serif for headings, a clean sans-serif for body, a monospace face for code/tags (Firecrawl uses this pattern heavily — badges like `200 OK`, `.JSON` in monospace)
- **Content**: static typed data files under `app/src/data/` (products.ts, projects.ts, experience.ts, skills.ts) — no CMS, no database. Keeps the site static/fast and easy to update.
- **Deployment target**: Vercel (default for Next.js; confirm before first deploy)
- **Diagrams**: hand-built inline SVG architecture diagrams per product (no external diagramming library at runtime)
- **Background effects**: `three.js` (vanilla, no React Three Fiber) for a Firecrawl-style animated particle-network canvas behind hero sections

Coding standards:
- No comments in code — self-explanatory naming instead.
- Strict TypeScript, no `any`.
- Component-per-file, colocated by section under `app/src/sections/` and `app/src/components/`.
- Reusable primitives (Button, Badge, Card, SectionHeading) in `app/src/components/ui/`.
- No unused abstractions — build only what each section needs.

## 3. Design System (Firecrawl-inspired)

- **Theme**: light by default — white background, dark text, fire/orange accent. **Dark mode toggle included** (navy/near-black background, light text, same orange accent) — both themes must maintain strong, accessible contrast (WCAG AA minimum) for text and interactive elements.
- **Accent**: fire/orange as primary CTA and highlight color, used sparingly (buttons, active states, glow accents) — not everywhere. Same accent hue tuned per theme so it reads correctly on both white and dark backgrounds.
- **Typography**: large bold headlines, mixed weight body copy, monospace for code blocks, API-style badges, and section numbering (e.g. `01 / 06`).
  - **Description/subheading text font: `Lexend Deca`** — matches the font verid.dev uses for its description/standfirst copy (confirmed via CSS inspection: `.standfirst{font-family:var(--font-lexend)...}`). Load via `next/font/google`.
- **Layout**: sticky navbar, full-width hero with headline + subheading + CTA, grid-based feature/product cards, generous section padding.
- **Components**: pill badges, bordered cards with subtle shadow/glow on hover, tabbed code snippets where relevant (e.g. API usage examples on product pages), logo/tech-stack chips.
- **Motion**: scroll-triggered fade/slide-in on sections, hover scale/glow on cards and buttons, smooth page transitions between product case-study pages.

## 4. Site Structure / Sections

Single-page home with anchored sections, plus dedicated case-study pages per product.

1. **Hero** — name, role (Software Engineer), one-line value proposition, CTA buttons (View Products, Contact, Resume).
2. **About** — bio, education (BS Computer Science, IIU Islamabad), current focus.
3. **Skills** — grouped badge grid (Frontend, Backend, Mobile, DevOps/Infra, Tools).
4. **Work Experience** — timeline: Vespert Tech (React Native Developer, 06/2023–09/2023) → JFreaks Software Solutions (Software Engineer, 07/2024–present).
5. **Products** — case-study cards linking to individual `/products/[slug]` pages.
6. **Personal Projects** — cards for resume-listed side projects with GitHub links.
7. **Contact** — email, phone, GitHub, LinkedIn, contact form or mailto CTA.

## 5. Product Case Studies (`/products/[slug]`)

Each of the following gets its own detailed page:

| Product | URL | Role | Depth |
|---|---|---|---|
| Screenshotapi | screenshotapi.net | Built end-to-end | Full case study |
| Verid | verid.dev | Built end-to-end | Full case study |
| WhoisFreaks | whoisfreaks.com | Contributed | Full case study |
| CurrencyFreaks | currencyfreaks.com | Contributed | Full case study |
| Webscrape AI | webscrapeai.com | Contributed | Full case study |

"Built end-to-end" (Screenshotapi, Verid) means full ownership, not just development — state this explicitly on those two case-study pages: **design, coding, deployment, content, SEO, and marketing all done personally.** Do not apply this full-ownership claim to the "Contributed" products.

Each page includes:
- Hero banner (product name, one-liner, live link)
- Problem statement — what the product solves
- My role — end-to-end owner vs contributor (be accurate per product)
- Tech stack chips
- Key features list
- **High-level architecture diagram** (inline SVG) — client → API → processing layer → storage/delivery, tailored per product's real flow
- Link to the live product

Inferred stack per product (from live-site analysis, to confirm accuracy per product before publishing):
- **Screenshotapi**: Next.js frontend, REST API, Puppeteer/Playwright + Chromium rendering, cloud storage (S3/GCS/Wasabi), cron-based scheduling
- **Verid**: REST API (OpenAPI 3.1), Node.js SDK, headless browser automation + residential proxy escalation, webhook delivery with HMAC signing, Slack/Discord/email integrations
- **WhoisFreaks**: REST API, Python SDK, Cloudflare-fronted infrastructure
- **CurrencyFreaks**: REST API, multi-language SDK support (Python, Node, PHP, Ruby, Java, Go)
- **Webscrape AI**: Next.js frontend, no-code scraping engine, proxy + JS-rendering support

## 6. Skills Section — Final List

**From resume:**
React Native, React, HTML5, CSS, JavaScript (ES6), Node.js, Express.js, Firebase, MongoDB, Next.js, Tailwind CSS, PostgreSQL, TypeScript, Bootstrap, Wondershare Mockitt

**Added from real product work (confirmed):**
Puppeteer / Playwright (browser automation), Webhooks & HMAC signing, REST API & OpenAPI design, Cloud storage integration (AWS S3, GCS, Wasabi)

## 7. Confirmed Content Decisions

- Current role: **Software Engineer @ JFreaks Software Solutions** (resume said "Junior Software Developer" — outdated, corrected).
- Contact info: `hanzalabutt903@gmail.com`, `03207409403`, GitHub (`github.com/HANZALASALEEM`), LinkedIn.
- Accent color: fire/orange, light background by default (dark mode available), matching Firecrawl's energy.
- Content language: English (site copy, case studies, UI labels).
- Animation level: rich (Framer Motion scroll reveals + hover interactions).
- Webscrapai product URL corrected to **webscrapeai.com** (webscraper.ai is an unrelated parked domain for sale — not used).

## 8. Open Items Before Build / Launch

**Resolved during build:**
- A newer, more accurate resume PDF was found (`assets/resume/resume-latest.pdf`) and used as the source of truth for title, bullets, and stack — it's now wired up as the "Download Resume" CTA at `public/resume.pdf`.

**Round 4 polish (design feedback):**
- Replaced the simple dot/line particle canvases with a proper generative shader background: a flowing, organic gradient-and-contour-line texture (simplex noise `fbm`, rendered as a full-screen `ShaderMaterial` plane) — reads as a genuinely designed visual instead of scattered dots. Same four variants (`network`/`grid`/`waves`/`field`), now differentiated by noise scale/speed/intensity rather than geometry type.
- Found and fixed a real bug while building this: the `OrthographicCamera` was constructed with `top`/`bottom` swapped (`(0, width, 0, height, ...)` instead of the standard `(-w/2, w/2, h/2, -h/2, ...)`), which silently reversed the plane's winding order and made Three.js's default back-face culling discard it entirely — the canvas was rendering nothing while reporting a successful draw call. Confirmed via an isolated, dependency-free repro outside Next.js/React before patching. Point/line-based drivers hadn't hit this because points and lines aren't back-face-culled.
- Removed the flat accent-filled badge style — badges (including "Built end-to-end") are now outline-only (accent border + text on a neutral background), never accent-filled.
- Removed the accent color bar from the top of homepage product cards.
- Personal Projects section now makes clear these predate industry experience: "Built during university, before any industry experience."
- Every personal project with a public repo now gets its own case-study page (`/projects/[slug]`), matching the product-page pattern (tech stack, key features, GitHub link) — content pulled from actually inspecting each repo's `package.json` and file structure, not guessed. One correction this surfaced: the "SIS Automation System" repo (`FINAL-PROJECT`) turned out to actually be a school management system for "Suffah School" with a React Native mobile app (AI chat via Google Generative AI, push notifications) and a separate React admin web dashboard (Chakra UI/Ant Design, PDF export) — this was the same project the newer resume separately called "School Management App." Merged into one accurate entry, `suffah-school`, instead of two.

**Round 3 polish (design feedback):**
- Reworked the homepage into an alternating pattern: plain white/dark section, then a Three.js canvas-background section, repeating (Hero → About(plain) → Skills(canvas) → Experience(plain) → Products(canvas) → Projects(plain) → Contact(canvas)). Removed the earlier flat accent-tinted "Products" band entirely per feedback that it looked bad.
- `ThreeBackground` now supports four distinct variants so each canvas section looks different: `network` (Hero — particle network with connecting lines), `grid` (Skills — a gently bobbing dot grid), `waves` (Products — flowing sine-wave lines), `field` (Contact and the product-page Tech Stack/Architecture banners — sparse, light, subtle dots).
- Card/badge surfaces reverted from a warm accent-tinted cream back to neutral, so the accent color reads as a deliberate highlight (buttons, badges, icons, canvases) rather than a wash over everything.
- Fixed a real rendering bug: an opaque `bg-background` class set directly on the same `<section>` that hosts a negative-z-index Three.js canvas caused the canvas to render invisibly in this environment (contrary to standard CSS stacking order, likely a compositor quirk with WebGL canvases + negative z-index siblings). Fix: don't set a background color on the section itself — let it inherit the `<body>` background, matching the pattern the Hero section already used successfully.

**Round 2 polish:**
- Product pages now show a stylized abstract "browser mockup" visual (`ProductMockup` component: browser chrome frame + gradient art seeded per product) since real product screenshots aren't available yet. These are clearly placeholder art, not fake screenshots — swap for real screenshots once captured.
- Added a Firecrawl-style animated particle-network background (`ThreeBackground`, built with `three.js` directly) behind the Hero and each product page's hero. Respects `prefers-reduced-motion` (renders one static frame, no animation loop) and pauses via the Page Visibility API when the tab isn't active.
- Increased accent-color presence site-wide: warm accent-tinted card/section surfaces, an accent-tinted `Products` section band, accent-filled "Built end-to-end" badges, accent nav-link underlines and brand dot, top accent bar on product cards.
- Rebuilt the dark theme palette: cooler navy/charcoal surfaces instead of the original warm near-black, brighter muted text, and clearer border separation between layers, for better readability and contrast.
- Removed all em dashes and en dashes from site copy (data files and components) in favor of colons, commas, "to", or restructured sentences.
- Fixed a layout bug on the product page: the ownership badge was stretching full-width because its parent flex-column container was missing `items-start` (flex default `align-items: stretch` was pulling `inline-flex` badge to the container width).

**Still open:**
- Per-product "my role" wording (end-to-end owner vs contributor) should be double-checked against actual involvement before publishing case studies, especially for WhoisFreaks / CurrencyFreaks / Webscrape AI.
- Architecture diagrams are inferred at a high level from public site behavior and resume bullets — flag any inaccuracies so they can be corrected per product.
- Need real product screenshots to eventually replace the stylized mockup placeholders.
- Need a current personal photo for Hero/About (none is used yet — hero is currently text-only).
- Still using the default Next.js favicon — needs a real favicon/logo mark.
- Custom domain not yet purchased — `metadataBase`/OG URLs in the code currently point to a placeholder `hanzalasaleem.dev`, update once the real domain is bought.

## 9. Design Workflow / Tooling

Design work (visual direction, typography, color palettes, component styling, brand/logo, banners, diagrams) should lean on Claude Code skills rather than ad-hoc choices:

- `design` — logo, brand identity, banners, icons, HTML slides, social images
- `dataviz` — chart/dashboard palettes, light+dark safe visualizations (useful for architecture diagrams and any metrics shown on product pages)
- Additional requested: `frontend-design`, `bencium-ux` / `bencium-innovative-ux-designer`, `ui-ux-pro-max`, `ui-styling`, `design-system`, `banner-design`, `brand`, `slides` — **not yet installed** in this environment. These come from a plugin marketplace and need to be added via `/plugin marketplace add <source>` + `/plugin install` before they can be used. Marketplace source TBD.

## 10. SEO, Performance, Accessibility & Ops

- **SEO**: per-page metadata (title, description, canonical) via Next.js Metadata API; unique Open Graph image per product case-study page; `sitemap.xml` + `robots.txt` (auto-generated); JSON-LD `Person` schema on the homepage for name/role/social links.
- **Performance**: `next/image` everywhere (no raw `<img>`), font subsetting via `next/font`, target Lighthouse 90+ on Performance/Best Practices/SEO/Accessibility.
- **Accessibility**: respect `prefers-reduced-motion` (disable/soften Framer Motion animations for users who opt out), visible focus states, semantic headings, alt text on all images/diagrams, keyboard-navigable nav and cards.
- **Analytics**: Vercel Analytics (or Plausible) for visitor tracking — lightweight, no cookie banner needed.
- **Branding assets**: favicon, small logo mark, default OG/social share image.
- **Domain**: custom domain (e.g. `hanzalasaleem.dev` or similar) — buy + configure DNS on Vercel before launch.
- **Tooling**: ESLint + Prettier enforced, GitHub Actions for lint/build check on PRs, Vercel preview deployments per branch.
- **404 page**: on-brand custom not-found page.

## 11. Build Order

1. Design tokens (Tailwind theme: colors, fonts, spacing) + base UI primitives
2. Layout shell: navbar, footer, page transitions
3. Home sections: Hero → About → Skills → Experience → Products (cards) → Projects → Contact
4. Product case-study template + 5 product pages + architecture diagrams
5. Responsive pass (mobile/tablet/desktop) + light/dark theme polish
6. Animation pass (scroll reveals, hover states)
7. Content review pass against Section 8 open items
8. Deploy
