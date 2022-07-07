const Constants = require('../../constants');

const RecordBuilder = require('./record');

const { createRecordFillColour, createFillGradientFlat } = require('../../types/records');

class RecordFillColourFlat extends RecordBuilder {
  #unknown28;

  #colour;

  constructor() {
    super(Constants.RECORD_FILL_COLOUR);
    this.#unknown28 = 0;
    this.#colour = -1;
  }

  static builder() {
    return new RecordFillColourFlat();
  }

  static of(unknown4, colour) {
    return RecordFillColourFlat.builder()
      .unknown4(unknown4)
      .colour(colour)
      .build();
  }

  unknown28(v) { this.#unknown28 = v; return this; }

  colour(v) { this.#colour = v; return this; }

  buildBody() {
    return createRecordFillColour(
      Constants.FILL_FLAT,
      this.#unknown28,
      createFillGradientFlat(this.#colour),
    );
  }
}

module.exports = RecordFillColourFlat;
