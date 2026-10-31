'use client';

import React from 'react';
import { PRESETS } from '@/lib/presets';
import ResultCard from './ResultCard';

export default function PresetGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {PRESETS.map((preset, idx) => (
        <div
          key={preset.id}
          className="flex flex-col motion-safe:animate-fade-in-up"
          style={{ animationDelay: `${idx * 75}ms` }}
        >
          <ResultCard
            title={preset.name}
            subtitle={preset.tagline}
            badge={preset.tag}
            values={preset.values}
            deviceOrLabel={preset.bestFor}
            compact={true}
          />
        </div>
      ))}
    </div>
  );
}
