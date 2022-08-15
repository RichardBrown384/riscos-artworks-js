const fs = require('fs');
const { Xml } = require('riscos-support');
const { Artworks } = require('../src');

const OUTLINE = 'outline';
const NORMAL = 'normal';

function fromArtworks(artworks, mode) {
  if (mode === OUTLINE) {
    return Artworks.SVGElement.Outline.fromArtworks(artworks);
  }
  return Artworks.SVGElement.Normal.fromArtworks(artworks);
}

(function main() {
  const fileIn = process.argv[2];
  const fileOut = process.argv[3];
  const mode = process.argv[4] || NORMAL;
  const buffer = fs.readFileSync(fileIn);
  const array = Uint8Array.from(buffer);
  const artworks = Artworks.fromUint8Array(array);
  const element = fromArtworks(artworks, mode);
  const svg = Xml.fromElement(element);
  fs.writeFileSync(fileOut, svg);
}());
