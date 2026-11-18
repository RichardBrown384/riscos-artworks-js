import { describe, expect, it } from 'vitest';

import {
  createDenormalisedArtWorksFile,
  createNormalisedArtWorksFile,
} from './normalisation.fixtures.js';
import { normalise } from './normalise.js';

describe('normalise', () => {
  it('should normalise as expected', () => {
    const denormalised = createDenormalisedArtWorksFile();
    const normalised = createNormalisedArtWorksFile();

    expect(normalise(denormalised)).toStrictEqual(normalised);
  });

  it('should throw and error when normalising a normalised file', () => {
    const normalised = createNormalisedArtWorksFile();

    expect(() => normalise(normalised)).toThrow();
  });
});
