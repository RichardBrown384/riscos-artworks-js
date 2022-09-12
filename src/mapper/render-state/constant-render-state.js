/* eslint-disable class-methods-use-this */

const preprocessEdgeCaseFills = require('./preprocess-edge-case-fills');

class ConstantRenderState {
  #state;

  constructor(state) {
    this.#state = { ...state };
    this.#state.fill = {
      ...preprocessEdgeCaseFills(state.fill),
      fillId: 0,
    };
  }

  peek() { return this.#state; }

  pop() { }

  push() { }

  duplicate() { }

  setStroke() { }

  setStrokeWidth() { }

  setFill() {}

  setJoinStyle() { }

  setStrokeLineCapEnd() { }

  setStrokeLineCapStart() { }

  setWindingRule() { }

  setDashPattern() { }
}

module.exports = ConstantRenderState;
