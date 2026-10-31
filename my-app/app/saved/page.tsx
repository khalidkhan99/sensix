import React from 'react';
import type { Metadata } from 'next';
import SavedList from '@/components/SavedList';
import { PageHeader } from '@/components/PageHeader';

export const metadata: Metadata = {
  title: 'My Saved Profiles — SensiX Free Fire Lab',
  description: 'Manage, export, and restore your customized Free Fire sensitivity configurations.',
};

export default function SavedPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <PageHeader
        badge="Local Storage Safe"
        title="Saved"
        titleAccent="Profiles"
        description="Your saved personal sensitivity setups. Export full JSON backups or import setups across your devices without accounts."
      />
      <SavedList />
    </div>
  );
}
