const {
  Builders: {
    Artworks,
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
    RecordJoinStyle,
    RecordLineCapEnd,
    RecordLineCapStart,
    RecordWindingRule,
    RecordDashPatternEmpty,
    RecordDashPattern,
    RecordRectangle,
    RecordEllipse,
    RecordBlendGroup,
    RecordBlendOptions,
    RecordBlendPath,
    RecordMarkerStart,
    RecordMarkerEnd,
  },

  Constants: {
    UNKNOWN_4_BIT_0,
    UNKNOWN_4_BIT_1,
  },

} = require('../src').Artworks;

function createArtworks(...lists) {
  return Artworks.builder()
    .lists(Lists.of(...lists))
    .build();
}

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

function createRecordJoinStyle(joinStyle) {
  return Object.freeze(RecordJoinStyle.of(UNKNOWN_4_BIT_0, joinStyle));
}

function createRecordLineCapEnd(capStyle, triangleWidth = 0, triangleHeight = 0) {
  const capTriangle = RecordLineCapEnd.capTriangle(128 * triangleWidth, 128 * triangleHeight);
  return Object.freeze(RecordLineCapEnd.of(UNKNOWN_4_BIT_0, capStyle, capTriangle));
}

function createRecordLineCapStart(capStyle, triangleWidth = 0, triangleHeight = 0) {
  const capTriangle = RecordLineCapStart.capTriangle(128 * triangleWidth, 128 * triangleHeight);
  return Object.freeze(RecordLineCapStart.of(UNKNOWN_4_BIT_0, capStyle, capTriangle));
}

function createRecordWindingRule(windingRule) {
  return Object.freeze(RecordWindingRule.of(UNKNOWN_4_BIT_0, windingRule));
}

function createRecordDashPatternEmpty() {
  return Object.freeze(RecordDashPatternEmpty.of(UNKNOWN_4_BIT_0));
}

function createRecordDashPattern(offset, ...elements) {
  const record = RecordDashPattern.builder()
    .unknown4(UNKNOWN_4_BIT_0)
    .offset(offset)
    .elements(...elements)
    .build();
  return Object.freeze(record);
}

function createRecordRectangle(path, padding, unknown24, ...attributes) {
  const record = RecordRectangle.builder()
    .unknown4(UNKNOWN_4_BIT_1)
    .boundingBox(PathBoundingBox.of(path, padding))
    .unknown24(unknown24)
    .path(path)
    .lists(createAttributeLists(attributes))
    .build();
  return Object.freeze(record);
}

function createRecordEllipse(path, padding, triangle, ...attributes) {
  const record = RecordEllipse.builder()
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

function createRecordStartMarker(markerStyle, width = 0, height = 0) {
  const record = RecordMarkerStart.builder()
    .unknown4(UNKNOWN_4_BIT_0)
    .markerStyle(markerStyle)
    .markerWidth(0x10000 * width)
    .markerHeight(0x10000 * height)
    .build();
  return Object.freeze(record);
}

function createRecordEndMarker(markerStyle, width = 0, height = 0) {
  const record = RecordMarkerEnd.builder()
    .unknown4(UNKNOWN_4_BIT_0)
    .markerStyle(markerStyle)
    .markerWidth(0x10000 * width)
    .markerHeight(0x10000 * height)
    .build();
  return Object.freeze(record);
}

module.exports = {
  createArtworks,
  createRecordPath,
  createRecordLayer,
  createRecordWorkArea,
  createRecordStrokeWidth,
  createRecordStrokeColour,
  createRecordFillColourFlat,
  createRecordFillColourGradient,
  createRecordJoinStyle,
  createRecordLineCapEnd,
  createRecordLineCapStart,
  createRecordWindingRule,
  createRecordDashPatternEmpty,
  createRecordDashPattern,
  createRecordRectangle,
  createRecordEllipse,
  createRecordBlendGroup,
  createRecordBlendOptions,
  createRecordBlendPath,
  createRecordStartMarker,
  createRecordEndMarker,
};
