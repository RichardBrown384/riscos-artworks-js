import { BinaryReader, BinaryWriter } from '@rbrown/io';

import { Palette, PaletteEntry } from '../types/index.js';

const DEFAULT_FLAG_BITS = 0x24; // Not sure why these are often set, maybe UI options

const COLOUR_MODEL = {
  RGB: 0,
  CMYK: 1,
  HSV: 2,
} as const;

function readPaletteEntry(reader: BinaryReader): PaletteEntry {
  reader.aligned(4, 'misaligned palette entry');
  return {
    name: reader.string(24),
    colour: reader.u32(),
    component0: reader.u32(),
    component1: reader.u32(),
    component2: reader.u32(),
    component3: reader.u32(),
    flags: reader.u32(),
  };
}

function writePaletteEntry(writer: BinaryWriter, entry: PaletteEntry): void {
  writer.aligned(4, 'misaligned palette entry');
  writer.paddedCString(entry.name, 24);
  writer.u32(entry.colour);
  writer.u32(entry.component0);
  writer.u32(entry.component1);
  writer.u32(entry.component2);
  writer.u32(entry.component3);
  writer.u32(entry.flags);
}

export function createRgbPaletteEntry(
  name: string,
  colour: number,
): PaletteEntry {
  function scale(v: number): number {
    const factor = (v & 0xff) / 255.0;
    return Math.floor(factor * 0x7fff_ffff);
  }

  return {
    name,
    colour,
    component0: scale(colour >>> 0),
    component1: scale(colour >>> 8),
    component2: scale(colour >>> 16),
    component3: 0,
    flags: DEFAULT_FLAG_BITS + COLOUR_MODEL.RGB,
  };
}

export function readPalette(reader: BinaryReader): Palette {
  reader.aligned(4, 'misaligned palette');
  const count = reader.u32();
  const unknown4 = reader.u32();
  const entries = [];
  for (let n = 0; n < count; n += 1) {
    entries.push(readPaletteEntry(reader));
  }
  return {
    count: count & 0xffffff,
    unknown4: unknown4 & 0xffffff,
    entries,
  } satisfies Palette;
}

export function writePalette(writer: BinaryWriter, palette: Palette): void {
  writer.aligned(4, 'misaligned palette');
  const { count, unknown4, entries } = palette;
  writer.u32(count);
  writer.u32(unknown4);
  for (let i = 0; i < entries.length; i += 1) {
    writePaletteEntry(writer, entries[i]);
  }
}

export function createPalette(...entries: PaletteEntry[]): Palette {
  return {
    count: entries.length,
    unknown4: entries.length,
    entries,
  };
}
