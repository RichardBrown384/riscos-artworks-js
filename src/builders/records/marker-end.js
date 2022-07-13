const Constants = require('../../constants');

const RecordBuilder = require('./record');

const { createRecordMarkerEnd } = require('../../types/records');

class RecordMarkerEnd extends RecordBuilder {
  #markerStyle;

  #markerWidth;

  #markerHeight;

  constructor() {
    super(Constants.RECORD_3F_MARKER_END);
    this.#markerStyle = Constants.MARKER_NONE;
    this.#markerWidth = 0;
    this.#markerHeight = 0;
  }

  static builder() {
    return new RecordMarkerEnd();
  }

  markerStyle(v) { this.#markerStyle = v; return this; }

  markerWidth(v) { this.#markerWidth = v; return this; }

  markerHeight(v) { this.#markerHeight = v; return this; }

  buildBody() {
    return createRecordMarkerEnd(this.#markerStyle, this.#markerWidth, this.#markerHeight);
  }
}

module.exports = RecordMarkerEnd;
