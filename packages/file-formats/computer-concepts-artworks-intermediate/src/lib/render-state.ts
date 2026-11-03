import {
  ArtworksRecordDashPattern,
  ArtworksRecordFillColour,
  ArtworksRecordJoinStyle,
  ArtworksRecordLineCapEnd,
  ArtworksRecordLineCapStart,
  ArtworksRecordStrokeColour,
  ArtworksRecordStrokeWidth,
  ArtworksRecordWindingRule,
  createRecordFillColourFlat,
} from '@rbrown/computer-concepts-artworks';

export const RECORD_FILL_FLAT_TRANSPARENT = createRecordFillColourFlat(-1);

export type RenderState = {
  dash: ArtworksRecordDashPattern;
  fill: ArtworksRecordFillColour;
  joinStyle: ArtworksRecordJoinStyle;
  capStyleEnd: ArtworksRecordLineCapEnd;
  capStyleStart: ArtworksRecordLineCapStart;
  stroke: ArtworksRecordStrokeColour;
  strokeWidth: ArtworksRecordStrokeWidth;
  windingRule: ArtworksRecordWindingRule;
};
