---
name: ui-ux-promax
description: High-fidelity design system execution, responsive tokens, micro-interactions, layout architecture, and WCAG 2.1 AA accessibility guidelines.
---

# UI/UX Pro Max Protocol

## Purpose
Governs user-interface design, layout responsiveness, visual polish, and accessibility across web and mobile projects.

---

## 1. Activation Checkpoint
When starting a user-facing project, prompt:
*"Do you want to apply the UI/UX Pro Max design protocol (bespoke design system, responsive tokens, micro-interactions, accessibility)?"*

---

## 2. Core Design Standards

### A. Design Foundations & Color Hierarchy
- **60-30-10 Rule**: 60% dominant neutral/background, 30% structural secondary, 10% high-contrast accent for CTAs.
- **Strict Theme Tokens**: Always implement CSS variables or design tokens supporting seamless Light/Dark mode transitions.
- **Typography Scale**: Standardized modular scale with responsive font clamps (`font-size: clamp(...)`) instead of fixed pixels.

### B. Layout & Responsiveness
- **Fluid Grid / Flexbox**: No arbitrary horizontal overflow. Mobile-first viewport sizing (320px to 4K).
- **Container Queries**: Use container queries (`@container`) for modular, reusable components rather than viewport-only breakpoints.
- **Touch & Click Boundaries**: Minimum 44x44px interactive target sizes on mobile.

### C. State Handling & Micro-Interactions
- Every dynamic UI component must implement 4 explicit visual states:
  1. **Default**: Clean baseline.
  2. **Loading**: Skeleton loaders (not generic spinners) matching the target content geometry.
  3. **Empty**: Informative empty states with actionable buttons.
  4. **Error**: In-context error messages with retry actions.
- **Transitions**: Smooth micro-interactions (150ms-250ms duration, `cubic-bezier(0.4, 0, 0.2, 1)` easing) on hovers, focus rings, and modal presentations.

### D. Accessibility (WCAG 2.1 AA)
- **Contrast Ratios**: Minimum 4.5:1 for standard text; 3:1 for large text and UI components.
- **Semantic Structure**: Semantic HTML tags (`<main>`, `<nav>`, `<article>`, `<button>`). Never use `div` with `onClick` without `role="button"`, `tabIndex={0}`, and `onKeyDown`.
- **Screen Reader Support**: Meaningful `aria-label`, `aria-expanded`, and `aria-live` where dynamic content updates.
