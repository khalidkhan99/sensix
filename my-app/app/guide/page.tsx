import React from 'react';
import type { Metadata } from 'next';
import { PageHeader } from '@/components/PageHeader';
import {
  Settings,
  Timer,
  SlidersHorizontal,
  Target,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Aiming Guide & Training Routine — SensiX Free Fire Lab',
  description: 'Learn how to apply sensitivity values in Free Fire, run the 10-minute training drill, and fine-tune your headshots.',
};

export default function GuidePage() {
  return (
    <div className="space-y-12 max-w-4xl mx-auto animate-in fade-in duration-300">
      <PageHeader
        badge="Tactical Mastery"
        title="Aim & Training"
        titleAccent="Guide"
        description="Numbers are just the starting point. Follow this tactical framework to translate your sensitivity into tournament-grade headshot drag consistency."
      />

      {/* 4 Cards Grid */}
      <div className="space-y-8">
        {/* Module 1: Applying in Free Fire */}
        <div className="glass-card rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#ff6a00]/15 border border-[#ff6a00]/30 flex items-center justify-center text-[#ff6a00]">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#ffb020]">
                Step 1 · In-Game Setup
              </span>
              <h2 className="text-xl font-bold text-white">How to Apply Values in Free Fire</h2>
            </div>
          </div>

          <ol className="space-y-3 text-sm text-zinc-300 pt-2 list-decimal list-inside leading-relaxed">
            <li>
              Launch <strong className="text-white">Free Fire</strong> or <strong className="text-white">Free Fire MAX</strong> and tap the <strong>Gear icon</strong> (Settings) in the top-right lobby.
            </li>
            <li>
              Select the <strong className="text-white">Sensitivity tab</strong> on the left navigation column.
            </li>
            <li>
              Drag each slider (General, Red Dot, 2x, 4x, Sniper, Free Look) to match your calibrated SensiX numbers.
            </li>
            <li>
              Go to the <strong className="text-white">Controls tab</strong> &gt; tap <strong className="text-white">Custom HUD</strong>.
            </li>
            <li>
              Tap your primary Fire Button, adjust its <strong>Size slider</strong> to the suggested percentage, and position it low enough on your screen so your thumb has maximum upward swipe distance.
            </li>
          </ol>
        </div>

        {/* Module 2: 10-Minute Training Ground Routine */}
        <div className="glass-card rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Timer className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#ffb020]">
                Step 2 · Muscle Memory Drill
              </span>
              <h2 className="text-xl font-bold text-white">The 10-Minute Daily Warmup Drill</h2>
            </div>
          </div>

          <p className="text-xs text-zinc-400">
            Never jump directly into Ranked with new sensitivity. Spend 10 minutes in the Training Ground:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-2">
              <span className="font-mono text-sm font-bold text-[#ff6a00]">Minutes 01 - 03</span>
              <h3 className="font-bold text-white text-xs">Standing Dummy Practice</h3>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                Pick Desert Eagle or Woodpecker. Stand 15m away and practice single upward drag flicks until 8 out of 10 shots register red headshots.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-2">
              <span className="font-mono text-sm font-bold text-[#ffb020]">Minutes 04 - 07</span>
              <h3 className="font-bold text-white text-xs">Moving Dummy Drag Speed</h3>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                Activate dummy movement (Medium Speed). Practice the diagonal &quot;J-Shape Drag&quot; tracking the bot in the direction it runs.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-2">
              <span className="font-mono text-sm font-bold text-emerald-400">Minutes 08 - 10</span>
              <h3 className="font-bold text-white text-xs">Combat Zone Reaction</h3>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                Enter the Combat Arena. Focus purely on close-range Gloo Wall timing and shotgun quick-switches rather than K/D ratio.
              </p>
            </div>
          </div>
        </div>

        {/* Module 3: Drag (Only Red) Technique */}
        <div className="glass-card rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-500/15 border border-red-500/30 flex items-center justify-center text-red-400">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-red-400">
                Core Mechanic · Solo Rojo
              </span>
              <h2 className="text-xl font-bold text-white">The Drag (Only Red) Technique</h2>
            </div>
          </div>

          <p className="text-xs text-zinc-400 leading-relaxed">
            The secret to red numbers lies in the shape and acceleration of your upward fire button swipe:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-2">
              <span className="font-mono text-xs font-bold text-red-400">Straight Drag (Vertical)</span>
              <h3 className="font-bold text-white text-xs">For Still or Straight Targets</h3>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                When an enemy is running directly toward you or standing stationary, swipe the fire button straight up in one swift, unbroken stroke.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-2">
              <span className="font-mono text-xs font-bold text-[#ffb020]">J-Shape Drag (Curved)</span>
              <h3 className="font-bold text-white text-xs">For Cross-Screen Runners</h3>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                When enemies run diagonally across your screen, pull slightly down and curve upward in the direction of their sprint (like the letter &quot;J&quot;).
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-2">
              <span className="font-mono text-xs font-bold text-emerald-400">Touch Separation</span>
              <h3 className="font-bold text-white text-xs">Flick Force &amp; Distance</h3>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                At close range (0–10m), swipe fast and far with high acceleration. At mid range (15–35m), swipe gently with a shorter 1–2cm flick.
              </p>
            </div>
          </div>
        </div>

        {/* Module 4: How to Fine-Tune */}
        <div className="glass-card rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <SlidersHorizontal className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#ffb020]">
                Fine-Tuning · Rule of 3-to-5 Points
              </span>
              <h2 className="text-xl font-bold text-white">How to Diagnose &amp; Fine-Tune</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 space-y-2">
              <div className="flex items-center gap-2 text-rose-300 font-bold text-xs">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                Problem: Drag shoots over enemy&apos;s head
              </div>
              <p className="text-[11px] text-zinc-300 leading-relaxed">
                Your sensitivity is slightly too high for your swipe force. <strong>Decrease General or Red Dot by 3-5 points</strong>, or increase your Fire Button size by 3%.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 space-y-2">
              <div className="flex items-center gap-2 text-amber-300 font-bold text-xs">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                Problem: Crosshair gets stuck on enemy chest
              </div>
              <p className="text-[11px] text-zinc-300 leading-relaxed">
                Your sensitivity is too low or your fire button is too high. <strong>Increase General by 3-5 points</strong> and drag with a faster initial flick speed.
              </p>
            </div>
          </div>
        </div>

        {/* Module 4: Pro Habits That Actually Help */}
        <div className="glass-card rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#ffb020]">
                Step 4 · Pro Habits
              </span>
              <h2 className="text-xl font-bold text-white">4 Small Habits That Change Everything</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-zinc-300 pt-2">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#ff6a00] shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block mb-0.5">Keep Screen Clean & Dry:</strong>
                Finger sweat increases friction by over 40%. Use gaming thumb sleeves or a microfiber wipe before tournament matches.
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#ff6a00] shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block mb-0.5">Pre-Aim at Neck Level:</strong>
                Never sprint while looking at the dirt. If your reticle is already at shoulder height, your upward drag only needs to move 2 millimeters.
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#ff6a00] shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block mb-0.5">The Quick Stop Technique:</strong>
                Release your movement joystick for a split-second before dragging the fire button. This instantly resets weapon accuracy spread to zero.
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#ff6a00] shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block mb-0.5">Stick with One Setting for 3 Days:</strong>
                Constantly changing sensitivity resets your brain&apos;s neural adaptation. Give any new setup 72 hours of play before re-adjusting.
              </div>
            </div>
          </div>
        </div>

        {/* Module 5: Android System Calibration (ManuelitaGG Reference) */}
        <div className="glass-card rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400">
                Step 5 · Device System Calibration
              </span>
              <h2 className="text-xl font-bold text-white">How to Setup Android DPI & Pointer Speed</h2>
            </div>
          </div>

          <p className="text-xs text-zinc-400">
            For maximum one-tap headshot drag velocity on Android devices, configure these three system-level settings:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-2">
              <span className="font-mono text-xs font-bold text-blue-400">1. Developer Options</span>
              <h3 className="font-bold text-white text-xs">Unlock System DPI</h3>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                Go to <strong>Settings &gt; About Phone</strong> and tap <strong>&quot;Build Number&quot;</strong> 7 times until you see &quot;You are now a developer!&quot;.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-2">
              <span className="font-mono text-xs font-bold text-[#ffb020]">2. Smallest Width (DPI)</span>
              <h3 className="font-bold text-white text-xs">Set Custom Ancho Mínimo</h3>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                In <strong>Developer Options</strong>, find <strong>&quot;Smallest Width&quot; (Ancho Mínimo)</strong> and change it to the DPI value recommended on your SensiX card (e.g. 520–580).
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-2">
              <span className="font-mono text-xs font-bold text-emerald-400">3. Pointer Speed</span>
              <h3 className="font-bold text-white text-xs">Velocidad del Puntero</h3>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                Go to <strong>Settings &gt; System &gt; Language &amp; Input &gt; Pointer Speed</strong> and slide it all the way to <strong>Maximum</strong> for instant swipe response.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
