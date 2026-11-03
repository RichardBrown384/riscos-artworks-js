import { readFileSync } from 'node:fs';

function parseJsonObject(line: string): Record<string, unknown> {
  const parsed: unknown = JSON.parse(line);

  if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
    throw new Error('Expected a JSON object');
  }

  return parsed as Record<string, unknown>;
}

function collectStats(source: string): Record<string, Set<unknown>> {
  const stats: Record<string, Set<unknown>> = {};

  for (const line of source.split('\n').filter(Boolean)) {
    const data = parseJsonObject(line);

    for (const [key, value] of Object.entries(data)) {
      (stats[key] ??= new Set()).add(value);
    }
  }

  return stats;
}

function prettyPrintStats(stats: Record<string, Set<unknown>>) {
  return Object.fromEntries(
    Object.entries(stats).map(([key, values]) => [
      key,
      prettyPrintValues(values),
    ]),
  );
}

function prettyPrintValues(values: Set<unknown>): string {
  return `(${values.size.toString()}) ${Array.from(values).join(' ')}`;
}

const fileIn = process.argv[2];

if (!fileIn) {
  throw new Error('Usage: npm run stats -- <input-file>');
}

const source = readFileSync(fileIn, 'utf-8');
const stats = collectStats(source);
const printableStats = prettyPrintStats(stats);

console.log(JSON.stringify(printableStats, null, 2));
