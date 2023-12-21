/* eslint-disable import/no-dynamic-require, global-require */

const fs = require('fs');
const path = require('path');

const { Artworks } = require('../src');

const ARTWORKS_FILE_EXTENSION = 'd94';
const DEFAULT_OUTPUT_DIRECTORY = './examples-output';
const EXAMPLES_BASE_DIRECTORY = './examples';
const EXAMPLE_DIRECTORIES = [
  '002-path',
  '00A-layer',
  '024-stroke-colour',
  '025-stroke-width',
  '026-fill-colour',
  '027-join-style',
  '028-end-caps',
  '029-start-caps',
  '02A-winding-rule',
  '02B-dash-pattern',
  '02C-rectangle',
  '034-ellipse',
  '035-rounded-rectangle',
  '03A-blend-group',
  '03A-blend-group-attributes',
  '03A-blend-group-simple-geometry',
  '03E-start-markers',
  '03F-end-markers',
  '100-smallest-file',
  '101-palette',
  '102-attribute-propagation',
];

function createSubdirectory(parent, child) {
  const subdirectory = path.join(parent, child);
  if (!fs.existsSync(subdirectory)) {
    fs.mkdirSync(subdirectory);
  }
  return subdirectory;
}

function loadExamples(directory) {
  const resolved = path.resolve(directory);
  const examples = [];
  const dirents = fs.readdirSync(resolved, { withFileTypes: true });
  for (let i = 0; i < dirents.length; i += 1) {
    const dirent = dirents[i];
    if (dirent.isFile()) {
      const basename = path.basename(dirent.name, '.js');
      const artworks = require(path.join(resolved, basename));
      examples.push({ basename, artworks });
    }
  }
  return examples;
}

function processExamples(examples, outputDirectory) {
  for (let i = 0; i < examples.length; i += 1) {
    const { basename, artworks } = examples[i];
    const filename = path.join(
      outputDirectory,
      `${basename},${ARTWORKS_FILE_EXTENSION}`,
    );
    const array = Artworks.toUint8Array(artworks);
    fs.writeFileSync(filename, array);
  }
}

(function main() {
  const baseOutputDirectory = process.argv[2] || DEFAULT_OUTPUT_DIRECTORY;
  for (let i = 0; i < EXAMPLE_DIRECTORIES.length; i += 1) {
    const examplesDirectory = EXAMPLE_DIRECTORIES[i];
    const examples = loadExamples(
      path.join(EXAMPLES_BASE_DIRECTORY, examplesDirectory),
    );
    const outputDirectory = createSubdirectory(baseOutputDirectory, examplesDirectory);
    processExamples(examples, outputDirectory);
  }
}());
