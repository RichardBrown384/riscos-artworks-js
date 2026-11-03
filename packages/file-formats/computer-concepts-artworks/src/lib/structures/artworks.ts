import { ArtworksFile, ArtworksHeader, List } from '../types/index.js';

export function createArtworks(
  header: ArtworksHeader,
  lists: List[],
): ArtworksFile {
  return { header, lists };
}
