import {
  ARTWORKS_FILL_TYPE_TAG,
  ARTWORKS_JOIN_STYLE_TAG,
  ARTWORKS_LINE_CAP_STYLE_TAG,
  ARTWORKS_MARKER_STYLE_TAG,
  ARTWORKS_WINDING_RULE_TAG,
} from '@rbrown/computer-concepts-artworks';

import {
  DEFAULT_PALETTE,
  DEFAULT_PALETTE_INDEX_BLACK,
  DEFAULT_PALETTE_INDEX_BLACK_30_PERCENT,
  DEFAULT_PALETTE_INDEX_BLUE,
  DEFAULT_PALETTE_INDEX_CYAN,
  DEFAULT_PALETTE_INDEX_MAGENTA,
  DEFAULT_PALETTE_INDEX_RED,
  DEFAULT_PALETTE_INDEX_WHITE,
  DEFAULT_PALETTE_INDEX_YELLOW,
  PALETTE_INDEX_TRANSPARENT,
} from './default-palette.js';
import {
  createClosedEquilateralTriangle,
  createClosedPentagram,
  createOpenInvertedV,
} from './path-creators.js';
import {
  createRecordDashPattern,
  createRecordDashPatternEmpty,
  createRecordFillColourFlat,
  createRecordFillColourGradient,
  createRecordJoinStyle,
  createRecordLayer,
  createRecordLineCapEndRelativeToStrokeWidth,
  createRecordLineCapStartRelativeToStrokeWidth,
  createRecordMarkerEndRelativeToStrokeWidth,
  createRecordMarkerStartRelativeToStrokeWidth,
  createRecordPath,
  createRecordStrokeColour,
  createRecordStrokeWidth,
  createRecordWindingRule,
  createRecordWorkArea,
} from './record-creators.js';

export const PATH_TRIANGLE = createRecordPath(
  createClosedEquilateralTriangle(10_000, 10_000, 100_000),
  10_000,
);

export const PATH_OPEN_INVERTED_V = createRecordPath(
  createOpenInvertedV(10_000, 10_000, 100_000),
  10_100,
);

export const PATH_PENTAGRAM = createRecordPath(
  createClosedPentagram(100_000, 100_000, 80_000),
  10_000,
);

export const LAYER_BACKGROUND = createRecordLayer('Background');
export const LAYER_FOREGROUND = createRecordLayer('Foreground');

export const WORK_AREA = createRecordWorkArea(DEFAULT_PALETTE);

export const STROKE_COLOUR_BLACK = createRecordStrokeColour(
  DEFAULT_PALETTE_INDEX_BLACK,
);
export const STROKE_COLOUR_RED = createRecordStrokeColour(
  DEFAULT_PALETTE_INDEX_RED,
);
export const STROKE_COLOUR_BLUE = createRecordStrokeColour(
  DEFAULT_PALETTE_INDEX_BLUE,
);
export const STROKE_COLOUR_MAGENTA = createRecordStrokeColour(
  DEFAULT_PALETTE_INDEX_MAGENTA,
);
export const STROKE_COLOUR_TRANSPARENT = createRecordStrokeColour(
  PALETTE_INDEX_TRANSPARENT,
);

export const STROKE_WIDTH_NONE = createRecordStrokeWidth(-1);
export const STROKE_WIDTH_960 = createRecordStrokeWidth(960);
export const STROKE_WIDTH_1280 = createRecordStrokeWidth(1280);
export const STROKE_WIDTH_1500 = createRecordStrokeWidth(1500);
export const STROKE_WIDTH_3000 = createRecordStrokeWidth(3000);
export const STROKE_WIDTH_6000 = createRecordStrokeWidth(6000);

export const FILL_FLAT_TRANSPARENT = createRecordFillColourFlat(
  PALETTE_INDEX_TRANSPARENT,
);
export const FILL_FLAT_BLACK = createRecordFillColourFlat(
  DEFAULT_PALETTE_INDEX_BLACK,
);
export const FILL_FLAT_BLACK_30 = createRecordFillColourFlat(
  DEFAULT_PALETTE_INDEX_BLACK_30_PERCENT,
);
export const FILL_FLAT_WHITE = createRecordFillColourFlat(
  DEFAULT_PALETTE_INDEX_WHITE,
);
export const FILL_FLAT_RED = createRecordFillColourFlat(
  DEFAULT_PALETTE_INDEX_RED,
);
export const FILL_FLAT_BLUE = createRecordFillColourFlat(
  DEFAULT_PALETTE_INDEX_BLUE,
);
export const FILL_FLAT_CYAN = createRecordFillColourFlat(
  DEFAULT_PALETTE_INDEX_CYAN,
);

export const FILL_LINEAR_YELLOW_RED = createRecordFillColourGradient(
  ARTWORKS_FILL_TYPE_TAG.LINEAR,
  0,
  0,
  150_000,
  150_00,
  DEFAULT_PALETTE_INDEX_YELLOW,
  DEFAULT_PALETTE_INDEX_RED,
);

export const FILL_RADIAL_RED_YELLOW = createRecordFillColourGradient(
  ARTWORKS_FILL_TYPE_TAG.RADIAL,
  0,
  0,
  150_000,
  150_00,
  DEFAULT_PALETTE_INDEX_RED,
  DEFAULT_PALETTE_INDEX_YELLOW,
);

export const JOIN_MITRE = createRecordJoinStyle(ARTWORKS_JOIN_STYLE_TAG.MITRE);
export const JOIN_ROUND = createRecordJoinStyle(ARTWORKS_JOIN_STYLE_TAG.ROUND);
export const JOIN_BEVEL = createRecordJoinStyle(ARTWORKS_JOIN_STYLE_TAG.BEVEL);

export const END_CAP_BUTT = createRecordLineCapEndRelativeToStrokeWidth(
  ARTWORKS_LINE_CAP_STYLE_TAG.BUTT,
);
export const END_CAP_ROUND = createRecordLineCapEndRelativeToStrokeWidth(
  ARTWORKS_LINE_CAP_STYLE_TAG.ROUND,
);
export const END_CAP_SQUARE = createRecordLineCapEndRelativeToStrokeWidth(
  ARTWORKS_LINE_CAP_STYLE_TAG.SQUARE,
);
export const END_CAP_TRIANGLE_W2_H4 =
  createRecordLineCapEndRelativeToStrokeWidth(
    ARTWORKS_LINE_CAP_STYLE_TAG.TRIANGLE,
    2,
    4,
  );
export const END_CAP_TRIANGLE_W4_H2 =
  createRecordLineCapEndRelativeToStrokeWidth(
    ARTWORKS_LINE_CAP_STYLE_TAG.TRIANGLE,
    4,
    2,
  );
export const END_CAP_TRIANGLE_W10_H10 =
  createRecordLineCapEndRelativeToStrokeWidth(
    ARTWORKS_LINE_CAP_STYLE_TAG.TRIANGLE,
    10,
    10,
  );

export const START_CAP_BUTT = createRecordLineCapStartRelativeToStrokeWidth(
  ARTWORKS_LINE_CAP_STYLE_TAG.BUTT,
);
export const START_CAP_ROUND = createRecordLineCapStartRelativeToStrokeWidth(
  ARTWORKS_LINE_CAP_STYLE_TAG.ROUND,
);
export const START_CAP_SQUARE = createRecordLineCapStartRelativeToStrokeWidth(
  ARTWORKS_LINE_CAP_STYLE_TAG.SQUARE,
);
export const START_CAP_TRIANGLE_W2_H4 =
  createRecordLineCapStartRelativeToStrokeWidth(
    ARTWORKS_LINE_CAP_STYLE_TAG.TRIANGLE,
    2,
    4,
  );
export const START_CAP_TRIANGLE_W4_H2 =
  createRecordLineCapStartRelativeToStrokeWidth(
    ARTWORKS_LINE_CAP_STYLE_TAG.TRIANGLE,
    4,
    2,
  );
export const START_CAP_TRIANGLE_W10_H10 =
  createRecordLineCapStartRelativeToStrokeWidth(
    ARTWORKS_LINE_CAP_STYLE_TAG.TRIANGLE,
    10,
    10,
  );

export const WINDING_RULE_EVEN_ODD = createRecordWindingRule(
  ARTWORKS_WINDING_RULE_TAG.EVEN_ODD,
);
export const WINDING_RULE_NON_ZERO = createRecordWindingRule(
  ARTWORKS_WINDING_RULE_TAG.NON_ZERO,
);

export const DASH_PATTERN_EMPTY = createRecordDashPatternEmpty();
export const DASH_PATTERN_OFFSET_0 = createRecordDashPattern(
  0,
  5000,
  10000,
  5000,
);
export const DASH_PATTERN_OFFSET_5000 = createRecordDashPattern(
  5000,
  5000,
  10000,
  5000,
);

export const START_MARKER_NONE = createRecordMarkerStartRelativeToStrokeWidth(
  ARTWORKS_MARKER_STYLE_TAG.NONE,
);
export const START_MARKER_TRIANGLE_W4_H4 =
  createRecordMarkerStartRelativeToStrokeWidth(
    ARTWORKS_MARKER_STYLE_TAG.TRIANGLE,
    4,
    4,
  );
export const START_MARKER_ARROW_HEAD_W4_H6 =
  createRecordMarkerStartRelativeToStrokeWidth(
    ARTWORKS_MARKER_STYLE_TAG.ARROW_HEAD,
    4,
    6,
  );
export const START_MARKER_CIRCLE_W6_H4 =
  createRecordMarkerStartRelativeToStrokeWidth(
    ARTWORKS_MARKER_STYLE_TAG.CIRCLE,
    6,
    4,
  );
export const START_MARKER_ARROW_TAIL_W4_H4 =
  createRecordMarkerStartRelativeToStrokeWidth(
    ARTWORKS_MARKER_STYLE_TAG.ARROW_TAIL,
    4,
    4,
  );

export const END_MARKER_NONE = createRecordMarkerEndRelativeToStrokeWidth(
  ARTWORKS_MARKER_STYLE_TAG.NONE,
);
export const END_MARKER_TRIANGLE_W4_H4 =
  createRecordMarkerEndRelativeToStrokeWidth(
    ARTWORKS_MARKER_STYLE_TAG.TRIANGLE,
    4,
    4,
  );
export const END_MARKER_ARROW_HEAD_W4_H6 =
  createRecordMarkerEndRelativeToStrokeWidth(
    ARTWORKS_MARKER_STYLE_TAG.ARROW_HEAD,
    4,
    6,
  );
export const END_MARKER_CIRCLE_W6_H4 =
  createRecordMarkerEndRelativeToStrokeWidth(
    ARTWORKS_MARKER_STYLE_TAG.CIRCLE,
    6,
    4,
  );
export const END_MARKER_ARROW_TAIL_W4_H4 =
  createRecordMarkerEndRelativeToStrokeWidth(
    ARTWORKS_MARKER_STYLE_TAG.ARROW_TAIL,
    4,
    4,
  );
