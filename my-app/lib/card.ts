// SensiX High-Resolution 1080x1350 Share Card Generator (HTML5 Canvas)

import { SensValues, SENS_FIELDS } from './sensitivity';

export interface CardOptions {
  title: string;
  subtitle: string;
  badge?: string;
  values: SensValues;
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

export async function renderCard(options: CardOptions): Promise<Blob> {
  const canvas = document.createElement('canvas');
  canvas.width = 1080;
  canvas.height = 1350;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Canvas 2D context not supported');
  }

  // 1. Background Fill (Dark Gaming Ink Palette)
  const bgGrad = ctx.createLinearGradient(0, 0, 1080, 1350);
  bgGrad.addColorStop(0, '#0f0f18');
  bgGrad.addColorStop(0.5, '#07070b');
  bgGrad.addColorStop(1, '#050508');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1080, 1350);

  // 2. Ambient Radial Glows (Orange to Amber)
  const glow1 = ctx.createRadialGradient(200, 150, 20, 200, 150, 480);
  glow1.addColorStop(0, 'rgba(255, 106, 0, 0.22)');
  glow1.addColorStop(1, 'transparent');
  ctx.fillStyle = glow1;
  ctx.fillRect(0, 0, 1080, 1350);

  const glow2 = ctx.createRadialGradient(880, 1150, 20, 880, 1150, 450);
  glow2.addColorStop(0, 'rgba(255, 176, 32, 0.16)');
  glow2.addColorStop(1, 'transparent');
  ctx.fillStyle = glow2;
  ctx.fillRect(0, 0, 1080, 1350);

  // 3. Decorative Frame Border
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.lineWidth = 4;
  roundRect(ctx, 40, 40, 1000, 1270, 40);
  ctx.stroke();

  // 4. Header Badge
  if (options.badge) {
    ctx.fillStyle = 'rgba(255, 106, 0, 0.15)';
    roundRect(ctx, 80, 90, 280, 44, 12);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 106, 0, 0.4)';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = '#ffb020';
    ctx.font = 'bold 20px system-ui, sans-serif';
    ctx.fillText(options.badge.toUpperCase(), 100, 120);
  }

  // Brand Watermark Top Right
  ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
  ctx.font = 'bold 22px system-ui, sans-serif';
  ctx.textAlign = 'right';
  ctx.fillText('SensiX Lab · Free Fire (200 Scale)', 1000, 120);
  ctx.textAlign = 'left';

  // 5. Title & Subtitle
  ctx.fillStyle = '#ffffff';
  ctx.font = '800 52px system-ui, sans-serif';
  ctx.fillText(options.title, 80, 210);

  ctx.fillStyle = 'rgba(244, 244, 247, 0.65)';
  ctx.font = '26px system-ui, sans-serif';
  ctx.fillText(options.subtitle, 80, 260);

  // Divider Line
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(80, 300);
  ctx.lineTo(1000, 300);
  ctx.stroke();

  // 6. Six Scope Sensitivity Bars (200 Scale)
  let startY = 360;
  const barWidth = 920;

  for (const field of SENS_FIELDS) {
    const val = options.values[field.key];
    const percentage = Math.min(Math.max(val, 0), 200) / 200;

    // Field Label
    ctx.fillStyle = '#ffffff';
    ctx.font = '600 28px system-ui, sans-serif';
    ctx.fillText(field.label, 80, startY);

    // Value Badge
    ctx.fillStyle = '#ffb020';
    ctx.font = '800 32px monospace, sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(`${val}/200`, 1000, startY);
    ctx.textAlign = 'left';

    // Bar Track
    const trackY = startY + 16;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
    roundRect(ctx, 80, trackY, barWidth, 20, 10);
    ctx.fill();

    // Bar Fill
    const fillWidth = Math.max(barWidth * percentage, 16);
    const barGrad = ctx.createLinearGradient(80, 0, 80 + fillWidth, 0);
    barGrad.addColorStop(0, '#ff3b00');
    barGrad.addColorStop(0.5, '#ff6a00');
    barGrad.addColorStop(1, '#ffb020');
    ctx.fillStyle = barGrad;
    roundRect(ctx, 80, trackY, fillWidth, 20, 10);
    ctx.fill();

    startY += 90;
  }

  // 7. Fire Button & DPI Row Card
  const fbCardY = 920;
  ctx.fillStyle = 'rgba(255, 106, 0, 0.08)';
  roundRect(ctx, 80, fbCardY, 920, 170, 24);
  ctx.fill();
  ctx.strokeStyle = 'rgba(255, 106, 0, 0.3)';
  ctx.lineWidth = 3;
  ctx.stroke();

  // Fire Button Section
  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.font = 'bold 22px system-ui, sans-serif';
  ctx.fillText('FIRE BUTTON SIZE', 120, fbCardY + 50);

  ctx.fillStyle = '#ffb020';
  ctx.font = '800 56px monospace, sans-serif';
  ctx.fillText(`${options.values.fireButton}%`, 120, fbCardY + 120);

  // DPI / System Section
  const dpiVal = options.values.dpi || options.values.systemTuning?.recommendedDpi;
  if (dpiVal) {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.font = 'bold 22px system-ui, sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText('RECOMMENDED DPI', 960, fbCardY + 50);

    ctx.fillStyle = '#00e5ff';
    ctx.font = '800 56px monospace, sans-serif';
    ctx.fillText(`${dpiVal}`, 960, fbCardY + 120);
    ctx.textAlign = 'left';
  }

  // 8. Footer Legal & Credit
  ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
  ctx.font = '20px system-ui, sans-serif';
  ctx.fillText('⚡ Fan-made analytical utility. Not affiliated with Garena or Free Fire.', 80, 1220);
  ctx.fillText('Made with SensiX Lab · Modern OB47 200 Sensitivity Baseline', 80, 1255);

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error('Failed to create PNG blob from canvas'));
    }, 'image/png');
  });
}

export const renderCardToBlob = renderCard;

export async function downloadCardImage(options: CardOptions, filename = 'sensix-settings.png') {
  const blob = await renderCard(options);
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
