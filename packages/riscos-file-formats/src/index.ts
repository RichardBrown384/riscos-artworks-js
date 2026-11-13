import { artworksIntermediateFromArrayBuffer } from '@rbrown/computer-concepts-artworks-intermediate';
import { IrRootNode } from '@rbrown/intermediate';
import { drawIntermediateFromArrayBuffer } from '@rbrown/riscos-draw-intermediate';
import { fontOutlinesIntermediateFromArrayBuffer } from '@rbrown/riscos-font-outlines-intermediate';
import {
  spriteFileFromArrayBuffer,
  spriteFileIsHeaderPresent,
} from '@rbrown/riscos-sprite';
import { spriteAreaMapToIntermediate } from '@rbrown/riscos-sprite-intermediate';

type IntermediateMapper = (buffer: ArrayBuffer) => IrRootNode | undefined;

const INTERMEDIATE_MAPPERS: IntermediateMapper[] = [
  artworksIntermediateFromArrayBuffer,
  drawIntermediateFromArrayBuffer,
  fontOutlinesIntermediateFromArrayBuffer,
] as const;

export function intermediateFromArrayBufferNew(
  buffer?: ArrayBuffer,
): IrRootNode | undefined {
  if (!buffer) {
    return undefined;
  }
  for (const mapper of INTERMEDIATE_MAPPERS) {
    const result = mapper(buffer);
    if (result) {
      return result;
    }
  }
  return undefined;
}

// TODO the plan here is to pass the buffer directly to
// the *MapToIntermediate
// put these functions in an array and loop over them
// therefore no need to expose the internal workings of each file format
// library to all and sundry
export function intermediateFromArrayBuffer(
  buffer?: ArrayBuffer,
): IrRootNode | undefined {
  const resultNew = intermediateFromArrayBufferNew(buffer);
  if (resultNew) {
    return resultNew;
  }
  if (!buffer) {
    return undefined;
  }
  if (spriteFileIsHeaderPresent(buffer)) {
    return spriteAreaMapToIntermediate(spriteFileFromArrayBuffer(buffer));
  }
  return undefined;
}
