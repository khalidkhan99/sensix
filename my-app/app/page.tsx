import React from 'react';
import Link from 'next/link';
import {
  Flame,
  Sliders,
  Layers,
  Bookmark,
  Share2,
  Zap,
  ShieldCheck,
  Smartphone,
  ChevronRight,
  HelpCircle,
  Sparkles,
} from 'lucide-react';
import ResultCard from '@/components/ResultCard';
import { DEVICES } from '@/lib/devices';

export default function HomePage() {
  // Sample realistic preview values for hero showcase (modern 200-scale)
  const heroSampleValues = {
    general: 192,
    redDot: 186,
    scope2x: 178,
    scope4x: 168,
    sniper: 134,
    freeLook: 168,
    fireButton: 50,
  };

  return (
    <div className="space-y-20 sm:space-y-28 animate-in fade-in duration-300">
      {/* 1. HERO SECTION */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-4 sm:pt-10">
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-[#ffb020]">
            <span className="w-2 h-2 rounded-full bg-[#ff6a00] animate-pulse" />
            <span className="text-white font-extrabold uppercase tracking-wide">OB47 Ready</span>
            <span className="text-zinc-500">·</span>
            <span>Modern 0–200 Sensitivity System</span>
          </div>

          {/* Headline with Gradient Accent */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1]">
            Find the sensitivity that{' '}
            <span className="gradient-fire-text">fits your hand.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-zinc-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
            Stop guessing your drag settings. SensiX factors in your phone model, screen inches, RAM, and grip style to calibrate tournament-grade headshot baselines.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
            <Link
              href="/generator"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-sm btn-fire flex items-center justify-center gap-2 shadow-lg shadow-[#ff6a00]/25"
            >
              <Sliders className="w-4 h-4" />
              Generate My Settings
            </Link>

            <Link
              href="/presets"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-semibold text-sm btn-ghost flex items-center justify-center gap-2"
            >
              <Layers className="w-4 h-4 text-zinc-400" />
              Explore Presets
            </Link>
          </div>

          {/* Trust Chips */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4 text-xs text-zinc-400">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% Client-Side Privacy</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Zero Account Required</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Smartphone className="w-4 h-4 text-[#ff6a00]" />
              <span>Offline Ready PWA</span>
            </div>
          </div>
        </div>

        {/* Hero Interactive Floating Glass Preview Card */}
        <div className="lg:col-span-5 relative max-w-md mx-auto w-full">
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#ff6a00] to-[#ffb020] opacity-25 blur-xl animate-float" />
          <div className="relative animate-float">
            <ResultCard
              title="Headshot Machine"
              subtitle="Calibrated for One-Tap Drag"
              badge="LIVE PREVIEW"
              values={heroSampleValues}
              deviceOrLabel='Galaxy A54 5G (8GB · 6.4")'
            />
          </div>
        </div>
      </section>

      {/* 2. STATS ROW */}
      <section className="glass-card rounded-2xl p-6 sm:p-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-white/5">
          <div className="pt-4 md:pt-0">
            <span className="font-mono font-black text-3xl sm:text-4xl text-[#ffb020] block">
              6
            </span>
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mt-1 block">
              Scope Channels
            </span>
          </div>

          <div className="pt-4 md:pt-0">
            <span className="font-mono font-black text-3xl sm:text-4xl text-white block">
              {DEVICES.length}+
            </span>
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mt-1 block">
              Tested Phone Profiles
            </span>
          </div>

          <div className="pt-4 md:pt-0">
            <span className="font-mono font-black text-3xl sm:text-4xl text-emerald-400 block">
              100%
            </span>
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mt-1 block">
              Client Offline Mode
            </span>
          </div>

          <div className="pt-4 md:pt-0">
            <span className="font-mono font-black text-3xl sm:text-4xl text-[#ff6a00] block">
              0
            </span>
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mt-1 block">
              Logins or Sign-Ups
            </span>
          </div>
        </div>
      </section>

      {/* 3. SIX-FEATURE GRID */}
      <section className="space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#ff6a00]">
            Engine Features
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Engineered for <span className="gradient-fire-text">Drag Accuracy</span>
          </h2>
          <p className="text-sm text-zinc-400">
            Everything you need to calibrate, save, share, and master your in-game controls.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            {
              icon: Sliders,
              title: 'Hardware-Adaptive Engine',
              desc: 'Calculates screen travel coefficients based on phone diagonal, RAM headroom, and touch polling.',
            },
            {
              icon: Flame,
              title: 'Combat Playstyles',
              desc: 'Tailored algorithms for close-range rushers, one-tap snipers, and versatile ranked squads.',
            },
            {
              icon: Layers,
              title: 'Curated Pro Presets',
              desc: 'One-click access to tested tournament benchmarks, budget-friendly setups, and tablet profiles.',
            },
            {
              icon: Bookmark,
              title: 'Zero-Cloud Portability',
              desc: 'Save up to 100 profiles safely in local browser storage; export and import JSON backups with one tap.',
            },
            {
              icon: Share2,
              title: '1080x1350 PNG Cards',
              desc: 'Instant Canvas rendering generates high-res dark gaming posters ready for WhatsApp and Instagram.',
            },
            {
              icon: Sparkles,
              title: '10-Minute Training Drills',
              desc: 'Actionable practice routines designed to build muscle memory in the Training Grounds.',
            },
          ].map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="glass-card rounded-2xl p-6 space-y-3 hover:border-[#ff6a00]/30 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#ff6a00] group-hover:scale-110 group-hover:bg-[#ff6a00]/10 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white tracking-tight">{feat.title}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">{feat.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. THREE-STEP WORKFLOW */}
      <section className="glass-card rounded-2xl p-8 sm:p-12 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#ffb020]">
            Simple Workflow
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white">How SensiX Works</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {[
            {
              step: '01',
              title: 'Select Hardware',
              desc: 'Pick your phone model or input custom specs (RAM & screen size) for precise physics calibration.',
            },
            {
              step: '02',
              title: 'Set Your Combat Role',
              desc: 'Choose between Rusher, Headshot Specialist, Balanced, or Sniper, plus your claw grip finger count.',
            },
            {
              step: '03',
              title: 'Apply & Dominate',
              desc: 'Copy numbers directly into Free Fire settings and fine-tune with our 10-minute training guide.',
            },
          ].map((step, idx) => (
            <div key={idx} className="p-6 rounded-xl bg-white/5 border border-white/5 space-y-3 relative">
              <span className="font-mono text-3xl font-black text-[#ff6a00]/40 block">
                {step.step}
              </span>
              <h3 className="text-base font-bold text-white">{step.title}</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. FAQ SECTION */}
      <section className="space-y-6 max-w-3xl mx-auto">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-white flex items-center justify-center gap-2">
            <HelpCircle className="w-6 h-6 text-[#ff6a00]" />
            Frequently Asked Questions
          </h2>
          <p className="text-xs text-zinc-400">Everything you need to know about sensitivity baselines.</p>
        </div>

        <div className="space-y-3">
          {[
            {
              q: 'Will these settings guarantee 100% auto-headshots?',
              a: 'No. Sensitivity values provide the optimal physical drag speed for your device, but headshots still depend on correct crosshair placement, drag timing (straight drag vs J-drag), and weapon recoil control.',
            },
            {
              q: 'Is SensiX affiliated with Garena Free Fire?',
              a: 'No. SensiX is an independent fan-made analytical tool built by the community. It does not modify game files, memory, or packages.',
            },
            {
              q: 'Where are my saved sensitivity profiles stored?',
              a: 'All profiles are stored 100% locally in your browser storage (localStorage). No data is sent to external servers, and you can export JSON backups anytime.',
            },
            {
              q: 'Can I use SensiX completely offline?',
              a: 'Yes! SensiX is a Progressive Web App (PWA). Once opened, the service worker caches the full generator, presets, and guides so you can use it anytime without internet.',
            },
          ].map((faq, idx) => (
            <details
              key={idx}
              className="group glass-card rounded-xl p-4 cursor-pointer [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex items-center justify-between font-bold text-sm text-zinc-200 group-open:text-[#ffb020] transition-colors">
                <span>{faq.q}</span>
                <ChevronRight className="w-4 h-4 text-zinc-400 transition-transform group-open:rotate-90 shrink-0 ml-2" />
              </summary>
              <p className="text-xs text-zinc-400 mt-3 pt-3 border-t border-white/5 leading-relaxed">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* 6. FINAL CALL TO ACTION */}
      <section className="glass-card-elevated rounded-2xl p-8 sm:p-12 text-center space-y-6 max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Ready to calibrate your <span className="gradient-fire-text">headshot baseline</span>?
        </h2>
        <p className="text-sm text-zinc-300 max-w-lg mx-auto">
          Takes less than 15 seconds. Choose your device and step into the Training Grounds with confidence.
        </p>
        <Link
          href="/generator"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-bold btn-fire shadow-xl shadow-[#ff6a00]/30"
        >
          <Sliders className="w-4 h-4" />
          Open Sensitivity Generator
        </Link>
      </section>
    </div>
  );
}
