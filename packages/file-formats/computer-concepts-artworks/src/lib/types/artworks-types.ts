import { BoundingBox, Point } from '@rbrown/geometry';
import { SpriteArea } from '@rbrown/riscos-sprite';

export type ArtworksPolyline = Point[];

export const ARTWORKS_PATH_TAG_BIT_31 = 0x80000000;

export const ARTWORKS_PATH_TAG = {
  END: 0,
  MOVE: 2,
  UNKNOWN: 4,
  CLOSE_SUB_PATH: 5,
  BEZIER: 6,
  LINE: 8,
} as const;

export type ArtworksPathTag =
  (typeof ARTWORKS_PATH_TAG)[keyof typeof ARTWORKS_PATH_TAG];

export type ArtworksPathSegment =
  | { tag: typeof ARTWORKS_PATH_TAG.END; flags: number }
  | { tag: typeof ARTWORKS_PATH_TAG.MOVE; flags: number; to: Point }
  | { tag: typeof ARTWORKS_PATH_TAG.UNKNOWN; flags: number }
  | { tag: typeof ARTWORKS_PATH_TAG.CLOSE_SUB_PATH; flags: number }
  | {
      tag: typeof ARTWORKS_PATH_TAG.BEZIER;
      flags: number;
      cp1: Point;
      cp2: Point;
      to: Point;
    }
  | { tag: typeof ARTWORKS_PATH_TAG.LINE; flags: number; to: Point };

export type ArtworksPath = ArtworksPathSegment[];

export type ArtworksDashElements = number[];

export interface DashPattern {
  offset: number;
  count: number;
  elements: ArtworksDashElements;
}

export const ARTWORKS_JOIN_STYLE_TAG = {
  MITRE: 0,
  ROUND: 1,
  BEVEL: 2,
} as const;

export type ArtworksJoinStyle =
  number; /*(typeof ARTWORKS_JOIN_STYLE_TAG)[keyof typeof ARTWORKS_JOIN_STYLE_TAG]*/

export const ARTWORKS_LINE_CAP_STYLE_TAG = {
  BUTT: 0,
  ROUND: 1,
  SQUARE: 2,
  TRIANGLE: 3,
} as const;

export type ArtworksLineCapStyle =
  number; /*(typeof ARTWORKS_LINE_CAP_STYLE_TAG)[keyof typeof ARTWORKS_LINE_CAP_STYLE_TAG]*/

export const ARTWORKS_WINDING_RULE_TAG = {
  NON_ZERO: 0,
  EVEN_ODD: 1,
} as const;

export type ArtworksWindingRule =
  number; /*(typeof ARTWORKS_WINDING_RULE_TAG)[keyof typeof ARTWORKS_WINDING_RULE_TAG]*/

export const ARTWORKS_FILL_TYPE_TAG = {
  FLAT: 0,
  LINEAR: 1,
  RADIAL: 2,
} as const;

export type ArtworksFillType =
  (typeof ARTWORKS_FILL_TYPE_TAG)[keyof typeof ARTWORKS_FILL_TYPE_TAG];

export const ARTWORKS_MARKER_STYLE_TAG = {
  NONE: -1,
  TRIANGLE: 0,
  ARROW_HEAD: 1,
  CIRCLE: 2,
  ARROW_TAIL: 3,
} as const;

export type ArtworksMarkerStyle =
  number; /*(typeof ARTWORKS_MARKER_STYLE_TAG)[keyof typeof ARTWORKS_MARKER_STYLE_TAG]*/

export type ArtworksColourIndex =
  number; /*& { readonly __brand: 'ColourIndex' }*/

export interface ArtworksHeader {
  identifier: string;
  version: number;
  program: string;
  unknown16: number;
  bodyPosition: number;
  europeanPaperWidth: number;
  europeanPaperHeight: number;
  unknown32: number;
  unknown36: number;
  ubufPosition: number;
  spriteAreaPosition: number;
  unknown48: number;
  americanPaperWidth: number;
  americanPaperHeight: number;
  palettePosition: number;
  unknown64: number;
  unknown68: number;
  unknown72: number;
  unknown76: number;
  unknown80: number;
  unknown84: number;
  unknown88: number;
}

export interface FilePointer {
  position: number;
  previous: number;
  next: number;
}

// Comment: the sprite area and palette live on the top
// level because our handling of the work area record is
// suboptimal
export interface ArtworksFile {
  header: ArtworksHeader;
  lists: List[];
  palette?: Palette;
  spriteArea?: SpriteArea;
}

export interface List {
  pointer?: FilePointer;
  records: ArtworksRecord[];
}

export const ARTWORKS_RECORD_TYPE_TAG = {
  RECORD_00: 0x00,
  RECORD_01_TEXT: 0x01,
  RECORD_02_PATH: 0x02,
  RECORD_05_SPRITE: 0x05,
  RECORD_06_GROUP: 0x06,
  RECORD_0A_LAYER: 0x0a,
  RECORD_21_WORK_AREA: 0x21,
  RECORD_22: 0x22,
  RECORD_23_SAVE_LOCATION: 0x23,
  RECORD_24_STROKE_COLOUR: 0x24,
  RECORD_25_STROKE_WIDTH: 0x25,
  RECORD_26_FILL_COLOUR: 0x26,
  RECORD_27_JOIN_STYLE: 0x27,
  RECORD_28_LINE_CAP_END: 0x28,
  RECORD_29_LINE_CAP_START: 0x29,
  RECORD_2A_WINDING_RULE: 0x2a,
  RECORD_2B_DASH_PATTERN: 0x2b,
  RECORD_2C_RECTANGLE: 0x2c,
  RECORD_2D_CHARACTER: 0x2d,
  RECORD_2E: 0x2e,
  RECORD_2F_FONT_NAME: 0x2f,
  RECORD_30_FONT_SIZE: 0x30,
  RECORD_31: 0x31,
  RECORD_32: 0x32,
  RECORD_33: 0x33,
  RECORD_34_ELLIPSE: 0x34,
  RECORD_35_ROUNDED_RECTANGLE: 0x35,
  RECORD_37_DISTORTION_GROUP: 0x37,
  RECORD_38_PERSPECTIVE_GROUP: 0x38,
  RECORD_39_FILE_INFO: 0x39,
  RECORD_3A_BLEND_GROUP: 0x3a,
  RECORD_3B_BLEND_GROUP_OPTIONS: 0x3b,
  RECORD_3D_BLEND_PATH: 0x3d,
  RECORD_3E_MARKER_START: 0x3e,
  RECORD_3F_MARKER_END: 0x3f,
  RECORD_42_DISTORTION_SUBGROUP: 0x42,
} as const;

export type ArtworksRecordType =
  (typeof ARTWORKS_RECORD_TYPE_TAG)[keyof typeof ARTWORKS_RECORD_TYPE_TAG];

export type RecordBodyTypeMap = {
  [ARTWORKS_RECORD_TYPE_TAG.RECORD_00]: RecordBody00;
  [ARTWORKS_RECORD_TYPE_TAG.RECORD_01_TEXT]: RecordBodyText;
  [ARTWORKS_RECORD_TYPE_TAG.RECORD_02_PATH]: RecordBodyPath;
  [ARTWORKS_RECORD_TYPE_TAG.RECORD_05_SPRITE]: RecordBodySprite;
  [ARTWORKS_RECORD_TYPE_TAG.RECORD_06_GROUP]: RecordBodyGroup;
  [ARTWORKS_RECORD_TYPE_TAG.RECORD_0A_LAYER]: RecordBodyLayer;
  [ARTWORKS_RECORD_TYPE_TAG.RECORD_21_WORK_AREA]: RecordBodyWorkArea;
  [ARTWORKS_RECORD_TYPE_TAG.RECORD_22]: RecordBody22;
  [ARTWORKS_RECORD_TYPE_TAG.RECORD_23_SAVE_LOCATION]: RecordBodySaveLocation;
  [ARTWORKS_RECORD_TYPE_TAG.RECORD_24_STROKE_COLOUR]: RecordBodyStrokeColour;
  [ARTWORKS_RECORD_TYPE_TAG.RECORD_25_STROKE_WIDTH]: RecordBodyStrokeWidth;
  [ARTWORKS_RECORD_TYPE_TAG.RECORD_26_FILL_COLOUR]: RecordBodyFillColour;
  [ARTWORKS_RECORD_TYPE_TAG.RECORD_27_JOIN_STYLE]: RecordBodyJoinStyle;
  [ARTWORKS_RECORD_TYPE_TAG.RECORD_28_LINE_CAP_END]: RecordBodyLineCapEnd;
  [ARTWORKS_RECORD_TYPE_TAG.RECORD_29_LINE_CAP_START]: RecordBodyLineCapStart;
  [ARTWORKS_RECORD_TYPE_TAG.RECORD_2A_WINDING_RULE]: RecordBodyWindingRule;
  [ARTWORKS_RECORD_TYPE_TAG.RECORD_2B_DASH_PATTERN]: RecordBodyDashPattern;
  [ARTWORKS_RECORD_TYPE_TAG.RECORD_2C_RECTANGLE]: RecordBodyRectangle;
  [ARTWORKS_RECORD_TYPE_TAG.RECORD_2D_CHARACTER]: RecordBodyCharacter;
  [ARTWORKS_RECORD_TYPE_TAG.RECORD_2E]: RecordBody2E;
  [ARTWORKS_RECORD_TYPE_TAG.RECORD_2F_FONT_NAME]: RecordBodyFontName;
  [ARTWORKS_RECORD_TYPE_TAG.RECORD_30_FONT_SIZE]: RecordBodyFontSize;
  [ARTWORKS_RECORD_TYPE_TAG.RECORD_31]: RecordBody31;
  [ARTWORKS_RECORD_TYPE_TAG.RECORD_32]: RecordBody32;
  [ARTWORKS_RECORD_TYPE_TAG.RECORD_33]: RecordBody33;
  [ARTWORKS_RECORD_TYPE_TAG.RECORD_34_ELLIPSE]: RecordBodyEllipse;
  [ARTWORKS_RECORD_TYPE_TAG.RECORD_35_ROUNDED_RECTANGLE]: RecordBodyRoundedRectangle;
  [ARTWORKS_RECORD_TYPE_TAG.RECORD_37_DISTORTION_GROUP]: RecordBodyDistortionGroup;
  [ARTWORKS_RECORD_TYPE_TAG.RECORD_38_PERSPECTIVE_GROUP]: RecordBodyPerspectiveGroup;
  [ARTWORKS_RECORD_TYPE_TAG.RECORD_39_FILE_INFO]: RecordBodyFileInfo;
  [ARTWORKS_RECORD_TYPE_TAG.RECORD_3A_BLEND_GROUP]: RecordBodyBlendGroup;
  [ARTWORKS_RECORD_TYPE_TAG.RECORD_3B_BLEND_GROUP_OPTIONS]: RecordBodyBlendGroupOptions;
  [ARTWORKS_RECORD_TYPE_TAG.RECORD_3D_BLEND_PATH]: RecordBodyBlendPath;
  [ARTWORKS_RECORD_TYPE_TAG.RECORD_3E_MARKER_START]: RecordBodyMarkerStart;
  [ARTWORKS_RECORD_TYPE_TAG.RECORD_3F_MARKER_END]: RecordBodyMarkerEnd;
  [ARTWORKS_RECORD_TYPE_TAG.RECORD_42_DISTORTION_SUBGROUP]: RecordBodyDistortionSubgroup;
};

export const ARTWORKS_RECORD_UNKNOWN_4_BIT_0 = 0x01;
export const ARTWORKS_RECORD_UNKNOWN_4_BIT_1 = 0x02;

export interface ArtworksBaseRecord {
  pointer?: FilePointer;
  flags: number;
  unknown4: number;
  boundingBox: BoundingBox;
  lists: List[];
}

type ArtworksRecordBodyTyped<T extends ArtworksRecordType> =
  T extends ArtworksRecordType
    ? {
        type: T;
        body: RecordBodyTypeMap[T];
      }
    : never;

export type ArtworksRecordBody = ArtworksRecordBodyTyped<ArtworksRecordType>;

type ArtworksRecordTyped<T extends ArtworksRecordType> =
  T extends ArtworksRecordType
    ? ArtworksBaseRecord & ArtworksRecordBodyTyped<T>
    : never;

export type ArtworksRecord = ArtworksRecordTyped<ArtworksRecordType>;

export type ArtworksRecordHeader = Pick<
  ArtworksRecord,
  'type' | 'flags' | 'unknown4' | 'boundingBox'
>;

export type ArtworksRecordWithPath = ArtworksRecord & {
  body: {
    path: ArtworksPath;
  };
};

export type ArtworksSpriteRecord = ArtworksRecordTyped<
  typeof ARTWORKS_RECORD_TYPE_TAG.RECORD_05_SPRITE
>;

export type ArtworksRecordStrokeColour = ArtworksRecordTyped<
  typeof ARTWORKS_RECORD_TYPE_TAG.RECORD_24_STROKE_COLOUR
>;

export type ArtworksRecordStrokeWidth = ArtworksRecordTyped<
  typeof ARTWORKS_RECORD_TYPE_TAG.RECORD_25_STROKE_WIDTH
>;

export type ArtworksRecordFillColour = ArtworksRecordTyped<
  typeof ARTWORKS_RECORD_TYPE_TAG.RECORD_26_FILL_COLOUR
>;

export type ArtworksRecordJoinStyle = ArtworksRecordTyped<
  typeof ARTWORKS_RECORD_TYPE_TAG.RECORD_27_JOIN_STYLE
>;

export type ArtworksRecordLineCapEnd = ArtworksRecordTyped<
  typeof ARTWORKS_RECORD_TYPE_TAG.RECORD_28_LINE_CAP_END
>;

export type ArtworksRecordLineCapStart = ArtworksRecordTyped<
  typeof ARTWORKS_RECORD_TYPE_TAG.RECORD_29_LINE_CAP_START
>;

export type ArtworksRecordWindingRule = ArtworksRecordTyped<
  typeof ARTWORKS_RECORD_TYPE_TAG.RECORD_2A_WINDING_RULE
>;

export type ArtworksRecordDashPattern = ArtworksRecordTyped<
  typeof ARTWORKS_RECORD_TYPE_TAG.RECORD_2B_DASH_PATTERN
>;

type RecordBodyEmpty = Record<string, never>;

export type RecordBody00 = RecordBodyEmpty;

export interface RecordBodyText {
  unknown24: number;
  unknown28: number;
  unknown32: number;
  unknown36: number;
  unknown40: number;
  unknown44: number;
  rectangle: ArtworksPolyline;
}

export interface RecordBodyPath {
  path: ArtworksPath;
}

export type SpritePalette = number[];

export interface RecordBodySprite {
  unknown24: number;
  name: string;
  unknown40: number;
  unknown44: number;
  unknown48: number;
  unknown52: number;
  unknown56: number;
  unknown60: number;
  unknown64: number;
  unknown68: number;
  unknown72: number;
  unknown76: number;
  unknown80: number;
  unknown84: number;
  unknown88: number;
  unknown92: number;
  unknown96: number;
  unknown100: number;
  palette: SpritePalette;
}

export interface RecordBodyGroup {
  unknown24: number;
  unknown28: number;
  unknown32: number;
}

export const ARTWORKS_RECORD_BODY_LAYER_UNKNOWN_24_BIT_0 = 0x01;
export const ARTWORKS_RECORD_BODY_LAYER_UNKNOWN_24_BIT_3 = 0x08;

export interface RecordBodyLayer {
  unknown24: number;
  name: string;
}

export interface PaletteEntry {
  name: string;
  colour: number;
  component0: number;
  component1: number;
  component2: number;
  component3: number;
  flags: number;
}

export interface Palette {
  count: number;
  unknown4: number;
  entries: PaletteEntry[];
}

export interface RecordBodyWorkArea {
  palette?: Palette;
  spriteArea?: SpriteArea;
}

export type RecordBody22 = RecordBodyEmpty;

export interface RecordBodySaveLocation {
  fileType: number;
  filePath: string;
}

export interface RecordBodyStrokeColour {
  strokeColour: ArtworksColourIndex;
}

export interface RecordBodyStrokeWidth {
  strokeWidth: number;
}

export type FillGradientFlat = {
  tag: 'flat';
  colour: ArtworksColourIndex;
};

export type FillGradientShaded = {
  tag: 'shaded';
  gradientLine: ArtworksPolyline;
  startColour: ArtworksColourIndex;
  endColour: ArtworksColourIndex;
};

export interface RecordBodyFillColourFlat {
  fillType: typeof ARTWORKS_FILL_TYPE_TAG.FLAT;
  unknown28: number;
  gradient: FillGradientFlat;
}

export interface RecordBodyFillColourShaded {
  fillType:
    typeof ARTWORKS_FILL_TYPE_TAG.LINEAR | typeof ARTWORKS_FILL_TYPE_TAG.RADIAL;
  unknown28: number;
  gradient: FillGradientShaded;
}

export type RecordBodyFillColour =
  RecordBodyFillColourFlat | RecordBodyFillColourShaded;

export interface RecordBodyJoinStyle {
  joinStyle: ArtworksJoinStyle;
}

export interface RecordBodyLineCapEnd {
  capStyle: ArtworksLineCapStyle;
  capTriangle: number;
}

export type RecordBodyLineCapStart = RecordBodyLineCapEnd;

export interface RecordBodyWindingRule {
  windingRule: ArtworksWindingRule;
}

export interface RecordBodyDashPattern {
  pattern: number;
  dashPattern?: DashPattern;
}

export interface RecordBodyRectangle {
  unknown24: number;
  path: ArtworksPath;
}

export interface RecordBodyCharacter {
  characterCode: number;
  unknown28: number;
  unknown32: number;
  unknown36: number;
  unknown40: number;
}

export interface RecordBody2E {
  unknown24: number;
  unknown28: string;
  unknown36: string;
  unknown60: number;
  unknown64: number;
}

export interface RecordBodyFontName {
  fontName: string;
}

export interface RecordBodyFontSize {
  xSize: number;
  ySize: number;
}

export interface RecordBody31 {
  unknown24: number;
  unknown28: number;
  unknown32: number;
  unknown36: number;
}

export interface RecordBody32 {
  unknown24: number;
}

export interface RecordBody33 {
  unknown24: number;
  unknown28: number;
  unknown32: number;
  unknown36: number;
  unknown40: number;
  unknown44: number;
}

export interface RecordBodyEllipse {
  triangle: ArtworksPolyline;
  path: ArtworksPath;
}

export interface RecordBodyRoundedRectangle {
  cornerRadius: number;
  triangle: ArtworksPolyline;
  path: ArtworksPath;
}

interface RecordBodyDistortionGroupValid {
  valid: 'valid';
  path: ArtworksPath;
  unknown156: number;
  unknown160: number;
  unknown164: number;
  unknown168: number;
  unknown172: number;
  unknown176: number;
  unknown180: number;
  unknown184: number;
  unknown188: number;
  originalObjectsBoundingBox: BoundingBox;
}

interface RecordBodyDistortionGroupInvalid {
  valid: 'invalid';
}

export type RecordBodyDistortionGroup =
  RecordBodyDistortionGroupValid | RecordBodyDistortionGroupInvalid;

interface RecordBodyPerspectiveGroupValid {
  valid: 'valid';
  path: ArtworksPath;
  unknown92: number;
  unknown96: number;
  unknown100: number;
  unknown104: number;
  unknown108: number;
  unknown112: number;
  unknown116: number;
  unknown120: number;
  unknown124: number;
  unknown128: number;
  unknown132: number;
  unknown136: number;
  unknown140: number;
  originalObjectsBoundingBox: BoundingBox;
}

interface RecordBodyPerspectiveGroupInvalid {
  valid: 'invalid';
}

export type RecordBodyPerspectiveGroup =
  RecordBodyPerspectiveGroupValid | RecordBodyPerspectiveGroupInvalid;

export interface RecordBodyFileInfo {
  fileInfo: string;
}

export interface RecordBodyBlendGroup {
  unknown24: number;
  unknown28: number;
  unknown32: number;
  unknown36: number;
  unknown40: number;
  unknown44: number;
  unknown48: number;
  unknown52: number;
  unknown56: number;
  unknown60: number;
  unknown64: number;
}

export interface RecordBodyBlendGroupOptions {
  unknown24: number;
  blendSteps: number;
  unknown32: number;
  unknown36: number;
  unknown40: number;
  unknown44: number;
  unknown48: number;
  unknown52: number;
  unknown56: number;
  unknown60: number;
}

export interface RecordBodyBlendPath {
  path: ArtworksPath;
}

export interface RecordBodyMarkerStart {
  markerStyle: ArtworksMarkerStyle;
  markerWidth: number;
  markerHeight: number;
}

export type RecordBodyMarkerEnd = RecordBodyMarkerStart;

export type RecordBodyDistortionSubgroup = RecordBodyEmpty;
