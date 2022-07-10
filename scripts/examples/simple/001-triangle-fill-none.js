/*
Example: 001-triangle-fill-none

Purpose:
To demonstrate that !AWViewer crashes when a file doesn't contain a fill record
 */

const {
  Builders: {
    Artworks,
    Lists,
    List,
  },
} = require('../../../src/artworks');

const {
  LAYER_FOREGROUND,
  PATH_TRIANGLE,
  WORK_AREA,
} = require('../shared-objects');

module.exports.moduleFilename = module.filename;
module.exports.artworks = Artworks.builder()
  .version(9)
  .lists(
    Lists.of(
      List.of(LAYER_FOREGROUND, PATH_TRIANGLE),
      List.of(WORK_AREA),
    ),
  )
  .build();
