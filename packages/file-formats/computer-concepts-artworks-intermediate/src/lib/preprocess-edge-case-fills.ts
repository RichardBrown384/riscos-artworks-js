import {
  ARTWORKS_FILL_TYPE_TAG,
  ArtworksPolyline,
  ArtworksRecordFillColour,
  createRecordFillColourFlat,
} from '@rbrown/computer-concepts-artworks';

function isPoint([p1, p2]: ArtworksPolyline): boolean {
  return p1.x === p2.x && p1.y === p2.y;
}

export function preprocessEdgeCaseFills(
  fill: ArtworksRecordFillColour,
): ArtworksRecordFillColour {
  switch (fill.body.fillType) {
    case ARTWORKS_FILL_TYPE_TAG.LINEAR: {
      const { gradientLine, startColour } = fill.body.gradient;
      if (isPoint(gradientLine)) {
        return createRecordFillColourFlat(startColour);
      }
      return fill;
    }
    case ARTWORKS_FILL_TYPE_TAG.RADIAL: {
      const { gradientLine, endColour } = fill.body.gradient;
      if (isPoint(gradientLine)) {
        return createRecordFillColourFlat(endColour);
      }
      return fill;
    }
    default:
      return fill;
  }
}
