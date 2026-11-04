import { BinaryReader } from '@rbrown/io';

import { RecordBodyFileInfo } from '../types/index.js';

export function readRecordBodyFileInfo(
  reader: BinaryReader,
): RecordBodyFileInfo {
  return {
    fileInfo: reader.boundedCString(),
  };
}
