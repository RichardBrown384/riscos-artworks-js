/*
Example: 019-pentagram-fill-red-stroke-blue-stroke-width-3000-winding-non-zero

Purpose:
To demonstrate the non-zero winding rule
 */

const {
  Builders: {
    Artworks,
    Lists,
    List,

    RecordWindingRule,
  },
  WINDING_RULE_NON_ZERO,
  UNKNOWN_4_BIT_0,
} = require('../../src/artworks');

const {
  FILL_FLAT_RED,
  STROKE_COLOUR_BLUE,
  STROKE_WIDTH_3000,
  LAYER_FOREGROUND,
  PATH_PENTAGRAM,
  WORK_AREA,
} = require('../shared-objects');

const WINDING_RULE = RecordWindingRule.of(UNKNOWN_4_BIT_0, WINDING_RULE_NON_ZERO);

module.exports.moduleFilename = module.filename;
module.exports.artworks = Artworks.builder()
  .version(9)
  .lists(
    Lists.of(
      List.of(FILL_FLAT_RED),
      List.of(STROKE_COLOUR_BLUE),
      List.of(STROKE_WIDTH_3000),
      List.of(WINDING_RULE),
      List.of(LAYER_FOREGROUND, PATH_PENTAGRAM),
      List.of(WORK_AREA),
    ),
  )
  .build();
