export function lineLength(
  x0: number,
  y0: number,
  x1: number,
  y1: number,
): number {
  const x = x1 - x0;
  const y = y1 - y0;
  return Math.sqrt(x * x + y * y);
}
