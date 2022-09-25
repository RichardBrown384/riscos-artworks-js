const mapPathElements = require('./map-path-elements');
const mapRenderState = require('./map-path-attributes');

function mapPath(path, state, extraData) {
  return {
    tag: 'path',
    attributes: {
      d: mapPathElements(path),
      ...mapRenderState(state),
    },
    ...(extraData && {
      children: [{
        tag: 'desc',
        text: JSON.stringify(extraData),
      }],
    }),
  };
}

module.exports = mapPath;
