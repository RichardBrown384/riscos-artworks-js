const {
  Builders: {
    List,
    Path,
    Polyline,
  },

  Constants,
} = require('../../../src').Artworks;

const {
  STROKE_COLOUR_TRANSPARENT,
  STROKE_COLOUR_BLUE,
  STROKE_WIDTH_1280,
} = require('../../shared-objects');

const {
  DEFAULT_PALETTE_INDEX_BLACK,
  DEFAULT_PALETTE_INDEX_WHITE,
} = require('../../default-palette');

const {
  createRecordPath,
  createRecordFillColourGradient,
  createRecordRoundedRectangle,
} = require('../../record-creators');

const AffineTransform = require('../../affine-transform');

const FILL_START_X = 360000;
const FILL_START_Y = 194900;
const FILL_END_X = 410000;
const FILL_END_Y = 194900;

const ORIGINAL_PATH_FILL_LINE = Path.builder()
  .moveTo(FILL_START_X, FILL_START_Y, Constants.TAG_BIT_31)
  .lineTo(FILL_END_X, FILL_END_Y)
  .end()
  .build();

const CORNER_RADIUS = 4864;

const TRIANGLE_X0 = 367700;
const TRIANGLE_Y0 = 191316;
const TRIANGLE_X1 = 367700;
const TRIANGLE_Y1 = 198484;
const TRIANGLE_X2 = 409514;
const TRIANGLE_Y2 = 198484;

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

const M0_X0 = 367700;
const M0_Y0 = 194900;

const L0_X0 = 367700;
const L0_Y0 = 194900;

const B0_X0 = 367700;
const B0_Y0 = 196880;
const B0_X1 = 369877;
const B0_Y1 = 198484;
const B0_X2 = 372564;
const B0_Y2 = 198484;

const L1_X0 = 404650;
const L1_Y0 = 198484;

const B1_X0 = 407337;
const B1_Y0 = 198484;
const B1_X1 = 409514;
const B1_Y1 = 196880;
const B1_X2 = 409514;
const B1_Y2 = 194900;

const L2_X0 = 409514;
const L2_Y0 = 194900;

const B2_X0 = 409514;
const B2_Y0 = 192920;
const B2_X1 = 407337;
const B2_Y1 = 191316;
const B2_X2 = 404650;
const B2_Y2 = 191316;

const L3_X0 = 372564;
const L3_Y0 = 191316;

const B3_X0 = 369877;
const B3_Y0 = 191316;
const B3_X1 = 367700;
const B3_Y1 = 192920;
const B3_X2 = 367700;
const B3_Y2 = 194900;

const ORIGINAL_PATH_ROUNDED_RECTANGLE = Path.builder()
  .moveTo(M0_X0, M0_Y0, Constants.TAG_BIT_31)
  .lineTo(L0_X0, L0_Y0)
  .bezierTo(B0_X0, B0_Y0, B0_X1, B0_Y1, B0_X2, B0_Y2)
  .lineTo(L1_X0, L1_Y0)
  .bezierTo(B1_X0, B1_Y0, B1_X1, B1_Y1, B1_X2, B1_Y2)
  .lineTo(L2_X0, L2_Y0)
  .bezierTo(B2_X0, B2_Y0, B2_X1, B2_Y1, B2_X2, B2_Y2)
  .lineTo(L3_X0, L3_Y0)
  .bezierTo(B3_X0, B3_Y0, B3_X1, B3_Y1, B3_X2, B3_Y2)
  .closeSubPath()
  .end()
  .build();

function createRecordFillColourGradientTransformed(transform) {
  const [x0, y0] = transform.transformCoordinate(FILL_START_X, FILL_START_Y);
  const [x1, y1] = transform.transformCoordinate(FILL_END_X, FILL_END_Y);

  return createRecordFillColourGradient(
    Constants.FILL_RADIAL,
    x0,
    y0,
    x1,
    y1,
    DEFAULT_PALETTE_INDEX_WHITE,
    DEFAULT_PALETTE_INDEX_BLACK,
  );
}

function createGeometry(cornerRadius, dx, dy, untranslatedTriangleTransform) {
  const translationTransform = new AffineTransform().translate(dx, dy);
  const triangleTransform = new AffineTransform()
    .concatenateTransform(untranslatedTriangleTransform)
    .translate(dx, dy);

  const fillGradient = createRecordFillColourGradientTransformed(translationTransform);

  const pathRectangle = translationTransform.transformPath(ORIGINAL_PATH_ROUNDED_RECTANGLE);

  const polylineTriangle = triangleTransform.transformPolyline(ORIGINAL_POLYLINE_TRIANGLE);

  const recordRoundedRectangle = createRecordRoundedRectangle(
    cornerRadius,
    polylineTriangle,
    pathRectangle,
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
    List.of(recordRoundedRectangle, STROKE_COLOUR_TRANSPARENT),
    List.of(recordPathFillLine, STROKE_COLOUR_BLUE),
    List.of(recordPathTriangle),
  ];
}

module.exports = {
  createGeometry,

  CORNER_RADIUS,

  TRIANGLE_X0,
  TRIANGLE_Y0,
  TRIANGLE_X1,
  TRIANGLE_Y1,
  TRIANGLE_X2,
  TRIANGLE_Y2,
};
