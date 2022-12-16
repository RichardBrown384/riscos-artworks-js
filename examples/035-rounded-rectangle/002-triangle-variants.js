/*
Example: 002-triangle-variants

Purpose:

To demonstrate the influence (if any) of the 'triangle' that precedes the path data
in rounded rectangle records upon the rendering.

It looks like the triangle is used by ArtWorks to define the rounded rectangle but
!AWViewer, at any rate, uses the precomputed path information to render rounded rectangles.

Draws several rounded rectangles shaded from white to black.
The fill's gradient line is superimposed in blue.
The 'triangles' are superimposed in red.

Points to note:

1. The position and orientation of the triangle do not impact the rendering of the rectangle
2. The position and the orientation of the triangle do not impact the
   radial fill (as was originally thought to be the case)

 */

const {
  Builders: {
    List,
  },
} = require('../../src').Artworks;

const {
  FILL_FLAT_TRANSPARENT,
  STROKE_WIDTH_1500,
  STROKE_COLOUR_RED,
  WORK_AREA,
} = require('../shared-objects');

const { createArtworks } = require('../record-creators');

const AffineTransform = require('../affine-transform');

const {
  createGeometry,
  CORNER_RADIUS,
  TRIANGLE_X0,
  TRIANGLE_Y0,
  TRIANGLE_X1,
  TRIANGLE_Y1,
  TRIANGLE_X2,
  TRIANGLE_Y2,
} = require('./shared');

const GEOMETRY_0 = createGeometry(CORNER_RADIUS, 0, 0, new AffineTransform());
const GEOMETRY_1 = createGeometry(
  CORNER_RADIUS,
  200_000,
  0,
  new AffineTransform()
    .translate(-TRIANGLE_X1, -TRIANGLE_Y1)
    .rotate(-30)
    .translate(TRIANGLE_X1, TRIANGLE_Y1),
);
const GEOMETRY_2 = createGeometry(
  CORNER_RADIUS,
  400_000,
  0,
  new AffineTransform()
    .translate(-TRIANGLE_X1, -TRIANGLE_Y1)
    .rotate(30)
    .translate(TRIANGLE_X1, TRIANGLE_Y1),
);

const GEOMETRY_3 = createGeometry(
  CORNER_RADIUS,
  0,
  200_000,
  new AffineTransform()
    .translate(-TRIANGLE_X1, -TRIANGLE_Y1)
    .scale(0.5, 3.0)
    .translate(TRIANGLE_X1, TRIANGLE_Y1),
);
const GEOMETRY_4 = createGeometry(
  CORNER_RADIUS,
  200_000,
  200_000,
  new AffineTransform()
    .translate(0.5 * (TRIANGLE_X2 - TRIANGLE_X0), 0.5 * (TRIANGLE_Y2 - TRIANGLE_Y0)),
);
const GEOMETRY_5 = createGeometry(
  CORNER_RADIUS,
  400_000,
  200_000,
  new AffineTransform()
    .translate(-TRIANGLE_X1, -TRIANGLE_Y1)
    .rotate(225)
    .translate(TRIANGLE_X1, TRIANGLE_Y1),
);

module.exports = createArtworks(
  List.of(FILL_FLAT_TRANSPARENT),
  List.of(STROKE_WIDTH_1500),
  List.of(STROKE_COLOUR_RED),
  ...GEOMETRY_0,
  ...GEOMETRY_1,
  ...GEOMETRY_2,
  ...GEOMETRY_3,
  ...GEOMETRY_4,
  ...GEOMETRY_5,
  List.of(WORK_AREA),
);
