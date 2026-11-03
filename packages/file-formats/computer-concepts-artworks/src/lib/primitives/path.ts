import {
  ARTWORKS_PATH_TAG,
  ArtworksPath,
  ArtworksPathSegment,
  ArtworksPathTag,
} from '../types/index.js';
import { BinaryReader, BinaryWriter } from '@rbrown/io';
import { makeCheckEnumValue } from '@rbrown/check';
import { readPoint, writePoint } from './point.js';
import {
  bboxFromPoints,
  bboxInflate,
  BoundingBox,
  Point,
} from '@rbrown/geometry';

const checkPathTag: (
  value: unknown,
  message: string,
) => asserts value is ArtworksPathTag = makeCheckEnumValue(ARTWORKS_PATH_TAG);

export function readPathSegment(reader: BinaryReader): ArtworksPathSegment {
  const flags = reader.u32();
  const tag = flags & 0xff;
  checkPathTag(tag, 'unsupported path tag');
  switch (tag) {
    case ARTWORKS_PATH_TAG.END:
    case ARTWORKS_PATH_TAG.UNKNOWN:
    case ARTWORKS_PATH_TAG.CLOSE_SUB_PATH:
      return { tag, flags };

    case ARTWORKS_PATH_TAG.MOVE:
    case ARTWORKS_PATH_TAG.LINE:
      return { tag, flags, to: readPoint(reader) };

    case ARTWORKS_PATH_TAG.BEZIER:
      return {
        tag,
        flags,
        cp1: readPoint(reader),
        cp2: readPoint(reader),
        to: readPoint(reader),
      };
  }
}

export function writePathSegment(
  writer: BinaryWriter,
  segment: ArtworksPathSegment,
): void {
  writer.u32(segment.tag + ((segment.flags & ~0xff) >>> 0));
  switch (segment.tag) {
    case ARTWORKS_PATH_TAG.MOVE:
    case ARTWORKS_PATH_TAG.LINE: {
      writePoint(writer, segment.to);
      return;
    }

    case ARTWORKS_PATH_TAG.BEZIER:
      writePoint(writer, segment.cp1);
      writePoint(writer, segment.cp2);
      writePoint(writer, segment.to);
      return;
  }
}

export function createPath(segments: ArtworksPathSegment[]): ArtworksPath {
  return segments;
}

export function readPath(reader: BinaryReader): ArtworksPath {
  reader.aligned(4, 'misaligned path');
  const segments: ArtworksPathSegment[] = [];
  for (;;) {
    const segment = readPathSegment(reader);
    segments.push(segment);
    if (segment.tag === ARTWORKS_PATH_TAG.END) {
      break;
    }
  }
  return createPath(segments);
}

export function writePath(writer: BinaryWriter, path: ArtworksPath): void {
  writer.aligned(4, 'misaligned path');
  for (const segment of path) {
    writePathSegment(writer, segment);
  }
}

export class PathBuilder {
  private readonly segments: ArtworksPathSegment[];
  constructor() {
    this.segments = [];
  }

  moveTo(x: number, y: number, flags = 0): this {
    this.segments.push({
      tag: ARTWORKS_PATH_TAG.MOVE,
      to: { x, y },
      flags,
    });
    return this;
  }

  lineTo(x: number, y: number, flags = 0): this {
    this.segments.push({
      tag: ARTWORKS_PATH_TAG.LINE,
      to: { x, y },
      flags,
    });
    return this;
  }

  bezierTo(
    x0: number,
    y0: number,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    flags = 0,
  ): this {
    this.segments.push({
      tag: ARTWORKS_PATH_TAG.BEZIER,
      cp1: { x: x0, y: y0 },
      cp2: { x: x1, y: y1 },
      to: { x: x2, y: y2 },
      flags,
    });
    return this;
  }

  closeSubPath(flags = 0): this {
    this.segments.push({
      tag: ARTWORKS_PATH_TAG.CLOSE_SUB_PATH,
      flags,
    });
    return this;
  }

  end(flags = 0): this {
    this.segments.push({
      tag: ARTWORKS_PATH_TAG.END,
      flags,
    });
    return this;
  }

  build(): ArtworksPath {
    return this.segments;
  }
}

export function pathBoundingBox(
  path: ArtworksPath,
  padding: number = 0,
): BoundingBox {
  const points: Point[] = [];
  for (const segment of path) {
    switch (segment.tag) {
      case ARTWORKS_PATH_TAG.MOVE: {
        points.push(segment.to);
        break;
      }
      case ARTWORKS_PATH_TAG.LINE: {
        points.push(segment.to);
        break;
      }
      case ARTWORKS_PATH_TAG.BEZIER: {
        points.push(segment.cp1, segment.cp2, segment.to);
        break;
      }
    }
  }
  return bboxInflate(bboxFromPoints(points), padding);
}
