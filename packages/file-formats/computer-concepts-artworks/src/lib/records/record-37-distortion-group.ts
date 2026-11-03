import { BinaryReader } from '@rbrown/io';
import { RecordBodyDistortionGroup } from '../types/index.js';
import { readBoundingBox, readPath } from '../primitives/index.js';

export function readRecordBodyDistortionGroup(
  reader: BinaryReader,
  isLast: boolean,
): RecordBodyDistortionGroup {
  if (isLast) {
    return { valid: 'invalid' };
  }
  return {
    valid: 'valid',
    path: readPath(reader),
    unknown156: reader.u32(),
    unknown160: reader.u32(),
    unknown164: reader.u32(),
    unknown168: reader.u32(),
    unknown172: reader.u32(),
    unknown176: reader.u32(),
    unknown180: reader.u32(),
    unknown184: reader.u32(),
    unknown188: reader.u32(),
    originalObjectsBoundingBox: readBoundingBox(reader),
  };
}
