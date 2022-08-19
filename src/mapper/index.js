/* eslint-disable no-bitwise */

const MergingBoundingBox = require('./merging-bounding-box');

const Constants = require('../constants');
const { RenderState, Modes } = require('./render-state');
const {
  mapRadialGradient,
  mapLinearGradient,
} = require('./svg/map-gradients');
const mapPath = require('./svg/map-path');
const mapSvg = require('./svg/map-svg');
const { filterRenderStateForPath } = require('./render-state-filter');

function extractRGBComponents(colour) {
  const r = (colour) & 0xFF;
  const g = (colour >> 8) & 0xFF;
  const b = (colour >> 16) & 0xFF;
  return { r, g, b };
}

class ArtworksMapper {
  constructor(renderState, palette = []) {
    this.renderState = renderState;
    this.palette = palette;
    this.fileBoundingBox = new MergingBoundingBox({});
    this.definitions = [];
    this.objects = [];
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
    const currentState = this.renderState.getCurrentState();
    const state = filterRenderStateForPath(path, currentState);
    this.objects.push(mapPath(path, state, pointer));
    // TODO resetting the state here is a work around
    this.renderState.reset();
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

  processStrokeColour({ strokeColour }) {
    this.renderState.setStroke(this.getColour(strokeColour));
  }

  processStrokeWidth({ strokeWidth }) {
    this.renderState.setStrokeWidth(strokeWidth);
  }

  processFillColour(data) {
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
    const gradient = mapLinearGradient(
      id,
      gradientLine,
      this.getColour(startColour),
      this.getColour(endColour),
    );
    this.definitions.push(gradient);
    return `url(#${id})`;
  }

  processFillRadial({ gradientLine, startColour, endColour }) {
    const id = `radial-gradient-${this.definitions.length}`;
    const gradient = mapRadialGradient(
      id,
      gradientLine,
      this.getColour(startColour),
      this.getColour(endColour),
    );
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

function mapArtworksOutline(artworks, strokeWidth = 160) {
  const state = new RenderState(Modes.MODE_OUTLINE, strokeWidth);
  const mapper = new ArtworksMapper(state, artworks.palette);
  const { fileBoundingBox, objects } = mapper.mapArtworks(artworks);

  return mapSvg({ fileBoundingBox, objects });
}

function mapArtworksNormal(artworks) {
  const state = new RenderState(Modes.MODE_NORMAL);
  const mapper = new ArtworksMapper(state, artworks.palette);
  const result = mapper.mapArtworks(artworks);

  return mapSvg(result);
}

module.exports = {
  mapArtworksOutline,
  mapArtworksNormal,
};
