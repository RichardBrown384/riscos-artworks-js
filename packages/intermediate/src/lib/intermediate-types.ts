import { type Point, type Transform } from '@rbrown/geometry';
import { ImageSource } from '@rbrown/imaging';

export type IrPathSegment =
  | { tag: 'end' }
  | { tag: 'close' }
  | { tag: 'move'; to: Point }
  | { tag: 'line'; to: Point }
  | { tag: 'cubic'; cp1: Point; cp2: Point; to: Point };

export type IrLineJoin = 'miter' | 'bevel' | 'round';
export type IrLineCap = 'butt' | 'round' | 'square' | 'triangle';
export type IrFillRule = 'evenodd' | 'nonzero';

export type IrColour =
  { tag: 'none' } | { tag: 'rgb'; r: number; g: number; b: number };

export interface IrGradientStop {
  offset: number; // Between 0 and 1
  colour: IrColour;
}

export interface IrSolidFill {
  tag: 'solid';
  colour: IrColour;
}

export interface IrLinearFill {
  tag: 'linear';
  start: Point;
  end: Point;
  stops: IrGradientStop[];
}

export interface IrRadialFill {
  tag: 'radial';
  start: Point;
  end: Point;
  stops: IrGradientStop[];
}

export type IrFill = IrSolidFill | IrLinearFill | IrRadialFill;

export type IrImage =
  | {
      tag: 'source';
      source: ImageSource;
    }
  | {
      tag: 'encoded';
      mimetype: 'image/png' | 'image/jpeg';
      data: Uint8Array<ArrayBuffer>;
    };

export interface IrPathNode {
  tag: 'path';
  attributes: {
    transform?: Transform;
    path: IrPathSegment[];
    fill: IrFill;
    fillRule: IrFillRule;
    stroke: IrColour;
    strokeWidth: number;
    strokeLinejoin: IrLineJoin;
    strokeLinecapStart: IrLineCap;
    strokeLinecapEnd: IrLineCap;
    strokeLineCapTriangleWidth: number;
    strokeLineCapTriangleLength: number;
    strokeDashoffset?: number;
    strokeDasharray?: number[];
  };
}

export interface IrImageNode {
  tag: 'image';
  attributes: {
    transform?: Transform;
    worldWidth: number; // Width of the image in world units (NOT pixels)
    worldHeight: number; // Height of the image in world units (NOT pixels)
    image: IrImage;
  };
}

export interface IrGroupNode {
  tag: 'g';
  attributes: {
    transform?: Transform;
  };
  children: IrNode[];
}

export type IrNode = IrGroupNode | IrPathNode | IrImageNode;

export interface IrRootNode {
  children: IrNode[];
}
