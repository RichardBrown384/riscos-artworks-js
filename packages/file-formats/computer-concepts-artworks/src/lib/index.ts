import { BinaryReader, BinaryWriter } from '@rbrown/io';

import { ArtworksReader, ArtworksWriter } from './serialisation/index.js';
import {
  isArtworksHeaderValid,
  readArtworksHeader,
} from './structures/index.js';
import { ArtworksFile } from './types/index.js';

// Normalisation
export { denormalise, normalise } from './normalisation/index.js';

// Primitives
export {
  createPalette,
  createRgbPaletteEntry,
  createPath,
  pathMoveTo,
  pathLineTo,
  pathBezierTo,
  pathCloseSubPath,
  pathEnd,
  pathBoundingBox, // exported because of the example's simple blend groups
  createPolyline,
  polylinePoint,
} from './primitives/index.js';

// Records
export {
  createRecordPath,
  createRecordPathFull,
  createRecordGroup,
  createRecordGroupFull,
  createRecordLayer,
  createRecordLayerFull,
  createRecordWorkArea,
  createRecordStrokeColour,
  createRecordStrokeWidth,
  createRecordFillColourFlat,
  createRecordFillColourFlatFull,
  createRecordFillColourGradient,
  createRecordJoinStyle,
  createCapEndTriangle,
  createRecordLineCapEnd,
  createCapStartTriangle,
  createRecordLineCapStart,
  createRecordWindingRule,
  createRecordDashPatternEmpty,
  createRecordDashPattern,
  createRecordRectangle,
  createRecordEllipse,
  createRecordRoundedRectangle,
  createRecordBlendGroup,
  createRecordBlendGroupOptions,
  createRecordBlendPath,
  createRecordMarkerStart,
  createRecordMarkerEnd,
} from './records/index.js';

// Structures
export {
  createArtworksHeader,
  createArtworks,
  createList,
} from './structures/index.js';

// Types
export * from './types/artworks-types.js';

function artworksIsHeaderPresent(buffer: ArrayBuffer): boolean {
  const reader = new BinaryReader(buffer);
  const header = readArtworksHeader(reader);
  return isArtworksHeaderValid(header);
}

export function artworksFromArrayBuffer(
  buffer: ArrayBuffer,
): ArtworksFile | undefined {
  if (!artworksIsHeaderPresent(buffer)) {
    return undefined;
  }
  const reader = new BinaryReader(buffer);
  const artworksReader = new ArtworksReader(reader);
  return artworksReader.read();
}

const FOUR_MEGABYTES = 4 * 1024 * 1024;

export function artworksToArrayBuffer(
  artworks: ArtworksFile,
  limit = FOUR_MEGABYTES,
): Uint8Array<ArrayBuffer> {
  const writer = new BinaryWriter(limit);
  const artworksWriter = new ArtworksWriter(writer, artworks);
  return artworksWriter.write();
}
