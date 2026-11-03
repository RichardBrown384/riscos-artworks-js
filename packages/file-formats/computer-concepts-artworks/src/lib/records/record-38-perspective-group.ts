import { BinaryReader } from '@rbrown/io';
import { RecordBodyPerspectiveGroup } from '../types/index.js';
import { readBoundingBox, readPath } from '../primitives/index.js';

export function readRecordBodyPerspectiveGroup(
  reader: BinaryReader,
  isLast: boolean,
): RecordBodyPerspectiveGroup {
  if (isLast) {
    return { valid: 'invalid' };
  }
  return {
    valid: 'valid',
    path: readPath(reader),
    unknown92: reader.u32(),
    unknown96: reader.u32(),
    unknown100: reader.u32(),
    unknown104: reader.u32(),
    unknown108: reader.u32(),
    unknown112: reader.u32(),
    unknown116: reader.u32(),
    unknown120: reader.u32(),
    unknown124: reader.u32(),
    unknown128: reader.u32(),
    unknown132: reader.u32(),
    unknown136: reader.u32(),
    unknown140: reader.u32(),
    originalObjectsBoundingBox: readBoundingBox(reader),
  };
}
