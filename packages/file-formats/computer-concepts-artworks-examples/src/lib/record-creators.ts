import {
  ArtworksFile,
  ArtworksLineCapStyle,
  ArtworksMarkerStyle,
  ArtworksRecord,
  createArtworksHeader,
  createArtworks as createArtworksWithHeader,
  createCapEndTriangle,
  createCapStartTriangle,
  createRecordLineCapEnd,
  createRecordLineCapStart,
  createRecordMarkerEnd,
  createRecordMarkerStart,
  List,
} from '@rbrown/computer-concepts-artworks';

export {
  createList,
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
} from '@rbrown/computer-concepts-artworks';

// This file originally contained all the record creation code
// that code was moved into the main library and this has now been pretty hollowed out
// I'm still deciding if the attribute construction should live here or in the library
// (so the ...ArtworksRecord[] stuff) because the library now encodes a bunch of assumptions
// we make with object creation in the examples.

export function createArtworks(...lists: List[]): ArtworksFile {
  return createArtworksWithHeader(createArtworksHeader({}), lists);
}

export function createRecordLineCapEndRelativeToStrokeWidth(
  capStyle: ArtworksLineCapStyle,
  triangleWidth = 0,
  triangleHeight = 0,
): ArtworksRecord {
  return createRecordLineCapEnd(
    capStyle,
    createCapEndTriangle(
      (0x80 * triangleWidth) >>> 0,
      (0x80 * triangleHeight) >> 0,
    ),
  );
}

export function createRecordLineCapStartRelativeToStrokeWidth(
  capStyle: ArtworksLineCapStyle,
  triangleWidth = 0,
  triangleHeight = 0,
): ArtworksRecord {
  return createRecordLineCapStart(
    capStyle,
    createCapStartTriangle(
      (0x80 * triangleWidth) >>> 0,
      (0x80 * triangleHeight) >> 0,
    ),
  );
}

export function createRecordMarkerStartRelativeToStrokeWidth(
  markerStyle: ArtworksMarkerStyle,
  width = 0,
  height = 0,
): ArtworksRecord {
  return createRecordMarkerStart(
    markerStyle,
    (0x10000 * width) >>> 0,
    (0x10000 * height) >>> 0,
  );
}

export function createRecordMarkerEndRelativeToStrokeWidth(
  markerStyle: ArtworksMarkerStyle,
  width = 0,
  height = 0,
): ArtworksRecord {
  return createRecordMarkerEnd(
    markerStyle,
    (0x10000 * width) >>> 0,
    (0x10000 * height) >>> 0,
  );
}
