import { examplesGenerate } from '@rbrown/computer-concepts-artworks-examples';

const outputDir = process.argv[2];

if (!outputDir) {
  throw new Error('output directory required');
}

await examplesGenerate(outputDir);
