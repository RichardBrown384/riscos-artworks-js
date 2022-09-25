const Constants = require('../../constants');

const { RecordFillColourFlat } = require('../../builders/records');

function isPoint([p1, p2]) {
  return p1.x === p2.x && p1.y === p2.y;
}

function preprocessFillLinear(fill) {
  const { gradientLine, startColour } = fill;
  if (isPoint(gradientLine)) {
    return RecordFillColourFlat.of(Constants.UNKNOWN_4_BIT_0, startColour);
  }
  return fill;
}

function preprocessFillRadial(fill) {
  const { gradientLine, endColour } = fill;
  if (isPoint(gradientLine)) {
    return RecordFillColourFlat.of(Constants.UNKNOWN_4_BIT_0, endColour);
  }
  return fill;
}

function preprocessEdgeCaseFills(fill) {
  switch (fill.fillType) {
    case Constants.FILL_LINEAR:
      return preprocessFillLinear(fill);
    case Constants.FILL_RADIAL:
      return preprocessFillRadial(fill);
    default:
      return fill;
  }
}

module.exports = preprocessEdgeCaseFills;
