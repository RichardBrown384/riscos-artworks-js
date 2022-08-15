const Constants = require('../../constants');

const RecordBuilder = require('./record');

const { createRecordStrokeWidth } = require('../../types/records');

class RecordStrokeWidth extends RecordBuilder {
  #strokeWidth;

  constructor() {
    super(Constants.RECORD_25_STROKE_WIDTH);
    this.#strokeWidth = 0;
  }

  static builder() {
    return new RecordStrokeWidth();
  }

  static of(unknown4, strokeWidth) {
    return RecordStrokeWidth.builder()
      .unknown4(unknown4)
      .strokeWidth(strokeWidth)
      .build();
  }

  strokeWidth(v) { this.#strokeWidth = v; return this; }

  buildBody() {
    return createRecordStrokeWidth(this.#strokeWidth);
  }
}

module.exports = RecordStrokeWidth;
