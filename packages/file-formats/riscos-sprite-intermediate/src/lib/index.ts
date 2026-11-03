import { Sprite, SpriteArea } from '@rbrown/riscos-sprite';
import {
  spriteToImageSource,
  spriteOsUnitHeight,
  spriteOsUnitWidth,
} from '@rbrown/riscos-sprite';
import { IrImage, IrImageNode, IrRootNode } from '@rbrown/intermediate';
import { transformTranslate } from '@rbrown/geometry';

function mapSprites(sprites: Sprite[]): IrImageNode[] {
  const nodes: IrImageNode[] = [];
  let yOffset = 0;
  for (const sprite of sprites) {
    const worldWidth = spriteOsUnitWidth(sprite);
    const worldHeight = spriteOsUnitHeight(sprite);
    const image: IrImage = {
      tag: 'source',
      source: spriteToImageSource(sprite),
    };
    nodes.push({
      tag: 'image',
      attributes: {
        transform: transformTranslate(0, yOffset),
        worldWidth,
        worldHeight,
        image,
      },
    });
    yOffset += worldHeight;
    yOffset += 0.1;
  }
  return nodes;
}

export function spriteAreaMapToIntermediate(
  spriteArea: SpriteArea,
): IrRootNode {
  return {
    children: mapSprites(spriteArea.sprites),
  };
}
