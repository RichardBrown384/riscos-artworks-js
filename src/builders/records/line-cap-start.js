const Constants = require('../../constants');

const RecordBuilder = require('./record');

const { createRecordLineCapStart } = require('../../types/records');

class RecordLineCapStart extends RecordBuilder {
  #capStyle;

  #capTriangle;

  constructor() {
    super(Constants.RECORD_29_LINE_CAP_START);
    this.#capStyle = Constants.CAP_BUTT;
    this.#capTriangle = 0;
  }

  static builder() {
    return new RecordLineCapStart();
  }

  static of(unknown4, capStyle, capTriangle) {
    return RecordLineCapStart.builder()
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
    return createRecordLineCapStart(this.#capStyle, this.#capTriangle);
  }
}

module.exports = RecordLineCapStart;
