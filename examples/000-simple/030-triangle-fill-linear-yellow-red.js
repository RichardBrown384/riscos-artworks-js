/*
Example: 030-triangle-fill-linear-yellow-red

Purpose:
To demonstrate the linear gradient fills !AWViewer
 */

const {
  Builders: {
    Artworks,
    Lists,
    List,
  },
} = require('../../src').Artworks;

const {
  FILL_LINEAR_YELLOW_RED,
  LAYER_FOREGROUND,
  PATH_TRIANGLE,
  WORK_AREA,
} = require('../shared-objects');

module.exports = Artworks.builder()
  .lists(
    Lists.of(
      List.of(FILL_LINEAR_YELLOW_RED),
      List.of(LAYER_FOREGROUND, PATH_TRIANGLE),
      List.of(WORK_AREA),
    ),
  )
  .build();
