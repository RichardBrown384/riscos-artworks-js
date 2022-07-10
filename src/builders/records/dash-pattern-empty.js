const Constants = require('../../constants');

const RecordBuilder = require('./record');

const { createRecordDashPatternEmpty } = require('../../types/records');

class RecordDashPatternEmpty extends RecordBuilder {
  constructor() {
    super(Constants.RECORD_DASH_PATTERN);
  }

  static builder() {
    return new RecordDashPatternEmpty();
  }

  static of(unknown4) {
    return RecordDashPatternEmpty.builder()
      .unknown4(unknown4)
      .build();
  }

  // eslint-disable-next-line class-methods-use-this
  buildBody() {
    return createRecordDashPatternEmpty();
  }
}

module.exports = RecordDashPatternEmpty;
