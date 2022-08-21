const mapPathElements = require('./map-path-elements');
const mapRenderState = require('./map-path-attributes');

function mapPath(path, state, data = {}) {
  return {
    tag: 'path',
    attributes: {
      d: mapPathElements(path),
      ...mapRenderState(state),
    },
    ...(data && {
      children: [{
        tag: 'desc',
        text: JSON.stringify(data),
      }],
    }),
  };
}

module.exports = mapPath;
