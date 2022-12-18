const Constants = require('../../constants');

const RecordBuilder = require('../structures/record');

const { createRecordRoundedRectangle } = require('../../types/records');

const EMPTY_PATH = require('./empty-path');

class RecordRoundedRectangle extends RecordBuilder {
  #cornerRadius;

  #triangle;

  #path;

  constructor() {
    super(Constants.RECORD_35_ROUNDED_RECTANGLE);
    this.#cornerRadius = 0;
    this.#path = EMPTY_PATH;
  }

  static builder() {
    return new RecordRoundedRectangle();
  }

  cornerRadius(v) { this.#cornerRadius = v; return this; }

  triangle(v) { this.#triangle = v; return this; }

  path(v) { this.#path = v; return this; }

  buildBody() {
    return createRecordRoundedRectangle(this.#cornerRadius, this.#triangle, this.#path);
  }
}

module.exports = RecordRoundedRectangle;
