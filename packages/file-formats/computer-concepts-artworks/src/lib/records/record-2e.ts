import { BinaryReader } from '@rbrown/io';

import { RecordBody2E } from '../types/index.js';

export function readRecordBody2E(reader: BinaryReader): RecordBody2E {
  return {
    unknown24: reader.u32(),
    unknown28: reader.paddedCString(8),
    unknown36: reader.paddedCString(24),
    unknown60: reader.i32(),
    unknown64: reader.i32(),
  };
}
