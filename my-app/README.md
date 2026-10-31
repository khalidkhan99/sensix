# SensiX — Free Fire Sensitivity Lab 🔥

A production-ready, mobile-first web application designed for Free Fire players to calibrate their optimal sensitivity baselines, one-tap drag settings, and fire button sizing based on device hardware, playstyle, grip layout, and DPI.

---

## 🚀 Features

- **🎯 Hardware-Adaptive Generator**: Factors in phone RAM (GB), screen diagonal (inches), touch polling, and claw grip layout.
- **⚡ 78+ Curated Devices**: Verified profiles for Apple, Samsung, Xiaomi/Redmi/Poco, Realme, Vivo, Oppo, Infinix, Tecno (including Tecno Pop 5 Pro), OnePlus, Google Pixel, and Motorola + Custom phone fallback.
- **🏆 7 Tournament Benchmark Presets**:
  1. Aggressive Rusher
  2. Drag Headshot (Only Red)
  3. Headshot Machine
  4. Balanced All-Rounder
  5. Sniper Specialist
  6. Low-End Smooth (2-4GB)
  7. Tablet/iPad Pro
- **⚙️ Dual Scale Support**: Standard 1–100 sensitivity scale & modern OB47 1–200 extended scale.
- **🔒 100% Client-Side Privacy**: Profiles stored in browser `localStorage`. No logins, zero external telemetry, instant JSON export/import backups.
- **🎨 1080x1350 Canvas Social Cards**: In-browser Canvas API rendering generates high-res dark gaming posters for WhatsApp and Instagram stories.
- **📱 Offline PWA**: Installable web app with Service Worker caching for seamless training without an internet connection.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org) (latest, App Router) + React 19 + TypeScript (Strict)
- **Styling**: [Tailwind CSS v3](https://tailwindcss.com) (Dark Gaming Palette: `#07070b` ink, glassmorphism cards, `#ff6a00` flame glow)
- **Icons**: [Lucide React](https://lucide.dev)
- **State & Storage**: React hooks + `localStorage` (`sensix:profiles:v1`) + Client-side File API
- **Graphics**: HTML5 2D Canvas API (manual rounded-rect rendering)

---

## 🏁 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
npm run start
```

### 4. Run Boundary Stress Tests
```bash
npx tsx scripts/test-boundaries.mjs
```
Runs 6,120 parameter permutations verifying that 100% of scope outputs are strictly clamped within designated bounds and fire button sizes between 30% and 80%.

---

## 🔧 Formula Tuning & Customization

### Tuning the Sensitivity Formula (`lib/sensitivity.ts`)
The sensitivity calculation logic is 100% pure, deterministic, and isolated in [`lib/sensitivity.ts`](./lib/sensitivity.ts):

1. **Base Values**:
   ```typescript
   export const BASE_VALUES: Record<Playstyle, SensValues> = {
     drag:     { general: 94, redDot: 98, scope2x: 86, scope4x: 78, sniper: 66, freeLook: 80, fireButton: 56 },
     rusher:   { general: 94, redDot: 90, scope2x: 85, scope4x: 78, sniper: 66, freeLook: 80, fireButton: 55 },
     headshot: { general: 90, redDot: 88, scope2x: 82, scope4x: 76, sniper: 64, freeLook: 78, fireButton: 50 },
     balanced: { general: 86, redDot: 83, scope2x: 78, scope4x: 72, sniper: 60, freeLook: 74, fireButton: 52 },
     sniper:   { general: 78, redDot: 75, scope2x: 72, scope4x: 66, sniper: 54, freeLook: 68, fireButton: 48 },
   };
   ```

2. **Modifier Formula**:
   ```text
   mod = perf + screen + fingers + exp + level
   - perf (RAM): >=8GB (+2), >=6GB (+1), >=4GB (0), else (-2)
   - screen: >=9" (+8), >=7" (+6), >=6.6" (+3), >=6.1" (0), else (-3)
   - fingers: 2 (+4), 3 (0), 4+ (-2)
   - experience: beginner (-8), intermediate (0), pro (+3)
   - level: low (-8), medium (0), high (+5), veryhigh (+9)
   ```

3. **Scope Weights**:
   - `general`: 1.0
   - `redDot`: 1.0
   - `scope2x`: 0.9
   - `scope4x`: 0.8
   - `sniper`: 0.6
   - `freeLook`: 0.8

4. **Fire Button Formula**:
   ```text
   fireButton = base + (screen >= 7 ? -5 : screen < 6.1 ? +5 : 0) + (fingers === 2 ? +5 : fingers === 4 ? -3 : 0)
   Clamped strictly between 30% and 80%.
   ```

5. **DPI Suggestions**:
   - `low`: 400 DPI
   - `medium`: 420 DPI
   - `high`: 440 DPI
   - `veryhigh`: 460 DPI

---

### Adding New Devices (`lib/devices.ts`)
To add a new phone or tablet, open [`lib/devices.ts`](./lib/devices.ts) and append an entry to `DEVICES`:

```typescript
{
  id: 'device-slug',
  brand: 'BrandName', // 'Apple' | 'Samsung' | 'Xiaomi' | 'Realme' | 'Vivo' | 'Oppo' | 'Infinix' | 'Tecno' | 'OnePlus' | 'Google' | 'Motorola' | 'Other'
  name: 'Device Marketing Name',
  ram: 8,         // System RAM in GB
  screen: 6.67,   // Screen diagonal in inches
  hz: 120         // Optional display refresh rate
}
```

---

## ⚖️ Legal Disclaimer

SensiX is an independent fan-made analytical utility. It is **not affiliated with, endorsed, or sponsored by Garena or Free Fire**. Sensitivity outputs are recommended starting baselines to assist player calibration and do not alter game code, packages, or device drivers.
