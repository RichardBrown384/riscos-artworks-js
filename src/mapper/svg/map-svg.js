const ARTWORKS_UNITS_TO_USER_UNITS = (1.0 / 640.0) * (4.0 / 3.0);

function mapSvg({
  fileBoundingBox: {
    minX, minY, maxX, maxY,
  },
  definitions = [],
  objects,
}) {
  const viewBoxWidth = Math.max(maxX - minX, 1);
  const viewBoxHeight = Math.max(maxY - minY, 1);

  const width = viewBoxWidth * ARTWORKS_UNITS_TO_USER_UNITS;
  const height = viewBoxHeight * ARTWORKS_UNITS_TO_USER_UNITS;

  return {
    tag: 'svg',
    attributes: {
      width,
      height,
      viewBox: `${minX} ${-maxY} ${viewBoxWidth} ${viewBoxHeight}`,
      xmlns: 'http://www.w3.org/2000/svg',
      'xmlns:xlink': 'http://www.w3.org/1999/xlink',
    },
    children: [{
      tag: 'defs',
      children: definitions,
    }, {
      tag: 'g',
      attributes: {
        transform: 'scale(1, -1)',
      },
      children: objects,
    }],
  };
}

module.exports = mapSvg;
