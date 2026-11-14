import {
  createPalette,
  createRgbPaletteEntry,
} from '@rbrown/computer-concepts-artworks';

export const DEFAULT_PALETTE = createPalette([
  createRgbPaletteEntry('Black', 0x20000000),
  createRgbPaletteEntry('90% Black', 0x20191919),
  createRgbPaletteEntry('80% Black', 0x20333333),
  createRgbPaletteEntry('70% Black', 0x204c4c4c),
  createRgbPaletteEntry('60% Black', 0x20666666),
  createRgbPaletteEntry('50% Black', 0x20808080),
  createRgbPaletteEntry('40% Black', 0x20999999),
  createRgbPaletteEntry('30% Black', 0x20b3b3b3),
  createRgbPaletteEntry('20% Black', 0x20cccccc),
  createRgbPaletteEntry('10% Black', 0x20e6e6e6),
  createRgbPaletteEntry('White', 0x20ffffff),
  createRgbPaletteEntry('Red', 0x200000ff),
  createRgbPaletteEntry('Green', 0x2000ff00),
  createRgbPaletteEntry('Blue', 0x20ff0000),
  createRgbPaletteEntry('Cyan', 0x20ffff00),
  createRgbPaletteEntry('Magenta', 0x20ff00ff),
  createRgbPaletteEntry('Yellow', 0x2000ffff),
]);

export const PALETTE_INDEX_TRANSPARENT = -1;
export const DEFAULT_PALETTE_INDEX_BLACK = 0;
export const DEFAULT_PALETTE_INDEX_BLACK_90_PERCENT = 1;
export const DEFAULT_PALETTE_INDEX_BLACK_80_PERCENT = 2;
export const DEFAULT_PALETTE_INDEX_BLACK_70_PERCENT = 3;
export const DEFAULT_PALETTE_INDEX_BLACK_60_PERCENT = 4;
export const DEFAULT_PALETTE_INDEX_BLACK_50_PERCENT = 5;
export const DEFAULT_PALETTE_INDEX_BLACK_40_PERCENT = 6;
export const DEFAULT_PALETTE_INDEX_BLACK_30_PERCENT = 7;
export const DEFAULT_PALETTE_INDEX_BLACK_20_PERCENT = 8;
export const DEFAULT_PALETTE_INDEX_BLACK_10_PERCENT = 9;
export const DEFAULT_PALETTE_INDEX_WHITE = 10;
export const DEFAULT_PALETTE_INDEX_RED = 11;
export const DEFAULT_PALETTE_INDEX_GREEN = 12;
export const DEFAULT_PALETTE_INDEX_BLUE = 13;
export const DEFAULT_PALETTE_INDEX_CYAN = 14;
export const DEFAULT_PALETTE_INDEX_MAGENTA = 15;
export const DEFAULT_PALETTE_INDEX_YELLOW = 16;
