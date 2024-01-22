function degreesToRadians(d) {
  return (d * Math.PI) / 180.0;
}

function lineLength(x0, y0, x1, y1) {
  const x = x1 - x0;
  const y = y1 - y0;
  return Math.sqrt(x * x + y * y);
}

module.exports = {
  degreesToRadians,
  lineLength,
};
