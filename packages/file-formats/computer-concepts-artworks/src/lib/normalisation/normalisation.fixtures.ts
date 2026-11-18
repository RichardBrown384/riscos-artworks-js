import {
  createPath,
  pathCloseSubPath,
  pathEnd,
  pathMoveTo,
} from '../primitives/index.js';
import {
  createRecordDashPatternEmpty,
  createRecordFillColourFlat,
  createRecordLayer,
  createRecordPath,
  createRecordStrokeColour,
  createRecordStrokeWidth,
} from '../records/index.js';
import {
  createArtworks,
  createArtworksHeader,
  createList,
} from '../structures/index.js';
import { ArtworksFile } from '../types/index.js';

const RED = 0x01_00_00_ff;
const BLUE = 0x01_ff_00_00;
const STROKE_WIDTH = 1000;
const PADDING = 0;

function createPathA() {
  return createPath([pathMoveTo(0, 0), pathCloseSubPath(), pathEnd()]);
}

function createPathB() {
  return createPath([pathMoveTo(10, 10), pathCloseSubPath(), pathEnd()]);
}

export function createNormalisedArtWorksFile(): ArtworksFile {
  return createArtworks(createArtworksHeader({}), [
    createList(createRecordDashPatternEmpty()),
    createList(
      createRecordLayer(
        'Layer',
        createList(
          createRecordPath(
            createPathB(),
            PADDING,
            createRecordStrokeColour(RED),
          ),
          createRecordFillColourFlat(BLUE),
        ),
      ),
      createRecordPath(
        createPathA(),
        PADDING,
        createRecordStrokeColour(BLUE),
        createRecordStrokeWidth(STROKE_WIDTH),
      ),
      createRecordFillColourFlat(RED),
    ),
  ]);
}

export function createDenormalisedArtWorksFile(): ArtworksFile {
  return createArtworks(createArtworksHeader({}), [
    createList(createRecordDashPatternEmpty()),
    createList(
      createRecordLayer(
        'Layer',
        createList(
          createRecordPath(
            createPathA(),
            PADDING,
            createRecordFillColourFlat(RED),
            createRecordStrokeColour(BLUE),
            createRecordStrokeWidth(STROKE_WIDTH),
          ),
        ),
        createList(
          createRecordPath(
            createPathB(),
            PADDING,
            createRecordFillColourFlat(BLUE),
            createRecordStrokeColour(RED),
          ),
        ),
      ),
    ),
  ]);
}
