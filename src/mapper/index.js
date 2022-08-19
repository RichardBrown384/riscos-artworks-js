/* eslint-disable no-bitwise */

const MergingBoundingBox = require('./merging-bounding-box');

const Constants = require('../constants');
const { RenderState, Modes } = require('./render-state');
const { filterRenderStateForPath } = require('./render-state-filter');
const rotateArtworks = require('./rotate-artworks');

const {
  mapRadialGradient,
  mapLinearGradient,
  mapPath,
  mapSvg,
  mapColour,
} = require('./svg');

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
      const record = list[i];
      this.processRecord(record);
    }
  }

  processRecord(record) {
    const { type } = record;
    switch (type & 0xFF) {
      case Constants.RECORD_02_PATH:
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
        this.processPath(record);
        break;
      case Constants.RECORD_34:
        this.processPath(record);
        break;
      case Constants.RECORD_35:
        this.processPath(record);
        break;
      case Constants.RECORD_3D_BLEND_PATH:
        this.processPath(record);
        break;
      default:
        this.renderState.duplicate();
        this.processLists(record.children);
        this.renderState.pop();
        break;
    }
  }

  processPath({ children, ...rest }) {
    const { path, boundingBox } = rest;
    this.fileBoundingBox.merge(boundingBox);
    this.renderState.duplicate();
    this.processLists(children);
    const currentState = this.renderState.getCurrentState();
    const state = filterRenderStateForPath(path, currentState);
    this.objects.push(mapPath(path, state, rest));
    this.renderState.pop();
  }

  getColourFromPalette(index) {
    if (index < 0x01000000) {
      return this.palette?.entries[index]?.colour;
    }
    if (index < 0xFFFFFFFF) {
      return index;
    }
    return null;
  }

  getColour(index) {
    return mapColour(this.getColourFromPalette(index));
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
  const rotated = rotateArtworks(artworks);
  const mapper = new ArtworksMapper(state, rotated.palette);
  const { fileBoundingBox, objects } = mapper.mapArtworks(rotated);
  return mapSvg({ fileBoundingBox, objects });
}

function mapArtworksNormal(artworks) {
  const state = new RenderState(Modes.MODE_NORMAL);
  const rotated = rotateArtworks(artworks);
  const mapper = new ArtworksMapper(state, rotated.palette);
  const result = mapper.mapArtworks(rotated);
  return mapSvg(result);
}

module.exports = {
  mapArtworksOutline,
  mapArtworksNormal,
};
