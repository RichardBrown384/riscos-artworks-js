/*
Example: 001-smallest-file

Purpose:
To demonstrate the smallest file that will render something in !AWViewer
 */

import { createList } from '@rbrown/computer-concepts-artworks';

import { createArtworks } from '../record-creators.js';
import { FILL_FLAT_RED, PATH_TRIANGLE, WORK_AREA } from '../shared-objects.js';

export default createArtworks(
  createList(FILL_FLAT_RED),
  createList(PATH_TRIANGLE),
  createList(WORK_AREA),
);
