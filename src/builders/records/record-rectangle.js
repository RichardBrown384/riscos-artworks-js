const Constants = require('../../constants');

const RecordBuilder = require('../structures/record');

const { createRecordRectangle } = require('../../types/records');

const EMPTY_PATH = require('./empty-path');

class RecordRectangle extends RecordBuilder {
  #unknown24;

  #path;

  constructor() {
    super(Constants.RECORD_2C_RECTANGLE);
    this.#unknown24 = 0;
    this.#path = EMPTY_PATH;
  }

  static builder() {
    return new RecordRectangle();
  }

  unknown24(v) { this.#unknown24 = v; return this; }

  path(v) { this.#path = v; return this; }

  buildBody() {
    return createRecordRectangle(this.#unknown24, this.#path);
  }
}

module.exports = RecordRectangle;
