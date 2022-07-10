const Constants = require('../../constants');

const RecordBuilder = require('./record');

const { createRecordWindingRule } = require('../../types/records');

class RecordWindingRule extends RecordBuilder {
  #windingRule;

  constructor() {
    super(Constants.RECORD_WINDING_RULE);
    this.#windingRule = Constants.WINDING_RULE_EVEN_ODD;
  }

  static builder() {
    return new RecordWindingRule();
  }

  static of(unknown4, windingRule) {
    return RecordWindingRule.builder()
      .unknown4(unknown4)
      .windingRule(windingRule)
      .build();
  }

  windingRule(v) { this.#windingRule = v; return this; }

  buildBody() {
    return createRecordWindingRule(this.#windingRule);
  }
}

module.exports = RecordWindingRule;
