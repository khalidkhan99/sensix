import React from 'react';
import type { Metadata } from 'next';
import Generator from '@/components/Generator';
import { PageHeader } from '@/components/PageHeader';

export const metadata: Metadata = {
  title: 'Sensitivity Generator — SensiX Free Fire Lab',
  description: 'Generate custom Free Fire sensitivity and fire button size calibrated for your phone specifications.',
};

export default function GeneratorPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <PageHeader
        badge="Hardware-Calibrated Engine"
        title="Sensitivity"
        titleAccent="Generator"
        description="Match your phone model, grip style, and preferred combat role to generate optimal vertical drag headshot values."
      />
      <Generator />
    </div>
  );
}
