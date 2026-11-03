import fs from 'node:fs/promises';
import path from 'node:path';
import {
  type ArtworksFile,
  artworksToArrayBuffer,
} from '@rbrown/computer-concepts-artworks';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ARTWORKS_FILE_EXTENSION = 'd94';

type ExampleFileEntry = {
  id: string;
  load: () => Promise<ArtworksFile>;
};

async function findExamples(): Promise<ExampleFileEntry[]> {
  const files: ExampleFileEntry[] = [];

  // glob works relative to the working directory
  // when this is invoked from a script we need to make
  // sure the glob works from the location of this source file
  const cwd = path.dirname(fileURLToPath(import.meta.url));

  for await (const entry of fs.glob('lib/**/[0-9][0-9][0-9]-*.ts', {
    cwd,
  })) {
    files.push({
      id: path.relative('lib', entry).replace(/\.ts$/, ''),
      load: async () => {
        const moduleUrl = pathToFileURL(path.resolve(cwd, entry));
        const module = (await import(moduleUrl.href)) as {
          default: ArtworksFile;
        };
        return module.default;
      },
    });
  }

  return files;
}

async function processExamples(
  outputBaseDir: string,
  examples: ExampleFileEntry[],
) {
  // ensure directory exists
  await fs.mkdir(outputBaseDir, { recursive: true });

  for (const { id, load } of examples) {
    const outputDir = path.join(outputBaseDir, path.dirname(id));

    // ensure directory exists
    await fs.mkdir(outputDir, { recursive: true });

    const filename = path.join(
      outputDir,
      `${path.basename(id)},${ARTWORKS_FILE_EXTENSION}`,
    );

    const artworks = await load();
    const arrayBuffer = artworksToArrayBuffer(artworks);

    await fs.writeFile(filename, arrayBuffer);
  }
}

export async function examplesGenerate(outputBaseDir: string): Promise<void> {
  const exampleFiles = await findExamples();
  await processExamples(outputBaseDir, exampleFiles);
}
