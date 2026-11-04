import {
  artworksFromArrayBuffer,
  artworksIsHeaderPresent,
} from '@rbrown/computer-concepts-artworks';
import { artworksMapToIntermediate } from '@rbrown/computer-concepts-artworks-intermediate';
import { IrRootNode } from '@rbrown/intermediate';
import { drawFromArrayBuffer, drawIsHeaderPresent } from '@rbrown/riscos-draw';
import { drawMapToIntermediate } from '@rbrown/riscos-draw-intermediate';
import {
  fontOutlinesFromArrayBuffer,
  fontOutlinesIsHeaderPresent,
} from '@rbrown/riscos-font-outlines';
import { fontOutlinesMapToIntermediate } from '@rbrown/riscos-font-outlines-intermediate';
import {
  spriteAreaFromArrayBuffer,
  spriteAreaIsHeaderPresent,
} from '@rbrown/riscos-sprite';
import { spriteAreaMapToIntermediate } from '@rbrown/riscos-sprite-intermediate';

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
