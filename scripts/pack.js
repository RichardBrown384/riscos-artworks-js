const fs = require('fs');
const { Artworks } = require('../src');

(function main() {
  const fileIn = process.argv[2];
  const fileOut = process.argv[3];
  const source = fs.readFileSync(fileIn, { encoding: 'utf-8' });
  const artworks = JSON.parse(source);
  const array = Artworks.toUint8Array(artworks);
  fs.writeFileSync(fileOut, array);
}());
