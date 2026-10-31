'use client';

import React, { useState, useMemo } from 'react';
import {
  Smartphone,
  Search,
  X,
  Cpu,
  Monitor,
  Zap,
  Check,
  Plus,
} from 'lucide-react';
import {
  DEVICES,
  BRANDS,
  CUSTOM_DEVICE_ID,
  Device,
  DeviceBrand,
} from '@/lib/devices';

interface DeviceSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedId?: string;
  selectedDeviceId?: string;
  onSelect?: (deviceId: string) => void;
  onSelectDevice?: (deviceId: string) => void;
}

export default function DeviceSelectorModal({
  isOpen,
  onClose,
  selectedId,
  selectedDeviceId,
  onSelect,
  onSelectDevice,
}: DeviceSelectorModalProps) {
  const currentSelectedId = selectedId || selectedDeviceId || '';
  const handleSelect = onSelect || onSelectDevice || (() => {});
  const [search, setSearch] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<string>('All');

  // Filtered list
  const filteredDevices = useMemo(() => {
    return DEVICES.filter((d) => {
      const matchesSearch =
        d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.brand.toLowerCase().includes(search.toLowerCase());
      const matchesBrand = selectedBrand === 'All' || d.brand === selectedBrand;
      return matchesSearch && matchesBrand;
    });
  }, [search, selectedBrand]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="w-full max-w-2xl max-h-[90vh] sm:max-h-[85vh] bg-[#0c0c14] border-t sm:border border-white/10 rounded-t-3xl sm:rounded-3xl flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-bottom-6 sm:slide-in-from-bottom-2 duration-300"
        role="dialog"
        aria-modal="true"
        aria-labelledby="device-modal-title"
      >
        {/* Modal Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#ff6a00]/15 flex items-center justify-center text-[#ff6a00]">
              <Smartphone className="w-4 h-4" />
            </div>
            <div>
              <h3 id="device-modal-title" className="text-base font-bold text-white">
                Select Hardware Profile
              </h3>
              <p className="text-[11px] text-zinc-400">
                29+ tested devices calibrated for Free Fire touch response
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Brand Filter Bar */}
        <div className="p-4 space-y-3 bg-[#08080d] border-b border-white/5">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by phone name (e.g. iPhone 15, A54, Poco F5)..."
              className="w-full bg-[#161622] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff6a00] transition-colors"
              autoFocus
            />
          </div>

          {/* Brand Horizontal Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
            {['All', ...BRANDS.filter((b) => b !== 'Other')].map((brand) => (
              <button
                key={brand}
                type="button"
                onClick={() => setSelectedBrand(brand)}
                className={`px-3 py-1 rounded-lg font-medium whitespace-nowrap transition-all ${
                  selectedBrand === brand
                    ? 'bg-[#ff6a00] text-black font-bold'
                    : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {brand}
              </button>
            ))}
          </div>
        </div>

        {/* Devices Scroll Area */}
        <div className="p-4 overflow-y-auto space-y-2.5 flex-1 max-h-[50vh]">
          {/* Custom Phone Card Option */}
          <button
            type="button"
            onClick={() => {
              handleSelect(CUSTOM_DEVICE_ID);
              onClose();
            }}
            className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between ${
              currentSelectedId === CUSTOM_DEVICE_ID
                ? 'bg-[#ff6a00]/15 border-[#ff6a00] text-white shadow-[0_0_12px_rgba(255,106,0,0.2)]'
                : 'bg-white/5 border-white/5 hover:border-white/15 text-zinc-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 font-bold">
                <Plus className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-xs text-white block">
                  Other / Unlisted Phone
                </span>
                <span className="text-[10px] text-zinc-400">
                  Manually configure custom RAM (2-16GB) & Screen Size (4.7-12.9&quot;)
                </span>
              </div>
            </div>
            {currentSelectedId === CUSTOM_DEVICE_ID && (
              <Check className="w-4 h-4 text-[#ffb020]" />
            )}
          </button>

          {/* Verified Devices */}
          {filteredDevices.map((device) => {
            const isSelected = currentSelectedId === device.id;
            return (
              <button
                key={device.id}
                type="button"
                onClick={() => {
                  handleSelect(device.id);
                  onClose();
                }}
                className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#ff6a00]/15 to-[#ffb020]/10 border-[#ff6a00] text-white shadow-[0_0_12px_rgba(255,106,0,0.2)]'
                    : 'bg-[#161622]/60 border-white/5 hover:border-white/15 text-zinc-300'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-white/5 text-[#ffb020]">
                      {device.brand}
                    </span>
                    <span className="font-bold text-xs text-white">{device.name}</span>
                  </div>

                  <div className="flex items-center gap-3 text-[10px] text-zinc-400">
                    <span className="flex items-center gap-1">
                      <Cpu className="w-3 h-3 text-[#ff6a00]" />
                      {device.ram}GB RAM
                    </span>
                    <span className="flex items-center gap-1">
                      <Monitor className="w-3 h-3 text-[#ffb020]" />
                      {device.screen}&quot; Display
                    </span>
                    {device.hz && (
                      <span className="flex items-center gap-1">
                        <Zap className="w-3 h-3 text-emerald-400" />
                        {device.hz}Hz
                      </span>
                    )}
                  </div>
                </div>

                {isSelected ? (
                  <div className="w-6 h-6 rounded-full bg-[#ff6a00] flex items-center justify-center text-black font-bold">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                ) : (
                  <span className="text-[11px] text-zinc-500 font-semibold">Select</span>
                )}
              </button>
            );
          })}

          {filteredDevices.length === 0 && (
            <div className="py-8 text-center text-xs text-zinc-500">
              No matching phone found. Select &quot;Other / Unlisted Phone&quot; to input custom specs.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
