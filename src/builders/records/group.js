const Constants = require('../../constants');

const RecordBuilder = require('./record');

const { createRecordGroup } = require('../../types/records');

class RecordGroup extends RecordBuilder {
  #unknown24;

  #unknown28;

  #unknown32;

  constructor() {
    super(Constants.RECORD_GROUP);
    this.#unknown24 = 0;
    this.#unknown28 = 0;
    this.#unknown32 = 0;
  }

  static builder() {
    return new RecordGroup();
  }

  unknown24(v) { this.#unknown24 = v; return this; }

  unknown28(v) { this.#unknown28 = v; return this; }

  unknown32(v) { this.#unknown32 = v; return this; }

  buildBody() {
    return createRecordGroup(this.#unknown24, this.#unknown28, this.#unknown32);
  }
}

module.exports = RecordGroup;
