import { Point, pointTransform } from './point.js';
import { Transform } from './transform.js';

export interface BoundingBox {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
}

export const EMPTY_BOUNDING_BOX: BoundingBox = {
  minX: Infinity,
  minY: Infinity,
  maxX: -Infinity,
  maxY: -Infinity,
} as const;

export function bboxEmpty(boundingBox: BoundingBox): boolean {
  return (
    boundingBox.minX > boundingBox.maxX || boundingBox.minY > boundingBox.maxY
  );
}

export function bboxWidth(boundingBox: BoundingBox): number {
  return boundingBox.maxX - boundingBox.minX;
}

export function bboxHeight(boundingBox: BoundingBox): number {
  return boundingBox.maxY - boundingBox.minY;
}

export function bboxUnion(a: BoundingBox, b: BoundingBox): BoundingBox {
  return {
    minX: Math.min(a.minX, b.minX),
    minY: Math.min(a.minY, b.minY),
    maxX: Math.max(a.maxX, b.maxX),
    maxY: Math.max(a.maxY, b.maxY),
  };
}

export function bboxIncludePoint(b: BoundingBox, p: Point): BoundingBox {
  return {
    minX: Math.min(b.minX, p.x),
    minY: Math.min(b.minY, p.y),
    maxX: Math.max(b.maxX, p.x),
    maxY: Math.max(b.maxY, p.y),
  };
}

export function bboxFromPoints(points: Point[]): BoundingBox {
  return points.reduce(bboxIncludePoint, EMPTY_BOUNDING_BOX);
}

export function bboxInflate(b: BoundingBox, d: number): BoundingBox {
  if (bboxEmpty(b)) {
    return b;
  }
  return {
    minX: b.minX - d,
    minY: b.minY - d,
    maxX: b.maxX + d,
    maxY: b.maxY + d,
  };
}

export function bboxTransform(b: BoundingBox, t: Transform): BoundingBox {
  if (bboxEmpty(b)) {
    return b;
  }
  const { minX, minY, maxX, maxY } = b;
  const points: Point[] = [
    { x: minX, y: minY },
    { x: minX, y: maxY },
    { x: maxX, y: minY },
    { x: maxX, y: maxY },
  ];
  return bboxFromPoints(points.map((p) => pointTransform(p, t)));
}
