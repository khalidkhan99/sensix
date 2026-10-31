<!-- Sync Impact Report
Version change: [CONSTITUTION_VERSION] -> 1.0.0
Ratification Date: 2026-10-31
Modified principles:
  - PRINCIPLE_1 -> I. Client-First Autonomy & Zero Data Leakage
  - PRINCIPLE_2 -> II. Pure, Testable Sensitivity Engine
  - PRINCIPLE_3 -> III. Mobile-First Ergonomics & Dark Gaming Aesthetic
  - PRINCIPLE_4 -> IV. Offline-First PWA Reliability
  - PRINCIPLE_5 -> V. Strict Type Safety & Zero any
  - PRINCIPLE_6 -> VI. Ethical Transparency & Disclaimer Governance
Added sections:
  - Technology Stack & Performance Standards
  - Quality Gates & SDD Workflow
Deferred items: None
Templates requiring updates:
  - .specify/templates/spec-template.md: ✅ aligned
  - .specify/templates/plan-template.md: ✅ aligned
-->

# SensiX Constitution

## Core Principles

### I. Client-First Autonomy & Zero Data Leakage
All user data, sensitivity adjustments, and custom profile configurations MUST execute and persist 100% on the client device (using React state and browser `localStorage`). The application MUST NOT require remote user authentication, backend databases, or telemetry trackers. Data export and import MUST use standard, local JSON files.
*Rationale*: Maximizes user privacy, eliminates server infrastructure costs, and guarantees instant responsiveness.

### II. Pure, Testable Sensitivity Engine
The sensitivity calculation logic in `lib/sensitivity.ts` MUST remain pure, deterministic mathematical functions isolated from the UI layer. Every parameter (playstyle, hardware specs, grip style, experience, DPI) MUST deterministically compute scope sensitivities clamped between 1 and 100, and fire button sizes clamped between 30% and 80%.
*Rationale*: Decoupling calculations from UI ensures 100% test coverage and predictable recommendations across diverse devices.

### III. Mobile-First Ergonomics & Dark Gaming Aesthetic
The user interface MUST be optimized for mobile screens (responsive down to 360px width) with accessible touch targets (minimum 44x44px) and a fixed bottom navigation tab bar on mobile viewports. The design system MUST strictly adhere to the dark gaming aesthetic (`#07070b` ink background, glassmorphism panels, and `#ff6a00` fire accent glows) with WCAG AA compliant contrast.
*Rationale*: Mobile gamers represent the primary target audience; ergonomic, high-contrast, theme-appropriate design prevents fatigue.

### IV. Offline-First PWA Reliability
The application MUST be fully functional as an installable Progressive Web App (PWA) via a valid `manifest.json` and service worker caching strategy (`sw.js`). Users MUST be able to generate, view presets, and consult tactical guides without an active internet connection.
*Rationale*: Gamers frequently operate on constrained networks or offline environments; core utility must never depend on network availability.

### V. Strict Type Safety & Zero `any`
All application source code, components, and utility libraries MUST enforce TypeScript strict mode with zero usage of the `any` type. External inputs such as profile JSON imports MUST be rigorously validated before ingestion.
*Rationale*: Eliminates runtime errors and guarantees contract integrity across storage and UI components.

### VI. Ethical Transparency & Disclaimer Governance
SensiX MUST prominently display clear disclaimers that it is an unofficial fan-made utility with no affiliation to Garena or Free Fire. All sensitivity outputs MUST be explicitly labeled as "recommended starting points" rather than guaranteed or game-altering exploits.
*Rationale*: Maintains compliance with platform policies, sets realistic user expectations, and safeguards community trust.

## Technology Stack & Performance Standards

The production stack consists of:
- **Framework**: Next.js App Router with TypeScript.
- **Styling**: Tailwind CSS utilizing dark gaming design tokens (`ink`, `panel`, `edge`, `fire`, `fire-amber`).
- **Icons**: Lucide React.
- **Graphics**: HTML5 Canvas API for client-side 1080x1350 PNG shareable card generation.
- **Assets**: Zero external font CDNs or third-party web trackers; local/system fonts only.
- **Performance Budget**: Target First Contentful Paint (FCP) under 1.2s; initial bundle size under 150KB gzip.

## Quality Gates & Development Workflow

1. **Pre-commit Type Check**: `npx tsc --noEmit` must pass with zero errors.
2. **Production Build Gate**: `npm run build` must succeed without warnings or errors.
3. **Spec-Driven Consistency**: Every new feature or formula tweak must originate from an approved specification and plan in `.specify/`.
4. **Boundary Verification**: All generated sensitivity scope numbers must pass bounds verification tests ($1 \le \text{value} \le 100$).

## Governance

This Constitution supersedes all informal architectural assumptions. Any amendment to these principles requires a formal review, version increment following Semantic Versioning (MAJOR for principle removal/redefinition, MINOR for new principle, PATCH for clarifications), and an updated Sync Impact Report.

**Version**: 1.0.0 | **Ratified**: 2026-10-31 | **Last Amended**: 2026-10-31
