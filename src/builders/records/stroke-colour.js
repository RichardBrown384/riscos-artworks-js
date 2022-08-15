const Constants = require('../../constants');

const RecordBuilder = require('./record');

const { createRecordStrokeColour } = require('../../types/records');

class RecordStrokeColour extends RecordBuilder {
  #strokeColour;

  constructor() {
    super(Constants.RECORD_24_STROKE_COLOUR);
    this.#strokeColour = 0;
  }

  static builder() {
    return new RecordStrokeColour();
  }

  static of(unknown4, strokeColour) {
    return RecordStrokeColour.builder()
      .unknown4(unknown4)
      .strokeColour(strokeColour)
      .build();
  }

  strokeColour(v) { this.#strokeColour = v; return this; }

  buildBody() {
    return createRecordStrokeColour(this.#strokeColour);
  }
}

module.exports = RecordStrokeColour;
