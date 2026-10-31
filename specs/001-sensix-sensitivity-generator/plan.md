# Implementation Plan: SensiX Free Fire Sensitivity Generator

**Branch**: `001-sensix-sensitivity-generator` | **Date**: 2026-10-31 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `/specs/001-sensix-sensitivity-generator/spec.md`

## Summary

Build **SensiX**, a production-ready, mobile-first web app that generates calibrated Free Fire sensitivity settings and fire button recommendations based on device hardware, playstyle, grip (finger count), experience, and DPI. Includes pre-calibrated presets, client-side profile saving with JSON backup, social share cards (1080x1350 Canvas PNG), and offline PWA capability.

## Technical Context

**Language/Version**: TypeScript 5.x / Next.js 16 (App Router) / React 19  
**Primary Dependencies**: Tailwind CSS, Lucide React (`lucide-react`)  
**Storage**: Client-side browser `localStorage` (`sensix:profiles:v1`) + JSON export/import  
**Testing**: Standalone formula bounds verification + TypeScript compilation + Next.js static build checks  
**Target Platform**: Mobile-first Web & PWA (responsive from 360px up to desktop 4K)  
**Project Type**: Next.js App Router Web Application (`my-app/`)  
**Performance Goals**: FCP < 1.2s, Live recalculation < 16ms, Canvas card generation < 500ms  
**Constraints**: 100% client-side, zero backend/database, zero user login, fully functional offline  
**Scale/Scope**: 5 routes (`/`, `/generator`, `/presets`, `/saved`, `/guide`), 29+ devices, 6 presets, max 100 local profiles  

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-checked post Phase 1 design.*

- [x] **Principle I: Client-First Autonomy & Zero Data Leakage**: PASS. Zero backend, zero telemetry, state resides in React + localStorage.
- [x] **Principle II: Pure, Testable Sensitivity Engine**: PASS. Pure functional calculation in `lib/sensitivity.ts`, all outputs clamped (1-100 for scopes, 30-80 for fire button).
- [x] **Principle III: Mobile-First Ergonomics & Dark Gaming Aesthetic**: PASS. Responsive from 360px, bottom nav bar on mobile, `#07070b` ink theme with fire glow.
- [x] **Principle IV: Offline-First PWA Reliability**: PASS. Manifest and service worker cache core routes for offline capability.
- [x] **Principle V: Strict Type Safety & Zero `any`**: PASS. TypeScript strict mode across all modules and validated schemas.
- [x] **Principle VI: Ethical Transparency & Disclaimer Governance**: PASS. Clear fan-made disclaimer in footer and result cards; numbers marked as recommended baselines.

## Project Structure

### Documentation (`specs/001-sensix-sensitivity-generator/`)

```text
specs/001-sensix-sensitivity-generator/
├── spec.md              # Feature specification
├── plan.md              # This technical plan
├── research.md          # Technical research & math formulas
├── data-model.md        # Entities, types, and schemas
├── quickstart.md        # Setup and development guide
├── contracts/           # Module interfaces & service contracts
│   ├── sensitivity-engine.contract.ts
│   ├── storage-manager.contract.ts
│   └── card-renderer.contract.ts
└── checklists/
    └── requirements.md  # Quality gate checklist
```

### Source Code (`my-app/`)

```text
my-app/
├── app/
│   ├── layout.tsx         # Root layout with dark theme, font, toast provider & nav
│   ├── globals.css        # Tailwind tokens, radial glow utilities, dark ink background
│   ├── page.tsx           # Home page (Hero, stats, live preview, features, FAQ)
│   ├── generator/
│   │   └── page.tsx       # Interactive generator form + sticky live result card + tips
│   ├── presets/
│   │   └── page.tsx       # Catalog of 6 curated presets with quick copy
│   ├── saved/
│   │   └── page.tsx       # Saved local profiles with JSON import/export
│   └── guide/
│       └── page.tsx       # In-game application and 10-minute training guide
├── components/
│   ├── Navbar.tsx         # Desktop top navigation header
│   ├── BottomNav.tsx      # Mobile bottom tab navigation bar
│   ├── Footer.tsx         # Legal disclaimers and footer links
│   ├── PageHeader.tsx     # Reusable section/page header with gradient text
│   ├── Generator.tsx      # Interactive generator controls
│   ├── ResultCard.tsx     # Sensitivity meter card with copy, share, card, save
│   ├── SensBars.tsx       # Animated meter bars (role="meter")
│   ├── PresetGrid.tsx     # Grid of presets
│   ├── SavedList.tsx      # List of saved profiles with actions
│   ├── ToastProvider.tsx  # Context toast notification system (useToast)
│   └── RegisterSW.tsx     # Production service worker registration component
├── lib/
│   ├── sensitivity.ts     # Pure sensitivity calculation engine & constants
│   ├── devices.ts         # 29+ phone catalog + custom device logic
│   ├── presets.ts         # 6 curated presets data
│   ├── storage.ts         # LocalStorage profile manager & JSON exporter/importer
│   ├── format.ts          # Share text formatting & slug utilities
│   └── card.ts            # HTML5 Canvas 1080x1350 PNG generator
└── public/
    ├── manifest.json      # PWA web manifest
    ├── sw.js              # Network-first service worker
    └── icon.svg           # Dark flame logo icon
```

**Structure Decision**: A modern Next.js App Router application in `my-app` containing all UI routes under `app/`, reusable UI elements under `components/`, pure domain logic and data repositories under `lib/`, and static assets/PWA configurations under `public/`.

## Complexity Tracking

No constitutional violations detected. All modules conform to client-first and pure-function principles.
