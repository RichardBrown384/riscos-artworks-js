import { Point } from '@rbrown/geometry';
import { BinaryReader, BinaryWriter } from '@rbrown/io';

import { ArtworksPolyline } from '../types/index.js';
import { readPoint, writePoint } from './point.js';

export function readPolyline(
  reader: BinaryReader,
  n: number,
): ArtworksPolyline {
  reader.aligned(4, 'misaligned polyline');
  const points: Point[] = [];
  for (let i = 0; i < n; i += 1) {
    points.push(readPoint(reader));
  }
  return points;
}

export function writePolyline(
  writer: BinaryWriter,
  polyline: ArtworksPolyline,
): void {
  writer.aligned(4, 'misaligned polyline');
  for (const point of polyline) {
    writePoint(writer, point);
  }
}

export function createPolyline(points: Point[]): ArtworksPolyline {
  return points;
}

export function polylinePoint(x: number, y: number): Point {
  return { x, y };
}
