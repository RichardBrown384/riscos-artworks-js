/*
Example: 011-triangle-stroke-red-stroke-width-3000-join-mitre

Purpose:
To demonstrate mitred joins
 */

const {
  Builders: {
    Artworks,
    Lists,
    List,

    RecordJoinStyle,
  },
  Constants,
} = require('../../src').Artworks;

const {
  FILL_FLAT_TRANSPARENT,
  STROKE_COLOUR_RED,
  STROKE_WIDTH_3000,
  LAYER_FOREGROUND,
  PATH_TRIANGLE,
  WORK_AREA,
} = require('../shared-objects');

const JOIN = RecordJoinStyle.of(Constants.UNKNOWN_4_BIT_0, Constants.JOIN_MITRE);

module.exports = Artworks.builder()
  .lists(
    Lists.of(
      List.of(FILL_FLAT_TRANSPARENT),
      List.of(STROKE_COLOUR_RED),
      List.of(STROKE_WIDTH_3000),
      List.of(JOIN),
      List.of(LAYER_FOREGROUND, PATH_TRIANGLE),
      List.of(WORK_AREA),
    ),
  )
  .build();
