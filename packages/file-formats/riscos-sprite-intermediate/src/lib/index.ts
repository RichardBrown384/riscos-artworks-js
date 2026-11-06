import { transformTranslate } from '@rbrown/geometry';
import { IrImage, IrImageNode, IrRootNode } from '@rbrown/intermediate';
import {
  Sprite,
  SpriteFile,
  spriteOsUnitHeight,
  spriteOsUnitWidth,
  spriteToImageSource,
} from '@rbrown/riscos-sprite';

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
  spriteFile: SpriteFile,
): IrRootNode {
  return {
    children: mapSprites(spriteFile.sprites),
  };
}
