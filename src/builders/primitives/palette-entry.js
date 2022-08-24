const Constants = require('../../constants');

const { createPaletteEntry } = require('../../types/primitives');
const { extractBitField } = require('../../common/bitwise');

const DEFAULT_FLAG_BITS = 0x24; // Not sure why these are often set, maybe UI options

function scale(v) { return Math.floor((v / 255.0) * 0x7FFF_FFFF); }
function red(v) { return extractBitField(v, 0, 8); }
function green(v) { return extractBitField(v, 8, 8); }
function blue(v) { return extractBitField(v, 16, 8); }

class PaletteEntry {
  #name;

  #colour;

  #component0;

  #component1;

  #component2;

  #component3;

  #flags;

  constructor() {
    this.#name = '';
    this.#colour = 0;
    this.#component0 = 0;
    this.#component1 = 0;
    this.#component2 = 0;
    this.#component3 = 0;
    this.#flags = 0;
  }

  static builder() {
    return new PaletteEntry();
  }

  static of(name, colour) {
    return PaletteEntry.builder()
      .name(name)
      .colour(colour)
      .component0(scale(red(colour)))
      .component1(scale(green(colour)))
      .component2(scale(blue(colour)))
      .component3(0)
      .flags(DEFAULT_FLAG_BITS + Constants.COLOUR_MODEL_RGB)
      .build();
  }

  name(v) { this.#name = v; return this; }

  colour(v) { this.#colour = v; return this; }

  component0(v) { this.#component0 = v; return this; }

  component1(v) { this.#component1 = v; return this; }

  component2(v) { this.#component2 = v; return this; }

  component3(v) { this.#component3 = v; return this; }

  flags(v) { this.#flags = v; return this; }

  build() {
    return createPaletteEntry(
      this.#name,
      this.#colour,
      this.#component0,
      this.#component1,
      this.#component2,
      this.#component3,
      this.#flags,
    );
  }
}

module.exports = PaletteEntry;
