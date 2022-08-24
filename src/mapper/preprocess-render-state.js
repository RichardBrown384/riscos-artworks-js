const { isBitSet } = require('../common/bitwise');

function isPathFilled(path) {
  return isBitSet(path[0]?.tag, 31);
}

function preprocessRenderStateForPath(path, state) {
  return (isPathFilled(path)) ? state : { ...state, fill: 'none' };
}

module.exports = {
  preprocessRenderStateForPath,
};
