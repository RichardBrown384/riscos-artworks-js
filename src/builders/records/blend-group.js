const Constants = require('../../constants');

const RecordBuilder = require('./record');

const { createRecordBlendGroup } = require('../../types/records');

class RecordBlendGroup extends RecordBuilder {
  #unknown24;

  #unknown28;

  #unknown32;

  #unknown36;

  #unknown40;

  #unknown44;

  #unknown48;

  #unknown52;

  #unknown56;

  #unknown60;

  #unknown64;

  constructor() {
    super(Constants.RECORD_3A_BLEND_GROUP);
    this.#unknown24 = 0;
    this.#unknown28 = 0;
    this.#unknown32 = 0;
    this.#unknown36 = 0;
    this.#unknown40 = 0;
    this.#unknown44 = -1;
    this.#unknown48 = -1;
    this.#unknown52 = -1;
    this.#unknown56 = -1;
    this.#unknown60 = -1;
    this.#unknown64 = -1;
  }

  static builder() {
    return new RecordBlendGroup();
  }

  unknown24(v) { this.#unknown24 = v; return this; }

  unknown28(v) { this.#unknown28 = v; return this; }

  unknown32(v) { this.#unknown32 = v; return this; }

  unknown36(v) { this.#unknown36 = v; return this; }

  unknown40(v) { this.#unknown40 = v; return this; }

  unknown44(v) { this.#unknown44 = v; return this; }

  unknown48(v) { this.#unknown48 = v; return this; }

  unknown52(v) { this.#unknown52 = v; return this; }

  unknown56(v) { this.#unknown56 = v; return this; }

  unknown60(v) { this.#unknown60 = v; return this; }

  unknown64(v) { this.#unknown64 = v; return this; }

  buildBody() {
    return createRecordBlendGroup(
      this.#unknown24,
      this.#unknown28,
      this.#unknown32,
      this.#unknown36,
      this.#unknown40,
      this.#unknown44,
      this.#unknown48,
      this.#unknown52,
      this.#unknown56,
      this.#unknown60,
      this.#unknown64,
    );
  }
}

module.exports = RecordBlendGroup;
