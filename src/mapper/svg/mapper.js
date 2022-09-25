const Constants = require('../../constants');

const MergingBoundingBox = require('../common/merging-bounding-box');

const {
  mapRadialGradient,
  mapLinearGradient,
} = require('./map-gradients');

const mapPath = require('./map-path');
const mapSvg = require('./map-svg');
const mapColour = require('./map-colour');

function mapStrokeColour(data) {
  return { ...data, stroke: mapColour(data.strokeColour) };
}

class SvgMapper {
  constructor() {
    this.fileBoundingBox = new MergingBoundingBox({});
    this.definitions = {};
    this.objects = [];
  }

  finish() {
    return mapSvg({
      fileBoundingBox: this.fileBoundingBox,
      definitions: Object.values(this.definitions),
      objects: this.objects,
    });
  }

  boundingBox(other) {
    this.fileBoundingBox.merge(other);
  }

  path(path, renderState, extraData) {
    this.objects.push(mapPath(
      path,
      this.mapRenderState(renderState),
      extraData,
    ));
  }

  mapRenderState(renderState) {
    return {
      ...renderState,
      stroke: mapStrokeColour(renderState.stroke),
      fill: this.mapFillColour(renderState.fill),
    };
  }

  mapFillColour(data) {
    return { ...data, fill: this.mapFillColourByType(data) };
  }

  mapFillColourByType(data) {
    switch (data.fillType) {
      case Constants.FILL_FLAT:
        return mapColour(data.colour);
      case Constants.FILL_LINEAR:
        return this.mapFillLinear(data);
      case Constants.FILL_RADIAL:
        return this.mapFillRadial(data);
      default:
        throw new Error('Unsupported fill type');
    }
  }

  mapFillLinear({
    fillId, gradientLine, startColour, endColour,
  }) {
    const id = `linear-gradient-${fillId}`;
    if (!this.definitions[id]) {
      this.definitions[id] = mapLinearGradient(
        id,
        gradientLine,
        mapColour(startColour),
        mapColour(endColour),
      );
    }
    return `url(#${id})`;
  }

  mapFillRadial({
    fillId, gradientLine, startColour, endColour,
  }) {
    const id = `radial-gradient-${fillId}`;
    if (!this.definitions[id]) {
      this.definitions[id] = mapRadialGradient(
        id,
        gradientLine,
        mapColour(startColour),
        mapColour(endColour),
      );
    }
    return `url(#${id})`;
  }
}

module.exports = SvgMapper;
