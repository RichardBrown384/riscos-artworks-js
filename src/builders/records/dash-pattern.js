const Constants = require('../../constants');

const RecordBuilder = require('../structures/record');

const { createRecordDashPattern } = require('../../types/records');

class RecordDashPattern extends RecordBuilder {
  #offset;

  #elements;

  constructor() {
    super(Constants.RECORD_2B_DASH_PATTERN);
    this.#offset = 0;
    this.#elements = [];
  }

  static builder() {
    return new RecordDashPattern();
  }

  offset(v) { this.#offset = v; return this; }

  elements(...v) { this.#elements = v; return this; }

  buildBody() {
    return createRecordDashPattern(this.#offset, this.#elements);
  }
}

module.exports = RecordDashPattern;
