const Constants = require('../../constants');

const RecordBuilder = require('../structures/record');

const { createRecordBlendPath } = require('../../types/records');

const EMPTY_PATH = require('./empty-path');

class RecordBlendPath extends RecordBuilder {
  #path;

  constructor() {
    super(Constants.RECORD_3D_BLEND_PATH);
    this.#path = EMPTY_PATH;
  }

  static builder() {
    return new RecordBlendPath();
  }

  path(v) { this.#path = v; return this; }

  buildBody() {
    return createRecordBlendPath(this.#path);
  }
}

module.exports = RecordBlendPath;
