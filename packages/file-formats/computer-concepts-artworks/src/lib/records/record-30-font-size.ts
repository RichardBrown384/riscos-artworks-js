import { BinaryReader } from '@rbrown/io';
import { RecordBodyFontSize } from '../types/index.js';

export function readRecordBodyFontSize(
  reader: BinaryReader,
): RecordBodyFontSize {
  return {
    xSize: reader.u32(),
    ySize: reader.u32(),
  };
}
