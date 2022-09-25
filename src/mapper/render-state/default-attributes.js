const {
  UNKNOWN_4_BIT_0,

  JOIN_BEVEL,
  CAP_BUTT,
  WINDING_RULE_EVEN_ODD,
} = require('../../constants');

const {
  RecordStrokeColour,
  RecordStrokeWidth,
  RecordFillColourFlat,
  RecordJoinStyle,
  RecordLineCapEnd,
  RecordLineCapStart,
  RecordWindingRule,
  RecordDashPatternEmpty,
} = require('../../builders/records');

const RECORD_STROKE_BLACK = RecordStrokeColour.of(UNKNOWN_4_BIT_0, 0x01000000);
const RECORD_STROKE_WIDTH_QUARTER_POINT = RecordStrokeWidth.of(UNKNOWN_4_BIT_0, 160);
const RECORD_FILL_FLAT_TRANSPARENT = RecordFillColourFlat.of(UNKNOWN_4_BIT_0, -1);
const RECORD_JOIN_BEVEL = RecordJoinStyle.of(UNKNOWN_4_BIT_0, JOIN_BEVEL);
const RECORD_CAP_END_BUTT = RecordLineCapEnd.of(UNKNOWN_4_BIT_0, CAP_BUTT);
const RECORD_CAP_START_BUTT = RecordLineCapStart.of(UNKNOWN_4_BIT_0, CAP_BUTT);
const RECORD_WINDING_RULE_EVEN_ODD = RecordWindingRule.of(UNKNOWN_4_BIT_0, WINDING_RULE_EVEN_ODD);
const RECORD_DASH_PATTERN_EMPTY = RecordDashPatternEmpty.of(UNKNOWN_4_BIT_0);

module.exports = {
  RECORD_STROKE_BLACK,
  RECORD_STROKE_WIDTH_QUARTER_POINT,
  RECORD_FILL_FLAT_TRANSPARENT,
  RECORD_JOIN_BEVEL,
  RECORD_CAP_END_BUTT,
  RECORD_CAP_START_BUTT,
  RECORD_WINDING_RULE_EVEN_ODD,
  RECORD_DASH_PATTERN_EMPTY,

  DEFAULT_RENDER_STATE: {
    stroke: RECORD_STROKE_BLACK,
    strokeWidth: RECORD_STROKE_WIDTH_QUARTER_POINT,
    fill: RECORD_FILL_FLAT_TRANSPARENT,
    joinStyle: RECORD_JOIN_BEVEL,
    capStyleEnd: RECORD_CAP_END_BUTT,
    capStyleStart: RECORD_CAP_START_BUTT,
    windingRule: RECORD_WINDING_RULE_EVEN_ODD,
    dash: RECORD_DASH_PATTERN_EMPTY,
  },
};
