import {
  ARTWORKS_FILL_TYPE_TAG,
  ARTWORKS_JOIN_STYLE_TAG,
  ARTWORKS_LINE_CAP_STYLE_TAG,
  ARTWORKS_PATH_TAG,
  ARTWORKS_WINDING_RULE_TAG,
  ArtworksColourIndex,
  ArtworksLineCapStyle,
  ArtworksPathSegment,
  ArtworksRecordWithPath,
  ArtworksSpriteRecord,
  Palette,
  RecordBodyFillColour,
  RecordBodyJoinStyle,
  RecordBodyLineCapEnd,
  RecordBodyLineCapStart,
  RecordBodyStrokeColour,
  RecordBodyStrokeWidth,
  RecordBodyWindingRule,
} from '@rbrown/computer-concepts-artworks';
import { bboxHeight, bboxWidth, transformTranslate } from '@rbrown/geometry';
import {
  IrColour,
  IrFill,
  IrFillRule,
  IrLineCap,
  IrLineJoin,
  IrNode,
  IrPathNode,
  IrRootNode,
  type IrImageNode,
  type IrPathSegment,
} from '@rbrown/intermediate';
import { SpriteArea, spriteToImageSource } from '@rbrown/riscos-sprite';

import { RenderState } from './render-state.js';

function mapPathSegments(segments: ArtworksPathSegment[]): IrPathSegment[] {
  const mappedSegments: IrPathSegment[] = [];
  for (const segment of segments) {
    switch (segment.tag) {
      case ARTWORKS_PATH_TAG.MOVE: {
        const { to } = segment;
        mappedSegments.push({ tag: 'move', to });
        break;
      }

      case ARTWORKS_PATH_TAG.LINE: {
        const { to } = segment;
        mappedSegments.push({ tag: 'line', to });
        break;
      }

      case ARTWORKS_PATH_TAG.BEZIER: {
        const { cp1, cp2, to } = segment;
        mappedSegments.push({ tag: 'cubic', cp1, cp2, to });
        break;
      }

      case ARTWORKS_PATH_TAG.CLOSE_SUB_PATH: {
        mappedSegments.push({ tag: 'close' });
        break;
      }

      case ARTWORKS_PATH_TAG.END: {
        mappedSegments.push({ tag: 'end' });
        break;
      }
    }
  }
  return mappedSegments;
}

function mapColour(colour: number | undefined): IrColour {
  if (!colour) {
    return { tag: 'none' };
  }
  return {
    tag: 'rgb',
    b: (colour >>> 16) & 0xff,
    g: (colour >>> 8) & 0xff,
    r: (colour >>> 0) & 0xff,
  };
}

function mapColourIndex(
  palette: Palette,
  index: ArtworksColourIndex,
): number | undefined {
  if (index < 0x0100_0000) {
    return palette.entries[index]?.colour;
  }
  if (index < 0xffff_ffff) {
    return index;
  }
  return undefined;
}

function mapColourIndexToColour(
  palette: Palette,
  index: ArtworksColourIndex,
): IrColour {
  return mapColour(mapColourIndex(palette, index));
}

function mapFill(palette: Palette, fill: RecordBodyFillColour): IrFill {
  switch (fill.fillType) {
    case ARTWORKS_FILL_TYPE_TAG.FLAT: {
      const gradient = fill.gradient;
      return {
        tag: 'solid',
        colour: mapColourIndexToColour(palette, gradient.colour),
      };
    }
    case ARTWORKS_FILL_TYPE_TAG.LINEAR: {
      const gradient = fill.gradient;
      return {
        tag: 'linear',
        start: gradient.gradientLine[0],
        end: gradient.gradientLine[1],
        stops: [
          {
            offset: 0.0,
            colour: mapColourIndexToColour(palette, gradient.startColour),
          },
          {
            offset: 1.0,
            colour: mapColourIndexToColour(palette, gradient.endColour),
          },
        ],
      };
    }
    case ARTWORKS_FILL_TYPE_TAG.RADIAL: {
      const gradient = fill.gradient;
      return {
        tag: 'radial',
        start: gradient.gradientLine[0],
        end: gradient.gradientLine[1],
        stops: [
          {
            offset: 0.0,
            colour: mapColourIndexToColour(palette, gradient.startColour),
          },
          {
            offset: 1.0,
            colour: mapColourIndexToColour(palette, gradient.endColour),
          },
        ],
      };
    }
  }
}

function mapFillRule(fillRule: RecordBodyWindingRule): IrFillRule {
  // TODO a bodge
  switch ((fillRule.windingRule >>> 0) & 0xff) {
    case ARTWORKS_WINDING_RULE_TAG.EVEN_ODD:
      return 'evenodd';
    case ARTWORKS_WINDING_RULE_TAG.NON_ZERO:
      return 'nonzero';
    default:
      throw new Error('Unsupported fill rule type');
  }
}

function mapStroke(palette: Palette, stroke: RecordBodyStrokeColour): IrColour {
  return mapColourIndexToColour(palette, stroke.strokeColour);
}

function mapStrokeWidth(strokeWidth: RecordBodyStrokeWidth): number {
  return strokeWidth.strokeWidth;
}

function mapLinejoin(lineJoin: RecordBodyJoinStyle): IrLineJoin {
  // TODO a bodge
  switch ((lineJoin.joinStyle >>> 0) & 0xff) {
    case ARTWORKS_JOIN_STYLE_TAG.MITRE:
      return 'miter';
    case ARTWORKS_JOIN_STYLE_TAG.ROUND:
      return 'round';
    case ARTWORKS_JOIN_STYLE_TAG.BEVEL:
      return 'bevel';
    default:
      throw new Error('Unsupported line join style');
  }
}

function mapLineCap(capStyle: ArtworksLineCapStyle): IrLineCap {
  // TODO a bodge
  switch ((capStyle >>> 0) & 0xff) {
    case ARTWORKS_LINE_CAP_STYLE_TAG.BUTT:
      return 'butt';
    case ARTWORKS_LINE_CAP_STYLE_TAG.ROUND:
      return 'round';
    case ARTWORKS_LINE_CAP_STYLE_TAG.SQUARE:
      return 'square';
    case ARTWORKS_LINE_CAP_STYLE_TAG.TRIANGLE:
      return 'triangle';
    default:
      throw new Error('Unsupported line cap style');
  }
}

function mapLinecapStart(lineCapStart: RecordBodyLineCapStart): IrLineCap {
  return mapLineCap(lineCapStart.capStyle);
}

function mapLinecapEnd(lineCapEnd: RecordBodyLineCapEnd): IrLineCap {
  return mapLineCap(lineCapEnd.capStyle);
}

function mapLinecapTriangleWidth(lineCapStart: RecordBodyLineCapStart): number {
  return (lineCapStart.capTriangle >>> 0) & 0xffff;
}

function mapLinecapTriangleLength(
  lineCapStart: RecordBodyLineCapStart,
): number {
  return (lineCapStart.capTriangle >>> 16) & 0xffff;
}

export class Mapper {
  private readonly children: IrNode[];
  private readonly palette: Palette;
  private readonly spriteArea: SpriteArea;
  constructor(palette: Palette, spriteArea: SpriteArea) {
    this.children = [];
    this.palette = palette;
    this.spriteArea = spriteArea;
  }

  finish(): IrRootNode {
    return {
      children: this.children,
    };
  }

  path(record: ArtworksRecordWithPath, renderState: RenderState): void {
    const pathNode: IrPathNode = {
      tag: 'path',
      attributes: {
        path: mapPathSegments(record.body.path),
        fill: mapFill(this.palette, renderState.fill.body),
        fillRule: mapFillRule(renderState.windingRule.body),
        stroke: mapStroke(this.palette, renderState.stroke.body),
        strokeWidth: mapStrokeWidth(renderState.strokeWidth.body),
        strokeLinejoin: mapLinejoin(renderState.joinStyle.body),
        strokeLinecapStart: mapLinecapStart(renderState.capStyleStart.body),
        strokeLinecapEnd: mapLinecapEnd(renderState.capStyleEnd.body),
        // TODO this is broken. The IR was derived from draw and
        // that assumed the start and end triangle caps were the same.
        // in artworks they can vary we need to fix the IR to support this
        strokeLineCapTriangleWidth: mapLinecapTriangleWidth(
          renderState.capStyleStart.body,
        ),
        strokeLineCapTriangleLength: mapLinecapTriangleLength(
          renderState.capStyleStart.body,
        ),
        ...(renderState.dash.body.dashPattern && {
          strokeDashoffset: renderState.dash.body.dashPattern.offset,
          strokeDasharray: renderState.dash.body.dashPattern.elements,
        }),
      },
    };
    this.children.push(pathNode);
  }

  sprite(record: ArtworksSpriteRecord): void {
    const {
      boundingBox,
      body: { name },
    } = record;
    const worldWidth = bboxWidth(boundingBox);
    const worldHeight = bboxHeight(boundingBox);
    const sprite = this.spriteArea.sprites.find(
      (sprite) => sprite.controlBlock.spriteName === name,
    );
    if (!sprite) {
      return;
    }
    const spriteNode: IrImageNode = {
      tag: 'image',
      attributes: {
        transform: transformTranslate(boundingBox.minX, boundingBox.minY),
        worldWidth,
        worldHeight,
        image: {
          tag: 'source',
          source: spriteToImageSource(sprite),
        },
      },
    };
    this.children.push(spriteNode);
  }
}
