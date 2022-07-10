const Constants = require('../../constants');

const RecordBuilder = require('./record');

const { createRecordLayer } = require('../../types/records');

class RecordLayer extends RecordBuilder {
  #unknown24;

  #name;

  constructor() {
    super(Constants.RECORD_LAYER);
    this.#unknown24 = 0;
    this.#name = 0;
  }

  static builder() {
    return new RecordLayer();
  }

  unknown24(v) { this.#unknown24 = v; return this; }

  name(v) { this.#name = v; return this; }

  buildBody() {
    return createRecordLayer(this.#unknown24, this.#name);
  }
}

module.exports = RecordLayer;
