const Constants = require('../../constants');

const { extractBitField, isBitSet } = require('../../common/bitwise');

const ColourResolver = require('../render-state/colour-resolver');

const { RECORD_FILL_FLAT_TRANSPARENT } = require('../render-state/default-attributes');

function headerControlWordPathVisible({ unknown4 }) {
  return isBitSet(unknown4, 1);
}

function isPathFilled(path) {
  return isBitSet(path[0]?.tag, 31);
}

class ArtworksProcessor {
  constructor({ palette, mapper, renderState }) {
    this.colourResolver = new ColourResolver(palette);
    this.mapper = mapper;
    this.renderState = renderState;
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
    const maskedType = extractBitField(record.type, 0, 8);
    switch (maskedType) {
      case Constants.RECORD_02_PATH:
        this.processPath(record);
        break;
      case Constants.RECORD_24_STROKE_COLOUR:
        this.renderState.setStroke(record);
        break;
      case Constants.RECORD_25_STROKE_WIDTH:
        this.renderState.setStrokeWidth(record);
        break;
      case Constants.RECORD_26_FILL_COLOUR:
        this.renderState.setFill(record);
        break;
      case Constants.RECORD_27_JOIN_STYLE:
        this.renderState.setJoinStyle(record);
        break;
      case Constants.RECORD_28_LINE_CAP_END:
        this.renderState.setStrokeLineCapEnd(record);
        break;
      case Constants.RECORD_29_LINE_CAP_START:
        this.renderState.setStrokeLineCapStart(record);
        break;
      case Constants.RECORD_2A_WINDING_RULE:
        this.renderState.setWindingRule(record);
        break;
      case Constants.RECORD_2B_DASH_PATTERN:
        this.renderState.setDashPattern(record);
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
    this.renderState.duplicate();
    this.processLists(children);
    this.processPathInner(data);
    this.renderState.pop();
  }

  processPathInner({ path, boundingBox, ...data }) {
    if (!headerControlWordPathVisible(data)) {
      return;
    }
    if (!isPathFilled(path)) {
      this.renderState.setFill(RECORD_FILL_FLAT_TRANSPARENT);
    }
    this.mapper.boundingBox(boundingBox);
    const state = this.colourResolver.resolveRenderStateColours(this.renderState.peek());
    this.mapper.path(path, state);
  }
}

function process({
  records,
  palette,
  renderState,
  mapper,
}) {
  new ArtworksProcessor({
    palette, mapper, renderState,
  }).processLists(records);
}

module.exports = process;
