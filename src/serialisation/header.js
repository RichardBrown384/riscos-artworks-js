const Constants = require('../constants');
const { readArtworksHeader } = require('../types/structures');

function isArtworksHeaderPresent(view) {
  const { identifier, program } = readArtworksHeader(view);
  return identifier === Constants.HEADER_IDENTIFIER && program === Constants.HEADER_PROGRAM;
}

module.exports = isArtworksHeaderPresent;
