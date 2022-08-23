module.exports.HEADER_IDENTIFIER = 'Top!';
module.exports.HEADER_VERSION = 9;
module.exports.HEADER_PROGRAM = 'TopDraw';

module.exports.FILE_OFFSET_UNDO_POSITION = 0x28;
module.exports.FILE_OFFSET_SPRITE_AREA_POSITION = 0x2C;
module.exports.FILE_OFFSET_PALETTE_POSITION = 0x3C;
module.exports.FILE_OFFSET_BODY = 0x80;

module.exports.RECORD_00 = 0x00;
module.exports.RECORD_01_TEXT = 0x01;
module.exports.RECORD_02_PATH = 0x02;
module.exports.RECORD_05_SPRITE = 0x05;
module.exports.RECORD_06_GROUP = 0x06;
module.exports.RECORD_0A_LAYER = 0x0A;
module.exports.RECORD_21_WORK_AREA = 0x21;
module.exports.RECORD_22 = 0x22;
module.exports.RECORD_23_SAVE_LOCATION = 0x23;
module.exports.RECORD_24_STROKE_COLOUR = 0x24;
module.exports.RECORD_25_STROKE_WIDTH = 0x25;
module.exports.RECORD_26_FILL_COLOUR = 0x26;
module.exports.RECORD_27_JOIN_STYLE = 0x27;
module.exports.RECORD_28_LINE_CAP_END = 0x28;
module.exports.RECORD_29_LINE_CAP_START = 0x29;
module.exports.RECORD_2A_WINDING_RULE = 0x2A;
module.exports.RECORD_2B_DASH_PATTERN = 0x2B;
module.exports.RECORD_2C_RECTANGLE = 0x2C;
module.exports.RECORD_2D_CHARACTER = 0x2D;
module.exports.RECORD_2E = 0x2E;
module.exports.RECORD_2F_FONT_NAME = 0x2F;
module.exports.RECORD_30_FONT_SIZE = 0x30;
module.exports.RECORD_31 = 0x31;
module.exports.RECORD_32 = 0x32;
module.exports.RECORD_33 = 0x33;
module.exports.RECORD_34_ELLIPSE = 0x34;
module.exports.RECORD_35_ROUNDED_RECTANGLE = 0x35;
module.exports.RECORD_37_DISTORTION_GROUP = 0x37;
module.exports.RECORD_38_PERSPECTIVE_GROUP = 0x38;
module.exports.RECORD_39_FILE_INFO = 0x39;
module.exports.RECORD_3A_BLEND_GROUP = 0x3A;
module.exports.RECORD_3B_BLEND_OPTIONS = 0x3B;
module.exports.RECORD_3D_BLEND_PATH = 0x3D;
module.exports.RECORD_3E_MARKER_START = 0x3E;
module.exports.RECORD_3F_MARKER_END = 0x3F;
module.exports.RECORD_42_DISTORTION_SUBGROUP = 0x42;

module.exports.COLOUR_MODEL_RGB = 0;
module.exports.COLOUR_MODEL_CMYK = 1;
module.exports.COLOUR_MODEL_HSV = 2;

module.exports.FILL_FLAT = 0;
module.exports.FILL_LINEAR = 1;
module.exports.FILL_RADIAL = 2;

module.exports.JOIN_MITRE = 0;
module.exports.JOIN_ROUND = 1;
module.exports.JOIN_BEVEL = 2;

module.exports.CAP_BUTT = 0;
module.exports.CAP_ROUND = 1;
module.exports.CAP_SQUARE = 2;
module.exports.CAP_TRIANGLE = 3;

module.exports.WINDING_RULE_NON_ZERO = 0;
module.exports.WINDING_RULE_EVEN_ODD = 1;

module.exports.MARKER_NONE = -1;
module.exports.MARKER_TRIANGLE = 0;
module.exports.MARKER_ARROW_HEAD = 1;
module.exports.MARKER_CIRCLE = 2;
module.exports.MARKER_ARROW_TAIL = 3;

module.exports.TAG_END = 0;
module.exports.TAG_MOVE = 2;
module.exports.TAG_UNKNOWN = 4;
module.exports.TAG_CLOSE_SUB_PATH = 5;
module.exports.TAG_BEZIER = 6;
module.exports.TAG_LINE = 8;

module.exports.TAG_BIT_31 = 0x80000000;

module.exports.UNKNOWN_4_BIT_0 = 0x01;
module.exports.UNKNOWN_4_BIT_1 = 0x02;

module.exports.LAYER_UNKNOWN_24_BIT_0 = 0x01;
module.exports.LAYER_UNKNOWN_24_BIT_3 = 0x08;
