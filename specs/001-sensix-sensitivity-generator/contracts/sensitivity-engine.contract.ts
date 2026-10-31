/**
 * Contract: Sensitivity Engine API
 * Module: my-app/lib/sensitivity.ts
 */

import { Playstyle, Fingers, Experience, SensValues } from '../data-model';

export interface SensitivityCalculationInput {
  playstyle: Playstyle;
  ram: number;
  screen: number;
  fingers: Fingers;
  experience: Experience;
  dpi?: number;
}

export interface SensitivityEngineContract {
  /**
   * Computes the full set of sensitivity values and suggested fire button size.
   * All outputs must be clamped integers within their constitutional bounds.
   */
  calculateSensitivities(input: SensitivityCalculationInput): SensValues;

  /**
   * Computes the total hardware/playstyle additive modifier.
   */
  calculateModifier(input: {
    ram: number;
    screen: number;
    fingers: Fingers;
    experience: Experience;
    dpi?: number;
  }): number;

  /**
   * Computes suggested fire button size percentage (30-80).
   */
  calculateFireButton(base: number, screen: number, fingers: Fingers): number;
}
