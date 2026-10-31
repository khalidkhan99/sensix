# Master Prompt — SensiX (Free Fire Sensitivity App)

Paste everything below into any AI coding assistant (Claude Code, Cursor, etc.) to rebuild the app.

---

## ROLE
You are a senior front-end engineer and UI designer. Build a complete, production-ready, mobile-first web app called **SensiX**: a Free Fire sensitivity generator with presets, saved profiles and sharing. Work autonomously, then run a production build and fix every error before finishing.

## TECH STACK
- Next.js (latest, App Router) + TypeScript (strict)
- Tailwind CSS v3 (tailwind.config.ts + postcss.config.mjs with autoprefixer)
- lucide-react for icons
- No database, no login, no external fonts (system font stack). State lives in React + localStorage.
- Path alias `@/*` -> project root.

## FILE STRUCTURE
```
app/layout.tsx, app/globals.css
app/page.tsx                 (Home)
app/generator/page.tsx
app/presets/page.tsx
app/saved/page.tsx
app/guide/page.tsx
components/Navbar.tsx  BottomNav.tsx  Footer.tsx  PageHeader.tsx
components/Generator.tsx  ResultCard.tsx  SensBars.tsx
components/PresetGrid.tsx  SavedList.tsx
components/ToastProvider.tsx  RegisterSW.tsx
lib/sensitivity.ts  lib/devices.ts  lib/presets.ts
lib/storage.ts  lib/format.ts  lib/card.ts
public/manifest.json  public/sw.js  public/icon.svg
README.md  .gitignore
```

## DESIGN SYSTEM (premium dark gaming)
- Colors: ink `#07070b` (background), panel `#0f0f18`, edge `#23232f`, fire `#ff6a00`, fire-soft `#ff8a3d`, fire-amber `#ffb020`.
- Body: dark background with two soft orange radial glows plus a faint 44px grid overlay (fixed, masked fade).
- Glassmorphism cards: `rounded-2xl`, 1px white/10 border, white/4% fill, backdrop blur, subtle inner top highlight.
- Primary button: orange-to-amber gradient, black bold text, orange glow shadow, press scale. Ghost button: translucent with border.
- Gradient text utility (orange -> amber) for headline accents. Uppercase "eyebrow" pill labels. Chips for small facts.
- Animations: bars grow from left (scaleX), cards rise on load, hero preview card floats, toast pops. Respect `prefers-reduced-motion`.
- Mobile: sticky top navbar with blur; fixed bottom tab bar (Generate, Presets, Saved, Guide) with safe-area padding, hidden on md+. Desktop: horizontal nav links with active state.
- Accessibility: aria-pressed on toggle buttons, labels on inputs, role="meter" on bars, visible focus rings.

## SENSITIVITY ENGINE (`lib/sensitivity.ts`)
Types: `Playstyle = rusher | headshot | balanced | sniper`, `Fingers = 2 | 3 | 4`, `Experience = beginner | intermediate | pro`.
Output `SensValues`: general, redDot, scope2x, scope4x, sniper, freeLook (each 1-100) + fireButton (suggested size %, 30-80).

Base values per playstyle (general, redDot, 2x, 4x, sniper, freeLook, fireButton):
- rusher: 94, 90, 85, 78, 66, 80, 55
- headshot: 90, 88, 82, 76, 64, 78, 50
- balanced: 86, 83, 78, 72, 60, 74, 52
- sniper: 78, 75, 72, 66, 54, 68, 48

Modifier `mod = perf + screen + fingers + exp + dpi`:
- perf (RAM): >=8 -> +2, >=6 -> +1, >=4 -> 0, else -2
- screen (inches): >=9 -> +8, >=7 -> +6, >=6.6 -> +3, >=6.1 -> 0, else -3
- fingers: 2 -> +4, 3 -> 0, 4 -> -2
- experience: beginner -8, intermediate 0, pro +3
- dpi (optional, valid 240-640): clamp((dpi - 420) / 100, -3, 3)

Each scope value = clamp(base + mod * weight), weights: general 1, redDot 1, 2x 0.9, 4x 0.8, sniper 0.6, freeLook 0.8.
fireButton = base + (screen>=7 ? -5 : screen<6.1 ? +5 : 0) + (fingers 2 ? +5 : fingers 4 ? -3 : 0), clamped 30-80.
Also export `SENS_FIELDS` (key, label, hint), `PLAYSTYLES` (id, label, description) and `PLAYSTYLE_TIPS` (3 short tips per style).

## DATA
- `lib/devices.ts`: ~29 popular devices `{id, brand, name, ram, screen, hz}` grouped by brand: Apple (iPhone 11-15 Pro Max, iPad 9th gen, iPad Air), Samsung (A14, A34, A54, S23, S24 Ultra), Xiaomi (Redmi 9A, Redmi 12, Redmi Note 12, Poco X5 Pro, Poco F5), Realme (Narzo 50, C55, 11 Pro), Vivo/Oppo, Infinix/Tecno, OnePlus. Export `CUSTOM_DEVICE_ID = "custom"`, `BRANDS`, `findDevice`.
- `lib/presets.ts`: 6 fixed presets with name, tagline, tag, bestFor, values: Aggressive Rusher, Headshot Machine, Balanced All-Rounder, Sniper Specialist, Low-End Smooth (2-4GB), Tablet / iPad.
- `lib/storage.ts`: `SavedProfile {id, name, createdAt, label, values}`; key `sensix:profiles:v1`; load (validate shape, try/catch), save, delete, merge-import (skip duplicate ids), `uid()` with crypto.randomUUID fallback; cap at 100 profiles.
- `lib/format.ts`: `toText()` share text (fire emoji title, each value, fire button size, "Made with SensiX"); `slug()`.
- `lib/card.ts`: `renderCard()` draws a 1080x1350 PNG on a canvas (dark gradient, orange glow, title, six bars with values, fire button size, footer disclaimer); use a manual rounded-rect helper.

## PAGES & FEATURES
1. **Home**: hero (eyebrow "Free Fire - Sensitivity Lab", headline "Find the sensitivity that fits your hand." with gradient accent, two CTAs, trust chips) + floating glass live-preview card using real generated sample values; stats row (6 scope values, device count, 0 sign-ups); 6-feature grid; 3-step "How it works"; FAQ with `<details>` (not official, accuracy, storage, platforms); final CTA.
2. **Generator**: two-column on desktop (form left, sticky result right). Form: device select grouped by brand with "Other / not listed" (reveals RAM select + screen-inches input), spec chips for chosen device, 4 playstyle cards with icons (Flame, Crosshair, Scale, Target), finger segmented control, experience segmented control, optional DPI field with validation hint. Results update live. Below result: playstyle tips card.
3. **ResultCard** (reused everywhere): title, subtitle, badge, six animated bars with hints, suggested fire button size row, buttons: Copy (clipboard + toast), Share (navigator.share, fallback WhatsApp link), Card (download PNG), Save (inline name input, then saves to localStorage).
4. **Presets**: grid of the 6 preset ResultCards (compact) with staggered rise animation.
5. **Saved**: loads from localStorage on mount; empty state with CTAs; delete button per card; Export backup (JSON download) and Import backup (file input, validate, merge); note that data stays on device.
6. **Guide**: 4 cards - how to apply values in game, 10-minute Training Ground routine, how to fine-tune (change one value by 3-5 points), small habits that help.
7. **Global**: ToastProvider (context hook `useToast`), Footer with disclaimer "fan-made, not affiliated with Garena or Free Fire", per-page metadata/titles, viewport themeColor.

## PWA
`manifest.json` (standalone, start_url `/generator`, dark theme colors, svg icon), `icon.svg` (orange flame on dark rounded tile), `sw.js` network-first cache with `/generator` fallback, `RegisterSW` client component that registers it only in production.

## RULES
- Present results as "recommended starting points", never exact or official values; no claims of affiliation with Garena.
- Keep everything client-side and free to host; no API keys.
- Keep code typed (no `any`), accessible, and responsive from 360px up.

## DONE WHEN
- `npm install && npm run build` succeeds with no TypeScript errors.
- All routes (`/`, `/generator`, `/presets`, `/saved`, `/guide`) return 200 and work on mobile width.
- README explains how to run, where to tune the formula (`lib/sensitivity.ts`) and where to add devices (`lib/devices.ts`).

## OPTIONAL NEXT FEATURES
Target-practice sensitivity test mini-game; Hindi/Urdu language toggle; compare two profiles side by side; shareable profile links via URL params; optional accounts and community presets with a database.
