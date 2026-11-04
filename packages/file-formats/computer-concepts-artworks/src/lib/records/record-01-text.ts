import { BinaryReader } from '@rbrown/io';

import { readPolyline } from '../primitives/index.js';
import { RecordBodyText } from '../types/index.js';

export function readRecordBodyText(reader: BinaryReader): RecordBodyText {
  return {
    unknown24: reader.u32(),
    unknown28: reader.u32(),
    unknown32: reader.u32(),
    unknown36: reader.u32(),
    unknown40: reader.u32(),
    unknown44: reader.u32(),
    rectangle: readPolyline(reader, 4),
  };
}
