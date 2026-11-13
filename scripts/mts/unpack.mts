import { readFileSync, writeFileSync } from 'node:fs';

import { artworksFromArrayBuffer } from '@rbrown/computer-concepts-artworks';

const fileIn = process.argv[2];
const fileOut = process.argv[3];

if (!fileIn || !fileOut) {
  throw new Error('Usage: npm run unpack -- <input-file> <output-file>');
}

const buffer = readFileSync(fileIn);
const arrayBuffer = Uint8Array.from(buffer).buffer;
const artworks = artworksFromArrayBuffer(arrayBuffer);

if (artworks) {
  writeFileSync(fileOut, JSON.stringify(artworks, null, 2));
}
