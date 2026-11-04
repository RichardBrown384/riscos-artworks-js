import { Point } from '@rbrown/geometry';
import { BinaryReader, BinaryWriter } from '@rbrown/io';

import { ArtworksPolyline } from '../types/index.js';
import { readPoint, writePoint } from './point.js';

export function readPolyline(
  reader: BinaryReader,
  n: number,
): ArtworksPolyline {
  reader.aligned(4, 'misaligned polyline');
  const points = [];
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

export class PolylineBuilder {
  private readonly points: Point[];
  constructor() {
    this.points = [];
  }
  push(x: number, y: number): this {
    this.points.push({ x, y });
    return this;
  }
  build(): ArtworksPolyline {
    return this.points;
  }
}
