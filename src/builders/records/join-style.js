const Constants = require('../../constants');

const RecordBuilder = require('./record');

const { createRecordJoinStyle } = require('../../types/records');

class RecordJoinStyle extends RecordBuilder {
  #joinStyle;

  constructor() {
    super(Constants.RECORD_27_JOIN_STYLE);
    this.#joinStyle = Constants.JOIN_BEVEL;
  }

  static builder() {
    return new RecordJoinStyle();
  }

  static of(unknown4, joinStyle) {
    return RecordJoinStyle.builder()
      .unknown4(unknown4)
      .joinStyle(joinStyle)
      .build();
  }

  joinStyle(v) { this.#joinStyle = v; return this; }

  buildBody() {
    return createRecordJoinStyle(this.#joinStyle);
  }
}

module.exports = RecordJoinStyle;
