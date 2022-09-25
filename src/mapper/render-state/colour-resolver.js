const Constants = require('../../constants');

class ColourResolver {
  constructor(palette) {
    this.palette = palette;
  }

  resolveColour(index) {
    if (index < 0x01000000) {
      return this.palette?.entries[index]?.colour;
    }
    if (index < 0xFFFFFFFF) {
      return index;
    }
    return null;
  }

  resolveStrokeColour({ strokeColour, ...data }) {
    return {
      ...data,
      strokeColour: this.resolveColour(strokeColour),
    };
  }

  resolveFillColour(fill) {
    const { fillType } = fill;
    if (fillType === Constants.FILL_FLAT) {
      return this.resolveFlatFillColours(fill);
    }
    if (fillType === Constants.FILL_LINEAR || fillType === Constants.FILL_RADIAL) {
      return this.resolveGradientFillColours(fill);
    }
    throw new Error('Unsupported fill type');
  }

  resolveFlatFillColours({ colour, ...data }) {
    return {
      ...data,
      colour: this.resolveColour(colour),
    };
  }

  resolveGradientFillColours({ startColour, endColour, ...data }) {
    return {
      ...data,
      startColour: this.resolveColour(startColour),
      endColour: this.resolveColour(endColour),
    };
  }

  resolveRenderStateColours(renderState) {
    return {
      ...renderState,
      stroke: this.resolveStrokeColour(renderState.stroke),
      fill: this.resolveFillColour(renderState.fill),
    };
  }
}

module.exports = ColourResolver;
