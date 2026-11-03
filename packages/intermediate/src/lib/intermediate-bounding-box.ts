import {
  bboxFromPoints,
  bboxInflate,
  bboxTransform,
  bboxUnion,
  type BoundingBox,
  EMPTY_BOUNDING_BOX,
  IDENTITY_TRANSFORM,
  type Point,
  type Transform,
  transformConcatenate,
} from '@rbrown/geometry';
import type {
  IrGroupNode,
  IrImageNode,
  IrNode,
  IrPathNode,
  IrPathSegment,
  IrRootNode,
} from './intermediate-types.js';

function computePathBoundingBox(path: IrPathSegment[]): BoundingBox {
  const points: Point[] = [];
  for (const segment of path) {
    switch (segment.tag) {
      case 'move': {
        points.push(segment.to);
        break;
      }
      case 'line': {
        points.push(segment.to);
        break;
      }
      case 'cubic': {
        points.push(segment.cp1, segment.cp2, segment.to);
        break;
      }
    }
  }
  return bboxFromPoints(points);
}

function computePathNodeBoundingBox(
  node: IrPathNode,
  transform: Transform,
): BoundingBox {
  const {
    attributes: { path, strokeWidth },
  } = node;
  return bboxTransform(
    bboxInflate(computePathBoundingBox(path), Math.ceil(0.5 * strokeWidth)),
    transform,
  );
}

function computeImageNodeBoundingBox(node: IrImageNode, transform: Transform) {
  const {
    attributes: { worldWidth, worldHeight },
  } = node;
  const boundingBox = bboxFromPoints([
    { x: 0, y: 0 },
    { x: worldWidth, y: worldHeight },
  ]);
  return bboxTransform(boundingBox, transform);
}

function computeGroupNodeBoundingBox(
  node: IrGroupNode,
  transform: Transform,
): BoundingBox {
  return node.children
    .map((node) => computeNodeBoundingBox(node, transform))
    .reduce(bboxUnion, EMPTY_BOUNDING_BOX);
}

// not sure if this is the right way around
function computeNodeTransform(
  transform: Transform,
  nodeTransform?: Transform,
): Transform {
  return transformConcatenate(nodeTransform ?? IDENTITY_TRANSFORM, transform);
}

function computeNodeBoundingBox(
  node: IrNode,
  transform: Transform,
): BoundingBox {
  const nodeTransform = computeNodeTransform(
    transform,
    node.attributes.transform,
  );
  switch (node.tag) {
    case 'path':
      return computePathNodeBoundingBox(node, nodeTransform);
    case 'image':
      return computeImageNodeBoundingBox(node, nodeTransform);
    case 'g':
      return computeGroupNodeBoundingBox(node, nodeTransform);
  }
}

export function irBoundingBox(rootNode: IrRootNode): BoundingBox {
  return rootNode.children
    .map((node) => computeNodeBoundingBox(node, IDENTITY_TRANSFORM))
    .reduce(bboxUnion, EMPTY_BOUNDING_BOX);
}
