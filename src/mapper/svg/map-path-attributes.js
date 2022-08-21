/* eslint-disable no-bitwise */

const Constants = require('../../constants');

const FILL = 'fill';
const FILL_RULE = 'fill-rule';
const STROKE = 'stroke';
const STROKE_WIDTH = 'stroke-width';
const STROKE_LINECAP = 'stroke-linecap';
const STROKE_LINEJOIN = 'stroke-linejoin';
const STROKE_DASHOFFSET = 'stroke-dashoffset';
const STROKE_DASHARRAY = 'stroke-dasharray';
const VECTOR_EFFECT = 'vector-effect';

const JOIN_MAP = {
  [Constants.JOIN_MITRE]: 'miter',
  [Constants.JOIN_ROUND]: 'round',
  [Constants.JOIN_BEVEL]: 'bevel',
};

const CAP_MAP = {
  [Constants.CAP_BUTT]: 'butt',
  [Constants.CAP_ROUND]: 'round',
  [Constants.CAP_SQUARE]: 'square',
  [Constants.CAP_TRIANGLE]: 'butt',
};

const WINDING_RULE_MAP = {
  [Constants.WINDING_RULE_NON_ZERO]: 'nonzero',
  [Constants.WINDING_RULE_EVEN_ODD]: 'evenodd',
};

function mapStroke(stroke) {
  return { [STROKE]: stroke };
}

function mapStrokeWidth(strokeWidth) {
  if (strokeWidth !== 0) {
    return { [STROKE_WIDTH]: strokeWidth };
  }
  return {
    // I would have thought 1px would be correct, but Chrome produces thicker
    // lines than are perhaps desirable
    [STROKE_WIDTH]: '0.5px',
    [VECTOR_EFFECT]: 'non-scaling-stroke',
  };
}

function mapFill(fill) {
  return { [FILL]: fill };
}

function mapJoinStyle(joinStyle) {
  const maskedJoinStyle = joinStyle & 0xFF;
  return maskedJoinStyle !== Constants.JOIN_MITRE
      && { [STROKE_LINEJOIN]: JOIN_MAP[maskedJoinStyle] };
}

function mapCapStyle(capStyle) {
  const maskedCapStyle = capStyle & 0xFF;
  return maskedCapStyle !== Constants.CAP_BUTT
      && { [STROKE_LINECAP]: CAP_MAP[maskedCapStyle] };
}

function mapWindingRule(windingRule) {
  const maskedWindingRule = windingRule & 0xFF;
  return maskedWindingRule !== Constants.WINDING_RULE_NON_ZERO
      && { [FILL_RULE]: WINDING_RULE_MAP[maskedWindingRule] };
}

function mapDashOffset({ offset = 0 }) {
  return offset !== 0 && { [STROKE_DASHOFFSET]: offset };
}

function mapDashElements({ elements = [] }) {
  return elements.length !== 0 && { [STROKE_DASHARRAY]: elements };
}

function mapPathAttributes({
  stroke,
  strokeWidth,
  fill,
  joinStyle,
  capStyleStart,
  windingRule,
  dash,
}) {
  return {
    ...mapStroke(stroke),
    ...mapStrokeWidth(strokeWidth),
    ...mapFill(fill),
    ...mapJoinStyle(joinStyle),
    ...mapCapStyle(capStyleStart),
    ...mapWindingRule(windingRule),
    ...mapDashOffset(dash),
    ...mapDashElements(dash),
  };
}

module.exports = mapPathAttributes;
