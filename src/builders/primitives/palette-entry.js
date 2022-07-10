const { createPaletteEntry } = require('../../types/primitives');

class PaletteEntry {
  #name;

  #colour;

  #unknown28;

  #unknown32;

  #unknown36;

  #unknown40;

  #unknown44;

  constructor() {
    this.#name = '';
    this.#colour = 0;
    this.#unknown28 = 0;
    this.#unknown32 = 0;
    this.#unknown36 = 0;
    this.#unknown40 = 0;
    this.#unknown44 = 0;
  }

  static builder() {
    return new PaletteEntry();
  }

  static of(name, colour) {
    return PaletteEntry.builder()
      .name(name)
      .colour(colour)
      .build();
  }

  name(v) { this.#name = v; return this; }

  colour(v) { this.#colour = v; return this; }

  unknown28(v) { this.#unknown28 = v; return this; }

  unknown32(v) { this.#unknown32 = v; return this; }

  unknown36(v) { this.#unknown36 = v; return this; }

  unknown40(v) { this.#unknown40 = v; return this; }

  unknown44(v) { this.#unknown44 = v; return this; }

  build() {
    return createPaletteEntry(
      this.#name,
      this.#colour,
      this.#unknown28,
      this.#unknown32,
      this.#unknown36,
      this.#unknown40,
      this.#unknown44,
    );
  }
}

module.exports = PaletteEntry;
