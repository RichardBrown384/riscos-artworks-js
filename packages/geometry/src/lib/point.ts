import { Transform } from './transform.js';

export interface Point {
  x: number;
  y: number;
}

export function pointTransform(p: Point, t: Transform): Point {
  return {
    x: t.a * p.x + t.c * p.y + t.e,
    y: t.b * p.x + t.d * p.y + t.f,
  };
}
