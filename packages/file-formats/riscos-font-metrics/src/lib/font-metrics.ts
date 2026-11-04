import { check } from '@rbrown/check';
import { BoundingBox } from '@rbrown/geometry';
import { BinaryReader } from '@rbrown/io';

import {
  FontMetricKerningPair,
  FontMetrics,
  FontMetricsKerningPairs,
  FontMetricsMiscellaneous,
} from './font-metrics-types.js';

function isBitClear(v: number, n: number): boolean {
  return ((v >>> n) & 1) === 0;
}

function isBitSet(v: number, n: number): boolean {
  return ((v >>> n) & 1) !== 0;
}

function hasBoundingBoxData(flags: number) {
  return isBitClear(flags, 0);
}

function hasXOffsetData(flags: number) {
  return isBitClear(flags, 1);
}

function hasYOffsetData(flags: number) {
  return isBitClear(flags, 2);
}

function hasDataAfterMetrics(flags: number) {
  return isBitSet(flags, 3);
}

function hasCharacterMapSize(flags: number) {
  return isBitSet(flags, 5);
}

function has16BitKernCharacters(flags: number) {
  return isBitSet(flags, 6);
}

function readMiscellaneous(
  buffer: ArrayBuffer,
  position: number,
  flags: number,
): FontMetricsMiscellaneous | undefined {
  if (position >= buffer.byteLength) {
    return undefined;
  }

  const d = new BinaryReader(buffer, position);

  return {
    boundingBox: {
      minX: d.i16(),
      minY: d.i16(),
      maxX: d.i16(),
      maxY: d.i16(),
    },
    defaultXOffset: hasXOffsetData(flags) ? d.i16() : 0,
    defaultYOffset: hasYOffsetData(flags) ? d.i16() : 0,
    italicHOffsetPerEm: d.i16(),
    underlinePosition: d.i8(),
    underlineThickness: d.u8(),
    capHeight: d.i16(),
    xHeight: d.i16(),
    descender: d.i16(),
    ascender: d.i16(),
  };
}

function readKerningPairs(
  buffer: ArrayBuffer,
  position: number,
  flags: number,
): FontMetricsKerningPairs | undefined {
  if (position >= buffer.byteLength) {
    return undefined;
  }

  const d = new BinaryReader(buffer, position);

  function getCharCode() {
    return has16BitKernCharacters(flags) ? d.i16() : d.u8();
  }

  const pairs: FontMetricsKerningPairs = {};
  for (let leftCode = getCharCode(); leftCode !== 0; leftCode = getCharCode()) {
    const data: FontMetricKerningPair = {};
    for (
      let rightCode = getCharCode();
      rightCode !== 0;
      rightCode = getCharCode()
    ) {
      data[rightCode] = {
        x: hasXOffsetData(flags) ? d.i16() : 0,
        y: hasYOffsetData(flags) ? d.i16() : 0,
      };
    }
    pairs[leftCode] = data;
  }

  return pairs;
}

export function fontMetricsFromArrayBuffer(
  buffer: ArrayBuffer,
  position = 0,
): FontMetrics {
  const d = new BinaryReader(buffer, position);

  const name = d.string(40);
  const unknown40 = d.u32();
  const unknown44 = d.u32();
  const nLow = d.u8();
  const version = d.u8();
  const flags = d.u8();
  const nHigh = d.u8();

  check(
    [0, 2].includes(version),
    `Metric version ${version.toString()} is not supported.`,
  );
  if (version === 0) {
    check(
      flags === 0 && nHigh === 0,
      'Version 0 files must have 0 flags and no more than 256 characters defined',
    );
  }

  const n = 256 * nHigh + nLow;

  const mapSize = hasCharacterMapSize(flags) ? d.u16() : 256;

  const map = [];
  for (let i = 0; i < mapSize; i += 1) {
    map.push(d.u8());
  }

  const boundingBoxes: BoundingBox[] = [];
  if (hasBoundingBoxData(flags)) {
    for (let i = 0; i < n; i += 1) {
      boundingBoxes.push({
        minX: d.i16(),
        minY: d.i16(),
        maxX: d.i16(),
        maxY: d.i16(),
      });
    }
  }

  const xOffsets = [];
  if (hasXOffsetData(flags)) {
    for (let i = 0; i < n; i += 1) {
      xOffsets.push(d.i16());
    }
  }

  const yOffsets = [];
  if (hasYOffsetData(flags)) {
    for (let i = 0; i < n; i += 1) {
      yOffsets.push(d.i16());
    }
  }

  let miscellaneous = undefined;
  let kerning = undefined;
  if (hasDataAfterMetrics(flags)) {
    const tablePosition = d.tell();
    const offsetMiscellaneous = d.u16();
    const offsetKerning = d.u16();

    miscellaneous = readMiscellaneous(
      buffer,
      tablePosition + offsetMiscellaneous,
      flags,
    );
    kerning = readKerningPairs(buffer, tablePosition + offsetKerning, flags);
  }

  return {
    name: name.trimEnd(),
    unknown40,
    unknown44,
    version,
    flags,
    n,
    mapSize,
    map,
    boundingBoxes,
    xOffsets,
    yOffsets,
    miscellaneous,
    kerning,
  } satisfies FontMetrics;
}
