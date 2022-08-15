const Constants = require('../../constants');

const RecordBuilder = require('./record');

const { createRecordWorkArea } = require('../../types/records');

class RecordWorkArea extends RecordBuilder {
  #palette;

  constructor() {
    super(Constants.RECORD_21_WORK_AREA);
    this.#palette = 0;
  }

  static builder() {
    return new RecordWorkArea();
  }

  static of(palette) {
    return RecordWorkArea.builder()
      .palette(palette)
      .build();
  }

  palette(v) { this.#palette = v; return this; }

  buildBody() {
    return createRecordWorkArea(this.#palette);
  }
}

module.exports = RecordWorkArea;
