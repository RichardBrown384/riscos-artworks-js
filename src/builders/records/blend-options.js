const Constants = require('../../constants');

const RecordBuilder = require('../structures/record');

const { createRecordBlendOptions } = require('../../types/records');

class RecordBlendOptions extends RecordBuilder {
  #unknown24;

  #blendSteps;

  #unknown32;

  #unknown36;

  #unknown40;

  #unknown44;

  #unknown48;

  #unknown52;

  #unknown56;

  #unknown60;

  constructor() {
    super(Constants.RECORD_3B_BLEND_OPTIONS);
    this.#unknown24 = 0;
    this.#blendSteps = 0;
    this.#unknown32 = -1;
    this.#unknown36 = 0;
    this.#unknown40 = 0;
    this.#unknown44 = 0;
    this.#unknown48 = -1;
    this.#unknown52 = -1;
    this.#unknown56 = -1;
    this.#unknown60 = -1;
  }

  static builder() {
    return new RecordBlendOptions();
  }

  unknown24(v) { this.#unknown24 = v; return this; }

  blendSteps(v) { this.#blendSteps = v; return this; }

  unknown32(v) { this.#unknown32 = v; return this; }

  unknown36(v) { this.#unknown36 = v; return this; }

  unknown40(v) { this.#unknown40 = v; return this; }

  unknown44(v) { this.#unknown44 = v; return this; }

  unknown48(v) { this.#unknown48 = v; return this; }

  unknown52(v) { this.#unknown52 = v; return this; }

  unknown56(v) { this.#unknown56 = v; return this; }

  unknown60(v) { this.#unknown60 = v; return this; }

  buildBody() {
    return createRecordBlendOptions(
      this.#unknown24,
      this.#blendSteps,
      this.#unknown32,
      this.#unknown36,
      this.#unknown40,
      this.#unknown44,
      this.#unknown48,
      this.#unknown52,
      this.#unknown56,
      this.#unknown60,
    );
  }
}

module.exports = RecordBlendOptions;
