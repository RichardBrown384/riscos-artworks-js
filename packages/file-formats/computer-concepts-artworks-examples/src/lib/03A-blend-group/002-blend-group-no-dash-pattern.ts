/*
Example: 002-blend-group-no-dash-pattern.js

Purpose:

To demonstrate the smallest possible blend group without a dash pattern crashes
!AWViewer

*/

import { createList } from '@rbrown/computer-concepts-artworks';

import { createClosedSquare } from '../path-creators.js';
import { createArtworks } from '../record-creators.js';
import {
  FILL_FLAT_BLUE,
  FILL_FLAT_RED,
  STROKE_COLOUR_TRANSPARENT,
  WINDING_RULE_EVEN_ODD,
  WORK_AREA,
} from '../shared-objects.js';
import { createSimpleAttributeBlendGroup } from '../simple-blend-group.js';

const GROUP_0 = createSimpleAttributeBlendGroup(
  createClosedSquare(100_000, 100_000, 100_000),
  FILL_FLAT_BLUE,
  createClosedSquare(1_000_000, 100_000, 50_000),
  FILL_FLAT_RED,
  6,
);

export default createArtworks(
  createList(WINDING_RULE_EVEN_ODD),
  createList(STROKE_COLOUR_TRANSPARENT),
  GROUP_0,
  createList(WORK_AREA),
);
