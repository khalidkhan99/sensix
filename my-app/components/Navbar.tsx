'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Flame, Sliders, Bookmark, BookOpen, Layers } from 'lucide-react';

const NAV_LINKS = [
  { href: '/generator', label: 'Generator', icon: Sliders },
  { href: '/presets', label: 'Presets', icon: Layers },
  { href: '/saved', label: 'Saved', icon: Bookmark },
  { href: '/guide', label: 'Guide', icon: BookOpen },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/5 bg-[#07070b]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#ff3b00] to-[#ffb020] p-0.5 flex items-center justify-center shadow-lg shadow-[#ff6a00]/25 group-hover:shadow-[#ff6a00]/40 transition-shadow">
            <div className="w-full h-full bg-[#07070b] rounded-[10px] flex items-center justify-center">
              <Flame className="w-5 h-5 text-[#ff6a00]" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-lg tracking-tight text-white flex items-center gap-1.5">
              Sensi<span className="gradient-fire-text">X</span>
              <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[#ffb020]">
                Lab
              </span>
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-white/10 text-white shadow-inner border border-white/10'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#ff6a00]' : 'text-zinc-400'}`} />
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* CTA Button */}
        <div className="flex items-center gap-3">
          <Link
            href="/generator"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold btn-fire"
          >
            <Sliders className="w-3.5 h-3.5" />
            Launch Generator
          </Link>
        </div>
      </div>
    </header>
  );
}
