import { readFileSync, writeFileSync } from 'node:fs';
import {
  artworksToArrayBuffer,
  type ArtworksFile,
} from '@rbrown/computer-concepts-artworks';

const fileIn = process.argv[2];
const fileOut = process.argv[3];

if (!fileIn || !fileOut) {
  throw new Error('Usage: npm run pack -- <input.json> <output-file>');
}

const source = readFileSync(fileIn, 'utf-8');
const artworks = JSON.parse(source) as ArtworksFile;
const array = artworksToArrayBuffer(artworks);

writeFileSync(fileOut, array);
