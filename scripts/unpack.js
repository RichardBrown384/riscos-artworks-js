const fs = require('fs');
const { Artworks } = require('../src');

(function main() {
  const fileIn = process.argv[2];
  const fileOut = process.argv[3];
  const buffer = fs.readFileSync(fileIn);
  const array = Uint8Array.from(buffer);
  const { header, records } = Artworks.fromUint8Array(array);
  fs.writeFileSync(
    fileOut,
    JSON.stringify({ header, children: records }, null, 2),
  );
}());
