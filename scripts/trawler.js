/* eslint-disable no-bitwise, no-console */

const { resolve } = require('path');
const fs = require('fs');
const { Artworks } = require('../src/artworks');

function log(...data) {
  console.log(...data);
}

function getFilesRecursively(directory) {
  const files = [];
  const dirents = fs.readdirSync(directory, { withFileTypes: true });
  for (let i = 0; i < dirents.length; i += 1) {
    const dirent = dirents[i];
    const resolved = resolve(directory, dirent.name);
    if (dirent.isDirectory()) {
      files.push(...getFilesRecursively(resolved));
    } else {
      files.push(resolved);
    }
  }
  return files;
}

function processDirectory(directory) {
  const errors = [];
  const unsupportedRecordsByTypeAndFile = {};

  const files = getFilesRecursively(directory)
      .filter(x => x.toLowerCase().endsWith('d94'));

  for (let i = 0; i < files.length; i += 1) {
    const file = files[i];
    const buffer = fs.readFileSync(file);
    const { error, unsupported, ...data } = Artworks.load(buffer);
    if (error) {
      errors.push({ file, error, data });
    } else {
      for (let k = 0; k < unsupported.length; k += 1) {
        const { type, pointer: { position } } = unsupported[k];
        const maskedType = (type & 0xFF).toString(16);
        unsupportedRecordsByTypeAndFile[maskedType] ??= {};
        unsupportedRecordsByTypeAndFile[maskedType][file] ??= [];
        unsupportedRecordsByTypeAndFile[maskedType][file].push(position);
      }
    }
  }

  return {
    count: files.length,
    errors,
    unsupportedRecordsByTypeAndFile,
  };
}

(function main() {
  const directory = process.argv[2] || './artworks';
  const {
    count,
    errors,
    unsupportedRecordsByTypeAndFile,
  } = processDirectory(directory);
  log('count', count);
  log('errors', errors.length);
  log(errors);
  log('unsupported', unsupportedRecordsByTypeAndFile);
}());
