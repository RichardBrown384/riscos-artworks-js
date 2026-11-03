export type SpritePaletteFormat = {
  colourModel: 'palette';
  imageBitsPerPixel: number;
  maskBitsPerPixel: number;
  xDpi: number;
  yDpi: number;
  palette: SpritePaletteEntry[];
};

export type SpriteColourFormat = {
  colourModel: 'bgr555' | 'bgr888';
  imageBitsPerPixel: number;
  maskBitsPerPixel: number;
  xDpi: number;
  yDpi: number;
};

export type SpriteFormat = SpritePaletteFormat | SpriteColourFormat;

export type SpriteBitmapLayout = {
  bitsPerPixel: number;
  pixelWidth: number;
  pixelHeight: number;
  sizeInBytes: number;
  wordsPerLine: number;
  firstBitUsed: number;
};

export type SpriteLayout = {
  image: SpriteBitmapLayout;
  mask: SpriteBitmapLayout;
};

export interface SpritePaletteEntry {
  first: number;
  second: number;
}

export interface SpriteControlBlock {
  spriteOffset: number;
  spriteName: string;
  wordWidth: number;
  lineHeight: number;
  firstBitUsed: number;
  lastBitUsed: number;
  imageOffset: number;
  maskOffset: number;
  mode: number;
  palette?: SpritePaletteEntry[];
}

export interface Sprite {
  controlBlock: SpriteControlBlock;
  format: SpriteFormat;
  layout: SpriteLayout;
  image: Uint8Array<ArrayBuffer>;
  mask?: Uint8Array<ArrayBuffer>;
}

export interface SpriteAreaControlBlock {
  spriteCount: number;
  spriteOffset: number;
  freeOffset: number;
}

export interface SpriteArea {
  controlBlock: SpriteAreaControlBlock;
  sprites: Sprite[];
}
