import { BinaryReader, BinaryWriter } from '@rbrown/io';
import { ArtworksColourIndex } from '../types/index.js';

export function createColourIndex(colour: number): ArtworksColourIndex {
  return colour;
}

export function readColourIndex(reader: BinaryReader): ArtworksColourIndex {
  reader.aligned(4, 'misaligned colour index');
  return reader.u32();
}

export function writeColourIndex(
  writer: BinaryWriter,
  colour: ArtworksColourIndex,
) {
  writer.aligned(4, 'misaligned colour index');
  writer.u32(colour);
}
