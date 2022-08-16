/* eslint-disable no-bitwise */

const MergingBoundingBox = require('./merging-bounding-box');

const Constants = require('../constants');
const { RenderState, Modes } = require('./render-state');
const mapPathElements = require('./path-elements-map');
const mapRenderState = require('./path-attributes-map');

const ARTWORKS_UNITS_TO_USER_UNITS = (1.0 / 640.0) * (4.0 / 3.0);

function extractRGBComponents(colour) {
  const r = (colour) & 0xFF;
  const g = (colour >> 8) & 0xFF;
  const b = (colour >> 16) & 0xFF;
  return { r, g, b };
}

function createStopColour(offset, stopColour) {
  return {
    tag: 'stop',
    attributes: { offset, 'stop-color': stopColour },
  };
}

function createLinearGradientAttributes(id, p1, p2) {
  return {
    id,
    gradientUnits: 'userSpaceOnUse',
    x1: p1.x,
    y1: p1.y,
    x2: p2.x,
    y2: p2.y,
  };
}

function createRadialGradientAttributes(id, p1, p2) {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  const r = Math.sqrt(dx * dx + dy * dy);
  return {
    id,
    gradientUnits: 'userSpaceOnUse',
    cx: p1.x,
    cy: p1.y,
    fx: p1.x,
    fy: p1.y,
    r,
  };
}

class ArtworksMapper {
  constructor(renderState, palette = []) {
    this.renderState = renderState;
    this.palette = palette;
    this.fileBoundingBox = new MergingBoundingBox({});
    this.definitions = [];
    this.objects = [];
  }

  getColour(index) {
    const { entries = [] } = this.palette;
    if (index < 0 || index >= entries.length) {
      return 'none';
    }
    const { colour } = entries[index];
    const { r, g, b } = extractRGBComponents(colour);
    return `rgb(${[r, g, b]})`;
  }

  mapArtworks(artworks) {
    this.processLists(artworks.records);
    return {
      fileBoundingBox: this.fileBoundingBox,
      definitions: this.definitions,
      objects: this.objects,
    };
  }

  processLists(lists = []) {
    for (let i = 0; i < lists.length; i += 1) {
      this.processList(lists[i].children);
    }
  }

  processList(list = []) {
    for (let i = 0; i < list.length; i += 1) {
      const record = list[list.length - 1 - i];
      this.processRecord(record);
    }
  }

  processRecord(record) {
    const { type } = record;
    switch (type & 0xFF) {
      case Constants.RECORD_02_PATH:
        this.processLists(record.children);
        this.processPath(record);
        break;
      case Constants.RECORD_24_STROKE_COLOUR:
        this.processStrokeColour(record);
        break;
      case Constants.RECORD_25_STROKE_WIDTH:
        this.processStrokeWidth(record);
        break;
      case Constants.RECORD_26_FILL_COLOUR:
        this.processFillColour(record);
        break;
      case Constants.RECORD_27_JOIN_STYLE:
        this.processJoinStyle(record);
        break;
      case Constants.RECORD_28_LINE_CAP_END:
        this.processLineCapEnd(record);
        break;
      case Constants.RECORD_29_LINE_CAP_START:
        this.processLineCapStart(record);
        break;
      case Constants.RECORD_2A_WINDING_RULE:
        this.processWindingRule(record);
        break;
      case Constants.RECORD_2B_DASH_PATTERN:
        this.processDashPattern(record);
        break;
      case Constants.RECORD_2C:
        this.processLists(record.children);
        this.processPath(record);
        break;
      case Constants.RECORD_34:
        this.processLists(record.children);
        this.processPath(record);
        break;
      case Constants.RECORD_35:
        this.processLists(record.children);
        this.processPath(record);
        break;
      case Constants.RECORD_38:
        this.processLists(record.children);
        this.processPath(record);
        break;
      case Constants.RECORD_3D_BLEND_PATH:
        this.processLists(record.children);
        this.processPath(record);
        break;
      default:
        this.processLists(record.children);
        break;
    }
  }

  processPath({ pointer, path, boundingBox }) {
    this.fileBoundingBox.merge(boundingBox);
    this.objects.push({
      tag: 'path',
      attributes: {
        d: mapPathElements(path),
        ...mapRenderState(this.renderState.getCurrentState()),
      },
      children: [{
        tag: 'desc',
        text: JSON.stringify(pointer),
      }],
    });
    // TODO resetting the state here is a work around
    this.renderState.reset();
  }

  processStrokeColour({ strokeColour }) {
    this.renderState.setStroke(this.getColour(strokeColour));
  }

  processStrokeWidth({ strokeWidth }) {
    this.renderState.setStrokeWidth(strokeWidth);
  }

  processFillColour(data) {
    if (!this.renderState.supportsFills()) {
      return;
    }
    this.renderState.setFill(this.processFillByType(data));
  }

  processFillByType({ fillType, ...data }) {
    switch (fillType) {
      case Constants.FILL_FLAT:
        return this.processFillFlat(data);
      case Constants.FILL_LINEAR:
        return this.processFillLinear(data);
      case Constants.FILL_RADIAL:
        return this.processFillRadial(data);
      default:
        return 'none';
    }
  }

  processFillFlat({ colour }) {
    return this.getColour(colour);
  }

  processFillLinear({ gradientLine, startColour, endColour }) {
    const id = `linear-gradient-${this.definitions.length}`;
    const [p1, p2] = gradientLine;
    const gradient = {
      tag: 'linearGradient',
      attributes: createLinearGradientAttributes(id, p1, p2),
      children: [
        createStopColour('0%', this.getColour(startColour)),
        createStopColour('100%', this.getColour(endColour)),
      ],
    };
    this.definitions.push(gradient);
    return `url(#${id})`;
  }

  processFillRadial({ gradientLine, startColour, endColour }) {
    const id = `radial-gradient-${this.definitions.length}`;
    const [p1, p2] = gradientLine;
    const gradient = {
      tag: 'radialGradient',
      attributes: createRadialGradientAttributes(id, p1, p2),
      children: [
        createStopColour('0%', this.getColour(startColour)),
        createStopColour('100%', this.getColour(endColour)),
      ],
    };
    this.definitions.push(gradient);
    return `url(#${id})`;
  }

  processJoinStyle({ joinStyle }) {
    this.renderState.setJoinStyle(joinStyle);
  }

  processLineCapEnd({ capStyle }) {
    this.renderState.setStrokeLineCapEnd(capStyle);
  }

  processLineCapStart({ capStyle }) {
    this.renderState.setStrokeLineCapStart(capStyle);
  }

  processWindingRule({ windingRule }) {
    this.renderState.setWindingRule(windingRule);
  }

  processDashPattern({ offset = 0, elements = [] }) {
    this.renderState.setDashPattern(offset, elements);
  }
}

function mapArtworks(renderState, artworks) {
  const mapper = new ArtworksMapper(renderState, artworks.palette);

  const {
    fileBoundingBox: {
      minX, minY, maxX, maxY,
    },
    definitions,
    objects,
  } = mapper.mapArtworks(artworks);

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

function mapArtworksOutline(artworks, strokeWidth = 160) {
  return mapArtworks(new RenderState(Modes.MODE_OUTLINE, strokeWidth), artworks);
}

function mapArtworksNormal(artworks) {
  return mapArtworks(new RenderState(Modes.MODE_NORMAL), artworks);
}

module.exports = {
  mapArtworksOutline,
  mapArtworksNormal,
};
