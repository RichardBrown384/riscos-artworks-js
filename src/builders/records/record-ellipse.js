const Constants = require('../../constants');

const RecordBuilder = require('./record');

const { createRecordEllipse } = require('../../types/records');

const EMPTY_PATH = require('./empty-path');

class RecordEllipse extends RecordBuilder {
  #triangle;

  #path;

  constructor() {
    super(Constants.RECORD_34_ELLIPSE);
    this.#path = EMPTY_PATH;
  }

  static builder() {
    return new RecordEllipse();
  }

  triangle(v) { this.#triangle = v; return this; }

  path(v) { this.#path = v; return this; }

  buildBody() {
    return createRecordEllipse(this.#triangle, this.#path);
  }
}

module.exports = RecordEllipse;
