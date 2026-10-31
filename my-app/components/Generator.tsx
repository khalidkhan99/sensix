'use client';

import React, { useState, useMemo } from 'react';
import {
  Flame,
  Crosshair,
  Scale,
  Target,
  Eye,
  Smartphone,
  Cpu,
  Monitor,
  Zap,
  Lightbulb,
  Search,
  Sparkles,
  Sliders,
  RotateCcw,
} from 'lucide-react';
import {
  Playstyle,
  Level,
  Fingers,
  Experience,
  SensValues,
  calculateSensitivity,
  PLAYSTYLES,
  LEVELS,
  PLAYSTYLE_TIPS,
  SENS_FIELDS,
} from '@/lib/sensitivity';
import {
  DEVICES,
  CUSTOM_DEVICE_ID,
  findDevice,
  Device,
} from '@/lib/devices';
import { PRESETS } from '@/lib/presets';
import ResultCard from './ResultCard';
import DeviceSelectorModal from './DeviceSelectorModal';
import CrosshairPreview from './CrosshairPreview';

const PLAYSTYLE_ICONS: Record<Playstyle, React.ComponentType<{ className?: string }>> = {
  drag: Target,
  rusher: Flame,
  headshot: Crosshair,
  balanced: Scale,
  sniper: Eye,
};

// Popular 1-tap devices for quick selection
const POPULAR_DEVICE_IDS = [
  'samsung-a54',
  'iphone-13',
  'redmi-12',
  'tecno-pop-5-pro',
  'poco-x5-pro',
  'realme-c55',
  'infinix-hot-30',
];

export default function Generator() {
  // Device Selection State
  const [deviceId, setDeviceId] = useState<string>('samsung-a54');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isDeviceModalOpen, setIsDeviceModalOpen] = useState<boolean>(false);

  // Custom device fallback specs
  const [customRam, setCustomRam] = useState<number>(6);
  const [customScreen, setCustomScreen] = useState<number>(6.5);

  // Formula Controls
  const [playstyle, setPlaystyle] = useState<Playstyle>('drag');
  const [level, setLevel] = useState<Level>('high');
  const [fingers, setFingers] = useState<Fingers>(2);
  const [experience, setExperience] = useState<Experience>('intermediate');
  const [includeDpi, setIncludeDpi] = useState<boolean>(true);

  // Custom manual slider overrides (when level === 'custom')
  const [customSens, setCustomSens] = useState<SensValues | null>(null);

  const selectedDevice = useMemo(() => findDevice(deviceId), [deviceId]);

  // Active specs (device or custom)
  const activeRam = deviceId === CUSTOM_DEVICE_ID ? customRam : (selectedDevice?.ram ?? 6);
  const activeScreen = deviceId === CUSTOM_DEVICE_ID ? customScreen : (selectedDevice?.screen ?? 6.5);
  const activeHz = selectedDevice?.hz;

  // Filtered devices for combobox (max 8)
  const filteredDevices = useMemo(() => {
    if (!searchQuery.trim()) return DEVICES.slice(0, 8);
    const q = searchQuery.toLowerCase();
    return DEVICES.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.brand.toLowerCase().includes(q)
    ).slice(0, 8);
  }, [searchQuery]);

  // Base calculated values (strictly 200 scale)
  const generatedValues = useMemo(() => {
    return calculateSensitivity({
      playstyle,
      level,
      ram: activeRam,
      screen: activeScreen,
      fingers,
      experience,
      includeDpi,
    });
  }, [playstyle, level, activeRam, activeScreen, fingers, experience, includeDpi]);

  // If level is custom and customSens is set, use it; otherwise use generatedValues
  const finalValues = useMemo(() => {
    if (level === 'custom' && customSens) {
      return customSens;
    }
    return generatedValues;
  }, [level, customSens, generatedValues]);

  // Switch to custom level and clone generated values
  const handleSelectLevel = (newLevel: Level) => {
    setLevel(newLevel);
    if (newLevel === 'custom' && !customSens) {
      setCustomSens({ ...generatedValues });
    }
  };

  // Reset custom sliders to generated values
  const handleResetCustom = () => {
    setCustomSens({ ...generatedValues });
  };

  // Custom slider change handler
  const handleCustomSliderChange = (key: keyof SensValues, val: number) => {
    setCustomSens((prev) => {
      const base = prev || generatedValues;
      return {
        ...base,
        [key]: val,
      };
    });
  };

  const deviceLabel = deviceId === CUSTOM_DEVICE_ID
    ? `Custom Phone (${activeRam}GB · ${activeScreen}")`
    : `${selectedDevice?.name || 'Mobile Phone'} (${activeRam}GB · ${activeScreen}")`;

  const activePlaystyleMeta = PLAYSTYLES.find((p) => p.id === playstyle) || PLAYSTYLES[0];
  const tips = PLAYSTYLE_TIPS[playstyle] || PLAYSTYLE_TIPS.drag;

  // Quick Preset Loader
  const handleApplyPreset = (presetId: string) => {
    if (presetId === 'drag-headshot-only-red') {
      setPlaystyle('drag');
      setLevel('veryhigh');
      setFingers(2);
      setExperience('pro');
    } else if (presetId === 'aggressive-rusher') {
      setPlaystyle('rusher');
      setLevel('veryhigh');
      setFingers(3);
      setExperience('pro');
    } else if (presetId === 'headshot-machine') {
      setPlaystyle('headshot');
      setLevel('high');
      setFingers(2);
      setExperience('intermediate');
    } else if (presetId === 'balanced-all-rounder') {
      setPlaystyle('balanced');
      setLevel('medium');
      setFingers(2);
      setExperience('intermediate');
    } else if (presetId === 'sniper-specialist') {
      setPlaystyle('sniper');
      setLevel('low');
      setFingers(4);
      setExperience('pro');
    } else if (presetId === 'low-end-smooth') {
      setPlaystyle('drag');
      setLevel('veryhigh');
      setFingers(2);
      setExperience('beginner');
    } else if (presetId === 'tablet-ipad') {
      setPlaystyle('drag');
      setLevel('veryhigh');
      setFingers(4);
      setExperience('pro');
    }
  };

  return (
    <div className="space-y-6">
      {/* Quick 1-Tap Presets Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <span className="text-[11px] font-black uppercase tracking-wider text-zinc-400 whitespace-nowrap flex items-center gap-1.5 pl-1">
          <Sparkles className="w-3.5 h-3.5 text-[#ff6a00]" />
          Quick Presets:
        </span>
        {PRESETS.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => handleApplyPreset(p.id)}
            className="px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap bg-white/5 hover:bg-[#ff6a00]/15 border border-white/10 hover:border-[#ff6a00]/40 text-zinc-300 hover:text-white transition-all active:scale-95"
          >
            {p.name}
          </button>
        ))}
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Easy Inputs (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* STEP 1: Device Selection */}
          <div className="glass-card rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-[#ff6a00]" />
                Step 1: Your Phone Model
              </label>
              <button
                type="button"
                onClick={() => setIsDeviceModalOpen(true)}
                className="text-xs font-bold text-[#ffb020] hover:text-[#ff6a00] transition-colors"
              >
                Browse All (78+) →
              </button>
            </div>

            {/* Quick Popular Phones Chips */}
            <div className="flex flex-wrap gap-1.5">
              {POPULAR_DEVICE_IDS.map((popId) => {
                const popDev = findDevice(popId);
                if (!popDev) return null;
                const isSelected = deviceId === popId;
                return (
                  <button
                    key={popId}
                    type="button"
                    onClick={() => {
                      setDeviceId(popId);
                      setSearchQuery('');
                      setIsDropdownOpen(false);
                    }}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                      isSelected
                        ? 'bg-[#ff6a00] text-black shadow font-bold'
                        : 'bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white border border-white/5'
                    }`}
                  >
                    {popDev.name}
                  </button>
                );
              })}
              <button
                type="button"
                onClick={() => {
                  setDeviceId(CUSTOM_DEVICE_ID);
                  setIsDropdownOpen(false);
                }}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                  deviceId === CUSTOM_DEVICE_ID
                    ? 'bg-[#ffb020] text-black font-bold'
                    : 'bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white border border-white/5'
                }`}
              >
                + Custom Phone
              </button>
            </div>

            {/* Search Input Box */}
            <div className="relative">
              <div className="relative flex items-center">
                <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setIsDropdownOpen(true);
                  }}
                  onFocus={() => setIsDropdownOpen(true)}
                  placeholder={
                    deviceId === CUSTOM_DEVICE_ID
                      ? 'Custom Phone active — type to search other phones...'
                      : selectedDevice
                      ? `${selectedDevice.name} (${selectedDevice.brand})`
                      : 'Type to search phone (e.g. Galaxy, iPhone, Redmi, Tecno)...'
                  }
                  className="w-full bg-[#07070b] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff6a00] transition-all"
                />
              </div>

              {/* Combobox Dropdown Results */}
              {isDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-20"
                    onClick={() => setIsDropdownOpen(false)}
                  />
                  <div className="absolute left-0 right-0 top-full mt-2 z-30 bg-[#0f0f18] border border-white/15 rounded-xl shadow-2xl overflow-hidden max-h-64 overflow-y-auto">
                    <button
                      type="button"
                      onClick={() => {
                        setDeviceId(CUSTOM_DEVICE_ID);
                        setIsDropdownOpen(false);
                        setSearchQuery('');
                      }}
                      className={`w-full text-left px-4 py-3 text-xs flex items-center justify-between border-b border-white/5 transition-colors ${
                        deviceId === CUSTOM_DEVICE_ID
                          ? 'bg-[#ff6a00]/20 text-[#ffb020]'
                          : 'text-zinc-200 hover:bg-white/5'
                      }`}
                    >
                      <span className="font-bold">⚡ Unlisted Phone (Set Custom RAM & Screen)</span>
                      <span className="text-[10px] text-zinc-400 font-mono">Custom</span>
                    </button>

                    {filteredDevices.map((d: Device) => (
                      <button
                        key={d.id}
                        type="button"
                        onClick={() => {
                          setDeviceId(d.id);
                          setIsDropdownOpen(false);
                          setSearchQuery('');
                        }}
                        className={`w-full text-left px-4 py-2.5 text-xs flex items-center justify-between transition-colors ${
                          deviceId === d.id
                            ? 'bg-[#ff6a00]/20 text-[#ffb020]'
                            : 'text-zinc-300 hover:bg-white/5'
                        }`}
                      >
                        <div>
                          <span className="font-semibold text-white">{d.name}</span>
                          <span className="text-[10px] text-zinc-400 ml-2">({d.brand})</span>
                        </div>
                        <span className="text-[10px] font-mono text-zinc-400">
                          {d.ram}GB · {d.screen}&quot;{d.hz ? ` · ${d.hz}Hz` : ''}
                        </span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Spec Chips for Current Device */}
            {deviceId !== CUSTOM_DEVICE_ID && selectedDevice && (
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-white/5 text-zinc-300 border border-white/5">
                  <Cpu className="w-3.5 h-3.5 text-[#ff6a00]" />
                  {selectedDevice.ram}GB RAM
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-white/5 text-zinc-300 border border-white/5">
                  <Monitor className="w-3.5 h-3.5 text-[#00e5ff]" />
                  {selectedDevice.screen}&quot; Display
                </span>
                {selectedDevice.hz && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-white/5 text-zinc-300 border border-white/5">
                    <Zap className="w-3.5 h-3.5 text-emerald-400" />
                    {selectedDevice.hz}Hz Screen
                  </span>
                )}
              </div>
            )}

            {/* Custom Phone Fallback Form */}
            {deviceId === CUSTOM_DEVICE_ID && (
              <div className="p-4 rounded-xl bg-black/40 border border-[#ff6a00]/30 space-y-3 animate-fade-in">
                <span className="text-xs font-bold text-white uppercase tracking-wider block">
                  Custom Phone Hardware Specs
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 mb-1">
                      RAM (Memory):
                    </label>
                    <select
                      value={customRam}
                      onChange={(e) => setCustomRam(Number(e.target.value))}
                      className="w-full bg-[#07070b] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#ff6a00]"
                    >
                      <option value={2}>2 GB</option>
                      <option value={3}>3 GB (e.g. Pop 5 Pro)</option>
                      <option value={4}>4 GB</option>
                      <option value={6}>6 GB</option>
                      <option value={8}>8 GB</option>
                      <option value={12}>12 GB</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 mb-1">
                      Screen Size (inches):
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      min="4.5"
                      max="13.0"
                      value={customScreen}
                      onChange={(e) => setCustomScreen(parseFloat(e.target.value) || 6.5)}
                      className="w-full bg-[#07070b] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#ff6a00]"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* STEP 2: Combat Playstyle */}
          <div className="glass-card rounded-2xl p-5 space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Target className="w-4 h-4 text-[#ff6a00]" />
                Step 2: Combat Playstyle
              </span>
              <span className="text-[10px] text-zinc-400">Headshot Lock Focus</span>
            </label>

            {/* Drag (Only Red) — Main Featured Option */}
            {(() => {
              const dragStyle = PLAYSTYLES.find((p) => p.id === 'drag') || PLAYSTYLES[0];
              const isSelected = playstyle === 'drag';
              return (
                <button
                  type="button"
                  onClick={() => setPlaystyle('drag')}
                  aria-pressed={isSelected}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-200 relative overflow-hidden group ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#ff6a00]/25 via-[#0f0f18] to-amber/15 border-[#ff6a00] shadow-[0_0_20px_rgba(255,106,0,0.25)]'
                      : 'bg-white/5 border-white/5 hover:border-white/15 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                          isSelected
                            ? 'bg-gradient-to-br from-[#ff3b00] to-[#ffb020] text-black font-black'
                            : 'bg-white/5 text-zinc-400 group-hover:text-white'
                        }`}
                      >
                        <Target className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-extrabold text-sm text-white">{dragStyle.label}</h4>
                          <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-red-500/20 text-red-400 border border-red-500/30">
                            Solo Rojo (Headshots)
                          </span>
                        </div>
                        <p className="text-[11px] text-zinc-400 mt-0.5">{dragStyle.description}</p>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })()}

            {/* Remaining 4 Playstyles in a 2x2 Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {PLAYSTYLES.filter((p) => p.id !== 'drag').map((p) => {
                const Icon = PLAYSTYLE_ICONS[p.id] || Flame;
                const isSelected = playstyle === p.id;

                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPlaystyle(p.id)}
                    aria-pressed={isSelected}
                    className={`text-left p-3.5 rounded-xl border transition-all duration-200 flex items-start gap-3 group ${
                      isSelected
                        ? 'bg-[#ff6a00]/15 border-[#ff6a00] shadow-[0_0_15px_rgba(255,106,0,0.2)]'
                        : 'bg-white/5 border-white/5 hover:border-white/15 hover:bg-white/10'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                        isSelected
                          ? 'bg-[#ff6a00] text-black font-bold'
                          : 'bg-white/5 text-zinc-400 group-hover:text-white'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-white">{p.label}</h4>
                      <p className="text-[10px] text-zinc-400 line-clamp-2 mt-0.5">
                        {p.tagline}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 3: Sensitivity Level */}
          <div className="glass-card rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#ffb020]" />
                Step 3: Sensitivity Speed
              </label>
              <span className="text-[10px] text-zinc-400">
                {level === 'custom' ? 'Manual Sliders Mode' : 'Instant Preset'}
              </span>
            </div>

            {/* Level Chips: Low / Medium / High / Ultra High / Custom */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {LEVELS.map((lvl) => {
                const isSelected = level === lvl.id;
                return (
                  <button
                    key={lvl.id}
                    type="button"
                    onClick={() => handleSelectLevel(lvl.id)}
                    aria-pressed={isSelected}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all text-center ${
                      isSelected
                        ? 'bg-gradient-to-r from-[#ff6a00] to-[#ffb020] text-black shadow-[0_0_15px_rgba(255,106,0,0.3)]'
                        : 'bg-white/5 hover:bg-white/10 text-zinc-300 border border-white/5'
                    }`}
                  >
                    {lvl.label}
                  </button>
                );
              })}
            </div>

            {/* Custom Level: Sliders per value (1-200) + Fire Button (30-80) */}
            {level === 'custom' && (
              <div className="p-4 rounded-xl bg-black/40 border border-[#ffb020]/30 space-y-4 animate-fade-in">
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                  <span className="text-xs font-bold text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#ffb020]" />
                    Manual Sliders (1–200 Scale)
                  </span>
                  <button
                    type="button"
                    onClick={handleResetCustom}
                    className="flex items-center gap-1 text-[11px] font-semibold text-[#ff6a00] hover:text-[#ffb020] transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Reset
                  </button>
                </div>

                <div className="space-y-3">
                  {SENS_FIELDS.map((field) => {
                    const currentVal = finalValues[field.key];
                    return (
                      <div key={field.key} className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-zinc-300 font-semibold">{field.label}</span>
                          <span className="font-mono font-bold text-[#ffb020]">{currentVal}/200</span>
                        </div>
                        <input
                          type="range"
                          min={1}
                          max={200}
                          value={currentVal}
                          onChange={(e) =>
                            handleCustomSliderChange(field.key, parseInt(e.target.value, 10))
                          }
                          className="w-full accent-[#ff6a00] bg-white/10 rounded-lg h-1.5 cursor-pointer"
                        />
                      </div>
                    );
                  })}

                  {/* Fire Button Slider */}
                  <div className="space-y-1 pt-2 border-t border-white/5">
                    <div className="flex justify-between text-xs">
                      <span className="text-zinc-200 font-bold">Fire Button Size</span>
                      <span className="font-mono font-bold text-[#ffb020]">{finalValues.fireButton}%</span>
                    </div>
                    <input
                      type="range"
                      min={30}
                      max={80}
                      value={finalValues.fireButton}
                      onChange={(e) =>
                        handleCustomSliderChange('fireButton', parseInt(e.target.value, 10))
                      }
                      className="w-full accent-[#ffb020] bg-white/10 rounded-lg h-1.5 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
                      <span>30%</span>
                      <span>80%</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* STEP 4: Finger Claw & Experience */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Finger Setup (2 / 3 / 4+) */}
            <div className="glass-card rounded-2xl p-4 space-y-2.5">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 block">
                Fingers on Screen
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { value: 2 as Fingers, label: '2 Thumbs' },
                  { value: 3 as Fingers, label: '3 Fingers' },
                  { value: 4 as Fingers, label: '4+ Claw' },
                ].map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => setFingers(item.value)}
                    aria-pressed={fingers === item.value}
                    className={`py-2 rounded-xl text-xs font-bold transition-all ${
                      fingers === item.value
                        ? 'bg-gradient-to-r from-[#ff6a00] to-[#ffb020] text-black shadow-md'
                        : 'bg-white/5 hover:bg-white/10 text-zinc-300'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Player Experience */}
            <div className="glass-card rounded-2xl p-4 space-y-2.5">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 block">
                Player Experience
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { id: 'beginner' as Experience, label: 'Beginner' },
                  { id: 'intermediate' as Experience, label: 'Regular' },
                  { id: 'pro' as Experience, label: 'Pro / Veteran' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setExperience(item.id)}
                    aria-pressed={experience === item.id}
                    className={`py-2 rounded-xl text-xs font-bold transition-all ${
                      experience === item.id
                        ? 'bg-gradient-to-r from-[#ff6a00] to-[#ffb020] text-black shadow-md'
                        : 'bg-white/5 hover:bg-white/10 text-zinc-300'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* STEP 5: Android System Settings Toggle */}
          <div className="glass-card rounded-2xl p-5 flex items-center justify-between gap-4">
            <div>
              <label className="text-xs font-bold text-white flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff]" />
                Show Android DPI Recommendation
              </label>
              <p className="text-[11px] text-zinc-400 mt-0.5">
                Smallest width (Ancho mínimo) &amp; Pointer Speed suggestions
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={includeDpi}
              onClick={() => setIncludeDpi(!includeDpi)}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                includeDpi ? 'bg-[#ff6a00]' : 'bg-white/15'
              }`}
            >
              <span
                aria-hidden="true"
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  includeDpi ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Tactical Tips Card for Playstyle */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-[#161622] to-[#0f0f18] border border-white/10 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#ffb020]">
              <Lightbulb className="w-4 h-4 text-[#ff6a00]" />
              <span>Headshot Tips for {activePlaystyleMeta.label}</span>
            </div>
            <ul className="space-y-2 text-xs text-zinc-300">
              {tips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-[#ff6a00]/20 text-[#ff6a00] text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: Sticky Live Result & Aim Simulator (5 cols) */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
          <ResultCard
            title={`${activePlaystyleMeta.label}`}
            subtitle={deviceLabel}
            badge="0–200 Scale"
            values={finalValues}
            deviceOrLabel={deviceLabel}
          />

          {/* Esports Reticle Drag Simulator */}
          <CrosshairPreview
            playstyle={playstyle}
            values={finalValues}
          />
        </div>
      </div>

      {/* Full Device Drawer Modal */}
      <DeviceSelectorModal
        isOpen={isDeviceModalOpen}
        onClose={() => setIsDeviceModalOpen(false)}
        selectedDeviceId={deviceId}
        onSelectDevice={(id) => {
          setDeviceId(id);
          setIsDeviceModalOpen(false);
        }}
      />
    </div>
  );
}
