import { BinaryReader, BinaryWriter } from '@rbrown/io';
import { ArtworksHeader } from '../types/index.js';

export const HEADER_IDENTIFIER = 'Top!';
export const HEADER_VERSION = 9;
export const HEADER_PROGRAM = 'TopDraw';

export const FILE_OFFSET_UNDO_POSITION = 0x28;
export const FILE_OFFSET_SPRITE_AREA_POSITION = 0x2c;
export const FILE_OFFSET_PALETTE_POSITION = 0x3c;
export const FILE_OFFSET_BODY = 0x80;

export function readArtworksHeader(reader: BinaryReader): ArtworksHeader {
  reader.aligned(4, 'misaligned header');
  return {
    identifier: reader.paddedCString(4),
    version: reader.u32(),
    program: reader.paddedCString(8),
    unknown16: reader.u32(),
    bodyPosition: reader.u32(),
    europeanPaperWidth: reader.u32(),
    europeanPaperHeight: reader.u32(),
    unknown32: reader.u32(),
    unknown36: reader.u32(),
    ubufPosition: reader.i32(),
    spriteAreaPosition: reader.i32(),
    unknown48: reader.u32(),
    americanPaperWidth: reader.u32(),
    americanPaperHeight: reader.u32(),
    palettePosition: reader.i32(),
    unknown64: reader.u32(),
    unknown68: reader.u32(),
    unknown72: reader.u32(),
    unknown76: reader.u32(),
    unknown80: reader.u32(),
    unknown84: reader.u32(),
    unknown88: reader.u32(),
  };
}

export function writeArtworksHeader(
  writer: BinaryWriter,
  header: ArtworksHeader,
): void {
  writer.aligned(4, 'misaligned header');
  writer.paddedCString(header.identifier, 4);
  writer.u32(header.version);
  writer.paddedCString(header.program, 8);
  writer.u32(header.unknown16);
  writer.u32(header.bodyPosition);
  writer.u32(header.europeanPaperWidth);
  writer.u32(header.europeanPaperHeight);
  writer.u32(header.unknown32);
  writer.u32(header.unknown36);
  writer.i32(header.ubufPosition);
  writer.i32(header.spriteAreaPosition);
  writer.u32(header.unknown48);
  writer.u32(header.americanPaperWidth);
  writer.u32(header.americanPaperHeight);
  writer.i32(header.palettePosition);
  writer.u32(header.unknown64);
  writer.u32(header.unknown68);
  writer.u32(header.unknown72);
  writer.u32(header.unknown76);
  writer.u32(header.unknown80);
  writer.u32(header.unknown84);
  writer.u32(header.unknown88);
}

export function createArtworksHeader(
  header: Partial<ArtworksHeader>,
): ArtworksHeader {
  return {
    identifier: header.identifier ?? HEADER_IDENTIFIER,
    version: header.version ?? HEADER_VERSION,
    program: header.program ?? HEADER_PROGRAM,
    unknown16: header.unknown16 ?? 0,
    bodyPosition: header.bodyPosition ?? FILE_OFFSET_BODY,
    europeanPaperWidth: header.europeanPaperWidth ?? 0,
    europeanPaperHeight: header.europeanPaperHeight ?? 0,
    unknown32: header.unknown32 ?? 0,
    unknown36: header.unknown36 ?? 0,
    ubufPosition: header.ubufPosition ?? -1,
    spriteAreaPosition: header.spriteAreaPosition ?? -1,
    unknown48: header.unknown48 ?? 0,
    americanPaperWidth: header.americanPaperWidth ?? 0,
    americanPaperHeight: header.americanPaperHeight ?? 0,
    palettePosition: header.palettePosition ?? -1,
    unknown64: header.unknown64 ?? 0,
    unknown68: header.unknown68 ?? 0,
    unknown72: header.unknown72 ?? 0,
    unknown76: header.unknown76 ?? 0,
    unknown80: header.unknown80 ?? 0,
    unknown84: header.unknown84 ?? 0,
    unknown88: header.unknown88 ?? 0,
  };
}

export function isArtworksHeaderValid(header: ArtworksHeader): boolean {
  const { identifier, program } = header;
  return identifier === HEADER_IDENTIFIER && program === HEADER_PROGRAM;
}
