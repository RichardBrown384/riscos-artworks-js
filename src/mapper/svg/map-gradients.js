function mapStopColour(offset, stopColour) {
  return {
    tag: 'stop',
    attributes: { offset, 'stop-color': stopColour },
  };
}

function mapLinearGradientAttributes(id, p1, p2) {
  return {
    id,
    gradientUnits: 'userSpaceOnUse',
    x1: p1.x,
    y1: p1.y,
    x2: p2.x,
    y2: p2.y,
  };
}

function mapRadialGradientAttributes(id, p1, p2) {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  const r = Math.sqrt(dx * dx + dy * dy);
  return {
    id,
    gradientUnits: 'userSpaceOnUse',
    cx: p1.x,
    cy: p1.y,
    fx: p1.x,
    fy: p1.y,
    r,
  };
}

function mapLinearGradient(id, gradientLine, startColour, endColour) {
  const [p1, p2] = gradientLine;
  return {
    tag: 'linearGradient',
    attributes: mapLinearGradientAttributes(id, p1, p2),
    children: [
      mapStopColour('0%', startColour),
      mapStopColour('100%', endColour),
    ],
  };
}

function mapRadialGradient(id, gradientLine, startColour, endColour) {
  const [p1, p2] = gradientLine;
  return {
    tag: 'radialGradient',
    attributes: mapRadialGradientAttributes(id, p1, p2),
    children: [
      mapStopColour('0%', startColour),
      mapStopColour('100%', endColour),
    ],
  };
}

module.exports = {
  mapLinearGradient,
  mapRadialGradient,
};
