/*
Example: 001-triangle-fill-flat-red

Purpose:
To demonstrate the minimum file that will actually render something in !AWViewer
 */

const {
  Builders: {
    Artworks,
    Lists,
    List,
  },
} = require('../../src').Artworks;

const {
  FILL_FLAT_RED,
  LAYER_FOREGROUND,
  PATH_TRIANGLE,
  WORK_AREA,
} = require('../shared-objects');

module.exports = Artworks.builder()
  .lists(
    Lists.of(
      List.of(FILL_FLAT_RED),
      List.of(LAYER_FOREGROUND, PATH_TRIANGLE),
      List.of(WORK_AREA),
    ),
  )
  .build();
