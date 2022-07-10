const Constants = require('../../constants');

const RecordBuilder = require('./record');

const { createRecordLineCapEnd } = require('../../types/records');

class RecordLineCapEnd extends RecordBuilder {
  #capStyle;

  #capTriangle;

  constructor() {
    super(Constants.RECORD_LINE_CAP_END);
    this.#capStyle = Constants.CAP_BUTT;
    this.#capTriangle = 0;
  }

  static builder() {
    return new RecordLineCapEnd();
  }

  static of(unknown4, capStyle, capTriangle = 0) {
    return RecordLineCapEnd.builder()
      .unknown4(unknown4)
      .capStyle(capStyle)
      .capTriangle(capTriangle)
      .build();
  }

  static capTriangle(width, height) {
    return 65536 * height + width;
  }

  capStyle(v) { this.#capStyle = v; return this; }

  capTriangle(v) { this.#capTriangle = v; return this; }

  buildBody() {
    return createRecordLineCapEnd(this.#capStyle, this.#capTriangle);
  }
}

module.exports = RecordLineCapEnd;
