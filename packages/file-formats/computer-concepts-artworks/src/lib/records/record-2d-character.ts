import { BinaryReader } from '@rbrown/io';
import { RecordBodyCharacter } from '../types/index.js';

export function readRecordBodyCharacter(
  reader: BinaryReader,
): RecordBodyCharacter {
  return {
    characterCode: reader.u32(),
    unknown28: reader.u32(),
    unknown32: reader.u32(),
    unknown36: reader.u32(),
    unknown40: reader.u32(),
  };
}
