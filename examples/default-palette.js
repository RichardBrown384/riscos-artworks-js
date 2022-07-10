const {
  Palette,
  PaletteEntry,
} = require('../src/artworks').Builders;

module.exports.DEFAULT_PALETTE = Palette.builder()
  .entry(PaletteEntry.of('Black', 0x20000000))
  .entry(PaletteEntry.of('90% Black', 0x20191919))
  .entry(PaletteEntry.of('80% Black', 0x20333333))
  .entry(PaletteEntry.of('70% Black', 0x204C4C4C))
  .entry(PaletteEntry.of('60% Black', 0x20666666))
  .entry(PaletteEntry.of('50% Black', 0x20808080))
  .entry(PaletteEntry.of('40% Black', 0x20999999))
  .entry(PaletteEntry.of('30% Black', 0x20B3B3B3))
  .entry(PaletteEntry.of('20% Black', 0x20CCCCCC))
  .entry(PaletteEntry.of('10% Black', 0x20E6E6E6))
  .entry(PaletteEntry.of('White', 0x20FFFFFF))
  .entry(PaletteEntry.of('Red', 0x200000FF))
  .entry(PaletteEntry.of('Green', 0x2000FF00))
  .entry(PaletteEntry.of('Blue', 0x20FF0000))
  .entry(PaletteEntry.of('Cyan', 0x20FFFF00))
  .entry(PaletteEntry.of('Magenta', 0x20FF00FF))
  .entry(PaletteEntry.of('Yellow', 0x2000FFFF))
  .build();

module.exports.PALETTE_INDEX_TRANSPARENT = -1;
module.exports.DEFAULT_PALETTE_INDEX_BLACK = 0;
module.exports.DEFAULT_PALETTE_INDEX_BLACK_90_PERCENT = 1;
module.exports.DEFAULT_PALETTE_INDEX_BLACK_80_PERCENT = 2;
module.exports.DEFAULT_PALETTE_INDEX_BLACK_70_PERCENT = 3;
module.exports.DEFAULT_PALETTE_INDEX_BLACK_60_PERCENT = 4;
module.exports.DEFAULT_PALETTE_INDEX_BLACK_50_PERCENT = 5;
module.exports.DEFAULT_PALETTE_INDEX_BLACK_40_PERCENT = 6;
module.exports.DEFAULT_PALETTE_INDEX_BLACK_30_PERCENT = 7;
module.exports.DEFAULT_PALETTE_INDEX_BLACK_20_PERCENT = 8;
module.exports.DEFAULT_PALETTE_INDEX_BLACK_10_PERCENT = 9;
module.exports.DEFAULT_PALETTE_INDEX_WHITE = 10;
module.exports.DEFAULT_PALETTE_INDEX_RED = 11;
module.exports.DEFAULT_PALETTE_INDEX_GREEN = 12;
module.exports.DEFAULT_PALETTE_INDEX_BLUE = 13;
module.exports.DEFAULT_PALETTE_INDEX_CYAN = 14;
module.exports.DEFAULT_PALETTE_INDEX_MAGENTA = 15;
module.exports.DEFAULT_PALETTE_INDEX_YELLOW = 16;
