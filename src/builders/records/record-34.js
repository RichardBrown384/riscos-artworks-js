const Constants = require('../../constants');

const RecordBuilder = require('./record');

const { createRecord34 } = require('../../types/records');

const EMPTY_PATH = require('./empty-path');

class Record34 extends RecordBuilder {
  #triangle;

  #path;

  constructor() {
    super(Constants.RECORD_34);
    this.#path = EMPTY_PATH;
  }

  static builder() {
    return new Record34();
  }

  triangle(v) { this.#triangle = v; return this; }

  path(v) { this.#path = v; return this; }

  buildBody() {
    return createRecord34(this.#triangle, this.#path);
  }
}

module.exports = Record34;
