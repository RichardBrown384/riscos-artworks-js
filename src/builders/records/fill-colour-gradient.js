const Constants = require('../../constants');

const RecordBuilder = require('./record');

const { createRecordFillColour, createFillGradientShaded } = require('../../types/records');

class RecordFillColourShaded extends RecordBuilder {
  #type;

  #unknown28;

  #gradientLine;

  #startColour;

  #endColour;

  constructor() {
    super(Constants.RECORD_26_FILL_COLOUR);
    this.#type = Constants.FILL_LINEAR;
    this.#unknown28 = 0;
    this.#gradientLine = null;
    this.#startColour = -1;
    this.#endColour = -1;
  }

  static builder() {
    return new RecordFillColourShaded();
  }

  type(v) { this.#type = v; return this; }

  unknown28(v) { this.#unknown28 = v; return this; }

  gradientLine(v) { this.#gradientLine = v; return this; }

  startColour(v) { this.#startColour = v; return this; }

  endColour(v) { this.#endColour = v; return this; }

  buildBody() {
    return createRecordFillColour(
      this.#type,
      this.#unknown28,
      createFillGradientShaded(this.#gradientLine, this.#startColour, this.#endColour),
    );
  }
}

module.exports = RecordFillColourShaded;
