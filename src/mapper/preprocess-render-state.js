/* eslint-disable no-bitwise */

const Constants = require('../constants');

function isPathFilled(path) {
  return (path[0]?.tag & Constants.TAG_BIT_31) !== 0;
}

function preprocessRenderStateForPath(path, state) {
  return (isPathFilled(path)) ? state : { ...state, fill: 'none' };
}

module.exports = {
  preprocessRenderStateForPath,
};
