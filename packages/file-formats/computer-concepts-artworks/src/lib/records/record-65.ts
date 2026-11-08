import { BinaryReader } from '@rbrown/io';

import { RecordBody65 } from '../types/index.js';

export function readRecordBody65(reader: BinaryReader): RecordBody65 {
  return {
    unknown24: reader.u32(),
    unknown28: reader.u32(),
    unknown32: reader.u32(),
    unknown36: reader.u32(),
    unknown40: reader.u32(),
    unknown44: reader.u32(),
    unknown48: reader.u32(),
    unknown52: reader.u32(),
    unknown56: reader.u32(),
    unknown60: reader.u32(),
  };
}
