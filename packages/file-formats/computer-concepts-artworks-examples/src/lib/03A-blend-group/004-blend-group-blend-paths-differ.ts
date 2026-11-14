/*
Example: 004-blend-group-blend-paths-differ

Purpose:

To demonstrate that !AWViewer uses the blend paths to interpolate and not
the start and end paths.

!AWViewer draws start and end rectangles and intermediate triangles.

*/

import { createList } from '@rbrown/computer-concepts-artworks';

import {
  createClosedEquilateralTriangle,
  createClosedSquare,
} from '../path-creators.js';
import { createArtworks } from '../record-creators.js';
import {
  DASH_PATTERN_EMPTY,
  FILL_FLAT_BLUE,
  FILL_FLAT_RED,
  STROKE_COLOUR_TRANSPARENT,
  WINDING_RULE_EVEN_ODD,
  WORK_AREA,
} from '../shared-objects.js';
import { createSimpleBlendGroup } from '../simple-blend-group.js';

const GROUP_0 = createSimpleBlendGroup({
  startPath: createClosedSquare(100_000, 100_000, 100_000),
  startBlendPath: createClosedEquilateralTriangle(100_000, 100_000, 111_803),
  startAttributeRecord: FILL_FLAT_BLUE,
  endPath: createClosedSquare(1_000_000, 100_000, 100_000),
  endBlendPath: createClosedEquilateralTriangle(1_000_000, 100_000, 111_803),
  endAttributeRecord: FILL_FLAT_RED,
  blendSteps: 6,
});

export default createArtworks(
  createList(WINDING_RULE_EVEN_ODD),
  createList(DASH_PATTERN_EMPTY),
  createList(STROKE_COLOUR_TRANSPARENT),
  GROUP_0,
  createList(WORK_AREA),
);
