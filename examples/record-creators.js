const {
  Builders: {
    Lists,
    List,
    ColourIndex,
    PathBoundingBox,
    Polyline,

    RecordPath,
    RecordLayer,
    RecordWorkArea,
    RecordStrokeColour,
    RecordStrokeWidth,
    RecordFillColourFlat,
    RecordFillColourGradient,
    RecordWindingRule,
    RecordDashPatternEmpty,
    Record2C,
    Record34,
    RecordBlendGroup,
    RecordBlendOptions,
    RecordBlendPath,
  },

  Constants: {
    UNKNOWN_4_BIT_0,
    UNKNOWN_4_BIT_1,
  },

} = require('../src').Artworks;

function createColourIndex(colour) {
  return ColourIndex.of(colour);
}

function createAttributeLists(attributes) {
  const listsBuilder = Lists.builder();
  for (let i = 0; i < attributes.length; i += 1) {
    listsBuilder.push(List.of(attributes[i]));
  }
  return Object.freeze(listsBuilder.build());
}

function createRecordPath(path, padding, ...attributes) {
  const record = RecordPath.builder()
    .unknown4(UNKNOWN_4_BIT_1)
    .boundingBox(PathBoundingBox.of(path, padding))
    .path(path)
    .lists(createAttributeLists(attributes))
    .build();
  return Object.freeze(record);
}

function createRecordLayer(unknown24, name, ...lists) {
  const record = RecordLayer.builder()
    .unknown24(unknown24)
    .name(name)
    .lists(Lists.of(...lists))
    .build();
  return Object.freeze(record);
}

function createRecordWorkArea(palette) {
  return Object.freeze(RecordWorkArea.of(palette));
}

function createRecordStrokeWidth(strokeWidth) {
  return Object.freeze(RecordStrokeWidth.of(UNKNOWN_4_BIT_0, strokeWidth));
}

function createRecordStrokeColour(strokeColour) {
  return Object.freeze(RecordStrokeColour.of(UNKNOWN_4_BIT_0, createColourIndex(strokeColour)));
}

function createRecordFillColourFlat(colour) {
  return Object.freeze(RecordFillColourFlat.of(UNKNOWN_4_BIT_0, createColourIndex(colour)));
}

function createRecordFillColourGradient(type, x0, y0, x1, y1, startColour, endColour) {
  const record = RecordFillColourGradient.builder()
    .unknown4(UNKNOWN_4_BIT_0)
    .type(type)
    .gradientLine(Polyline.builder()
      .push(x0, y0)
      .push(x1, y1)
      .build())
    .startColour(createColourIndex(startColour))
    .endColour(createColourIndex(endColour))
    .build();
  return Object.freeze(record);
}

function createRecordWindingRule(windingRule) {
  return Object.freeze(RecordWindingRule.of(UNKNOWN_4_BIT_0, windingRule));
}

function createRecordDashPatternEmpty() {
  return Object.freeze(RecordDashPatternEmpty.of(UNKNOWN_4_BIT_0));
}

function createRecord2C(path, padding, unknown24, ...attributes) {
  const record = Record2C.builder()
    .unknown4(UNKNOWN_4_BIT_1)
    .boundingBox(PathBoundingBox.of(path, padding))
    .unknown24(unknown24)
    .path(path)
    .lists(createAttributeLists(attributes))
    .build();
  return Object.freeze(record);
}

function createRecord34(path, padding, triangle, ...attributes) {
  const record = Record34.builder()
    .unknown4(UNKNOWN_4_BIT_1)
    .boundingBox(PathBoundingBox.of(path, 10_000))
    .triangle(triangle)
    .path(path)
    .lists(createAttributeLists(attributes))
    .build();
  return Object.freeze(record);
}

function createRecordBlendGroup(boundingBox, ...lists) {
  const record = RecordBlendGroup.builder()
    .unknown4(UNKNOWN_4_BIT_1)
    .boundingBox(boundingBox)
    .lists(Lists.of(...lists))
    .build();
  return Object.freeze(record);
}

function createRecordBlendOptions(boundingBox, blendSteps) {
  const record = RecordBlendOptions.builder()
    .unknown4(UNKNOWN_4_BIT_1)
    .boundingBox(boundingBox)
    .blendSteps(blendSteps)
    .build();
  return Object.freeze(record);
}

function createRecordBlendPath(path, padding) {
  const record = RecordBlendPath.builder()
    .boundingBox(PathBoundingBox.of(path, padding))
    .path(path)
    .build();
  return Object.freeze(record);
}

module.exports = {
  createRecordPath,
  createRecordLayer,
  createRecordWorkArea,
  createRecordStrokeWidth,
  createRecordStrokeColour,
  createRecordFillColourFlat,
  createRecordFillColourGradient,
  createRecordWindingRule,
  createRecordDashPatternEmpty,
  createRecord2C,
  createRecord34,
  createRecordBlendGroup,
  createRecordBlendOptions,
  createRecordBlendPath,
};
