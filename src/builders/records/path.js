const Constants = require('../../constants');

const RecordBuilder = require('./record');

const { createRecordPath } = require('../../types/records');

const EMPTY_PATH = require('./empty-path');

class RecordPath extends RecordBuilder {
  #path;

  constructor() {
    super(Constants.RECORD_PATH);
    this.#path = EMPTY_PATH;
  }

  static builder() {
    return new RecordPath();
  }

  path(v) { this.#path = v; return this; }

  buildBody() {
    return createRecordPath(this.#path);
  }
}

module.exports = RecordPath;
