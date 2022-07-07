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

  ...Constants,

  Builders: {
    ...PrimitiveBuilders,
    ...RecordBuilders,
  },

  Artworks: {
    load(buffer) {
      const buf = Uint8Array.from(buffer).buffer;
      const view = new ArtworksView(buf);
      const reader = new ArtworksReader(view);
      return reader.read();
    },
    save(artworks) {
      const buf = new ArrayBuffer(FOUR_MEGABYTES);
      const view = new ArtworksView(buf);
      const writer = new ArtworksWriter(view, artworks);
      const length = writer.write();
      return new DataView(buf, 0, length);
    },
  },
};
