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
    this.stack = [];
    this.stack.push({ ...this.defaultState });
  }

  peek() {
    return this.stack.at(-1);
  }

  pop() {
    this.stack.pop();
  }

  push(state) {
    this.stack.push({ ...state });
  }

  duplicate() {
    this.push(this.peek());
  }

  supportsFills() {
    return this.mode === MODE_NORMAL;
  }

  getCurrentState() {
    return this.supportsFills() ? this.peek() : this.defaultState;
  }

  setStroke(stroke) { this.peek().stroke = stroke; }

  setStrokeWidth(strokeWidth) { this.peek().strokeWidth = strokeWidth; }

  setFill(fill) { this.peek().fill = fill; }

  setJoinStyle(joinStyle) { this.peek().joinStyle = joinStyle; }

  setStrokeLineCapEnd(capStyle) { this.peek().capStyleEnd = capStyle; }

  setStrokeLineCapStart(capStyle) { this.peek().capStyleStart = capStyle; }

  setWindingRule(windingRule) { this.peek().windingRule = windingRule; }

  setDashPattern(offset = 0, elements = []) {
    this.peek().dash = { offset, elements };
  }
}

module.exports = {
  Modes: {
    MODE_OUTLINE,
    MODE_NORMAL,
  },
  RenderState,
};
