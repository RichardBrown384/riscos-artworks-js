const Constants = require('../../constants');

const RecordBuilder = require('./record');

const { createRecordMarkerStart } = require('../../types/records');

class RecordMarkerStart extends RecordBuilder {
  #markerStyle;

  #markerWidth;

  #markerHeight;

  constructor() {
    super(Constants.RECORD_3E_MARKER_START);
    this.#markerStyle = Constants.MARKER_NONE;
    this.#markerWidth = 0;
    this.#markerHeight = 0;
  }

  static builder() {
    return new RecordMarkerStart();
  }

  markerStyle(v) { this.#markerStyle = v; return this; }

  markerWidth(v) { this.#markerWidth = v; return this; }

  markerHeight(v) { this.#markerHeight = v; return this; }

  buildBody() {
    return createRecordMarkerStart(this.#markerStyle, this.#markerWidth, this.#markerHeight);
  }
}

module.exports = RecordMarkerStart;
