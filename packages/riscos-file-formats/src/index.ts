import { artworksIntermediateFromArrayBuffer } from '@rbrown/computer-concepts-artworks-intermediate';
import { IrRootNode } from '@rbrown/intermediate';
import { drawIntermediateFromArrayBuffer } from '@rbrown/riscos-draw-intermediate';
import { fontOutlinesIntermediateFromArrayBuffer } from '@rbrown/riscos-font-outlines-intermediate';
import { spriteIntermediateFromArrayBuffer } from '@rbrown/riscos-sprite-intermediate';

type IntermediateMapper = (buffer: ArrayBuffer) => IrRootNode | undefined;

const INTERMEDIATE_MAPPERS: IntermediateMapper[] = [
  artworksIntermediateFromArrayBuffer,
  drawIntermediateFromArrayBuffer,
  fontOutlinesIntermediateFromArrayBuffer,
  spriteIntermediateFromArrayBuffer,
] as const;

export function intermediateFromArrayBuffer(
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
