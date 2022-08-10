const {
  Builders: {
    Lists,
    List,
    PathBoundingBox,
    Polyline,

    RecordPath,
    RecordLayer,
    RecordWorkArea,
    RecordStrokeColour,
    RecordStrokeWidth,
    RecordFillColourFlat,
    RecordFillColourGradient,
    Record2C,
    Record34,
  },

  UNKNOWN_4_BIT_0,
  UNKNOWN_4_BIT_1,

} = require('../src/artworks');

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

function createRecordLayer(unknown24, name) {
  const record = RecordLayer
    .builder()
    .unknown24(unknown24)
    .name(name)
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
  return Object.freeze(RecordStrokeColour.of(UNKNOWN_4_BIT_0, strokeColour));
}

function createRecordFillColourFlat(colour) {
  return Object.freeze(RecordFillColourFlat.of(UNKNOWN_4_BIT_0, colour));
}

function createRecordFillColourGradient(type, x0, y0, x1, y1, startColour, endColour) {
  const record = RecordFillColourGradient.builder()
    .unknown4(UNKNOWN_4_BIT_0)
    .type(type)
    .gradientLine(Polyline.builder()
      .push(x0, y0)
      .push(x1, y1)
      .build())
    .startColour(startColour)
    .endColour(endColour)
    .build();
  return Object.freeze(record);
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

module.exports = {
  createRecordPath,
  createRecordLayer,
  createRecordWorkArea,
  createRecordStrokeWidth,
  createRecordStrokeColour,
  createRecordFillColourFlat,
  createRecordFillColourGradient,
  createRecord2C,
  createRecord34,
};
