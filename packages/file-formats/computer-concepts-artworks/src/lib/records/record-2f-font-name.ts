import { BinaryReader } from '@rbrown/io';
import { RecordBodyFontName } from '../types/index.js';

export function readRecordBodyFontName(
  reader: BinaryReader,
): RecordBodyFontName {
  return {
    fontName: reader.boundedCString(),
  };
}
