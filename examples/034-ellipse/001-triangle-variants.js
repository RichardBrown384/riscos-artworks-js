/*
Example: 001-triangle-variants

Purpose:

To demonstrate the influence (if any) of the 'triangle' that precedes the path data
in ellipse records upon the rendering.

It looks like the triangle is used by ArtWorks to define the ellipse but
!AWViewer, at any rate, uses the precomputed path information to render ellipses.

Draws several ellipses shaded from white to black.
The fill's gradient line is superimposed in blue.
The 'triangles' are superimposed in red.

Points to note:

1. The position and orientation of the triangle do not impact the rendering of the ellipse
2. The position and the orientation of the triangle do not impact the
   radial fill (as was originally thought to be the case)

 */

const {
  Builders: {
    List,
    Path,
    Polyline,
  },

  Constants,
} = require('../../src').Artworks;

const {
  FILL_FLAT_TRANSPARENT,
  STROKE_COLOUR_TRANSPARENT,
  STROKE_COLOUR_RED,
  STROKE_COLOUR_BLUE,
  STROKE_WIDTH_1280,
  STROKE_WIDTH_1500,
  WORK_AREA,
} = require('../shared-objects');

const {
  DEFAULT_PALETTE_INDEX_BLACK,
  DEFAULT_PALETTE_INDEX_WHITE,
} = require('../default-palette');

const {
  createArtworks,
  createRecordPath,
  createRecordFillColourGradient,
  createRecordEllipse,
} = require('../record-creators');

const AffineTransform = require('../affine-transform');

const FILL_START_X = 332139;
const FILL_START_Y = 218765;
const FILL_END_X = 93424;
const FILL_END_Y = 218765;

const ORIGINAL_PATH_FILL_LINE = Path.builder()
  .moveTo(FILL_START_X, FILL_START_Y, Constants.TAG_BIT_31)
  .lineTo(FILL_END_X, FILL_END_Y)
  .end()
  .build();

const TRIANGLE_X0 = 132655;
const TRIANGLE_Y0 = 214776;
const TRIANGLE_X1 = 132655;
const TRIANGLE_Y1 = 226745;
const TRIANGLE_X2 = 326154;
const TRIANGLE_Y2 = 226745;

const ORIGINAL_POLYLINE_TRIANGLE = Polyline.builder()
  .push(TRIANGLE_X0, TRIANGLE_Y0)
  .push(TRIANGLE_X1, TRIANGLE_Y1)
  .push(TRIANGLE_X2, TRIANGLE_Y2)
  .build();

const ORIGINAL_PATH_TRIANGLE = Path.builder()
  .moveTo(TRIANGLE_X0, TRIANGLE_Y0, Constants.TAG_BIT_31)
  .lineTo(TRIANGLE_X1, TRIANGLE_Y1)
  .lineTo(TRIANGLE_X2, TRIANGLE_Y2)
  .end()
  .build();

const M0_X0 = 132655;
const M0_Y0 = 220760;

const B0_X0 = 132655;
const B0_Y0 = 224066;
const B0_X1 = 175970;
const B0_Y1 = 226745;
const B0_X2 = 229404;
const B0_Y2 = 226745;

const B1_X0 = 282839;
const B1_Y0 = 226745;
const B1_X1 = 326154;
const B1_Y1 = 224066;
const B1_X2 = 326154;
const B1_Y2 = 220761;

const B2_X0 = 326154;
const B2_Y0 = 217455;
const B2_X1 = 282839;
const B2_Y1 = 214776;
const B2_X2 = 229405;
const B2_Y2 = 214776;

const B3_X0 = 175970;
const B3_Y0 = 214776;
const B3_X1 = 132655;
const B3_Y1 = 217455;
const B3_X2 = 132655;
const B3_Y2 = 220760;

const ORIGINAL_PATH_ELLIPSE = Path.builder()
  .moveTo(M0_X0, M0_Y0, Constants.TAG_BIT_31)
  .bezierTo(B0_X0, B0_Y0, B0_X1, B0_Y1, B0_X2, B0_Y2)
  .bezierTo(B1_X0, B1_Y0, B1_X1, B1_Y1, B1_X2, B1_Y2)
  .bezierTo(B2_X0, B2_Y0, B2_X1, B2_Y1, B2_X2, B2_Y2)
  .bezierTo(B3_X0, B3_Y0, B3_X1, B3_Y1, B3_X2, B3_Y2)
  .closeSubPath()
  .end()
  .build();

function createGeometry(dx, dy, untranslatedTriangleTransform) {
  const translationTransform = new AffineTransform().translate(dx, dy);
  const triangleTransform = new AffineTransform()
    .concatenateTransform(untranslatedTriangleTransform)
    .translate(dx, dy);

  const [x0, y0] = translationTransform.transformCoordinate(FILL_START_X, FILL_START_Y);
  const [x1, y1] = translationTransform.transformCoordinate(FILL_END_X, FILL_END_Y);

  const fillGradient = createRecordFillColourGradient(
    Constants.FILL_RADIAL,
    x0,
    y0,
    x1,
    y1,
    DEFAULT_PALETTE_INDEX_WHITE,
    DEFAULT_PALETTE_INDEX_BLACK,
  );

  const pathEllipse = translationTransform.transformPath(ORIGINAL_PATH_ELLIPSE);

  const polylineTriangle = triangleTransform.transformPolyline(ORIGINAL_POLYLINE_TRIANGLE);

  const recordEllipse = createRecordEllipse(
    polylineTriangle,
    pathEllipse,
    10_000,
    fillGradient,
    STROKE_WIDTH_1280,
  );

  const recordPathFillLine = createRecordPath(
    translationTransform.transformPath(ORIGINAL_PATH_FILL_LINE),
    10_000,
  );

  const recordPathTriangle = createRecordPath(
    triangleTransform.transformPath(ORIGINAL_PATH_TRIANGLE),
    10_000,
  );

  return [
    List.of(recordEllipse, STROKE_COLOUR_TRANSPARENT),
    List.of(recordPathFillLine, STROKE_COLOUR_BLUE),
    List.of(recordPathTriangle),
  ];
}

const GEOMETRY_0 = createGeometry(0, 0, new AffineTransform());
const GEOMETRY_1 = createGeometry(
  400_000,
  0,
  new AffineTransform()
    .translate(-TRIANGLE_X1, -TRIANGLE_Y1)
    .rotate(-30)
    .translate(TRIANGLE_X1, TRIANGLE_Y1),
);
const GEOMETRY_2 = createGeometry(
  800_000,
  0,
  new AffineTransform()
    .translate(-TRIANGLE_X1, -TRIANGLE_Y1)
    .rotate(30)
    .translate(TRIANGLE_X1, TRIANGLE_Y1),
);

const GEOMETRY_3 = createGeometry(
  0,
  200_000,
  new AffineTransform()
    .translate(-TRIANGLE_X1, -TRIANGLE_Y1)
    .scale(0.5, 3.0)
    .translate(TRIANGLE_X1, TRIANGLE_Y1),
);
const GEOMETRY_4 = createGeometry(
  400_000,
  200_000,
  new AffineTransform()
    .translate(0.5 * (TRIANGLE_X2 - TRIANGLE_X0), 0.5 * (TRIANGLE_Y2 - TRIANGLE_Y0)),
);
const GEOMETRY_5 = createGeometry(
  800_000,
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
