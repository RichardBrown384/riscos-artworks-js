const Constants = require('./constants');
const PrimitiveBuilders = require('./builders/primitives');
const RecordBuilders = require('./builders/records');

const FOUR_MEGABYTES = 4 * 1024 * 1024;

const {
  ArtworksView,
  ArtworksReader,
  ArtworksWriter,
} = require('./serialisation');

module.exports = {

  Artworks: {
    Constants,

    Builders: {
      ...PrimitiveBuilders,
      ...RecordBuilders,
    },

    fromUint8Array(array) {
      const view = new ArtworksView(array.buffer);
      const reader = new ArtworksReader(view);
      return reader.read();
    },

    toUint8Array(artworks, limit = FOUR_MEGABYTES) {
      const buf = new ArrayBuffer(limit);
      const view = new ArtworksView(buf);
      const writer = new ArtworksWriter(view, artworks);
      const length = writer.write();
      return new Uint8Array(buf, 0, length);
    },
  },
};
