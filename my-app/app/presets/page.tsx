import React from 'react';
import type { Metadata } from 'next';
import PresetGrid from '@/components/PresetGrid';
import { PageHeader } from '@/components/PageHeader';

export const metadata: Metadata = {
  title: 'Pro Sensitivity Presets — SensiX Free Fire Lab',
  description: 'Instant tournament-tested Free Fire sensitivity benchmarks for aggressive rushers, snipers, low-end phones, and tablets.',
};

export default function PresetsPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <PageHeader
        badge="Pre-Calibrated Benchmarks"
        title="Pro"
        titleAccent="Presets"
        description="Curated sensitivity setups tested across diverse tournament metas. Copy or save any preset with one tap."
      />
      <PresetGrid />
    </div>
  );
}
