const { createRecordHeader } = require('../../types/records');

const { BoundingBox } = require('../primitives');

const EMPTY_BOUNDING_BOX = Object.freeze(BoundingBox.builder().build());

class RecordBuilder {
  #type;

  #unknown4;

  #boundingBox;

  #children;

  constructor(type) {
    this.#type = type;
    this.#unknown4 = 0;
    this.#boundingBox = EMPTY_BOUNDING_BOX;
    this.#children = [];
  }

  unknown4(v) { this.#unknown4 = v; return this; }

  boundingBox(v) { this.#boundingBox = v; return this; }

  lists(v) { this.#children = v; return this; }

  build() {
    return {
      ...createRecordHeader(this.#type, this.#unknown4, this.#boundingBox),
      ...this.buildBody(),
      children: this.#children,
    };
  }

  // eslint-disable-next-line class-methods-use-this
  buildBody() { return {}; }
}

module.exports = RecordBuilder;
