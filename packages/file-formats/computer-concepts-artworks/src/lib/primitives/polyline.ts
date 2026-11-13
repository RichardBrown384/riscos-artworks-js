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
  for (let i = 0; i < polyline.length; i += 1) {
    writePoint(writer, polyline[i]);
  }
}

export function createPolyline(points: Point[]): ArtworksPolyline {
  return points;
}

export function polylinePoint(x: number, y: number): Point {
  return { x, y };
}
