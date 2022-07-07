const Constants = require('./constants');

const ArtworksView = require('./view/artworks-view');
const ArtworksReader = require('./serialisation/reader');

module.exports = {

  ...Constants,

  Artworks: {
    load(buffer) {
      const buf = Uint8Array.from(buffer).buffer;
      const view = new ArtworksView(buf);
      const reader = new ArtworksReader(view);
      return reader.read();
    },
  },
};
