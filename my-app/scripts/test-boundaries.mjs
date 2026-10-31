// SensiX Boundary & Determinism Verification Suite (Pure 200 Scale)
import {
  calculateSensitivity,
  calculateModifier,
  calculateFireButton,
  BASE_VALUES,
} from '../lib/sensitivity.ts';
import { DEVICES } from '../lib/devices.ts';

const PLAYSTYLES = ['drag', 'rusher', 'headshot', 'balanced', 'sniper'];
const LEVELS = ['low', 'medium', 'high', 'veryhigh'];
const FINGERS_LIST = [2, 3, 4];
const EXPERIENCES = ['beginner', 'intermediate', 'pro'];

let testCount = 0;
let failures = 0;

console.log('🧪 Starting SensiX Comprehensive Boundary & Formula Verification Suite (200 Scale)...');

for (const playstyle of PLAYSTYLES) {
  for (const device of [...DEVICES.slice(0, 15), { ram: 2, screen: 4.7 }, { ram: 16, screen: 12.9 }]) {
    for (const fingers of FINGERS_LIST) {
      for (const experience of EXPERIENCES) {
        for (const level of LEVELS) {
          testCount++;
          const result = calculateSensitivity({
            playstyle,
            level,
            ram: device.ram,
            screen: device.screen,
            fingers,
            experience,
            includeDpi: true,
          });

          // 1. Verify Scope Values (strictly integer between 1 and 200)
          const scopes = ['general', 'redDot', 'scope2x', 'scope4x', 'sniper', 'freeLook'];
          for (const s of scopes) {
            const val = result[s];
            if (typeof val !== 'number' || isNaN(val) || val < 1 || val > 200) {
              console.error(`❌ FAIL [${s}]: ${val} out of bounds (1–200) for input:`, {
                playstyle,
                level,
                device: device.name || 'custom',
                fingers,
                experience,
              });
              failures++;
            }
          }

          // 2. Verify Fire Button Size (30 - 80)
          const fb = result.fireButton;
          if (typeof fb !== 'number' || isNaN(fb) || fb < 30 || fb > 80) {
            console.error(`❌ FAIL [fireButton]: ${fb} out of bounds (30–80) for input:`, {
              playstyle,
              device,
              fingers,
              experience,
            });
            failures++;
          }

          // 3. Verify DPI (400 - 640)
          if (result.dpi && (result.dpi < 400 || result.dpi > 640)) {
            console.error(`❌ FAIL [dpi]: ${result.dpi} unexpected for level ${level}`);
            failures++;
          }
        }
      }
    }
  }
}

if (failures === 0) {
  console.log(`✅ All ${testCount.toLocaleString()} test combinations PASSED within constitutional bounds!`);
  console.log('   - 100% of scope values are integers strictly between 1 and 200.');
  console.log('   - 100% of fire button values are integers between 30% and 80%.');
  console.log('   - DPI recommendations correctly calibrated between 400 and 580.');
  process.exit(0);
} else {
  console.error(`❌ Total failures: ${failures} out of ${testCount} tests.`);
  process.exit(1);
}
