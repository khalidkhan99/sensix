'use client';

import React, { useState } from 'react';
import { Copy, Share2, Download, Bookmark, Check, Sparkles } from 'lucide-react';
import { SensValues } from '@/lib/sensitivity';
import { toShareText } from '@/lib/format';
import { saveProfile } from '@/lib/storage';
import { downloadCardImage } from '@/lib/card';
import { useToast } from './ToastProvider';
import SensBars from './SensBars';

export interface ResultCardProps {
  title: string;
  subtitle: string;
  badge?: string;
  values: SensValues;
  deviceOrLabel?: string;
  compact?: boolean;
  onSaveSuccess?: () => void;
}

export default function ResultCard({
  title,
  subtitle,
  badge,
  values,
  deviceOrLabel,
  compact = false,
  onSaveSuccess,
}: ResultCardProps) {
  const { showToast } = useToast();
  const [copied, setCopied] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [profileName, setProfileName] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);

  // 1. Copy formatted text
  const handleCopy = async () => {
    try {
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        try { navigator.vibrate(15); } catch {}
      }
      const text = toShareText(title, values, deviceOrLabel);
      await navigator.clipboard.writeText(text);
      setCopied(true);
      showToast('Copied sensitivity values to clipboard!', 'success');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      showToast('Could not copy to clipboard', 'error');
    }
  };

  // 2. Share via Web Share or WhatsApp link fallback
  const handleShare = async () => {
    const text = toShareText(title, values, deviceOrLabel);
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: `Free Fire Sensitivity - ${title}`,
          text,
        });
        showToast('Shared successfully!', 'success');
        return;
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          console.warn('Share aborted or failed:', err);
        }
      }
    }

    // Fallback: WhatsApp share link
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
    showToast('Opened WhatsApp share link', 'info');
  };

  // 3. Download high-res 1080x1350 PNG Card
  const handleDownloadCard = async () => {
    try {
      setIsDownloading(true);
      showToast('Generating 1080x1350 PNG card...', 'info');
      await downloadCardImage(
        {
          title,
          subtitle: deviceOrLabel || subtitle,
          badge,
          values,
        },
        `sensix-${title.toLowerCase().replace(/\s+/g, '-')}.png`
      );
      showToast('Card image downloaded successfully!', 'success');
    } catch (err) {
      console.error(err);
      showToast('Failed to generate image card', 'error');
    } finally {
      setIsDownloading(false);
    }
  };

  // 4. Save to localStorage
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const finalName = profileName.trim() || title;
    const finalLabel = deviceOrLabel || subtitle;

    try {
      saveProfile(finalName, finalLabel, values);
      setIsSaving(false);
      setProfileName('');
      showToast(`Saved "${finalName}" to your profiles!`, 'success');
      if (onSaveSuccess) onSaveSuccess();
    } catch {
      showToast('Storage quota exceeded or error saving', 'error');
    }
  };

  return (
    <div className={`glass-card-elevated rounded-2xl p-5 sm:p-6 space-y-5 transition-all ${compact ? 'text-sm' : ''}`}>
      {/* Header Row */}
      <div className="flex items-start justify-between gap-3 border-b border-white/5 pb-4">
        <div>
          {badge && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-[#ff6a00]/15 text-[#ffb020] border border-[#ff6a00]/30 mb-1.5">
              <Sparkles className="w-2.5 h-2.5" />
              {badge}
            </span>
          )}
          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">{title}</h3>
          <p className="text-xs text-zinc-400 mt-0.5">{deviceOrLabel || subtitle}</p>
        </div>

        <div className="text-right">
          <span className="text-[10px] uppercase tracking-wider font-semibold text-zinc-400 block">
            Baseline
          </span>
          <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
            Ranked Ready
          </span>
        </div>
      </div>

      {/* Six Scope Sensitivity Meter Bars */}
      <SensBars values={values} compact={compact} />

      {/* Suggested Fire Button Size Widget */}
      <div className="flex items-center justify-between p-3.5 rounded-xl bg-gradient-to-r from-[#161622] to-[#0f0f18] border border-[#ff6a00]/25 shadow-inner">
        <div>
          <span className="text-xs font-bold text-zinc-200 block">Suggested Fire Button Size</span>
          <span className="text-[10px] text-zinc-400">
            {values.systemTuning?.fireButtonPlacement || 'Calibrated for clean vertical drag travel'}
          </span>
        </div>
        <div className="flex items-baseline gap-1 bg-[#ff6a00]/15 px-3 py-1 rounded-lg border border-[#ff6a00]/30">
          <span className="font-mono font-black text-xl text-[#ffb020]">{values.fireButton}</span>
          <span className="text-xs font-bold text-[#ff6a00]">%</span>
        </div>
      </div>

      {/* Android Device Hardware Tuning (Free Sensis & Macro Style) */}
      {values.systemTuning && (
        <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Phone Settings (Configuración Android)
            </span>
            <span className="text-[9px] font-mono text-zinc-500 uppercase">
              Developer Options
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2 rounded-lg bg-white/5 border border-white/5">
              <span className="text-[9px] text-zinc-400 block font-semibold">DPI (Ancho Mínimo)</span>
              <span className="font-mono font-bold text-[#ffb020] text-sm">
                {values.systemTuning.recommendedDpi}
              </span>
            </div>

            <div className="p-2 rounded-lg bg-white/5 border border-white/5">
              <span className="text-[9px] text-zinc-400 block font-semibold">Pointer Speed</span>
              <span className="font-bold text-emerald-400 text-xs truncate block">
                {values.systemTuning.pointerSpeed.split(' ')[0]}
              </span>
            </div>

            <div className="p-2 rounded-lg bg-white/5 border border-white/5">
              <span className="text-[9px] text-zinc-400 block font-semibold">Touch Delay</span>
              <span className="font-bold text-zinc-300 text-xs">
                0.5s (Short)
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Inline Save Form (when active) */}
      {isSaving && (
        <form onSubmit={handleSaveProfile} className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-2">
          <label className="block text-xs font-semibold text-zinc-300">
            Profile Name:
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={profileName}
              onChange={(e) => setProfileName(e.target.value)}
              placeholder="e.g. Ranked Rush 4-Finger"
              maxLength={30}
              autoFocus
              className="flex-1 bg-[#07070b] border border-white/20 rounded-lg px-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff6a00]"
            />
            <button
              type="submit"
              className="px-3 py-1.5 rounded-lg btn-fire text-xs font-bold"
            >
              Confirm
            </button>
            <button
              type="button"
              onClick={() => setIsSaving(false)}
              className="px-2.5 py-1.5 rounded-lg btn-ghost text-xs font-medium text-zinc-400"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Action Buttons Toolbar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 border-t border-white/5">
        <button
          onClick={handleCopy}
          className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold btn-ghost"
          title="Copy formatted text"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-[#ff6a00]" />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>

        <button
          onClick={handleShare}
          className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold btn-ghost"
          title="Share to WhatsApp / Socials"
        >
          <Share2 className="w-3.5 h-3.5 text-[#ffb020]" />
          <span>Share</span>
        </button>

        <button
          onClick={handleDownloadCard}
          disabled={isDownloading}
          className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold btn-ghost disabled:opacity-50"
          title="Download 1080x1350 PNG Image"
        >
          <Download className="w-3.5 h-3.5 text-orange-400" />
          <span>{isDownloading ? '...' : 'Card'}</span>
        </button>

        <button
          onClick={() => setIsSaving(!isSaving)}
          className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold btn-ghost"
          title="Save to My Profiles"
        >
          <Bookmark className="w-3.5 h-3.5 text-amber-300" />
          <span>Save</span>
        </button>
      </div>
    </div>
  );
}
