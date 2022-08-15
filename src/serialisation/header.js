const Constants = require('../constants');

const { readHeader } = require('../types/primitives');

function isArtworksHeaderPresent(view) {
  const { identifier, program } = readHeader(view);
  return identifier === Constants.HEADER_IDENTIFIER && program === Constants.HEADER_PROGRAM;
}

module.exports = isArtworksHeaderPresent;
