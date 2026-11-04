import {
  ARTWORKS_PATH_TAG,
  ArtworksPath,
  ArtworksPathSegment,
  ArtworksPolyline,
} from '@rbrown/computer-concepts-artworks';
import {
  IDENTITY_TRANSFORM,
  Point,
  pointTransform,
  Transform,
  transformConcatenate,
  transformRotateDeg,
  transformScale,
  transformTranslate,
} from '@rbrown/geometry';

// This wraps the transform from the geometry lib
// The value of the fluent API is open to discussion
export class AffineTransform {
  private transform: Transform;

  constructor() {
    this.transform = IDENTITY_TRANSFORM;
  }

  private concatenate(t: Transform): void {
    this.transform = transformConcatenate(this.transform, t);
  }

  concatenateTransform(other: AffineTransform): this {
    this.concatenate(other.transform);
    return this;
  }

  translate(x: number, y: number): this {
    this.concatenate(transformTranslate(x, y));
    return this;
  }

  rotateDegrees(angle: number): this {
    this.concatenate(transformRotateDeg(angle));
    return this;
  }

  scale(sx: number, sy = sx): this {
    this.concatenate(transformScale(sx, sy));
    return this;
  }

  transformPoint = (p: Point): Point => {
    return pointTransform(p, this.transform);
  };

  transformCoordinate(x: number, y: number): Point {
    return this.transformPoint({ x, y });
  }

  transformPoints(points: Point[]): Point[] {
    return points.map(this.transformPoint);
  }

  transformPolyline(polyline: ArtworksPolyline): ArtworksPolyline {
    return polyline.map(this.transformPoint);
  }

  transformPath(path: ArtworksPath): ArtworksPath {
    const transformedPath: ArtworksPathSegment[] = [];
    for (const segment of path) {
      switch (segment.tag) {
        case ARTWORKS_PATH_TAG.CLOSE_SUB_PATH:
        case ARTWORKS_PATH_TAG.END:
        case ARTWORKS_PATH_TAG.UNKNOWN: {
          transformedPath.push({ ...segment });
          break;
        }
        case ARTWORKS_PATH_TAG.LINE:
        case ARTWORKS_PATH_TAG.MOVE: {
          const { to, ...rest } = segment;
          transformedPath.push({ ...rest, to: this.transformPoint(to) });
          break;
        }
        case ARTWORKS_PATH_TAG.BEZIER: {
          const { cp1, cp2, to, ...rest } = segment;
          transformedPath.push({
            ...rest,
            cp1: this.transformPoint(cp1),
            cp2: this.transformPoint(cp2),
            to: this.transformPoint(to),
          });
          break;
        }
      }
    }
    return transformedPath;
  }
}
