# SensiX Quickstart Guide

This guide walks you through running, building, testing, and customizing the **SensiX** Free Fire Sensitivity web application.

---

## 1. Prerequisites

- **Node.js**: v18.18.0 or newer (v20+ recommended)
- **Package Manager**: npm (bundled with Node.js)

---

## 2. Installation & Local Development

Navigate to the application directory and install dependencies:

```bash
cd my-app
npm install
```

Start the Turbopack development server:

```bash
npm run dev
```

Open your browser at [http://localhost:3000](http://localhost:3000).

---

## 3. Production Build & Verification

To verify that the application compiles without TypeScript or build issues:

```bash
cd my-app
npm run build
```

This will prerender all routes (`/`, `/generator`, `/presets`, `/saved`, `/guide`) as optimized static pages.

To preview the production build locally:

```bash
npm run start
```

---

## 4. Key Customization Entry Points

### How to Add More Devices
Open [`my-app/lib/devices.ts`](file:///C:/Users/user/Desktop/free%20fire%20sensitivity/my-app/lib/devices.ts) and add your phone model to the `DEVICES` list:

```typescript
{
  id: "tecno-camon-20",
  brand: "Tecno",
  name: "Camon 20 Pro",
  ram: 8,
  screen: 6.67,
  hz: 120
}
```

### How to Adjust Sensitivity Formulas
Open [`my-app/lib/sensitivity.ts`](file:///C:/Users/user/Desktop/free%20fire%20sensitivity/my-app/lib/sensitivity.ts). You can tune:
- **Base Values**: in `BASE_VALUES[playstyle]`
- **Hardware Modifiers**: in `calculateModifier()`
- **Scope Weights**: in `SCOPE_WEIGHTS`
- **Fire Button Adjustments**: in `calculateFireButton()`
