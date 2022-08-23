const Constants = require('../../constants');

const RecordBuilder = require('./record');

const { createRecordRectangle } = require('../../types/records');

const EMPTY_PATH = require('./empty-path');

class Record2C extends RecordBuilder {
  #unknown24;

  #path;

  constructor() {
    super(Constants.RECORD_2C_RECTANGLE);
    this.#unknown24 = 0;
    this.#path = EMPTY_PATH;
  }

  static builder() {
    return new Record2C();
  }

  unknown24(v) { this.#unknown24 = v; return this; }

  path(v) { this.#path = v; return this; }

  buildBody() {
    return createRecordRectangle(this.#unknown24, this.#path);
  }
}

module.exports = Record2C;
