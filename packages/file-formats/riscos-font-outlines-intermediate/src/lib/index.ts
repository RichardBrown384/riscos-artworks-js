import { transformTranslate, type Transform } from '@rbrown/geometry';
import type {
  IrGroupNode,
  IrPathNode,
  IrPathSegment,
  IrRootNode,
} from '@rbrown/intermediate';
import {
  OUTLINE_SEGMENT_TAG,
  type Character,
  type Chunks,
  type FontPathSegment,
  type Outlines,
} from '@rbrown/riscos-font-outlines';

function mapFillPathDefinition(fillPath: FontPathSegment[]): IrPathSegment[] {
  const segments: IrPathSegment[] = [];
  for (const segment of fillPath) {
    switch (segment.type) {
      case OUTLINE_SEGMENT_TAG.MOVE: {
        segments.push({ tag: 'move', to: segment.to });
        break;
      }

      case OUTLINE_SEGMENT_TAG.LINE: {
        segments.push({ tag: 'line', to: segment.to });
        break;
      }

      case OUTLINE_SEGMENT_TAG.CURVE: {
        segments.push({
          tag: 'cubic',
          cp1: segment.cp1,
          cp2: segment.cp2,
          to: segment.to,
        });
        break;
      }

      case OUTLINE_SEGMENT_TAG.TERMINATOR: {
        segments.push({ tag: 'close' });
        break;
      }
    }
  }
  return segments;
}

function isTerminatorOnly(path: FontPathSegment[]): boolean {
  return path.length === 1 && path[0].type === OUTLINE_SEGMENT_TAG.TERMINATOR;
}

function isEmptyFillPath(path: FontPathSegment[]): boolean {
  return !path.length || isTerminatorOnly(path);
}

function mapFillPath(
  fillPath: FontPathSegment[],
  transform?: Transform,
): IrPathNode {
  return {
    tag: 'path',
    attributes: {
      transform: transform,
      path: mapFillPathDefinition(fillPath),
      fill: { tag: 'solid', colour: { tag: 'rgb', r: 0, g: 0, b: 0 } },
      fillRule: 'evenodd',
      stroke: { tag: 'none' },
      strokeWidth: 0,
      strokeLinejoin: 'miter',
      strokeLinecapStart: 'butt',
      strokeLinecapEnd: 'butt',
      strokeLineCapTriangleWidth: 0,
      strokeLineCapTriangleLength: 0,
    },
  };
}

function mapCharacterFillPaths(charCode: number, chunks: Chunks): IrPathNode[] {
  function getCharacter(code: number): Character | undefined {
    const chunkNumber = code >>> 5;
    const characterIndex = code & 0x1f;
    return chunks[chunkNumber]?.characters[characterIndex];
  }

  const paths: IrPathNode[] = [];

  function mapNonEmptyFillPath(character: Character, transform?: Transform) {
    if (character.fillPath && !isEmptyFillPath(character.fillPath)) {
      paths.push(mapFillPath(character.fillPath, transform));
    }
  }

  const character = getCharacter(charCode);
  if (character) {
    mapNonEmptyFillPath(character, undefined);
    const { composites } = character;
    for (let i = 0; i < composites.length; i += 1) {
      const { code, offset } = composites[i];
      const compositeCharacter = getCharacter(code);
      if (compositeCharacter) {
        const compositeTransform = transformTranslate(offset.x, offset.y);
        mapNonEmptyFillPath(compositeCharacter, compositeTransform);
      }
    }
  }

  return paths;
}

function mapCharacters(
  columns: number,
  rows: number,
  width: number,
  height: number,
  characters: number,
  chunks: Chunks,
): IrGroupNode[] {
  const groups: IrGroupNode[] = [];
  for (let charCode = 0; charCode < characters; charCode += 1) {
    const i = charCode % columns;
    const j = rows - Math.floor(charCode / columns) - 1;
    groups.push({
      tag: 'g',
      attributes: {
        transform: transformTranslate(i * width, j * height),
      },
      children: mapCharacterFillPaths(charCode, chunks),
    });
  }
  return groups;
}

export function fontOutlinesMapToIntermediate({
  header: { boundingBox },
  chunkCount,
  chunks,
}: Outlines): IrRootNode {
  const characters = chunkCount * 32;
  const columns = 16;
  const rows = characters / columns;

  const { minX, minY, maxX, maxY } = boundingBox;
  const width = maxX - minX;
  const height = maxY - minY;

  return {
    children: mapCharacters(columns, rows, width, height, characters, chunks),
  };
}
