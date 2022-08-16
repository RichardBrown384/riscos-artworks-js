/* eslint-disable no-bitwise */

const Constants = require('../constants');

const TAG_MAP = {
  [Constants.TAG_END]: '',
  [Constants.TAG_MOVE]: 'M',
  [Constants.TAG_UNKNOWN]: '',
  [Constants.TAG_CLOSE_SUB_PATH]: 'Z',
  [Constants.TAG_BEZIER]: 'C',
  [Constants.TAG_LINE]: 'L',
};

function mapPathElements(elements) {
  const path = [];
  for (let i = 0; i < elements.length; i += 1) {
    const { tag, points = [] } = elements[i];
    path.push(TAG_MAP[tag & 0xFF]);
    path.push(points.flatMap(({ x, y }) => [x, y]).join(','));
  }
  return path.join('');
}

module.exports = mapPathElements;
