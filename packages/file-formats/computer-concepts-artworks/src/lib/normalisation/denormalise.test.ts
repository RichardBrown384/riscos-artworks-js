import { describe, expect, it } from 'vitest';

import { denormalise } from './denormalise.js';
import {
  createDenormalisedArtWorksFile,
  createNormalisedArtWorksFile,
} from './normalisation.fixtures.js';

describe('denormalise', () => {
  it('should denormalise as expected', () => {
    const denormalised = createDenormalisedArtWorksFile();
    const normalised = createNormalisedArtWorksFile();

    expect(denormalise(normalised)).toStrictEqual(denormalised);
  });

  it('should leave a denormalised file unchanged', () => {
    const denormalised = createDenormalisedArtWorksFile();

    expect(denormalise(denormalised)).toStrictEqual(denormalised);
  });
});
