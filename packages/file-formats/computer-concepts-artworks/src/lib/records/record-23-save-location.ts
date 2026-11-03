import { BinaryReader } from '@rbrown/io';
import { RecordBodySaveLocation } from '../types/index.js';

export function readRecordBodySaveLocation(
  reader: BinaryReader,
): RecordBodySaveLocation {
  return {
    fileType: reader.u32(),
    filePath: reader.boundedCString(),
  };
}
