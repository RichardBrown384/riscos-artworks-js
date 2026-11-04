import { BinaryReader } from '@rbrown/io';

import { RecordBody31 } from '../types/index.js';

export function readRecordBody31(reader: BinaryReader): RecordBody31 {
  return {
    unknown24: reader.u32(),
    unknown28: reader.u32(),
    unknown32: reader.u32(),
    unknown36: reader.u32(),
  };
}
