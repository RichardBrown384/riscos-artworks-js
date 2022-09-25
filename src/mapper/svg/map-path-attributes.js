const Constants = require('../../constants');
const { extractBitField } = require('../../common/bitwise');

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

function mapAttributeWithDefault(value, map, svgAttributeName, svgDefault) {
  const maskedValue = extractBitField(value, 0, 8);
  return maskedValue !== svgDefault && { [svgAttributeName]: map[maskedValue] };
}

function mapStroke({ stroke }) {
  return { [STROKE]: stroke };
}

function mapStrokeWidth({ strokeWidth }) {
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

function mapFill({ fill }) {
  return { [FILL]: fill };
}

function mapJoinStyle({ joinStyle }) {
  return mapAttributeWithDefault(joinStyle, JOIN_MAP, STROKE_LINEJOIN, Constants.JOIN_MITRE);
}

function mapCapStyle({ capStyle }) {
  return mapAttributeWithDefault(capStyle, CAP_MAP, STROKE_LINECAP, Constants.CAP_BUTT);
}

function mapWindingRule({ windingRule }) {
  return mapAttributeWithDefault(
    windingRule,
    WINDING_RULE_MAP,
    FILL_RULE,
    Constants.WINDING_RULE_NON_ZERO,
  );
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
