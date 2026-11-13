import {
  bboxHeight,
  bboxWidth,
  transformTranslate,
  type Transform,
} from '@rbrown/geometry';
import type {
  IrColour,
  IrFill,
  IrFillRule,
  IrGroupNode,
  IrImageNode,
  IrLineCap,
  IrLineJoin,
  IrNode,
  IrPathNode,
  IrPathSegment,
  IrRootNode,
} from '@rbrown/intermediate';
import {
  CAP_TAG,
  drawFromArrayBuffer,
  JOIN_TAG,
  OBJECT_TAG,
  PATH_TAG,
  WINDING_RULE_TAG,
  type CapTag,
  type DrawGroupObject,
  type DrawJpegObject,
  type DrawObject,
  type DrawPathObject,
  type DrawPathSegment,
  type DrawSpriteObject,
  type DrawSpriteRotatedObject,
  type DrawTransform,
  type JoinTag,
  type WindingRuleTag,
} from '@rbrown/riscos-draw';
import {
  spriteOsUnitHeight,
  spriteOsUnitWidth,
  spriteToImageSource,
} from '@rbrown/riscos-sprite';

const TRANSFORM_DIVISOR = 65536.0;

function mapTransform(transform: DrawTransform): Transform {
  return {
    a: transform.a / TRANSFORM_DIVISOR,
    b: transform.b / TRANSFORM_DIVISOR,
    c: transform.c / TRANSFORM_DIVISOR,
    d: transform.d / TRANSFORM_DIVISOR,
    e: transform.e,
    f: transform.f,
  };
}

function convertOSUnitToDrawUnit(v: number) {
  return v * 256; // 1 OS unit is 256 draw units
}

function mapPathSegments(segments: DrawPathSegment[]): IrPathSegment[] {
  const mappedSegments: IrPathSegment[] = [];
  for (const segment of segments) {
    switch (segment.tag) {
      case PATH_TAG.MOVE: {
        const { to } = segment;
        mappedSegments.push({ tag: 'move', to });
        break;
      }

      case PATH_TAG.LINE: {
        const { to } = segment;
        mappedSegments.push({ tag: 'line', to });
        break;
      }

      case PATH_TAG.BEZIER: {
        const { cp1, cp2, to } = segment;
        mappedSegments.push({ tag: 'cubic', cp1, cp2, to });
        break;
      }

      case PATH_TAG.CLOSE_SUB_PATH: {
        mappedSegments.push({ tag: 'close' });
        break;
      }

      case PATH_TAG.END: {
        mappedSegments.push({ tag: 'end' });
        break;
      }
    }
  }
  return mappedSegments;
}

function mapColour(colour: number): IrColour {
  const c = colour >>> 0;
  return c === 0xffff_ffff
    ? { tag: 'none' }
    : {
        tag: 'rgb',
        b: (colour >>> 24) & 0xff,
        g: (colour >>> 16) & 0xff,
        r: (colour >>> 8) & 0xff,
      };
}

function mapFill(colour: number): IrFill {
  return {
    tag: 'solid',
    colour: mapColour(colour),
  };
}

function mapLineJoin(lineJoin: JoinTag): IrLineJoin {
  switch (lineJoin) {
    case JOIN_TAG.MITRE:
      return 'miter';
    case JOIN_TAG.ROUND:
      return 'round';
    case JOIN_TAG.BEVEL:
      return 'bevel';
  }
}

function mapLineCap(lineCap: CapTag): IrLineCap {
  switch (lineCap) {
    case CAP_TAG.BUTT:
      return 'butt';
    case CAP_TAG.ROUND:
      return 'round';
    case CAP_TAG.SQUARE:
      return 'square';
    case CAP_TAG.TRIANGLE:
      return 'triangle';
  }
}

function mapWindingRule(windingRule: WindingRuleTag): IrFillRule {
  switch (windingRule) {
    case WINDING_RULE_TAG.EVEN_ODD:
      return 'evenodd';
    case WINDING_RULE_TAG.NON_ZERO:
      return 'nonzero';
  }
}

function mapPathObject(object: DrawPathObject): IrPathNode {
  const { fillColour, outlineColour, outlineWidth, path, pathStyle } = object;

  return {
    tag: 'path',
    attributes: {
      path: mapPathSegments(path),
      fill: mapFill(fillColour),
      fillRule: mapWindingRule(pathStyle.windingRule),
      stroke: mapColour(outlineColour),
      strokeWidth: outlineWidth,
      strokeLinejoin: mapLineJoin(pathStyle.join),
      strokeLinecapStart: mapLineCap(pathStyle.capStart),
      strokeLinecapEnd: mapLineCap(pathStyle.capEnd),
      strokeLineCapTriangleLength: pathStyle.triangleCapLength,
      strokeLineCapTriangleWidth: pathStyle.triangleCapWidth,
      ...(pathStyle.dashPattern && {
        strokeDashOffset: pathStyle.dashPattern.offset,
        strokeDashArray: pathStyle.dashPattern.array,
      }),
    },
  };
}

function mapSpriteObject(object: DrawSpriteObject): IrImageNode {
  const { boundingBox, sprite } = object;
  const worldWidth = bboxWidth(boundingBox);
  const worldHeight = bboxHeight(boundingBox);
  return {
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
  } satisfies IrImageNode;
}

function mapGroupObject(object: DrawGroupObject): IrGroupNode {
  return {
    tag: 'g',
    attributes: {},
    children: mapObjects(object.children),
  };
}

function mapSpriteRotatedObject(object: DrawSpriteRotatedObject): IrImageNode {
  const { sprite, transform } = object;
  const worldWidth = convertOSUnitToDrawUnit(spriteOsUnitWidth(sprite));
  const worldHeight = convertOSUnitToDrawUnit(spriteOsUnitHeight(sprite));
  return {
    tag: 'image',
    attributes: {
      transform: mapTransform(transform),
      worldWidth,
      worldHeight,
      image: {
        tag: 'source',
        source: spriteToImageSource(sprite),
      },
    },
  };
}

function mapJpegObject(object: DrawJpegObject): IrImageNode {
  const { width: worldWidth, height: worldHeight, data, transform } = object;
  return {
    tag: 'image',
    attributes: {
      transform: mapTransform(transform),
      worldWidth,
      worldHeight,
      image: {
        tag: 'encoded',
        mimetype: 'image/jpeg',
        data,
      },
    },
  };
}

function mapObjects(objects: DrawObject[]): IrNode[] {
  const mappedObjects: IrNode[] = [];
  for (const object of objects) {
    switch (object.tag) {
      case OBJECT_TAG.PATH: {
        mappedObjects.push(mapPathObject(object));
        break;
      }
      case OBJECT_TAG.SPRITE: {
        mappedObjects.push(mapSpriteObject(object));
        break;
      }
      case OBJECT_TAG.GROUP: {
        mappedObjects.push(mapGroupObject(object));
        break;
      }
      case OBJECT_TAG.SPRITE_ROTATED: {
        mappedObjects.push(mapSpriteRotatedObject(object));
        break;
      }
      case OBJECT_TAG.JPEG: {
        mappedObjects.push(mapJpegObject(object));
        break;
      }
    }
  }
  return mappedObjects;
}

export function drawIntermediateFromArrayBuffer(
  buffer: ArrayBuffer,
): IrRootNode | undefined {
  const drawFile = drawFromArrayBuffer(buffer);
  if (!drawFile) {
    return undefined;
  }
  return {
    children: mapObjects(drawFile.objects),
  };
}
