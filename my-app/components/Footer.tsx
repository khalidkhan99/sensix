import React from 'react';
import Link from 'next/link';
import { Flame, ShieldAlert, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/5 bg-[#050508] mt-20 pb-24 md:pb-12 pt-12 text-zinc-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-[#ff3b00] to-[#ffb020] p-0.5 flex items-center justify-center">
                <Flame className="w-4 h-4 text-[#07070b]" />
              </div>
              <span className="font-bold text-sm text-white tracking-tight">
                Sensi<span className="gradient-fire-text">X</span> Lab
              </span>
            </div>
            <p className="text-zinc-400 max-w-sm leading-relaxed text-xs">
              Algorithmic sensitivity generator, benchmark presets, and tactical aiming guides engineered for Free Fire players on mobile & tablet.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-3 uppercase tracking-wider text-[11px]">
              Features
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/generator" className="hover:text-white transition-colors">
                  Sensitivity Generator
                </Link>
              </li>
              <li>
                <Link href="/presets" className="hover:text-white transition-colors">
                  Pro Presets Catalog
                </Link>
              </li>
              <li>
                <Link href="/saved" className="hover:text-white transition-colors">
                  My Saved Setups
                </Link>
              </li>
              <li>
                <Link href="/guide" className="hover:text-white transition-colors">
                  10-Min Training Routine
                </Link>
              </li>
            </ul>
          </div>

          {/* Governance & Disclaimer */}
          <div>
            <h4 className="font-semibold text-white mb-3 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
              Legal & Community
            </h4>
            <p className="text-zinc-400 leading-relaxed text-[11px]">
              SensiX is an independent fan-made analytical tool. It is <strong className="text-zinc-300">not affiliated with, endorsed, or sponsored by Garena or Free Fire</strong>. All game trademarks belong to their respective owners.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-400">
          <p>© 2026 SensiX Lab. Built for competitive Free Fire athletes.</p>
          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3 h-3 text-[#ff6a00] fill-current" />
            <span>for maximum drag accuracy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
