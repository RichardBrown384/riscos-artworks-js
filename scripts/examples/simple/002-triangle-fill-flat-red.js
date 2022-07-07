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
} = require('../../../src/artworks');

const {
  FILL_FLAT_RED,
  LAYER_FOREGROUND,
  PATH_TRIANGLE,
  WORK_AREA,
} = require('../shared-objects');

module.exports.moduleFilename = module.filename;
module.exports.artworks = Artworks.builder()
  .version(9)
  .lists(
    Lists.of(
      List.of(FILL_FLAT_RED),
      List.of(LAYER_FOREGROUND, PATH_TRIANGLE),
      List.of(WORK_AREA),
    ),
  )
  .build();
