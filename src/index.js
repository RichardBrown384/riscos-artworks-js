const Constants = require('./constants');
const PrimitiveBuilders = require('./builders/primitives');
const RecordBuilders = require('./builders/records');
const StructureBuilders = require('./builders/structures');

const {
  ArtworksView,
  ArtworksReader,
  ArtworksWriter,
  isArtworksHeaderPresent,
} = require('./serialisation');

const { mapArtworksOutline, mapArtworksNormal } = require('./mapper');
const { denormalise, normalise } = require('./normalisation');

const FOUR_MEGABYTES = 4 * 1024 * 1024;

module.exports = {

  Artworks: {
    Constants,
    Builders: {
      ...PrimitiveBuilders,
      ...RecordBuilders,
      ...StructureBuilders,
    },
    isHeaderPresent(array) {
      const view = new ArtworksView(array.buffer);
      return isArtworksHeaderPresent(view);
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
    denormalise(artworks) {
      return denormalise(artworks);
    },
    normalise(artworks) {
      return normalise(artworks);
    },
    SVGElement: {
      Outline: {
        fromArtworks(artworks) {
          return mapArtworksOutline(artworks);
        },
      },
      Normal: {
        fromArtworks(artworks) {
          return mapArtworksNormal(artworks);
        },
      },
    },
  },
};
