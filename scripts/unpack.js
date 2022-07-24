const fs = require('fs');
const { Artworks } = require('../src/artworks');

(function main() {
  const fileIn = process.argv[2];
  const fileOut = process.argv[3];
  const buffer = fs.readFileSync(fileIn);
  const { header, records } = Artworks.load(buffer);
  fs.writeFileSync(
    fileOut,
    JSON.stringify({ header, children: records }, null, 2),
  );
}());
