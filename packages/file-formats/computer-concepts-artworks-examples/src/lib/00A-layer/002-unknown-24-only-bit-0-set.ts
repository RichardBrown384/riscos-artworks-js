/*
Example: 002-unknown-24-only-bit-0-set

Purpose:
To demonstrate that if only set bit 0 of unknown 24 then the layer isn't drawn.
*/

import {
  ARTWORKS_RECORD_BODY_LAYER_UNKNOWN_24_BIT_0,
  createList,
  createRecordLayerFull,
} from '@rbrown/computer-concepts-artworks';

import { createArtworks } from '../record-creators.js';
import { FILL_FLAT_RED, PATH_TRIANGLE, WORK_AREA } from '../shared-objects.js';

const LAYER = createRecordLayerFull(
  ARTWORKS_RECORD_BODY_LAYER_UNKNOWN_24_BIT_0,
  'Foreground',
);

export default createArtworks(
  createList(FILL_FLAT_RED),
  createList(LAYER, PATH_TRIANGLE),
  createList(WORK_AREA),
);
