/* eslint-disable no-console */

const fs = require('fs');
const { Artworks } = require('../src/artworks');

function log(...data) {
  console.log(...data);
}

(function main() {
  const file = process.argv[2];
  const buffer = fs.readFileSync(file);
  const { header, records } = Artworks.load(buffer);
  log(JSON.stringify({ header, children: records }));
}());
