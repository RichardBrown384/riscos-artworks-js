const Constants = require('../constants');

const MODE_OUTLINE = 0;
const MODE_NORMAL = 1;

class RenderState {
  constructor(mode = MODE_OUTLINE, strokeWidth = 160) {
    this.mode = mode;
    this.defaultState = {
      stroke: 'black',
      strokeWidth,
      fill: 'none',
      joinStyle: Constants.JOIN_BEVEL,
      capStyleEnd: Constants.CAP_BUTT,
      capStyleStart: Constants.CAP_BUTT,
      windingRule: Constants.WINDING_RULE_EVEN_ODD,
      dash: {
        offset: 0,
        elements: [],
      },
    };
    this.state = { ...this.defaultState };
  }

  reset() {
    this.state = { ...this.defaultState };
  }

  supportsFills() {
    return this.mode === MODE_NORMAL;
  }

  getCurrentState() {
    return this.supportsFills() ? this.state : this.defaultState;
  }

  setStroke(stroke) { this.state.stroke = stroke; }

  setStrokeWidth(strokeWidth) { this.state.strokeWidth = strokeWidth; }

  setFill(fill) { this.state.fill = fill; }

  setJoinStyle(joinStyle) { this.state.joinStyle = joinStyle; }

  setStrokeLineCapEnd(capStyle) { this.state.capStyleEnd = capStyle; }

  setStrokeLineCapStart(capStyle) { this.state.capStyleStart = capStyle; }

  setWindingRule(windingRule) { this.state.windingRule = windingRule; }

  setDashPattern(offset = 0, elements = []) {
    this.state.dash = { offset, elements };
  }
}

module.exports = {
  Modes: {
    MODE_OUTLINE,
    MODE_NORMAL,
  },
  RenderState,
};
