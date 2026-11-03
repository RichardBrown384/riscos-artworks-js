import { IrRootNode } from '@rbrown/intermediate';
import { drawIsHeaderPresent, drawFromArrayBuffer } from '@rbrown/riscos-draw';
import {
  fontOutlinesIsHeaderPresent,
  fontOutlinesFromArrayBuffer,
} from '@rbrown/riscos-font-outlines';
import {
  spriteAreaFromArrayBuffer,
  spriteAreaIsHeaderPresent,
} from '@rbrown/riscos-sprite';
import {
  artworksFromArrayBuffer,
  artworksIsHeaderPresent,
} from '@rbrown/computer-concepts-artworks';
import { drawMapToIntermediate } from '@rbrown/riscos-draw-intermediate';
import { spriteAreaMapToIntermediate } from '@rbrown/riscos-sprite-intermediate';
import { fontOutlinesMapToIntermediate } from '@rbrown/riscos-font-outlines-intermediate';
import { artworksMapToIntermediate } from '@rbrown/computer-concepts-artworks-intermediate';

// TODO the plan here is to pass the buffer directly to
// the *MapToIntermediate
// put these functions in an array and loop over them
// therefore no need to expose the internal workings of each file format
// library to all and sundry
export function intermediateFromArrayBuffer(
  buffer?: ArrayBuffer,
): IrRootNode | undefined {
  if (!buffer) {
    return undefined;
  }
  if (artworksIsHeaderPresent(buffer)) {
    return artworksMapToIntermediate(artworksFromArrayBuffer(buffer));
  }
  if (drawIsHeaderPresent(buffer)) {
    return drawMapToIntermediate(drawFromArrayBuffer(buffer));
  }
  if (fontOutlinesIsHeaderPresent(buffer)) {
    return fontOutlinesMapToIntermediate(fontOutlinesFromArrayBuffer(buffer));
  }
  if (spriteAreaIsHeaderPresent(buffer)) {
    return spriteAreaMapToIntermediate(spriteAreaFromArrayBuffer(buffer));
  }
  return undefined;
}
