import { BinaryReader } from '@rbrown/io';

import { RecordBody32 } from '../types/index.js';

export function readRecordBody32(reader: BinaryReader): RecordBody32 {
  return {
    unknown24: reader.u32(),
  };
}
