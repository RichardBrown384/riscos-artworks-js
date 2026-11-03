import fs from 'node:fs';
import { intermediateFromArrayBuffer } from '@rbrown/riscos-file-formats';
import { svgFromIntermediate, svgToString } from '@rbrown/svg';

const fileIn = process.argv[2];
const fileOut = process.argv[3];
if (!fileIn || !fileOut) {
  throw new Error('Usage: npm run svg <input-file> <output-file>');
}

const buffer = fs.readFileSync(fileIn);
const array = buffer.buffer.slice(
  buffer.byteOffset,
  buffer.byteOffset + buffer.byteLength,
);
const intermediate = intermediateFromArrayBuffer(array);
if (!intermediate) {
  throw new Error('Unsupported input file');
}
const svgRootNode = svgFromIntermediate(intermediate);
if (!svgRootNode) {
  throw new Error('Error parsing svg root node');
}
const svg = svgToString(svgRootNode);

fs.writeFileSync(fileOut, svg);
