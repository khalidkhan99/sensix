// SensiX Sensitivity & Calibration Engine — Modern Free Fire (0–200 Scale)

export type Playstyle = 'drag' | 'rusher' | 'headshot' | 'balanced' | 'sniper';
export type Level = 'low' | 'medium' | 'high' | 'veryhigh' | 'custom';
export type Fingers = 2 | 3 | 4;
export type Experience = 'beginner' | 'intermediate' | 'pro';

export interface SystemTuning {
  recommendedDpi: number;       // e.g. 480, 520, 560 (Ancho mínimo)
  pointerSpeed: string;         // e.g. "Maximum (100%)", "Fast (+2 steps)"
  touchDelay: string;           // e.g. "Short / Breve (0.5s)"
  fireButtonPlacement: string;  // e.g. "Lower-right at 15% bottom margin"
}

export interface SensValues {
  general: number;
  redDot: number;
  scope2x: number;
  scope4x: number;
  sniper: number;
  freeLook: number;
  fireButton: number;
  dpi?: number;
  systemTuning?: SystemTuning;
}

export interface CalculationInput {
  playstyle: Playstyle;
  level?: Level;
  ram: number;
  screen: number;
  fingers: Fingers;
  experience: Experience;
  includeDpi?: boolean;
  dpi?: number;
}

// Modern Free Fire OB47 Base Values (200-point scale)
export const BASE_VALUES: Record<Playstyle, SensValues> = {
  drag: {
    general: 194,
    redDot: 198,
    scope2x: 186,
    scope4x: 178,
    sniper: 138,
    freeLook: 170,
    fireButton: 48,
  },
  rusher: {
    general: 196,
    redDot: 190,
    scope2x: 185,
    scope4x: 178,
    sniper: 136,
    freeLook: 175,
    fireButton: 55,
  },
  headshot: {
    general: 190,
    redDot: 188,
    scope2x: 182,
    scope4x: 176,
    sniper: 134,
    freeLook: 168,
    fireButton: 50,
  },
  balanced: {
    general: 184,
    redDot: 180,
    scope2x: 174,
    scope4x: 166,
    sniper: 126,
    freeLook: 160,
    fireButton: 52,
  },
  sniper: {
    general: 172,
    redDot: 165,
    scope2x: 160,
    scope4x: 150,
    sniper: 115,
    freeLook: 150,
    fireButton: 48,
  },
};

export const SCOPE_WEIGHTS = {
  general: 1.0,
  redDot: 1.0,
  scope2x: 0.9,
  scope4x: 0.8,
  sniper: 0.6,
  freeLook: 0.8,
} as const;

export function clamp(val: number, min: number, max: number): number {
  return Math.min(Math.max(val, min), max);
}

/**
 * Calculates formula modifier for 200 scale:
 * mod = perf + screen + fingers + exp + level
 */
export function calculateModifier(input: {
  ram: number;
  screen: number;
  fingers: Fingers;
  experience: Experience;
  level?: Level;
}): number {
  // 1. RAM / Performance modifier
  let perf = 0;
  if (input.ram >= 8) perf = 4;
  else if (input.ram >= 6) perf = 2;
  else if (input.ram >= 4) perf = 0;
  else perf = -4;

  // 2. Screen Size modifier (inches)
  let screenMod = 0;
  if (input.screen >= 9.0) screenMod = 12;
  else if (input.screen >= 7.0) screenMod = 8;
  else if (input.screen >= 6.6) screenMod = 4;
  else if (input.screen >= 6.1) screenMod = 0;
  else screenMod = -6;

  // 3. Fingers / Grip layout modifier
  let fingersMod = 0;
  if (input.fingers === 2) fingersMod = 6;
  else if (input.fingers === 3) fingersMod = 0;
  else fingersMod = -4; // 4+ fingers

  // 4. Experience modifier
  let expMod = 0;
  if (input.experience === 'beginner') expMod = -12;
  else if (input.experience === 'intermediate') expMod = 0;
  else expMod = 6; // pro

  // 5. Sensitivity Level modifier
  let levelMod = 0;
  if (input.level === 'low') levelMod = -14;
  else if (input.level === 'medium') levelMod = 0;
  else if (input.level === 'high') levelMod = 8;
  else if (input.level === 'veryhigh') levelMod = 14;
  else levelMod = 0; // 'custom'

  return perf + screenMod + fingersMod + expMod + levelMod;
}

/**
 * Fire button size calculation clamped between 30% and 80%
 */
export function calculateFireButton(baseFire: number, screen: number, fingers: Fingers): number {
  let screenAdj = 0;
  if (screen >= 7.0) screenAdj = -5;
  else if (screen < 6.1) screenAdj = 5;

  let fingerAdj = 0;
  if (fingers === 2) fingerAdj = 5;
  else if (fingers >= 4) fingerAdj = -3;

  return clamp(Math.round(baseFire + screenAdj + fingerAdj), 30, 80);
}

/**
 * Recommended Android DPI based on sensitivity level & device
 */
export function calculateDpi(level?: Level): number {
  if (level === 'low') return 440;
  if (level === 'medium') return 480;
  if (level === 'high') return 520;
  if (level === 'veryhigh') return 560;
  return 500;
}

export function calculateSystemTuning(input: CalculationInput): SystemTuning {
  let recDpi = calculateDpi(input.level);
  if (input.dpi && input.dpi >= 240 && input.dpi <= 640) {
    recDpi = input.dpi;
  } else if (input.screen >= 9.0) {
    recDpi = 480;
  } else if (input.ram <= 4) {
    recDpi = 580; // Budget phones need higher DPI to overcome swipe friction
  }

  const pointerSpeed = input.playstyle === 'drag' || input.playstyle === 'rusher'
    ? 'Maximum (100%)'
    : 'Fast (85%)';

  return {
    recommendedDpi: recDpi,
    pointerSpeed,
    touchDelay: 'Short (0.5s / Breve)',
    fireButtonPlacement: 'Lower-right (15% margin from bottom)',
  };
}

export function calculateSensitivity(input: CalculationInput): SensValues {
  const base = BASE_VALUES[input.playstyle] || BASE_VALUES.drag;
  const mod = calculateModifier({
    ram: input.ram,
    screen: input.screen,
    fingers: input.fingers,
    experience: input.experience,
    level: input.level,
  });

  // Modern Free Fire 200 Scale (all scope values between 1 and 200)
  const general = clamp(
    Math.round(base.general + mod * SCOPE_WEIGHTS.general),
    1,
    200
  );
  const redDot = clamp(
    Math.round(base.redDot + mod * SCOPE_WEIGHTS.redDot),
    1,
    200
  );
  const scope2x = clamp(
    Math.round(base.scope2x + mod * SCOPE_WEIGHTS.scope2x),
    1,
    200
  );
  const scope4x = clamp(
    Math.round(base.scope4x + mod * SCOPE_WEIGHTS.scope4x),
    1,
    200
  );
  const sniper = clamp(
    Math.round(base.sniper + mod * SCOPE_WEIGHTS.sniper),
    1,
    200
  );
  const freeLook = clamp(
    Math.round(base.freeLook + mod * SCOPE_WEIGHTS.freeLook),
    1,
    200
  );

  const fireButton = calculateFireButton(base.fireButton, input.screen, input.fingers);
  const dpi = input.includeDpi ? calculateDpi(input.level) : undefined;
  const systemTuning = calculateSystemTuning(input);

  return {
    general,
    redDot,
    scope2x,
    scope4x,
    sniper,
    freeLook,
    fireButton,
    dpi,
    systemTuning,
  };
}

export interface SensFieldMeta {
  key: keyof Omit<SensValues, 'fireButton' | 'dpi' | 'systemTuning'>;
  label: string;
  hint: string;
}

export const SENS_FIELDS: SensFieldMeta[] = [
  { key: 'general', label: 'General', hint: 'Camera movement, 360° turn speed, and hip-fire agility' },
  { key: 'redDot', label: 'Red Dot', hint: 'Iron sight and holographic aim drag recoil response' },
  { key: 'scope2x', label: '2x Scope', hint: 'Mid-range rifle tracking with assault weapons' },
  { key: 'scope4x', label: '4x Scope', hint: 'Long-range spray stability and burst tap control' },
  { key: 'sniper', label: 'Sniper Scope', hint: 'AWM, M82B, and Kar98k precision crosshair flicking' },
  { key: 'freeLook', label: 'Free Look', hint: 'Surrounding awareness eye camera without changing sprint' },
];

export const PLAYSTYLES: Array<{
  id: Playstyle;
  label: string;
  tagline: string;
  description: string;
  icon: string;
}> = [
  {
    id: 'drag',
    label: 'Drag (Only Red)',
    tagline: 'Extreme Red Dot Aim Lock',
    description: 'Very high Red Dot sensitivity specifically tuned for clean vertical drag headshots.',
    icon: 'Target',
  },
  {
    id: 'rusher',
    label: 'Rusher',
    tagline: 'Fast Agility & Jump Shot',
    description: 'High-speed camera turns for tight close-range shotgun flicks and MP40 entries.',
    icon: 'Flame',
  },
  {
    id: 'headshot',
    label: 'Headshot Specialist',
    tagline: 'One-Tap Precision',
    description: 'Optimized vertical drag acceleration for Desert Eagle, Woodpecker, and AC80.',
    icon: 'Crosshair',
  },
  {
    id: 'balanced',
    label: 'Balanced All-Rounder',
    tagline: 'All-Distance Stability',
    description: 'Smooth mid-range tracking combined with reliable close-quarters defense in BR & CS.',
    icon: 'Scale',
  },
  {
    id: 'sniper',
    label: 'Sniper Specialist',
    tagline: 'Long-Range Precision Flick',
    description: 'Controlled crosshair drag for double sniper swaps and steady micro-adjustments.',
    icon: 'Eye',
  },
];

export const LEVELS: Array<{
  id: Level;
  label: string;
  description: string;
}> = [
  { id: 'low', label: 'Low', description: 'Controlled, steady movement for heavy recoil control' },
  { id: 'medium', label: 'Medium', description: 'Standard tournament baseline for balanced tracking' },
  { id: 'high', label: 'High', description: 'Fast screen travel for quick turns and jumps' },
  { id: 'veryhigh', label: 'Ultra High', description: 'Maximum swipe speed for rapid 180° drag snaps' },
  { id: 'custom', label: 'Custom', description: 'Manual fine-tuning per scope slider' },
];

export const PLAYSTYLE_TIPS: Record<Playstyle, string[]> = {
  drag: [
    'Swipe straight up swiftly for enemies standing still, and in a slight "J" curve for diagonal runners.',
    'Keep your Fire Button size between 40% and 48% to leave ample screen travel for the upward flick.',
    'Release movement joystick right as you tap fire to guarantee maximum first-shot accuracy.',
  ],
  rusher: [
    'Place your fire button slightly lower on screen to give your thumb maximum upward drag room.',
    'Always pre-aim at chest level before turning corners to minimize needed drag distance.',
    'Use quick weapon switch immediately after firing your shotgun to cancel pump animation.',
  ],
  headshot: [
    'Use the "J-Shape" drag when enemies are moving diagonally across your screen.',
    'Keep your General sensitivity high, but keep Red Dot 2-4 points lower for sticky head lock.',
    'Stop moving for a split second before dragging upward to eliminate bullet spread.',
  ],
  balanced: [
    'Practice 5 minutes of burst-firing with SCAR/M4A1 in Training Ground before Ranked.',
    'Adjust your Fire Button size between 48% and 54% to balance tap accuracy with drag speed.',
    'If your drag shoots over enemies\' heads, decrease Red Dot sensitivity by 3 points.',
  ],
  sniper: [
    'Turn ON "Hold Fire to Scope" in Free Fire weapon settings for faster quick-scoping.',
    'Lower Sniper Scope sensitivity prevents micro-jitters when leading moving targets at 100m+.',
    'Pair AWM or M82B with a fast secondary (MP40/UMP) for immediate follow-up shots.',
  ],
};
