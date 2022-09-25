const preprocessEdgeCaseFills = require('./preprocess-edge-case-fills');

class RenderState {
  #stack;

  #fillId;

  constructor(state) {
    this.#stack = [{ ...state }];
    this.#stack[0].fill = {
      ...preprocessEdgeCaseFills(state.fill),
      fillId: 0,
    };
    this.#fillId = 1;
  }

  peek() { return this.#stack.at(-1); }

  pop() { this.#stack.pop(); }

  push(state) { this.#stack.push({ ...state }); }

  duplicate() { this.push(this.peek()); }

  setStroke(stroke) { this.peek().stroke = stroke; }

  setStrokeWidth(strokeWidth) { this.peek().strokeWidth = strokeWidth; }

  setFill(fill) {
    this.peek().fill = {
      ...preprocessEdgeCaseFills(fill),
      fillId: this.#fillId,
    };
    this.#fillId += 1;
  }

  setJoinStyle(joinStyle) { this.peek().joinStyle = joinStyle; }

  setStrokeLineCapEnd(capStyle) { this.peek().capStyleEnd = capStyle; }

  setStrokeLineCapStart(capStyle) { this.peek().capStyleStart = capStyle; }

  setWindingRule(windingRule) { this.peek().windingRule = windingRule; }

  setDashPattern(dash) { this.peek().dash = dash; }
}

module.exports = RenderState;
