const { extractBitField } = require('../../common/bitwise');

function mapColour(colour) {
  if (colour) {
    const r = extractBitField(colour, 0, 8);
    const g = extractBitField(colour, 8, 8);
    const b = extractBitField(colour, 16, 8);
    return `rgb(${[r, g, b]})`;
  }
  return 'none';
}

module.exports = mapColour;
