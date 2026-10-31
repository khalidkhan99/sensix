'use client';

import React from 'react';
import {
  Compass,
  CircleDot,
  Crosshair,
  Target,
  Eye,
  Scan,
} from 'lucide-react';
import { SensValues, SENS_FIELDS } from '@/lib/sensitivity';

interface SensBarsProps {
  values: SensValues;
  compact?: boolean;
}

const SCOPE_ICONS = {
  general: Compass,
  redDot: CircleDot,
  scope2x: Crosshair,
  scope4x: Scan,
  sniper: Target,
  freeLook: Eye,
};

const SCOPE_WEAPONS = {
  general: 'Camera & Hip-fire',
  redDot: 'One-Tap (Desert Eagle, M1887)',
  scope2x: 'SMG & Rifles (UMP, MP5)',
  scope4x: 'Assault (SCAR, M4A1, Woodpecker)',
  sniper: 'AWM, M82B, Kar98k',
  freeLook: 'Sprint 360° View',
};

export default function SensBars({ values, compact = false }: SensBarsProps) {
  return (
    <div className={`space-y-${compact ? '3' : '4'}`}>
      {SENS_FIELDS.map((field) => {
        const val = values[field.key];
        const percentage = Math.min(Math.max((val / 200) * 100, 0), 100);
        const Icon = SCOPE_ICONS[field.key];
        const weaponHint = SCOPE_WEAPONS[field.key];

        return (
          <div key={field.key} className="space-y-1.5 group">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-md bg-white/5 border border-white/5 flex items-center justify-center text-[#ff6a00] group-hover:bg-[#ff6a00]/15 group-hover:scale-105 transition-all">
                  <Icon className="w-3 h-3" />
                </div>
                <div>
                  <span className="font-bold text-zinc-200 block text-xs">{field.label}</span>
                  {!compact && (
                    <span className="text-[10px] text-zinc-400 block -mt-0.5">
                      {weaponHint}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-baseline gap-1 bg-[#161622] px-2.5 py-0.5 rounded-lg border border-white/5">
                <span className="font-extrabold font-mono text-sm text-[#ffb020]">
                  {val}
                </span>
                <span className="text-[10px] font-mono text-zinc-400">/200</span>
              </div>
            </div>

            {/* Meter Bar Container */}
            <div
              role="meter"
              aria-label={field.label}
              aria-valuenow={val}
              aria-valuemin={1}
              aria-valuemax={200}
              className="h-2.5 w-full bg-[#12121c] rounded-full overflow-hidden p-0.5 border border-white/5 relative"
            >
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#ff3b00] via-[#ff6a00] to-[#ffb020] transition-all duration-300 ease-out shadow-[0_0_10px_rgba(255,106,0,0.4)]"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
