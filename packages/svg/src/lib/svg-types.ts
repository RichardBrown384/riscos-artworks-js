export interface SvgPathNode {
  tag: 'path';
  attributes: {
    transform?: string;
    d: string;
    fill?: string;
    fillRule?: 'evenodd' | 'nonzero';
    stroke?: string;
    strokeWidth?: string;
    strokeLinejoin?: 'bevel' | 'miter' | 'round';
    strokeLinecap?: 'butt' | 'round' | 'square';
    strokeDashoffset?: number;
    strokeDasharray?: string;
    vectorEffect?: 'non-scaling-stroke';
  };
}

export interface SvgImageNode {
  tag: 'image';
  attributes: {
    transform?: string;
    x: number;
    y: number;
    width: number;
    height: number;
    preserveAspectRatio: 'none';
    data: Uint8Array<ArrayBuffer>;
    mimetype: 'image/png' | 'image/jpeg';
  };
}

export interface SvgGroupNode {
  tag: 'g';
  attributes: {
    transform?: string;
  };
  children: SvgNode[];
}

export interface SvgGradientStopNode {
  tag: 'stop';
  attributes: {
    offset: string;
    stopColor: string;
  };
}

export type SvgGradientUnits = 'userSpaceOnUse' | 'objectBoundingBox';

export interface SvgLinearGradientNode {
  tag: 'linearGradient';
  attributes: {
    id: string;
    gradientUnits: SvgGradientUnits;
    x1: number;
    y1: number;
    x2: number;
    y2: number;
  };
  children: SvgGradientStopNode[];
}

export interface SvgRadialGradientNode {
  tag: 'radialGradient';
  attributes: {
    id: string;
    gradientUnits: SvgGradientUnits;
    cx: number;
    cy: number;
    fx: number;
    fy: number;
    r: number;
  };
  children: SvgGradientStopNode[];
}

export type SvgDefinitionNode = SvgLinearGradientNode | SvgRadialGradientNode;

export interface SvgDefinitionsNode {
  tag: 'defs';
  children: SvgDefinitionNode[];
}

export type SvgNode =
  | SvgDefinitionsNode
  | SvgDefinitionNode
  | SvgGradientStopNode
  | SvgPathNode
  | SvgImageNode
  | SvgGroupNode;

export interface SvgRootNode {
  tag: 'svg';
  attributes: {
    viewBox?: string;
  };
  children: SvgNode[];
}
