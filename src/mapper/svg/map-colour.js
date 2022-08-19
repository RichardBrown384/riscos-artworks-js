/* eslint-disable no-bitwise */

function mapColour(colour) {
  if (colour) {
    const r = (colour) & 0xFF;
    const g = (colour >> 8) & 0xFF;
    const b = (colour >> 16) & 0xFF;
    return `rgb(${[r, g, b]})`;
  }
  return 'none';
}

module.exports = mapColour;
