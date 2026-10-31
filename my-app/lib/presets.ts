// SensiX Benchmark Presets (7 Tournament Presets for Modern 200-Scale Free Fire)

import { SensValues } from './sensitivity';

export interface Preset {
  id: string;
  name: string;
  tagline: string;
  tag: string;
  bestFor: string;
  values: SensValues;
}

export const PRESETS: Preset[] = [
  {
    id: 'drag-headshot-only-red',
    name: 'Drag Headshot (Only Red)',
    tagline: 'Extreme vertical drag aim lock (Solo Rojo)',
    tag: 'ONLY RED',
    bestFor: 'Desert Eagle, M1887, and Woodpecker instant red numbers drag flicks',
    values: {
      general: 196,
      redDot: 200,
      scope2x: 188,
      scope4x: 180,
      sniper: 138,
      freeLook: 172,
      fireButton: 46,
      dpi: 560,
    },
  },
  {
    id: 'aggressive-rusher',
    name: 'Aggressive Rusher',
    tagline: 'Maximum close-range swipe speed',
    tag: 'ULTRA AGILITY',
    bestFor: 'Shotguns (M1887, M1014) & SMGs (MP40, UMP) for fast close-quarters rush',
    values: {
      general: 198,
      redDot: 194,
      scope2x: 186,
      scope4x: 176,
      sniper: 142,
      freeLook: 175,
      fireButton: 56,
      dpi: 540,
    },
  },
  {
    id: 'headshot-machine',
    name: 'Headshot Machine',
    tagline: 'Consistent one-tap vertical drag lock',
    tag: 'ONE-TAP DRAG',
    bestFor: 'Marksman rifles (SVD, AC80, Woodpecker) single-tap headshots',
    values: {
      general: 192,
      redDot: 188,
      scope2x: 182,
      scope4x: 174,
      sniper: 134,
      freeLook: 168,
      fireButton: 48,
      dpi: 520,
    },
  },
  {
    id: 'balanced-all-rounder',
    name: 'Balanced All-Rounder',
    tagline: 'All-distance stability for BR & CS Ranked',
    tag: 'RANKED READY',
    bestFor: 'Competitive tournament players switching between AR sprays and shotgun fights',
    values: {
      general: 184,
      redDot: 180,
      scope2x: 174,
      scope4x: 166,
      sniper: 128,
      freeLook: 160,
      fireButton: 52,
      dpi: 480,
    },
  },
  {
    id: 'sniper-specialist',
    name: 'Sniper Specialist',
    tagline: 'Controlled micro-adjustments for quick-scope swap',
    tag: 'PRECISION AIM',
    bestFor: 'Double AWM, M82B, and Barrett long-range angle holding',
    values: {
      general: 172,
      redDot: 165,
      scope2x: 160,
      scope4x: 150,
      sniper: 115,
      freeLook: 148,
      fireButton: 48,
      dpi: 440,
    },
  },
  {
    id: 'low-end-smooth',
    name: 'Low-End Smooth (2-4GB)',
    tagline: 'Compensates for frame drops on budget phones',
    tag: 'SMOOTH FRAME',
    bestFor: 'Devices with 2GB-4GB RAM and 60Hz displays to reduce input lag friction',
    values: {
      general: 196,
      redDot: 192,
      scope2x: 186,
      scope4x: 180,
      sniper: 140,
      freeLook: 175,
      fireButton: 58,
      dpi: 580,
    },
  },
  {
    id: 'tablet-ipad',
    name: 'Tablet / iPad Pro',
    tagline: 'High velocity calibrated for 9"+ displays',
    tag: 'LARGE DISPLAY',
    bestFor: 'iPad 9th/10th Gen, iPad Air/Pro, and Android tablets requiring extended swipe travel',
    values: {
      general: 200,
      redDot: 198,
      scope2x: 192,
      scope4x: 186,
      sniper: 148,
      freeLook: 180,
      fireButton: 42,
      dpi: 480,
    },
  },
];
