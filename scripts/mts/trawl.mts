import { readdirSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { artworksFromArrayBuffer } from '@rbrown/computer-concepts-artworks';

function getFilesRecursively(directory: string): string[] {
  const files: string[] = [];

  for (const dirent of readdirSync(directory, { withFileTypes: true })) {
    const path = resolve(directory, dirent.name);

    if (dirent.isDirectory()) {
      files.push(...getFilesRecursively(path));
    } else if (dirent.isFile() && path.toLowerCase().endsWith(',d94')) {
      files.push(path);
    }
  }

  return files;
}

function trawl(directory: string) {
  const files = getFilesRecursively(directory);
  const errorsByMessage = new Map<string, string[]>();

  for (const file of files) {
    try {
      const buffer = readFileSync(file);
      const array = Uint8Array.from(buffer).buffer;
      artworksFromArrayBuffer(array);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);

      const filenames = errorsByMessage.get(message) ?? [];
      filenames.push(file);
      errorsByMessage.set(message, filenames);
    }
  }

  return { count: files.length, errorsByMessage };
}

const directory = process.argv[2];

if (!directory) {
  throw new Error('Usage: npm run trawl -- <directory>');
}

const { count, errorsByMessage } = trawl(directory);

console.log('Files:', count);
console.log(
  'Files with errors:',
  [...errorsByMessage.values()].reduce(
    (total, filenames) => total + filenames.length,
    0,
  ),
);

for (const [message, filenames] of errorsByMessage) {
  console.log(`\n${message} (${filenames.length.toString()} files)`);

  for (const filename of filenames) {
    console.log(`  ${filename}`);
  }
}
