/**
 * Contract: Canvas Social Card Renderer
 * Module: my-app/lib/card.ts
 */

import { SensValues } from '../data-model';

export interface CardRenderOptions {
  title: string;
  subtitle: string;
  badge?: string;
  values: SensValues;
  disclaimer?: string;
}

export interface CardRendererContract {
  /**
   * Renders a 1080x1350 PNG image onto an offscreen canvas and returns a Blob.
   */
  renderCardToBlob(options: CardRenderOptions): Promise<Blob>;

  /**
   * Triggers a browser download of the rendered card image as a PNG file.
   */
  downloadCardImage(options: CardRenderOptions, filename?: string): Promise<void>;
}
