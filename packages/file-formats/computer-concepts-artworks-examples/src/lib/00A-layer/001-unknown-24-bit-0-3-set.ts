/*
Example: 001-unknown-24-bit-0-3-set

Purpose:
To demonstrate that if you set both bits 0 and 3 of unknown 24 then the layer is drawn.
 */

import { FILL_FLAT_RED, PATH_TRIANGLE, WORK_AREA } from '../shared-objects.js';
import {
  createArtworks,
  createList,
  createRecordLayer,
} from '../record-creators.js';

const LAYER = createRecordLayer('Foreground');

export default createArtworks(
  createList(FILL_FLAT_RED),
  createList(LAYER, PATH_TRIANGLE),
  createList(WORK_AREA),
);
