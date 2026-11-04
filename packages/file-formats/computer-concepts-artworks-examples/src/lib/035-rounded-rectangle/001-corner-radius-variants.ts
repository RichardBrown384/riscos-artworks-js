/*
Example: 001-corner-radius-variants

Purpose:

To demonstrate the influence (if any) of the corner radius that precedes the path data
in rounded rectangle records upon the rendering.

It looks like the corner radius is used by ArtWorks to define the rounded rectangle but
!AWViewer, at any rate, uses the precomputed path information to render rounded rectangles.

Draws several rounded rectangles shaded from white to black.
The fill's gradient line is superimposed in blue.
The 'triangles' are superimposed in red.

Points to note:

1. When the corner radius is zero, the rectangle isn't rendered.

 */

import { AffineTransform } from '../affine-transform.js';
import { createArtworks, createList } from '../record-creators.js';
import {
  FILL_FLAT_TRANSPARENT,
  STROKE_COLOUR_RED,
  STROKE_WIDTH_1500,
  WORK_AREA,
} from '../shared-objects.js';
import { createGeometry } from './shared/index.js';

const GEOMETRY_0 = createGeometry(1000, 0, 0, new AffineTransform());
const GEOMETRY_1 = createGeometry(2000, 200_000, 0, new AffineTransform());
const GEOMETRY_2 = createGeometry(3000, 400_000, 0, new AffineTransform());

const GEOMETRY_3 = createGeometry(4000, 0, 200_000, new AffineTransform());
const GEOMETRY_4 = createGeometry(0, 200_000, 200_000, new AffineTransform());
const GEOMETRY_5 = createGeometry(1, 400_000, 200_000, new AffineTransform());

export default createArtworks(
  createList(FILL_FLAT_TRANSPARENT),
  createList(STROKE_WIDTH_1500),
  createList(STROKE_COLOUR_RED),
  ...GEOMETRY_0,
  ...GEOMETRY_1,
  ...GEOMETRY_2,
  ...GEOMETRY_3,
  ...GEOMETRY_4,
  ...GEOMETRY_5,
  createList(WORK_AREA),
);
