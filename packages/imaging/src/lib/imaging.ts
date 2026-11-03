export interface ImageSource {
  pixelWidth: number;
  pixelHeight: number;
  xDpi: number;
  yDpi: number;
  getPixel(x: number, y: number): number;
}

export function packRGBA32(r: number, g: number, b: number, a: number) {
  return (((r << 24) >>> 0) + (g << 16) + (b << 8) + a) >>> 0;
}
