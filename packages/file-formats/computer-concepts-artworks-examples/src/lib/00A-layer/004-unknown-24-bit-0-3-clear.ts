/*
Example: 004-unknown-24-bit-0-3-clear

Purpose:
To demonstrate that both bits 0 and 3 of unknown 24 are clear then the layer isn't drawn.
*/

import {
  createList,
  createRecordLayerFull,
} from '@rbrown/computer-concepts-artworks';

import { createArtworks } from '../record-creators.js';
import { FILL_FLAT_RED, PATH_TRIANGLE, WORK_AREA } from '../shared-objects.js';

const LAYER = createRecordLayerFull(0, 'Foreground');

export default createArtworks(
  createList(FILL_FLAT_RED),
  createList(LAYER, PATH_TRIANGLE),
  createList(WORK_AREA),
);
