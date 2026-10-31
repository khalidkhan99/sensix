// SensiX LocalStorage Profile Manager

import { SensValues } from './sensitivity';

export interface SavedProfile {
  id: string;
  name: string;
  createdAt: string;
  label: string;
  values: SensValues;
}

export const STORAGE_KEY = 'sensix:profiles:v1';
export const MAX_PROFILES = 100;

export function uid(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return 'sensix-' + Math.random().toString(36).substring(2, 9) + '-' + Date.now();
}

function isValidSensValues(v: unknown): v is SensValues {
  if (!v || typeof v !== 'object') return false;
  const val = v as Record<string, unknown>;
  const keys: Array<keyof SensValues> = [
    'general',
    'redDot',
    'scope2x',
    'scope4x',
    'sniper',
    'freeLook',
    'fireButton',
  ];

  return keys.every(
    (k) => typeof val[k] === 'number' && !isNaN(val[k] as number)
  );
}

function isValidProfile(p: unknown): p is SavedProfile {
  if (!p || typeof p !== 'object') return false;
  const prof = p as Record<string, unknown>;
  return (
    typeof prof.id === 'string' &&
    typeof prof.name === 'string' &&
    typeof prof.createdAt === 'string' &&
    typeof prof.label === 'string' &&
    isValidSensValues(prof.values)
  );
}

export function loadProfiles(): SavedProfile[] {
  if (typeof window === 'undefined') return [];

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed.filter(isValidProfile);
  } catch (err) {
    console.warn('[SensiX Storage] Failed to load profiles:', err);
    return [];
  }
}

export function saveProfile(
  name: string,
  label: string,
  values: SensValues
): SavedProfile {
  const current = loadProfiles();
  const newProfile: SavedProfile = {
    id: uid(),
    name: name.trim() || 'Custom Profile',
    createdAt: new Date().toISOString(),
    label,
    values,
  };

  const updated = [newProfile, ...current].slice(0, MAX_PROFILES);

  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }

  return newProfile;
}

export function deleteProfile(id: string): SavedProfile[] {
  const current = loadProfiles();
  const updated = current.filter((p) => p.id !== id);

  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }

  return updated;
}

export function exportProfilesJson(): string {
  const profiles = loadProfiles();
  return JSON.stringify(
    {
      app: 'SensiX',
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      profiles,
    },
    null,
    2
  );
}

export function importProfilesJson(jsonStr: string): {
  success: boolean;
  imported: number;
  skipped: number;
  total: number;
  error?: string;
} {
  try {
    const parsed = JSON.parse(jsonStr);
    const candidateList = Array.isArray(parsed)
      ? parsed
      : Array.isArray(parsed.profiles)
      ? parsed.profiles
      : null;

    if (!candidateList) {
      return { success: false, imported: 0, skipped: 0, total: 0, error: 'Invalid backup file structure' };
    }

    const current = loadProfiles();
    const existingIds = new Set(current.map((p) => p.id));
    let importedCount = 0;
    let skippedCount = 0;
    const toAdd: SavedProfile[] = [];

    for (const item of candidateList) {
      if (isValidProfile(item)) {
        if (!existingIds.has(item.id)) {
          toAdd.push(item);
          existingIds.add(item.id);
          importedCount++;
        } else {
          skippedCount++;
        }
      }
    }

    const combined = [...toAdd, ...current].slice(0, MAX_PROFILES);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(combined));
    }

    return {
      success: true,
      imported: importedCount,
      skipped: skippedCount,
      total: combined.length,
    };
  } catch {
    return { success: false, imported: 0, skipped: 0, total: 0, error: 'Could not parse JSON file' };
  }
}
