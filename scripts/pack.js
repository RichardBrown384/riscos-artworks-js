const fs = require('fs');
const { Artworks } = require('../src/artworks');

(function main() {
  const fileIn = process.argv[2];
  const fileOut = process.argv[3];
  const source = fs.readFileSync(fileIn, { encoding: 'utf-8' });
  const artworks = JSON.parse(source);
  const view = Artworks.save(artworks);
  fs.writeFileSync(fileOut, view);
}());
