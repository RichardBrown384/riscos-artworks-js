const { createRecordHeader, createRecord } = require('../../types/structures');

const { BoundingBox } = require('../primitives');

const EMPTY_BOUNDING_BOX = Object.freeze(BoundingBox.builder().build());

class RecordBuilder {
  #pointer;

  #type;

  #unknown4;

  #boundingBox;

  #lists;

  constructor(type) {
    this.#pointer = null;
    this.#type = type;
    this.#unknown4 = 0;
    this.#boundingBox = EMPTY_BOUNDING_BOX;
    this.#lists = [];
  }

  pointer(v) { this.#pointer = v; return this; }

  unknown4(v) { this.#unknown4 = v; return this; }

  boundingBox(v) { this.#boundingBox = v; return this; }

  lists(v) { this.#lists = v; return this; }

  build() {
    return createRecord(
      this.#pointer,
      createRecordHeader(this.#type, this.#unknown4, this.#boundingBox),
      this.buildBody(),
      this.#lists,
    );
  }

  // eslint-disable-next-line class-methods-use-this
  buildBody() { return {}; }
}

module.exports = RecordBuilder;
