// SensiX Text & Share Formatting Helpers

import { SensValues } from './sensitivity';

export function toText(title: string, values: SensValues, deviceOrLabel?: string): string {
  const header = `🔥 ${title.toUpperCase()} — FREE FIRE SENSITIVITY 🔥`;
  const sub = deviceOrLabel ? `📱 Setup: ${deviceOrLabel}\n` : '';
  const dpiText = values.dpi ? `📐 DPI: ${values.dpi}\n` : '';

  const sys = values.systemTuning
    ? `\n⚙️ ANDROID SYSTEM TUNING:
📐 Recommended DPI: ${values.systemTuning.recommendedDpi} (Ancho mínimo)
⚡ Pointer Speed: ${values.systemTuning.pointerSpeed}
⏱️ Touch Delay: ${values.systemTuning.touchDelay}
📍 Fire Button: ${values.systemTuning.fireButtonPlacement}\n`
    : '';

  return `${header}
${sub}
🎯 General: ${values.general}
🔴 Red Dot: ${values.redDot}
🔭 2x Scope: ${values.scope2x}
🔭 4x Scope: ${values.scope4x}
🎯 Sniper Scope: ${values.sniper}
👀 Free Look: ${values.freeLook}
🔘 Fire Button Size: ${values.fireButton}%
${dpiText}${sys}
Made with SensiX
Recommended starting baseline for Ranked & CS Mode.`;
}

export const toShareText = toText;

export function slug(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}
