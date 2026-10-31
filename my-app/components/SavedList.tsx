'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Bookmark,
  Trash2,
  Download,
  Upload,
  Plus,
  Sliders,
  ShieldCheck,
  Calendar,
} from 'lucide-react';
import {
  SavedProfile,
  loadProfiles,
  deleteProfile,
  exportProfilesJson,
  importProfilesJson,
} from '@/lib/storage';
import ResultCard from './ResultCard';
import { useToast } from './ToastProvider';

export default function SavedList() {
  const { showToast } = useToast();
  const [profiles, setProfiles] = useState<SavedProfile[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load profiles on mount
  useEffect(() => {
    setProfiles(loadProfiles());
    setIsLoaded(true);
  }, []);

  // Delete profile
  const handleDelete = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}"?`)) {
      const remaining = deleteProfile(id);
      setProfiles(remaining);
      showToast(`Deleted "${name}"`, 'info');
    }
  };

  // Export JSON backup
  const handleExport = () => {
    if (profiles.length === 0) {
      showToast('No saved profiles to export', 'error');
      return;
    }

    const jsonStr = exportProfilesJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sensix-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    showToast('Exported backup JSON file!', 'success');
  };

  // Import JSON backup
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const res = importProfilesJson(content);

      if (res.success) {
        setProfiles(loadProfiles());
        showToast(
          `Imported ${res.imported} new profiles (${res.skipped} skipped)`,
          'success'
        );
      } else {
        showToast(res.error || 'Failed to import backup', 'error');
      }

      // Reset file input
      if (fileInputRef.current) fileInputRef.current.value = '';
    };

    reader.readAsText(file);
  };

  if (!isLoaded) {
    return (
      <div className="text-center py-20 text-zinc-500 text-sm animate-pulse">
        Loading saved profiles...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Top Action Bar: Backup Controls & Count */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-card p-4 rounded-2xl">
        <div className="flex items-center gap-2">
          <Bookmark className="w-5 h-5 text-[#ff6a00]" />
          <span className="font-bold text-white text-sm">
            Saved Setups ({profiles.length})
          </span>
          <span className="text-[11px] text-zinc-400">· Max 100 local</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Hidden File Input for JSON restore */}
          <input
            ref={fileInputRef}
            type="file"
            accept=".json,application/json"
            onChange={handleFileChange}
            className="hidden"
          />

          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl btn-ghost text-xs font-semibold"
          >
            <Upload className="w-3.5 h-3.5 text-[#ffb020]" />
            Import Backup
          </button>

          <button
            onClick={handleExport}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl btn-ghost text-xs font-semibold"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            Export Backup
          </button>

          <Link
            href="/generator"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl btn-fire text-xs font-bold"
          >
            <Plus className="w-3.5 h-3.5" />
            New Setup
          </Link>
        </div>
      </div>

      {/* Empty State */}
      {profiles.length === 0 ? (
        <div className="glass-card rounded-2xl p-12 text-center max-w-lg mx-auto space-y-5">
          <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 mx-auto flex items-center justify-center text-zinc-500">
            <Bookmark className="w-7 h-7" />
          </div>
          <div className="space-y-1.5">
            <h3 className="text-lg font-bold text-white">No Saved Profiles Yet</h3>
            <p className="text-xs text-zinc-400 max-w-xs mx-auto leading-relaxed">
              When you generate a sensitivity setup you love, hit &quot;Save&quot; to keep it accessible right here.
            </p>
          </div>
          <Link
            href="/generator"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl btn-fire text-xs font-bold"
          >
            <Sliders className="w-3.5 h-3.5" />
            Go to Generator
          </Link>
        </div>
      ) : (
        /* Profiles Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {profiles.map((profile) => (
            <div key={profile.id} className="relative group">
              <ResultCard
                title={profile.name}
                subtitle={profile.label}
                badge="SAVED SETUP"
                values={profile.values}
                deviceOrLabel={profile.label}
                compact={true}
              />

              {/* Card Meta & Delete Action Row */}
              <div className="flex items-center justify-between pt-2 px-1 text-[11px] text-zinc-500">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-zinc-600" />
                  {new Date(profile.createdAt).toLocaleDateString(undefined, {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>

                <button
                  onClick={() => handleDelete(profile.id, profile.name)}
                  className="flex items-center gap-1 text-zinc-400 hover:text-rose-400 transition-colors p-1"
                  title="Delete profile"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Privacy Note Banner */}
      <div className="flex items-center justify-center gap-2 text-xs text-zinc-400 pt-4">
        <ShieldCheck className="w-4 h-4 text-emerald-400" />
        <span>Your profiles are stored securely in browser storage and never touch a remote server.</span>
      </div>
    </div>
  );
}
