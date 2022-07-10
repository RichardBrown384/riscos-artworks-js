/* eslint-disable import/no-dynamic-require, global-require */

const fs = require('fs');
const path = require('path');

const { Artworks } = require('../src/artworks');

function loadExamples(directory) {
  const resolved = path.resolve(directory);
  const examples = [];
  const dirents = fs.readdirSync(resolved);
  for (let i = 0; i < dirents.length; i += 1) {
    const basename = path.basename(dirents[i], '.js');
    const example = require(path.join(resolved, basename));
    examples.push(example);
  }
  return examples;
}

(function main() {
  const directory = process.argv[2] || './examples-output';
  const examples = loadExamples('./examples/simple');
  for (let i = 0; i < examples.length; i += 1) {
    const { moduleFilename, artworks } = examples[i];
    const filename = path.join(
      directory,
      `${path.basename(moduleFilename, '.js')},d94`,
    );
    const view = Artworks.save(artworks);
    fs.writeFileSync(filename, view);
  }
}());
