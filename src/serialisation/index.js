const ArtworksView = require('./view');
const ArtworksReader = require('./reader');
const ArtworksWriter = require('./writer');
const isArtworksHeaderPresent = require('./header');

module.exports = {
  ArtworksView,
  ArtworksReader,
  ArtworksWriter,
  isArtworksHeaderPresent,
};
