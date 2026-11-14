/*
Example: 004-fill-flat-red-fill-unknown-4-bit-0-clear

Purpose:
To demonstrate that if bit 0 of unknown4 is clear then the fill doesn't get applied
and as there is no fill specified !AWViewer crashes when it tries to render geometry.
 */

import {
  createList,
  createRecordFillColourFlatFull,
} from '@rbrown/computer-concepts-artworks';

import { DEFAULT_PALETTE_INDEX_RED } from '../default-palette.js';
import { createArtworks } from '../record-creators.js';
import {
  LAYER_FOREGROUND,
  PATH_TRIANGLE,
  WORK_AREA,
} from '../shared-objects.js';

const FILL = createRecordFillColourFlatFull(0, DEFAULT_PALETTE_INDEX_RED);

export default createArtworks(
  createList(FILL),
  createList(LAYER_FOREGROUND, PATH_TRIANGLE),
  createList(WORK_AREA),
);
