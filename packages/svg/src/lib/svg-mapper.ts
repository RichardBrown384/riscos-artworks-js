import {
  irBoundingBox,
  type IrColour,
  IrFill,
  IrGradientStop,
  type IrGroupNode,
  type IrImage,
  type IrImageNode,
  IrLinearFill,
  type IrLineCap,
  type IrNode,
  type IrPathNode,
  type IrPathSegment,
  IrRadialFill,
  type IrRootNode,
} from '@rbrown/intermediate';
import {
  bboxEmpty,
  bboxHeight,
  bboxWidth,
  IDENTITY_TRANSFORM,
  type Point,
  type Transform,
  transformConcatenate,
  transformScale,
  transformTranslate,
} from '@rbrown/geometry';
import {
  SvgDefinitionNode,
  SvgGradientStopNode,
  SvgGroupNode,
  SvgImageNode,
  SvgLinearGradientNode,
  SvgNode,
  SvgPathNode,
  SvgRadialGradientNode,
  SvgRootNode,
} from './svg-types.js';
import { pngCreateImage } from '@rbrown/png';

interface SvgContext {
  defs: SvgDefinitionNode[];
  nextId: number;
}

function mapPoint(p: Point): string {
  return `${p.x.toString()} ${p.y.toString()}`;
}

function mapTransform(t: Transform): string {
  const matrix = [t.a, t.b, t.c, t.d, t.e, t.f].join(' ');
  return `matrix(${matrix})`;
}

function mapTranslation(dx: number, dy: number): string {
  return `translate(${dx.toString()}, ${dy.toString()})`;
}

function mapPathSegments(segments: IrPathSegment[]): string {
  const parts: string[] = [];

  for (const seg of segments) {
    switch (seg.tag) {
      case 'move':
        parts.push(`M ${mapPoint(seg.to)}`);
        break;

      case 'line':
        parts.push(`L ${mapPoint(seg.to)}`);
        break;

      case 'cubic':
        parts.push(
          `C ${mapPoint(seg.cp1)} ${mapPoint(seg.cp2)} ${mapPoint(seg.to)}`,
        );
        break;

      case 'close':
        parts.push('Z');
        break;
    }
  }

  return parts.join(' ');
}

function mapColour(colour: IrColour): string {
  switch (colour.tag) {
    case 'none': {
      return 'none';
    }
    case 'rgb': {
      const { r, g, b } = colour;
      return `rgb(${r.toString()}, ${g.toString()}, ${b.toString()})`;
    }
  }
}

function mapGradientStops(stops: IrGradientStop[]): SvgGradientStopNode[] {
  return stops.map(({ offset, colour }) => ({
    tag: 'stop',
    attributes: {
      offset: offset.toString(),
      stopColor: mapColour(colour),
    },
  }));
}

function mapLinearGradient(
  id: string,
  { start, end, stops }: IrLinearFill,
): SvgLinearGradientNode {
  return {
    tag: 'linearGradient',
    attributes: {
      id,
      gradientUnits: 'userSpaceOnUse',
      x1: start.x,
      y1: start.y,
      x2: end.x,
      y2: end.y,
    },
    children: mapGradientStops(stops),
  } satisfies SvgLinearGradientNode;
}

function mapRadialGradient(
  id: string,
  { start, end, stops }: IrRadialFill,
): SvgRadialGradientNode {
  const dx = start.x - end.x;
  const dy = start.y - end.y;
  const r = Math.sqrt(dx * dx + dy * dy);
  return {
    tag: 'radialGradient',
    attributes: {
      id,
      gradientUnits: 'userSpaceOnUse',
      cx: start.x,
      cy: start.y,
      fx: start.x,
      fy: start.y,
      r,
    },
    children: mapGradientStops(stops),
  } satisfies SvgRadialGradientNode;
}

function mapFill(context: SvgContext, fill: IrFill): string {
  switch (fill.tag) {
    case 'solid': {
      return mapColour(fill.colour);
    }
    case 'linear': {
      const id = `linear-gradient-${(context.nextId++).toString()}`;
      context.defs.push(mapLinearGradient(id, fill));
      return `url(#${id})`;
    }
    case 'radial': {
      const id = `radial-gradient-${(context.nextId++).toString()}`;
      context.defs.push(mapRadialGradient(id, fill));
      return `url(#${id})`;
    }
  }
}

function mapStrokeLineCap(lineCap: IrLineCap) {
  return lineCap === 'triangle' ? 'butt' : lineCap;
}

function mapPathNode(context: SvgContext, node: IrPathNode): SvgNode {
  const {
    transform,
    path,
    fill,
    fillRule,
    stroke,
    strokeWidth,
    strokeLinejoin,
    strokeLinecapStart,
    strokeDashoffset,
    strokeDasharray,
  } = node.attributes;

  const strokeLineCap = mapStrokeLineCap(strokeLinecapStart);

  const attributes: SvgPathNode['attributes'] = {
    d: mapPathSegments(path),
    fill: mapFill(context, fill),
    stroke: mapColour(stroke),
  };

  if (transform) {
    attributes.transform = mapTransform(transform);
  }

  if (fillRule !== 'nonzero') {
    attributes.fillRule = fillRule;
  }

  if (strokeLinejoin !== 'miter') {
    attributes.strokeLinejoin = strokeLinejoin;
  }

  if (strokeLineCap !== 'butt') {
    attributes.strokeLinecap = strokeLineCap;
  }

  if (strokeDasharray?.length) {
    attributes.strokeDashoffset = strokeDashoffset;
    attributes.strokeDasharray = strokeDasharray.join(' ');
  }

  if (strokeWidth === 0) {
    attributes.strokeWidth = '1';
    attributes.vectorEffect = 'non-scaling-stroke';
  } else {
    attributes.strokeWidth = strokeWidth.toString();
  }

  return {
    tag: 'path',
    attributes,
  } satisfies SvgPathNode;
}

function mapImage(image: IrImage): {
  data: Uint8Array<ArrayBuffer>;
  mimetype: 'image/png' | 'image/jpeg';
} {
  switch (image.tag) {
    case 'source':
      return {
        data: pngCreateImage(image.source),
        mimetype: 'image/png',
      };
    case 'encoded':
      return { data: image.data, mimetype: image.mimetype };
  }
}

function mapImageNode(node: IrImageNode): SvgNode {
  const {
    attributes: { transform, worldWidth, worldHeight, image },
  } = node;

  // Flip from Y-up to Y-down
  const flipY = transformConcatenate(
    transformScale(1, -1),
    transformTranslate(0, worldHeight),
  );

  const finalTransform = transformConcatenate(
    flipY,
    transform ?? IDENTITY_TRANSFORM,
  );

  const { data, mimetype } = mapImage(image);

  return {
    tag: 'image',
    attributes: {
      transform: mapTransform(finalTransform),
      x: 0,
      y: 0,
      width: worldWidth,
      height: worldHeight,
      preserveAspectRatio: 'none',
      data,
      mimetype,
    },
  } satisfies SvgImageNode;
}

function mapGroupNode(context: SvgContext, node: IrGroupNode): SvgNode {
  const {
    attributes: { transform },
    children,
  } = node;
  return {
    tag: 'g',
    attributes: {
      ...(transform && { transform: mapTransform(transform) }),
    },
    children: mapChildren(context, children),
  } satisfies SvgGroupNode;
}

function mapChildren(context: SvgContext, nodes: IrNode[]): SvgNode[] {
  const svgNodes: SvgNode[] = [];
  for (const node of nodes) {
    switch (node.tag) {
      case 'path': {
        svgNodes.push(mapPathNode(context, node));
        break;
      }

      case 'image': {
        svgNodes.push(mapImageNode(node));
        break;
      }

      case 'g': {
        svgNodes.push(mapGroupNode(context, node));
        break;
      }

      default: {
        throw new Error(`unsupported tag`);
      }
    }
  }
  return svgNodes;
}

export function svgFromIntermediate(
  rootNode: IrRootNode,
): SvgRootNode | undefined {
  const boundingBox = irBoundingBox(rootNode);
  if (rootNode.children.length === 0 || bboxEmpty(boundingBox)) {
    return undefined;
  }
  // for now, we assume that all data comping in is y-up (svg is y-down)
  const width = bboxWidth(boundingBox);
  const height = bboxHeight(boundingBox);
  const context: SvgContext = {
    defs: [] as SvgDefinitionNode[],
    nextId: 0,
  };
  const rootGroup: SvgGroupNode = {
    tag: 'g',
    attributes: {
      transform: `${mapTranslation(0, height)} scale(1, -1) ${mapTranslation(-boundingBox.minX, -boundingBox.minY)}`,
    },
    children: mapChildren(context, rootNode.children),
  };
  return {
    tag: 'svg',
    attributes: {
      viewBox: `0 0 ${width.toString()} ${height.toString()}`,
    },
    children:
      context.defs.length === 0
        ? [rootGroup]
        : [{ tag: 'defs', children: context.defs }, rootGroup],
  };
}
