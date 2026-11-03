/**
 * RISC OS sprite coordinate space conversions.
 *
 * This module exists because RISC OS does not operate purely in pixels.
 * Sprite dimensions are defined in pixel space, but are rendered and
 * positioned in OS units, where:
 *
 *   180 OS units = 1 inch
 *
 * DPI is derived from the sprite mode's eigen factors, and therefore
 * pixel dimensions must be converted through a physical interpretation:
 *
 *   pixels → inches (via DPI)
 *   inches → OS units (× 180)
 *
 * This is intentionally modelled as a physical unit conversion rather
 * than a pure bitwise or integer scaling, because the underlying system
 * mixes hardware-era rendering assumptions with physical display scaling.
 *
 * Keeping this logic isolated avoids scattering DPI/eigen/OS-unit
 * conversions throughout rendering and layout code.
 */

import { Sprite } from '../sprite-types.js';

export function spriteOsUnitWidth(sprite: Sprite): number {
  return (180 * sprite.layout.image.pixelWidth) / sprite.format.xDpi;
}

export function spriteOsUnitHeight(sprite: Sprite): number {
  return (180 * sprite.layout.image.pixelHeight) / sprite.format.yDpi;
}
