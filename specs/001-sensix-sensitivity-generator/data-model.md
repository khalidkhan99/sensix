# Data Model & Schema Specification: SensiX

**Feature**: SensiX Free Fire Sensitivity Generator  
**Branch**: `001-sensix-sensitivity-generator`  
**Date**: 2026-10-31  

This document defines the core TypeScript interfaces, entity schemas, validation constraints, and lifecycle states for SensiX.

---

## 1. Core Enumerations & Types

```typescript
export type Playstyle = 'rusher' | 'headshot' | 'balanced' | 'sniper';

export type Fingers = 2 | 3 | 4;

export type Experience = 'beginner' | 'intermediate' | 'pro';

export type DeviceBrand =
  | 'Apple'
  | 'Samsung'
  | 'Xiaomi'
  | 'Realme'
  | 'Vivo'
  | 'Oppo'
  | 'Infinix'
  | 'Tecno'
  | 'OnePlus'
  | 'Other';
```

---

## 2. Sensitivity Values (`SensValues`)

Represents the complete sensitivity configuration presented to the user.

```typescript
export interface SensValues {
  general: number;     // 1 - 200 (modern Free Fire 200-scale)
  redDot: number;      // 1 - 200
  scope2x: number;     // 1 - 200
  scope4x: number;     // 1 - 200
  sniper: number;      // 1 - 200
  freeLook: number;    // 1 - 200
  fireButton: number;  // 30 - 80 (%)
}
```

### Validation Rules
- All scope values (`general`, `redDot`, `scope2x`, `scope4x`, `sniper`, `freeLook`) must be integers between 1 and 200 inclusive:
  $$1 \le v \le 200$$
- `fireButton` must be an integer between 30 and 80 inclusive:
  $$30 \le \text{fireButton} \le 80$$

---

## 3. Device Entity (`Device`)

Represents mobile hardware specifications influencing sensitivity modifiers.

```typescript
export interface Device {
  id: string;          // e.g. "samsung-a54" or "custom"
  brand: DeviceBrand;  // Brand category for grouped select
  name: string;        // Display name e.g. "Galaxy A54 5G"
  ram: number;         // RAM in GB (e.g. 8)
  screen: number;      // Screen diagonal in inches (e.g. 6.4)
  hz?: number;         // Refresh rate in Hz (e.g. 120), optional
}
```

### Custom Device Handling
When `id === 'custom'`, the user can manually input:
- `ram`: between 2 and 16 GB (clamped)
- `screen`: between 4.7 and 12.9 inches (clamped)

---

## 4. Saved Profile Entity (`SavedProfile`)

Represents a user-saved sensitivity preset in local browser storage.

```typescript
export interface SavedProfile {
  id: string;          // UUID v4 string (e.g. "f47ac10b-58cc-4372-a567-0e02b2c3d479")
  name: string;        // User-provided profile title (1 - 30 characters)
  createdAt: string;   // ISO 8601 timestamp string (e.g. "2026-10-31T23:00:00.000Z")
  label: string;       // Context summary (e.g. "Samsung A54 · Rusher · 4 Fingers")
  values: SensValues;  // Calibrated sensitivity outputs
}
```

### Storage Container Schema (`sensix:profiles:v1`)
Stored as a serialized JSON array of `SavedProfile`:
```json
[
  {
    "id": "c1f7a0b2-...",
    "name": "My Ranked Rusher",
    "createdAt": "2026-10-31T22:30:00.000Z",
    "label": "Galaxy S23 · Rusher · 3 Fingers",
    "values": {
      "general": 96,
      "redDot": 92,
      "scope2x": 87,
      "scope4x": 80,
      "sniper": 68,
      "freeLook": 82,
      "fireButton": 52
    }
  }
]
```

---

## 5. Preset Entity (`Preset`)

Represents curated benchmark configurations.

```typescript
export interface Preset {
  id: string;          // e.g. "rusher-aggressive"
  name: string;        // Display name e.g. "Aggressive Rusher"
  tagline: string;     // Brief marketing summary
  tag: string;         // Visual badge text (e.g. "HIGH SPEED")
  bestFor: string;     // Recommended weapon/playstyle category
  values: SensValues;  // Exact pre-tuned sensitivities
}
```

---

## 6. Sensitivity Generator Input Parameters

```typescript
export interface GeneratorParams {
  deviceId: string;
  customRam?: number;
  customScreen?: number;
  playstyle: Playstyle;
  fingers: Fingers;
  experience: Experience;
  dpi?: number;
}
```
