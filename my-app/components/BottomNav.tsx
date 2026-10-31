'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Sliders, Layers, Bookmark, BookOpen } from 'lucide-react';

const TABS = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/generator', label: 'Generate', icon: Sliders },
  { href: '/presets', label: 'Presets', icon: Layers },
  { href: '/saved', label: 'Saved', icon: Bookmark },
  { href: '/guide', label: 'Guide', icon: BookOpen },
];

export default function BottomNav() {
  const pathname = usePathname();

  const handleTabClick = () => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      try {
        navigator.vibrate(12);
      } catch {}
    }
  };

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#07070b]/95 backdrop-blur-2xl border-t border-white/10 px-3 py-1.5 pb-[max(0.5rem,env(safe-area-inset-bottom))]"
      aria-label="Mobile Bottom Navigation"
    >
      <div className="flex items-center justify-between max-w-md mx-auto">
        {TABS.map((tab) => {
          const isActive = pathname === tab.href;
          const Icon = tab.icon;

          return (
            <Link
              key={tab.href}
              href={tab.href}
              onClick={handleTabClick}
              className={`flex flex-col items-center justify-center flex-1 py-1 rounded-2xl transition-all duration-200 select-none active:scale-90 ${
                isActive
                  ? 'text-[#ff6a00]'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              <div
                className={`p-1.5 rounded-xl transition-all ${
                  isActive
                    ? 'bg-gradient-to-tr from-[#ff6a00]/25 to-[#ffb020]/15 text-[#ffb020] shadow-[0_0_12px_rgba(255,106,0,0.3)]'
                    : 'bg-transparent'
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span
                className={`text-[10px] font-bold mt-0.5 tracking-tight ${
                  isActive ? 'text-white font-extrabold' : 'text-zinc-400'
                }`}
              >
                {tab.label}
              </span>
              {isActive && (
                <span className="w-1 h-1 rounded-full bg-[#ff6a00] shadow-[0_0_6px_#ff6a00] mt-0.5" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
