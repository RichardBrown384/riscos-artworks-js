import {
  ARTWORKS_JOIN_STYLE_TAG,
  ARTWORKS_LINE_CAP_STYLE_TAG,
  ARTWORKS_WINDING_RULE_TAG,
  ArtworksFile,
  createRecordDashPatternEmpty,
  createRecordJoinStyle,
  createRecordLineCapEnd,
  createRecordLineCapStart,
  createRecordStrokeColour,
  createRecordStrokeWidth,
  createRecordWindingRule,
  Palette,
} from '@rbrown/computer-concepts-artworks';
import { IrRootNode } from '@rbrown/intermediate';
import { SpriteArea } from '@rbrown/riscos-sprite';

import { Mapper } from './mapper.js';
import { denormalise } from './normalisation.js';
import { artworksProcess } from './processor.js';
import { RECORD_FILL_FLAT_TRANSPARENT, RenderState } from './render-state.js';

const EMPTY_PALETTE: Palette = {
  count: 0,
  unknown4: 0,
  entries: [],
} as const;

const EMPTY_SPRITE_AREA: SpriteArea = {
  controlBlock: {
    sizeInBytes: 0,
    spriteCount: 0,
    spriteOffset: 0,
    freeOffset: 0,
  },
  sprites: [],
};

const INITIAL_RENDER_STATE: RenderState = {
  stroke: createRecordStrokeColour(0x01000000),
  strokeWidth: createRecordStrokeWidth(160),
  fill: RECORD_FILL_FLAT_TRANSPARENT, // TODO maybe define this here and pass it into the mapper
  joinStyle: createRecordJoinStyle(ARTWORKS_JOIN_STYLE_TAG.BEVEL),
  capStyleEnd: createRecordLineCapEnd(ARTWORKS_LINE_CAP_STYLE_TAG.BUTT, 0),
  capStyleStart: createRecordLineCapStart(ARTWORKS_LINE_CAP_STYLE_TAG.BUTT, 0),
  windingRule: createRecordWindingRule(ARTWORKS_WINDING_RULE_TAG.EVEN_ODD),
  dash: createRecordDashPatternEmpty(),
} as const;

export function artworksMapToIntermediate(artworks: ArtworksFile): IrRootNode {
  const {
    lists,
    palette = EMPTY_PALETTE,
    spriteArea = EMPTY_SPRITE_AREA,
  } = denormalise(artworks);
  const mapper = new Mapper(palette, spriteArea);
  artworksProcess({
    lists,
    mapper,
    renderState: INITIAL_RENDER_STATE,
  });
  return mapper.finish();
}
