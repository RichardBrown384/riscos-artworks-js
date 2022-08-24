const Constants = require('../constants');

const MergingBoundingBox = require('./merging-bounding-box');

const { RenderState, Modes } = require('./render-state');
const { preprocessRenderStateForPath } = require('./preprocess-render-state');
const preprocessFillColour = require('./preprocess-fills');

const { denormalise } = require('../normalisation');

const {
  mapRadialGradient,
  mapLinearGradient,
  mapPath,
  mapSvg,
  mapColour,
} = require('./svg');

const { extractBitField, isBitSet } = require('../common/bitwise');

function headerControlWordPathVisible({ unknown4 }) {
  return isBitSet(unknown4, 1);
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
      const record = list[i];
      this.processRecord(record);
    }
  }

  processRecord(record) {
    const { type } = record;
    const maskedType = extractBitField(type, 0, 8);
    switch (maskedType) {
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
      case Constants.RECORD_2C_RECTANGLE:
        this.processPath(record);
        break;
      case Constants.RECORD_34_ELLIPSE:
        this.processPath(record);
        break;
      case Constants.RECORD_35_ROUNDED_RECTANGLE:
        this.processPath(record);
        break;
      default:
        this.renderState.duplicate();
        this.processLists(record.children);
        this.renderState.pop();
        break;
    }
  }

  processPath({ children, ...data }) {
    const { path, boundingBox } = data;
    this.renderState.duplicate();
    this.processLists(children);
    if (headerControlWordPathVisible(data)) {
      this.fileBoundingBox.merge(boundingBox);
      const state = this.renderState.getCurrentState();
      const preprocessedState = preprocessRenderStateForPath(path, state);
      this.objects.push(mapPath(path, preprocessedState, data));
    }
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
    const preprocessedFillColour = preprocessFillColour(data);
    const processedFill = this.processFillByType(preprocessedFillColour);
    this.renderState.setFill(processedFill);
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

function mapArtworksOutline(artworks) {
  const state = new RenderState(Modes.MODE_OUTLINE);
  const denormalised = denormalise(artworks);
  const mapper = new ArtworksMapper(state, denormalised.palette);
  const { fileBoundingBox, objects } = mapper.mapArtworks(denormalised);
  return mapSvg({ fileBoundingBox, objects });
}

function mapArtworksNormal(artworks) {
  const state = new RenderState(Modes.MODE_NORMAL);
  const denormalised = denormalise(artworks);
  const mapper = new ArtworksMapper(state, denormalised.palette);
  const result = mapper.mapArtworks(denormalised);
  return mapSvg(result);
}

module.exports = {
  mapArtworksOutline,
  mapArtworksNormal,
};
