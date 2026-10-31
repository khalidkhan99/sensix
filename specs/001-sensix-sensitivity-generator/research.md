# Technical Research & Architectural Decisions: SensiX

**Feature**: SensiX Free Fire Sensitivity Generator  
**Branch**: `001-sensix-sensitivity-generator`  
**Date**: 2026-10-31  

This document captures the technical evaluations, mathematical formulas, and architectural choices informing the SensiX implementation.

---

## Decision 1: Sensitivity Calculation Engine Formula

### Decision
Implement a pure, deterministic calculation engine in `lib/sensitivity.ts` that combines base values per playstyle with additive hardware, ergonomics, and skill modifiers, scaled by scope-specific multipliers and clamped strictly between 1 and 100.

### Mathematical Formulation
1. **Base Values ($B$)** by playstyle:
   - `rusher`: General=94, RedDot=90, 2x=85, 4x=78, Sniper=66, FreeLook=80, FireButton=55
   - `headshot`: General=90, RedDot=88, 2x=82, 4x=76, Sniper=64, FreeLook=78, FireButton=50
   - `balanced`: General=86, RedDot=83, 2x=78, 4x=72, Sniper=60, FreeLook=74, FireButton=52
   - `sniper`: General=78, RedDot=75, 2x=72, 4x=66, Sniper=54, FreeLook=68, FireButton=48

2. **Total Modifier ($\text{mod}$)**:
   $$\text{mod} = \text{perf} + \text{screen} + \text{fingers} + \text{exp} + \text{dpi}$$
   - **Performance / RAM ($\text{perf}$)**: $\ge 8\text{GB} \to +2$; $\ge 6\text{GB} \to +1$; $\ge 4\text{GB} \to 0$; $< 4\text{GB} \to -2$ (compensates for frame drops on lower-end devices by slowing swipe friction)
   - **Screen Size ($\text{screen}$)**: $\ge 9" \to +8$; $\ge 7" \to +6$; $\ge 6.6" \to +3$; $\ge 6.1" \to 0$; $< 6.1" \to -3$ (larger screens require higher velocity across the display)
   - **Fingers ($\text{fingers}$)**: $2\text{ fingers} \to +4$; $3\text{ fingers} \to 0$; $4\text{ fingers} \to -2$ (claw players have more precise screen control)
   - **Experience ($\text{exp}$)**: $\text{beginner} \to -8$; $\text{intermediate} \to 0$; $\text{pro} \to +3$
   - **DPI ($\text{dpi}$, optional)**: $\text{clamp}\left(\frac{\text{DPI} - 420}{100}, -3, 3\right)$

3. **Scope Multipliers & Clamping**:
   $$\text{Value}_s = \text{clamp}\left(\text{round}\left(B_s + \text{mod} \times W_s\right), 1, 100\right)$$
   Weights ($W$):
   - General: $1.0$
   - Red Dot: $1.0$
   - 2x Scope: $0.9$
   - 4x Scope: $0.8$
   - Sniper: $0.6$
   - Free Look: $0.8$

4. **Fire Button Size Calculation**:
   $$\text{FB} = \text{clamp}\left(B_{\text{FB}} + \Delta_{\text{screen}} + \Delta_{\text{fingers}}, 30, 80\right)$$
   - $\Delta_{\text{screen}}$: $\ge 7" \to -5$; $< 6.1" \to +5$; else $0$
   - $\Delta_{\text{fingers}}$: $2 \to +5$; $4 \to -3$; else $0$

### Rationale
- Pure functional design allows zero-dependency testing.
- Accounts for physical swipe distance on varying screen form factors (compact phone vs tablet).
- Clamps prevent out-of-bound values in the Free Fire in-game UI.

### Alternatives Considered
- Machine learning regression model: Rejected because Free Fire sensitivity is subjective; players prefer predictable, transparent heuristics rather than black-box models.

---

## Decision 2: Zero-Backend Client Persistence & Data Portability

### Decision
Store all user-saved profiles directly in browser `localStorage` under key `sensix:profiles:v1`. Provide client-side JSON export (`Blob` + download trigger) and import (File API with strict schema validation and deduplication).

### Rationale
- Zero database or authentication infrastructure eliminates operational costs and hosting complexity.
- Full respect for user privacy with zero cloud data footprint.
- Instantaneous read/write speeds without network latency.
- Cap at 100 profiles prevents localStorage exhaustion (typical footprint < 50KB).

### Alternatives Considered
- IndexedDB: Overkill for storing up to 100 small profile JSON objects; adds async initialization complexity.
- Firebase / Supabase backend: Violates Principle I (Client-First Autonomy & Zero Data Leakage) and adds unnecessary maintenance overhead.

---

## Decision 3: Canvas-Based 1080x1350 Share Card Generation

### Decision
Render a high-resolution 1080x1350 PNG image client-side via the HTML5 Canvas API in `lib/card.ts`. The graphic incorporates dark gradient backgrounds, radial neon fire glow, sensitivity meter bars, fire button gauge, and fan-made disclaimer.

### Rationale
- 1080x1350 (4:5 aspect ratio) is the ideal format for Instagram feeds, WhatsApp stories, and messaging previews.
- Client-side canvas generation executes in < 300ms without sending data to an image generation server.
- Handles high-DPI displays crisply.

### Alternatives Considered
- `html2canvas` library: Heavy npm package (~200KB bundle), erratic CSS rendering for gradients and glassmorphism.
- Server-side Puppeteer / `@vercel/og`: Requires serverless function compute and external hosting dependencies.

---

## Decision 4: Theming and Design System Integration

### Decision
Define a custom dark gaming color palette and glassmorphic card classes using standard CSS custom properties and modern Tailwind utility tokens:
- Background: Ink `#07070b`
- Surface: Panel `#0f0f18` with subtle border `#23232f`
- Primary Accents: Fire Orange `#ff6a00`, Soft Fire `#ff8a3d`, Fire Amber `#ffb020`
- Cards: Translucent white overlay (`rgba(255, 255, 255, 0.04)`), 1px border (`rgba(255, 255, 255, 0.08)`), backdrop blur (`backdrop-blur-md`).
- Navigation: Sticky top bar for desktop, fixed bottom tab bar for mobile with safe-area bottom padding (`env(safe-area-inset-bottom)`).

### Rationale
- Meets modern gaming aesthetic expected by Free Fire players.
- Mobile bottom navigation allows effortless one-handed thumb interaction.

---

## Decision 5: PWA Service Worker Strategy

### Decision
Register a lightweight service worker (`public/sw.js`) that employs a Network-First caching strategy with offline fallback to pre-cached core routes (`/`, `/generator`, `/presets`, `/saved`, `/guide`) and assets.

### Rationale
- Ensures full offline utility during commutes or poor connectivity without aggressive cache-locking that could delay updates.
- Instantly installable on Android and iOS homescreens via `manifest.json`.
