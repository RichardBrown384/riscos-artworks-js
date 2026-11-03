import { degreesToRadians } from './trigonometry.js';

/**
 * 2D affine transform in matrix form:
 *
 *   | a c e |
 *   | b d f |
 *   | 0 0 1 |
 *
 * Applied to a point (x, y) as:
 *
 *   x' = a*x + c*y + e
 *   y' = b*x + d*y + f
 *
 */
export interface Transform {
  a: number;
  b: number;
  c: number;
  d: number;
  e: number;
  f: number;
}

export const IDENTITY_TRANSFORM = {
  a: 1,
  b: 0,
  c: 0,
  d: 1,
  e: 0,
  f: 0,
} as const;

export function transformTranslate(dx: number, dy: number): Transform {
  return { a: 1, b: 0, c: 0, d: 1, e: dx, f: dy };
}

export function transformScale(sx: number, sy: number): Transform {
  return { a: sx, b: 0, c: 0, d: sy, e: 0, f: 0 };
}

export function transformRotateDeg(angle: number): Transform {
  return transformRotateRad(degreesToRadians(angle));
}

export function transformRotateRad(angle: number): Transform {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return { a: c, b: s, c: -s, d: c, e: 0, f: 0 };
}

// Transform order matches SVG: "t2 t1" means apply t1, then t2
export function transformConcatenate(t1: Transform, t2: Transform): Transform {
  return {
    a: t2.a * t1.a + t2.c * t1.b,
    c: t2.a * t1.c + t2.c * t1.d,
    e: t2.a * t1.e + t2.c * t1.f + t2.e,
    b: t2.b * t1.a + t2.d * t1.b,
    d: t2.b * t1.c + t2.d * t1.d,
    f: t2.b * t1.e + t2.d * t1.f + t2.f,
  };
}
