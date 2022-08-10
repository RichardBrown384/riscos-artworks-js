/* eslint-disable no-console */

const fs = require('fs');

function prettyPrintValues(values) {
  return `(${values.size}) ${Array.from(values).join(' ')}`;
}

(function main() {
  const fileIn = process.argv[2];
  const source = fs.readFileSync(fileIn, { encoding: 'utf-8' });
  const lines = source.split('\n')
    .filter((x) => x && x.length > 0);
  const stats = {};
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    const data = JSON.parse(line);
    const keys = Object.keys(data);
    for (let k = 0; k < keys.length; k += 1) {
      const key = keys[k];
      stats[key] ??= new Set();
      stats[key].add(data[key]);
    }
  }
  const printableStats = Object.entries(stats)
    .reduce(
      (printable, [key, values]) => Object.assign(printable, { [key]: prettyPrintValues(values) }),
      {},
    );
  console.log(JSON.stringify(printableStats, null, 2));
}());
