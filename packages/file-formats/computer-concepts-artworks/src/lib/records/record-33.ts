import { BinaryReader } from '@rbrown/io';

import { RecordBody33 } from '../types/index.js';

export function readRecordBody33(reader: BinaryReader): RecordBody33 {
  return {
    unknown24: reader.i32(),
    unknown28: reader.i32(),
    unknown32: reader.i32(),
    unknown36: reader.i32(),
    unknown40: reader.i32(),
    unknown44: reader.i32(),
  };
}
