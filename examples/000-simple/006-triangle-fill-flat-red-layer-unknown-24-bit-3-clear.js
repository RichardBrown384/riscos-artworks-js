/*
Example: 006-triangle-fill-flat-red-layer-unknown-24-bit-3-clear

Purpose:
To demonstrate that if you don't set bit 3 of a layer's unknown 24 then the layer isn't drawn.
 */

const {
  Builders: {
    Artworks,
    Lists,
    List,

    RecordLayer,
  },

  Constants,
} = require('../../src').Artworks;

const {
  FILL_FLAT_RED,
  PATH_TRIANGLE,
  WORK_AREA,
} = require('../shared-objects');

const LAYER = RecordLayer
  .builder()
  .unknown24(Constants.LAYER_UNKNOWN_24_BIT_0)
  .name('Foreground')
  .build();

module.exports = Artworks.builder()
  .lists(
    Lists.of(
      List.of(FILL_FLAT_RED),
      List.of(LAYER, PATH_TRIANGLE),
      List.of(WORK_AREA),
    ),
  )
  .build();
