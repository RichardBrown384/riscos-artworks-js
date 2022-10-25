/* eslint-disable import/no-dynamic-require, global-require */

const fs = require('fs');
const path = require('path');

const { Artworks } = require('../src');

function loadExamples(directory) {
  const resolved = path.resolve(directory);
  const examples = [];
  const dirents = fs.readdirSync(resolved);
  for (let i = 0; i < dirents.length; i += 1) {
    const basename = path.basename(dirents[i], '.js');
    const artworks = require(path.join(resolved, basename));
    examples.push({ basename, artworks });
  }
  return examples;
}

function processExamplesDirectory(directory, examplesDirectory) {
  const examples = loadExamples(examplesDirectory);
  for (let i = 0; i < examples.length; i += 1) {
    const { basename, artworks } = examples[i];
    const filename = path.join(
      directory,
      `${path.basename(basename, '.js')},d94`,
    );
    const array = Artworks.toUint8Array(artworks);
    fs.writeFileSync(filename, array);
  }
}

(function main() {
  const directory = process.argv[2] || './examples-output';
  processExamplesDirectory(directory, './examples/000-simple');
  processExamplesDirectory(directory, './examples/009-join-style');
  processExamplesDirectory(directory, './examples/010-end-caps');
  processExamplesDirectory(directory, './examples/011-start-caps');
  processExamplesDirectory(directory, './examples/012-winding-rule');
  processExamplesDirectory(directory, './examples/013-dash-pattern');
  processExamplesDirectory(directory, './examples/100-attribute-propagation');
  processExamplesDirectory(directory, './examples/200-blends');
}());
