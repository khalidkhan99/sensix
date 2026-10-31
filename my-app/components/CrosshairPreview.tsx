'use client';

import React, { useState } from 'react';
import { Target, Crosshair, Play, Sparkles, CheckCircle2 } from 'lucide-react';
import { SensValues } from '@/lib/sensitivity';

interface CrosshairPreviewProps {
  values: SensValues;
  playstyle: string;
}

export default function CrosshairPreview({ values, playstyle }: CrosshairPreviewProps) {
  const [isSimulating, setIsSimulating] = useState(false);
  const [dragScore, setDragScore] = useState<string | null>(null);

  // Trigger simulated drag flick
  const handleTestDrag = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setDragScore(null);

    // Haptic feedback if supported
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      try {
        navigator.vibrate(20);
      } catch {}
    }

    setTimeout(() => {
      setIsSimulating(false);
      // Calculate realistic drag rating
      const combined = (values.general + values.redDot) / 2;
      if (combined >= 180) {
        setDragScore('PERFECT ONE-TAP DRAG (HEADSHOT LOCK)');
      } else if (combined >= 160) {
        setDragScore('CLEAN MID-RANGE TRACKING');
      } else {
        setDragScore('CONTROLLED PRECISION AIM');
      }
    }, 1100);
  };

  // Crosshair dynamics based on General & Red Dot (0 - 200)
  const spreadRatio = Math.max(1, (200 - values.general) / 18);
  const glowIntensity = Math.min(1, values.redDot / 160);

  return (
    <div className="glass-card rounded-2xl p-5 space-y-4 border border-white/10 relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#ff6a00]/15 flex items-center justify-center text-[#ff6a00]">
            <Target className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              Live HUD & Drag Simulator
              <span className="text-[9px] px-1.5 py-0.2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded font-mono">
                OB47
              </span>
            </h4>
            <span className="text-[10px] text-zinc-400">
              Drag response velocity preview
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleTestDrag}
          disabled={isSimulating}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold btn-fire disabled:opacity-50"
        >
          <Play className="w-3 h-3 fill-current" />
          <span>{isSimulating ? 'Dragging...' : 'Test Drag'}</span>
        </button>
      </div>

      {/* Target Canvas Sandbox Area */}
      <div className="relative h-44 w-full bg-[#06060a] rounded-xl border border-white/5 overflow-hidden flex items-center justify-center select-none">
        {/* Background Aim Grid Lines */}
        <div className="absolute inset-0 bg-[radial-gradient(#23232f_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

        {/* Center Target Enemy Dummy Silhouette */}
        <div className="absolute flex flex-col items-center pointer-events-none opacity-85">
          {/* Enemy Head with Red Hitbox */}
          <div className="w-8 h-8 rounded-full border border-rose-500/60 bg-rose-500/20 flex items-center justify-center relative shadow-[0_0_12px_rgba(244,63,94,0.3)]">
            <div className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            <span className="text-[8px] font-mono text-rose-300 font-bold absolute -top-3.5">
              HEAD
            </span>
          </div>
          {/* Enemy Torso */}
          <div className="w-14 h-16 rounded-t-xl bg-zinc-800/60 border border-white/5 mt-1" />
        </div>

        {/* Dynamic Crosshair Reticle with Drag Travel Animation */}
        <div
          className={`relative z-10 transition-transform duration-700 ease-out flex items-center justify-center ${
            isSimulating ? '-translate-y-12 scale-110' : 'translate-y-3'
          }`}
        >
          {/* Center Dot */}
          <div
            className="w-1.5 h-1.5 rounded-full bg-[#ffb020] shadow-[0_0_8px_#ff6a00]"
            style={{ opacity: glowIntensity }}
          />

          {/* Crosshair Ticks */}
          <div
            className="absolute w-3.5 h-[1.5px] bg-[#ff6a00]"
            style={{ left: `-${10 + spreadRatio}px` }}
          />
          <div
            className="absolute w-3.5 h-[1.5px] bg-[#ff6a00]"
            style={{ right: `-${10 + spreadRatio}px` }}
          />
          <div
            className="absolute h-3.5 w-[1.5px] bg-[#ff6a00]"
            style={{ top: `-${10 + spreadRatio}px` }}
          />
          <div
            className="absolute h-3.5 w-[1.5px] bg-[#ff6a00]"
            style={{ bottom: `-${10 + spreadRatio}px` }}
          />

          {/* Aim Circle */}
          <div
            className="absolute rounded-full border border-[#ff6a00]/40 pointer-events-none"
            style={{
              width: `${24 + spreadRatio * 2}px`,
              height: `${24 + spreadRatio * 2}px`,
            }}
          />
        </div>

        {/* In-HUD Phone Fire Button Size Preview (Bottom Right of simulated screen) */}
        <div className="absolute bottom-2 right-3 flex items-center gap-1.5 p-1 rounded-lg bg-black/60 border border-white/10 backdrop-blur-sm pointer-events-none">
          <div
            className="rounded-full border-2 border-[#ffb020] bg-[#ff6a00]/30 flex items-center justify-center font-mono font-bold text-white text-[10px] shadow-[0_0_8px_rgba(255,106,0,0.4)]"
            style={{
              width: `${Math.round(28 + (values.fireButton / 80) * 16)}px`,
              height: `${Math.round(28 + (values.fireButton / 80) * 16)}px`,
            }}
          >
            {values.fireButton}%
          </div>
          <span className="text-[9px] font-bold text-zinc-400">Fire Button</span>
        </div>

        {/* Drag Trajectory Indicator while simulating */}
        {isSimulating && (
          <div className="absolute bottom-6 flex flex-col items-center animate-pulse pointer-events-none">
            <span className="text-[10px] font-extrabold font-mono text-[#ffb020] uppercase tracking-wider bg-black/80 px-2 py-0.5 rounded border border-[#ff6a00]/40">
              ⚡ UPWARD DRAG FLICK
            </span>
          </div>
        )}
      </div>

      {/* Simulator Feedback Rating */}
      {dragScore && (
        <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-2 text-xs text-emerald-300 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="font-bold">{dragScore}</span>
        </div>
      )}

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 gap-2 text-center text-xs pt-1">
        <div className="p-2 rounded-lg bg-white/5 border border-white/5">
          <span className="text-[10px] text-zinc-400 block">General Aim Travel</span>
          <span className="font-mono font-bold text-[#ffb020]">{values.general} / 200</span>
        </div>
        <div className="p-2 rounded-lg bg-white/5 border border-white/5">
          <span className="text-[10px] text-zinc-400 block">Red Dot Drag Snap</span>
          <span className="font-mono font-bold text-[#ff6a00]">{values.redDot} / 200</span>
        </div>
      </div>
    </div>
  );
}
