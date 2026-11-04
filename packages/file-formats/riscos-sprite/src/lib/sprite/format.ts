import { check, checkIf } from '@rbrown/check';
import { BitField } from '@rbrown/io';

import type {
  SpriteControlBlock,
  SpriteFormat,
  SpritePaletteEntry,
} from '../sprite-types.js';

type RiscOsModeProperties = {
  xEigenFactor: number;
  yEigenFactor: number;
  bitsPerPixel: number;
  palette: SpritePaletteEntry[];
};

const WIMP_PALETTE_1BPP: SpritePaletteEntry[] = [
  { first: 0xffffff00, second: 0xffffff00 },
  { first: 0x00000000, second: 0x00000000 },
] as const;

const WIMP_PALETTE_2BPP: SpritePaletteEntry[] = [
  { first: 0xffffff00, second: 0xffffff00 },
  { first: 0xbbbbbb00, second: 0xbbbbbb00 },
  { first: 0x77777700, second: 0x77777700 },
  { first: 0x00000000, second: 0x00000000 },
] as const;

const WIMP_PALETTE_4BPP: SpritePaletteEntry[] = [
  { first: 0xffffff00, second: 0xffffff00 },
  { first: 0xdddddd00, second: 0xdddddd00 },
  { first: 0xbbbbbb00, second: 0xbbbbbb00 },
  { first: 0x99999900, second: 0x99999900 },
  { first: 0x77777700, second: 0x77777700 },
  { first: 0x55555500, second: 0x55555500 },
  { first: 0x33333300, second: 0x33333300 },
  { first: 0x00000000, second: 0x00000000 },
  { first: 0x99440000, second: 0x99440000 },
  { first: 0x00eeee00, second: 0x00eeee00 },
  { first: 0x00cc0000, second: 0x00cc0000 },
  { first: 0x0000dd00, second: 0x0000dd00 },
  { first: 0xbbeeee00, second: 0xbbeeee00 },
  { first: 0x00885500, second: 0x00885500 },
  { first: 0x00bbff00, second: 0x00bbff00 },
  { first: 0xffbb0000, second: 0xffbb0000 },
];

const WIMP_PALETTE_MODE7: SpritePaletteEntry[] = [
  { first: 0x00000000, second: 0x00000000 },
  { first: 0x0000ff00, second: 0x0000ff00 },
  { first: 0x00ff0000, second: 0x00ff0000 },
  { first: 0x00ffff00, second: 0x00ffff00 },
  { first: 0xff000000, second: 0xff000000 },
  { first: 0xff00ff00, second: 0xff00ff00 },
  { first: 0xffff0000, second: 0xffff0000 },
  { first: 0xffffff00, second: 0xffffff00 },
  { first: 0x00000000, second: 0x00000000 },
  { first: 0x0000ff00, second: 0x0000ff00 },
  { first: 0x00ff0000, second: 0x00ff0000 },
  { first: 0x00ffff00, second: 0x00ffff00 },
  { first: 0xff000000, second: 0xff000000 },
  { first: 0xff00ff00, second: 0xff00ff00 },
  { first: 0xffff0000, second: 0xffff0000 },
  { first: 0xffffff00, second: 0xffffff00 },
] as const;

const WIMP_PALETTE_8BPP: SpritePaletteEntry[] = [
  { first: 0x00000000, second: 0x00000000 },
  { first: 0x11111100, second: 0x11111100 },
  { first: 0x22222200, second: 0x22222200 },
  { first: 0x33333300, second: 0x33333300 },
  { first: 0x00004400, second: 0x00004400 },
  { first: 0x11115500, second: 0x11115500 },
  { first: 0x22226600, second: 0x22226600 },
  { first: 0x33337700, second: 0x33337700 },
  { first: 0x44000000, second: 0x44000000 },
  { first: 0x55111100, second: 0x55111100 },
  { first: 0x66222200, second: 0x66222200 },
  { first: 0x77333300, second: 0x77333300 },
  { first: 0x44004400, second: 0x44004400 },
  { first: 0x55115500, second: 0x55115500 },
  { first: 0x66226600, second: 0x66226600 },
  { first: 0x77337700, second: 0x77337700 },
  { first: 0x00008800, second: 0x00008800 },
  { first: 0x11119900, second: 0x11119900 },
  { first: 0x2222aa00, second: 0x2222aa00 },
  { first: 0x3333bb00, second: 0x3333bb00 },
  { first: 0x0000cc00, second: 0x0000cc00 },
  { first: 0x1111dd00, second: 0x1111dd00 },
  { first: 0x2222ee00, second: 0x2222ee00 },
  { first: 0x3333ff00, second: 0x3333ff00 },
  { first: 0x44008800, second: 0x44008800 },
  { first: 0x55119900, second: 0x55119900 },
  { first: 0x6622aa00, second: 0x6622aa00 },
  { first: 0x7733bb00, second: 0x7733bb00 },
  { first: 0x4400cc00, second: 0x4400cc00 },
  { first: 0x5511dd00, second: 0x5511dd00 },
  { first: 0x6622ee00, second: 0x6622ee00 },
  { first: 0x7733ff00, second: 0x7733ff00 },
  { first: 0x00440000, second: 0x00440000 },
  { first: 0x11551100, second: 0x11551100 },
  { first: 0x22662200, second: 0x22662200 },
  { first: 0x33773300, second: 0x33773300 },
  { first: 0x00444400, second: 0x00444400 },
  { first: 0x11555500, second: 0x11555500 },
  { first: 0x22666600, second: 0x22666600 },
  { first: 0x33777700, second: 0x33777700 },
  { first: 0x44440000, second: 0x44440000 },
  { first: 0x55551100, second: 0x55551100 },
  { first: 0x66662200, second: 0x66662200 },
  { first: 0x77773300, second: 0x77773300 },
  { first: 0x44444400, second: 0x44444400 },
  { first: 0x55555500, second: 0x55555500 },
  { first: 0x66666600, second: 0x66666600 },
  { first: 0x77777700, second: 0x77777700 },
  { first: 0x00448800, second: 0x00448800 },
  { first: 0x11559900, second: 0x11559900 },
  { first: 0x2266aa00, second: 0x2266aa00 },
  { first: 0x3377bb00, second: 0x3377bb00 },
  { first: 0x0044cc00, second: 0x0044cc00 },
  { first: 0x1155dd00, second: 0x1155dd00 },
  { first: 0x2266ee00, second: 0x2266ee00 },
  { first: 0x3377ff00, second: 0x3377ff00 },
  { first: 0x44448800, second: 0x44448800 },
  { first: 0x55559900, second: 0x55559900 },
  { first: 0x6666aa00, second: 0x6666aa00 },
  { first: 0x7777bb00, second: 0x7777bb00 },
  { first: 0x4444cc00, second: 0x4444cc00 },
  { first: 0x5555dd00, second: 0x5555dd00 },
  { first: 0x6666ee00, second: 0x6666ee00 },
  { first: 0x7777ff00, second: 0x7777ff00 },
  { first: 0x00880000, second: 0x00880000 },
  { first: 0x11991100, second: 0x11991100 },
  { first: 0x22aa2200, second: 0x22aa2200 },
  { first: 0x33bb3300, second: 0x33bb3300 },
  { first: 0x00884400, second: 0x00884400 },
  { first: 0x11995500, second: 0x11995500 },
  { first: 0x22aa6600, second: 0x22aa6600 },
  { first: 0x33bb7700, second: 0x33bb7700 },
  { first: 0x44880000, second: 0x44880000 },
  { first: 0x55991100, second: 0x55991100 },
  { first: 0x66aa2200, second: 0x66aa2200 },
  { first: 0x77bb3300, second: 0x77bb3300 },
  { first: 0x44884400, second: 0x44884400 },
  { first: 0x55995500, second: 0x55995500 },
  { first: 0x66aa6600, second: 0x66aa6600 },
  { first: 0x77bb7700, second: 0x77bb7700 },
  { first: 0x00888800, second: 0x00888800 },
  { first: 0x11999900, second: 0x11999900 },
  { first: 0x22aaaa00, second: 0x22aaaa00 },
  { first: 0x33bbbb00, second: 0x33bbbb00 },
  { first: 0x0088cc00, second: 0x0088cc00 },
  { first: 0x1199dd00, second: 0x1199dd00 },
  { first: 0x22aaee00, second: 0x22aaee00 },
  { first: 0x33bbff00, second: 0x33bbff00 },
  { first: 0x44888800, second: 0x44888800 },
  { first: 0x55999900, second: 0x55999900 },
  { first: 0x66aaaa00, second: 0x66aaaa00 },
  { first: 0x77bbbb00, second: 0x77bbbb00 },
  { first: 0x4488cc00, second: 0x4488cc00 },
  { first: 0x5599dd00, second: 0x5599dd00 },
  { first: 0x66aaee00, second: 0x66aaee00 },
  { first: 0x77bbff00, second: 0x77bbff00 },
  { first: 0x00cc0000, second: 0x00cc0000 },
  { first: 0x11dd1100, second: 0x11dd1100 },
  { first: 0x22ee2200, second: 0x22ee2200 },
  { first: 0x33ff3300, second: 0x33ff3300 },
  { first: 0x00cc4400, second: 0x00cc4400 },
  { first: 0x11dd5500, second: 0x11dd5500 },
  { first: 0x22ee6600, second: 0x22ee6600 },
  { first: 0x33ff7700, second: 0x33ff7700 },
  { first: 0x44cc0000, second: 0x44cc0000 },
  { first: 0x55dd1100, second: 0x55dd1100 },
  { first: 0x66ee2200, second: 0x66ee2200 },
  { first: 0x77ff3300, second: 0x77ff3300 },
  { first: 0x44cc4400, second: 0x44cc4400 },
  { first: 0x55dd5500, second: 0x55dd5500 },
  { first: 0x66ee6600, second: 0x66ee6600 },
  { first: 0x77ff7700, second: 0x77ff7700 },
  { first: 0x00cc8800, second: 0x00cc8800 },
  { first: 0x11dd9900, second: 0x11dd9900 },
  { first: 0x22eeaa00, second: 0x22eeaa00 },
  { first: 0x33ffbb00, second: 0x33ffbb00 },
  { first: 0x00cccc00, second: 0x00cccc00 },
  { first: 0x11dddd00, second: 0x11dddd00 },
  { first: 0x22eeee00, second: 0x22eeee00 },
  { first: 0x33ffff00, second: 0x33ffff00 },
  { first: 0x44cc8800, second: 0x44cc8800 },
  { first: 0x55dd9900, second: 0x55dd9900 },
  { first: 0x66eeaa00, second: 0x66eeaa00 },
  { first: 0x77ffbb00, second: 0x77ffbb00 },
  { first: 0x44cccc00, second: 0x44cccc00 },
  { first: 0x55dddd00, second: 0x55dddd00 },
  { first: 0x66eeee00, second: 0x66eeee00 },
  { first: 0x77ffff00, second: 0x77ffff00 },
  { first: 0x88000000, second: 0x88000000 },
  { first: 0x99111100, second: 0x99111100 },
  { first: 0xaa222200, second: 0xaa222200 },
  { first: 0xbb333300, second: 0xbb333300 },
  { first: 0x88004400, second: 0x88004400 },
  { first: 0x99115500, second: 0x99115500 },
  { first: 0xaa226600, second: 0xaa226600 },
  { first: 0xbb337700, second: 0xbb337700 },
  { first: 0xcc000000, second: 0xcc000000 },
  { first: 0xdd111100, second: 0xdd111100 },
  { first: 0xee222200, second: 0xee222200 },
  { first: 0xff333300, second: 0xff333300 },
  { first: 0xcc004400, second: 0xcc004400 },
  { first: 0xdd115500, second: 0xdd115500 },
  { first: 0xee226600, second: 0xee226600 },
  { first: 0xff337700, second: 0xff337700 },
  { first: 0x88008800, second: 0x88008800 },
  { first: 0x99119900, second: 0x99119900 },
  { first: 0xaa22aa00, second: 0xaa22aa00 },
  { first: 0xbb33bb00, second: 0xbb33bb00 },
  { first: 0x8800cc00, second: 0x8800cc00 },
  { first: 0x9911dd00, second: 0x9911dd00 },
  { first: 0xaa22ee00, second: 0xaa22ee00 },
  { first: 0xbb33ff00, second: 0xbb33ff00 },
  { first: 0xcc008800, second: 0xcc008800 },
  { first: 0xdd119900, second: 0xdd119900 },
  { first: 0xee22aa00, second: 0xee22aa00 },
  { first: 0xff33bb00, second: 0xff33bb00 },
  { first: 0xcc00cc00, second: 0xcc00cc00 },
  { first: 0xdd11dd00, second: 0xdd11dd00 },
  { first: 0xee22ee00, second: 0xee22ee00 },
  { first: 0xff33ff00, second: 0xff33ff00 },
  { first: 0x88440000, second: 0x88440000 },
  { first: 0x99551100, second: 0x99551100 },
  { first: 0xaa662200, second: 0xaa662200 },
  { first: 0xbb773300, second: 0xbb773300 },
  { first: 0x88444400, second: 0x88444400 },
  { first: 0x99555500, second: 0x99555500 },
  { first: 0xaa666600, second: 0xaa666600 },
  { first: 0xbb777700, second: 0xbb777700 },
  { first: 0xcc440000, second: 0xcc440000 },
  { first: 0xdd551100, second: 0xdd551100 },
  { first: 0xee662200, second: 0xee662200 },
  { first: 0xff773300, second: 0xff773300 },
  { first: 0xcc444400, second: 0xcc444400 },
  { first: 0xdd555500, second: 0xdd555500 },
  { first: 0xee666600, second: 0xee666600 },
  { first: 0xff777700, second: 0xff777700 },
  { first: 0x88448800, second: 0x88448800 },
  { first: 0x99559900, second: 0x99559900 },
  { first: 0xaa66aa00, second: 0xaa66aa00 },
  { first: 0xbb77bb00, second: 0xbb77bb00 },
  { first: 0x8844cc00, second: 0x8844cc00 },
  { first: 0x9955dd00, second: 0x9955dd00 },
  { first: 0xaa66ee00, second: 0xaa66ee00 },
  { first: 0xbb77ff00, second: 0xbb77ff00 },
  { first: 0xcc448800, second: 0xcc448800 },
  { first: 0xdd559900, second: 0xdd559900 },
  { first: 0xee66aa00, second: 0xee66aa00 },
  { first: 0xff77bb00, second: 0xff77bb00 },
  { first: 0xcc44cc00, second: 0xcc44cc00 },
  { first: 0xdd55dd00, second: 0xdd55dd00 },
  { first: 0xee66ee00, second: 0xee66ee00 },
  { first: 0xff77ff00, second: 0xff77ff00 },
  { first: 0x88880000, second: 0x88880000 },
  { first: 0x99991100, second: 0x99991100 },
  { first: 0xaaaa2200, second: 0xaaaa2200 },
  { first: 0xbbbb3300, second: 0xbbbb3300 },
  { first: 0x88884400, second: 0x88884400 },
  { first: 0x99995500, second: 0x99995500 },
  { first: 0xaaaa6600, second: 0xaaaa6600 },
  { first: 0xbbbb7700, second: 0xbbbb7700 },
  { first: 0xcc880000, second: 0xcc880000 },
  { first: 0xdd991100, second: 0xdd991100 },
  { first: 0xeeaa2200, second: 0xeeaa2200 },
  { first: 0xffbb3300, second: 0xffbb3300 },
  { first: 0xcc884400, second: 0xcc884400 },
  { first: 0xdd995500, second: 0xdd995500 },
  { first: 0xeeaa6600, second: 0xeeaa6600 },
  { first: 0xffbb7700, second: 0xffbb7700 },
  { first: 0x88888800, second: 0x88888800 },
  { first: 0x99999900, second: 0x99999900 },
  { first: 0xaaaaaa00, second: 0xaaaaaa00 },
  { first: 0xbbbbbb00, second: 0xbbbbbb00 },
  { first: 0x8888cc00, second: 0x8888cc00 },
  { first: 0x9999dd00, second: 0x9999dd00 },
  { first: 0xaaaaee00, second: 0xaaaaee00 },
  { first: 0xbbbbff00, second: 0xbbbbff00 },
  { first: 0xcc888800, second: 0xcc888800 },
  { first: 0xdd999900, second: 0xdd999900 },
  { first: 0xeeaaaa00, second: 0xeeaaaa00 },
  { first: 0xffbbbb00, second: 0xffbbbb00 },
  { first: 0xcc88cc00, second: 0xcc88cc00 },
  { first: 0xdd99dd00, second: 0xdd99dd00 },
  { first: 0xeeaaee00, second: 0xeeaaee00 },
  { first: 0xffbbff00, second: 0xffbbff00 },
  { first: 0x88cc0000, second: 0x88cc0000 },
  { first: 0x99dd1100, second: 0x99dd1100 },
  { first: 0xaaee2200, second: 0xaaee2200 },
  { first: 0xbbff3300, second: 0xbbff3300 },
  { first: 0x88cc4400, second: 0x88cc4400 },
  { first: 0x99dd5500, second: 0x99dd5500 },
  { first: 0xaaee6600, second: 0xaaee6600 },
  { first: 0xbbff7700, second: 0xbbff7700 },
  { first: 0xcccc0000, second: 0xcccc0000 },
  { first: 0xdddd1100, second: 0xdddd1100 },
  { first: 0xeeee2200, second: 0xeeee2200 },
  { first: 0xffff3300, second: 0xffff3300 },
  { first: 0xcccc4400, second: 0xcccc4400 },
  { first: 0xdddd5500, second: 0xdddd5500 },
  { first: 0xeeee6600, second: 0xeeee6600 },
  { first: 0xffff7700, second: 0xffff7700 },
  { first: 0x88cc8800, second: 0x88cc8800 },
  { first: 0x99dd9900, second: 0x99dd9900 },
  { first: 0xaaeeaa00, second: 0xaaeeaa00 },
  { first: 0xbbffbb00, second: 0xbbffbb00 },
  { first: 0x88cccc00, second: 0x88cccc00 },
  { first: 0x99dddd00, second: 0x99dddd00 },
  { first: 0xaaeeee00, second: 0xaaeeee00 },
  { first: 0xbbffff00, second: 0xbbffff00 },
  { first: 0xcccc8800, second: 0xcccc8800 },
  { first: 0xdddd9900, second: 0xdddd9900 },
  { first: 0xeeeeaa00, second: 0xeeeeaa00 },
  { first: 0xffffbb00, second: 0xffffbb00 },
  { first: 0xcccccc00, second: 0xcccccc00 },
  { first: 0xdddddd00, second: 0xdddddd00 },
  { first: 0xeeeeee00, second: 0xeeeeee00 },
  { first: 0xffffff00, second: 0xffffff00 },
];

const RISCOS_MODE_PROPERTIES: Partial<Record<number, RiscOsModeProperties>> = {
  0: {
    xEigenFactor: 1,
    yEigenFactor: 2,
    bitsPerPixel: 1,
    palette: WIMP_PALETTE_1BPP,
  },
  1: {
    xEigenFactor: 2,
    yEigenFactor: 2,
    bitsPerPixel: 2,
    palette: WIMP_PALETTE_2BPP,
  },
  2: {
    xEigenFactor: 3,
    yEigenFactor: 2,
    bitsPerPixel: 4,
    palette: WIMP_PALETTE_4BPP,
  },
  3: {
    xEigenFactor: 1,
    yEigenFactor: 2,
    bitsPerPixel: 1,
    palette: WIMP_PALETTE_1BPP,
  },
  4: {
    xEigenFactor: 2,
    yEigenFactor: 2,
    bitsPerPixel: 1,
    palette: WIMP_PALETTE_1BPP,
  },
  5: {
    xEigenFactor: 3,
    yEigenFactor: 2,
    bitsPerPixel: 2,
    palette: WIMP_PALETTE_2BPP,
  },
  6: {
    xEigenFactor: 2,
    yEigenFactor: 2,
    bitsPerPixel: 1,
    palette: WIMP_PALETTE_1BPP,
  },
  7: {
    xEigenFactor: 2,
    yEigenFactor: 2,
    bitsPerPixel: 4,
    palette: WIMP_PALETTE_MODE7,
  },
  8: {
    xEigenFactor: 1,
    yEigenFactor: 2,
    bitsPerPixel: 2,
    palette: WIMP_PALETTE_2BPP,
  },
  9: {
    xEigenFactor: 2,
    yEigenFactor: 2,
    bitsPerPixel: 4,
    palette: WIMP_PALETTE_4BPP,
  },
  10: {
    xEigenFactor: 3,
    yEigenFactor: 2,
    bitsPerPixel: 8,
    palette: WIMP_PALETTE_8BPP,
  },
  11: {
    xEigenFactor: 1,
    yEigenFactor: 2,
    bitsPerPixel: 2,
    palette: WIMP_PALETTE_2BPP,
  },
  12: {
    xEigenFactor: 1,
    yEigenFactor: 2,
    bitsPerPixel: 4,
    palette: WIMP_PALETTE_4BPP,
  },
  13: {
    xEigenFactor: 2,
    yEigenFactor: 2,
    bitsPerPixel: 8,
    palette: WIMP_PALETTE_8BPP,
  },
  14: {
    xEigenFactor: 1,
    yEigenFactor: 2,
    bitsPerPixel: 4,
    palette: WIMP_PALETTE_4BPP,
  },
  15: {
    xEigenFactor: 1,
    yEigenFactor: 2,
    bitsPerPixel: 8,
    palette: WIMP_PALETTE_8BPP,
  },
  16: {
    xEigenFactor: 1,
    yEigenFactor: 2,
    bitsPerPixel: 4,
    palette: WIMP_PALETTE_4BPP,
  },
  17: {
    xEigenFactor: 1,
    yEigenFactor: 2,
    bitsPerPixel: 4,
    palette: WIMP_PALETTE_4BPP,
  },
  18: {
    xEigenFactor: 1,
    yEigenFactor: 1,
    bitsPerPixel: 1,
    palette: WIMP_PALETTE_1BPP,
  },
  19: {
    xEigenFactor: 1,
    yEigenFactor: 1,
    bitsPerPixel: 2,
    palette: WIMP_PALETTE_2BPP,
  },
  20: {
    xEigenFactor: 1,
    yEigenFactor: 1,
    bitsPerPixel: 4,
    palette: WIMP_PALETTE_4BPP,
  },
  21: {
    xEigenFactor: 1,
    yEigenFactor: 1,
    bitsPerPixel: 8,
    palette: WIMP_PALETTE_8BPP,
  },
  22: {
    xEigenFactor: 0,
    yEigenFactor: 1,
    bitsPerPixel: 4,
    palette: WIMP_PALETTE_4BPP,
  },
  23: {
    xEigenFactor: 1,
    yEigenFactor: 1,
    bitsPerPixel: 1,
    palette: WIMP_PALETTE_1BPP,
  },
  24: {
    xEigenFactor: 1,
    yEigenFactor: 2,
    bitsPerPixel: 8,
    palette: WIMP_PALETTE_8BPP,
  },
  25: {
    xEigenFactor: 1,
    yEigenFactor: 1,
    bitsPerPixel: 1,
    palette: WIMP_PALETTE_1BPP,
  },
  26: {
    xEigenFactor: 1,
    yEigenFactor: 1,
    bitsPerPixel: 2,
    palette: WIMP_PALETTE_2BPP,
  },
  27: {
    xEigenFactor: 1,
    yEigenFactor: 1,
    bitsPerPixel: 4,
    palette: WIMP_PALETTE_4BPP,
  },
  28: {
    xEigenFactor: 1,
    yEigenFactor: 1,
    bitsPerPixel: 8,
    palette: WIMP_PALETTE_8BPP,
  },
  29: {
    xEigenFactor: 1,
    yEigenFactor: 1,
    bitsPerPixel: 1,
    palette: WIMP_PALETTE_1BPP,
  },
  30: {
    xEigenFactor: 1,
    yEigenFactor: 1,
    bitsPerPixel: 2,
    palette: WIMP_PALETTE_2BPP,
  },
  31: {
    xEigenFactor: 1,
    yEigenFactor: 1,
    bitsPerPixel: 4,
    palette: WIMP_PALETTE_4BPP,
  },
  32: {
    xEigenFactor: 1,
    yEigenFactor: 1,
    bitsPerPixel: 8,
    palette: WIMP_PALETTE_8BPP,
  },
  33: {
    xEigenFactor: 1,
    yEigenFactor: 2,
    bitsPerPixel: 1,
    palette: WIMP_PALETTE_1BPP,
  },
  34: {
    xEigenFactor: 1,
    yEigenFactor: 2,
    bitsPerPixel: 2,
    palette: WIMP_PALETTE_2BPP,
  },
  35: {
    xEigenFactor: 1,
    yEigenFactor: 2,
    bitsPerPixel: 4,
    palette: WIMP_PALETTE_4BPP,
  },
  36: {
    xEigenFactor: 1,
    yEigenFactor: 2,
    bitsPerPixel: 8,
    palette: WIMP_PALETTE_8BPP,
  },
  37: {
    xEigenFactor: 1,
    yEigenFactor: 2,
    bitsPerPixel: 1,
    palette: WIMP_PALETTE_1BPP,
  },
  38: {
    xEigenFactor: 1,
    yEigenFactor: 2,
    bitsPerPixel: 2,
    palette: WIMP_PALETTE_2BPP,
  },
  39: {
    xEigenFactor: 1,
    yEigenFactor: 2,
    bitsPerPixel: 4,
    palette: WIMP_PALETTE_4BPP,
  },
  40: {
    xEigenFactor: 1,
    yEigenFactor: 2,
    bitsPerPixel: 8,
    palette: WIMP_PALETTE_8BPP,
  },
  41: {
    xEigenFactor: 1,
    yEigenFactor: 2,
    bitsPerPixel: 1,
    palette: WIMP_PALETTE_1BPP,
  },
  42: {
    xEigenFactor: 1,
    yEigenFactor: 2,
    bitsPerPixel: 2,
    palette: WIMP_PALETTE_2BPP,
  },
  43: {
    xEigenFactor: 1,
    yEigenFactor: 2,
    bitsPerPixel: 4,
    palette: WIMP_PALETTE_4BPP,
  },
  44: {
    xEigenFactor: 1,
    yEigenFactor: 2,
    bitsPerPixel: 1,
    palette: WIMP_PALETTE_1BPP,
  },
  45: {
    xEigenFactor: 1,
    yEigenFactor: 2,
    bitsPerPixel: 2,
    palette: WIMP_PALETTE_2BPP,
  },
  46: {
    xEigenFactor: 1,
    yEigenFactor: 2,
    bitsPerPixel: 4,
    palette: WIMP_PALETTE_4BPP,
  },
  47: {
    xEigenFactor: 2,
    yEigenFactor: 2,
    bitsPerPixel: 8,
    palette: WIMP_PALETTE_8BPP,
  },
  48: {
    xEigenFactor: 2,
    yEigenFactor: 1,
    bitsPerPixel: 4,
    palette: WIMP_PALETTE_4BPP,
  },
  49: {
    xEigenFactor: 2,
    yEigenFactor: 1,
    bitsPerPixel: 8,
    palette: WIMP_PALETTE_8BPP,
  },
} as const;

function chooseEffectivePalette(
  bitsPerPixel: number,
  modePalette: SpritePaletteEntry[],
  controlBlockPalette?: SpritePaletteEntry[],
): SpritePaletteEntry[] {
  // The documentation says that 8-bit sprites created with *ScreenSave
  // can have palettes with 64 entries. For now until we have time to
  // investigate we fall back to the defined palette when the size
  // doesn't match.
  return controlBlockPalette?.length === 2 ** bitsPerPixel
    ? controlBlockPalette
    : modePalette;
}

type SpriteType = 0 | 1 | 2 | 3 | 4 | 5 | 6;

type SpriteTypeLegacySpecification = {
  type: 'legacy';
};

type SpriteTypePaletteSpecification = {
  type: 'palette';
  bitsPerPixel: number;
  palette: SpritePaletteEntry[];
};

type SpriteTypeColourSpecification = {
  type: 'colour';
  colourModel: 'bgr555' | 'bgr888';
  bitsPerPixel: number;
};

type SpriteTypeSpecification =
  | SpriteTypeLegacySpecification
  | SpriteTypePaletteSpecification
  | SpriteTypeColourSpecification;

const SPRITE_TYPE_SPECIFICATIONS: Record<SpriteType, SpriteTypeSpecification> =
  {
    0: { type: 'legacy' },
    1: { type: 'palette', bitsPerPixel: 1, palette: WIMP_PALETTE_1BPP },
    2: { type: 'palette', bitsPerPixel: 2, palette: WIMP_PALETTE_2BPP },
    3: { type: 'palette', bitsPerPixel: 4, palette: WIMP_PALETTE_4BPP },
    4: { type: 'palette', bitsPerPixel: 8, palette: WIMP_PALETTE_8BPP },
    5: { type: 'colour', colourModel: 'bgr555', bitsPerPixel: 16 },
    6: { type: 'colour', colourModel: 'bgr888', bitsPerPixel: 32 },
  } as const;

export function spriteFormatFromControlBlock({
  mode,
  palette,
  firstBitUsed,
}: SpriteControlBlock): SpriteFormat {
  const bitfield = new BitField(mode);
  const type = bitfield.extract(27, 5);
  const yDpi = bitfield.extract(14, 13);
  const xDpi = bitfield.extract(1, 13);
  const flag = bitfield.extract(0, 1);

  check(
    type in SPRITE_TYPE_SPECIFICATIONS,
    `unsupported sprite type ${type.toString()}`,
  );
  checkIf(type > 0, yDpi > 0, `sprite must have valid yDpi setting`);
  checkIf(type > 0, xDpi > 0, `sprite must have valid xDpi setting`);
  checkIf(type > 0, flag === 1, `sprite mode bit must be set`);
  checkIf(type > 0, firstBitUsed === 0, 'left wastage not allowed in sprite');

  const specification = SPRITE_TYPE_SPECIFICATIONS[type as SpriteType];

  switch (specification.type) {
    case 'legacy': {
      // Old school RISC OS 3.1 and earlier sprite
      const modeProperties = RISCOS_MODE_PROPERTIES[mode];
      check(
        modeProperties !== undefined,
        `no mode properties found for ${mode.toString()}`,
      );
      const bitsPerPixel = modeProperties.bitsPerPixel;
      return {
        colourModel: 'palette',
        imageBitsPerPixel: bitsPerPixel,
        maskBitsPerPixel: bitsPerPixel,
        // RISC OS defines eigen DPI scaling as a right-shift of 180 DPI
        // Well, theoretically, it's more a guideline really
        xDpi: 180 >> modeProperties.xEigenFactor,
        yDpi: 180 >> modeProperties.yEigenFactor,
        palette: chooseEffectivePalette(
          bitsPerPixel,
          modeProperties.palette,
          palette,
        ),
      };
    }

    case 'palette':
      return {
        colourModel: 'palette',
        imageBitsPerPixel: specification.bitsPerPixel,
        maskBitsPerPixel: 1,
        xDpi,
        yDpi,
        palette: chooseEffectivePalette(
          specification.bitsPerPixel,
          specification.palette,
          palette,
        ),
      };

    case 'colour':
      return {
        colourModel: specification.colourModel,
        imageBitsPerPixel: specification.bitsPerPixel,
        maskBitsPerPixel: 1,
        xDpi,
        yDpi,
      };
  }
}
