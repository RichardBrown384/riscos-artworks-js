/*
Example: 003-unknown-24-only-bit-3-set

Purpose:
To demonstrate that if only set bit 3 of unknown 24 then the layer isn't drawn.
 */

import { FILL_FLAT_RED, PATH_TRIANGLE, WORK_AREA } from '../shared-objects.js';
import {
  createArtworks,
  createList,
  createRecordLayerFull,
} from '../record-creators.js';
import { ARTWORKS_RECORD_BODY_LAYER_UNKNOWN_24_BIT_3 } from '@rbrown/computer-concepts-artworks';

const LAYER = createRecordLayerFull(
  ARTWORKS_RECORD_BODY_LAYER_UNKNOWN_24_BIT_3,
  'Foreground',
);

export default createArtworks(
  createList(FILL_FLAT_RED),
  createList(LAYER, PATH_TRIANGLE),
  createList(WORK_AREA),
);
