const { denormalise } = require('../normalisation');
const RenderState = require('./render-state/render-state');
const ConstantRenderState = require('./render-state/constant-render-state');
const process = require('./processor');
const SvgMapper = require('./svg');

const {
  DEFAULT_RENDER_STATE,
} = require('./render-state/default-attributes');

function mapArtworks(artworks, renderState) {
  const { records, palette } = denormalise(artworks);
  const mapper = new SvgMapper();
  process({
    records,
    palette,
    renderState,
    mapper,
  });
  return mapper.finish();
}

function mapArtworksOutline(artworks) {
  const renderState = new ConstantRenderState(DEFAULT_RENDER_STATE);
  return mapArtworks(artworks, renderState);
}

function mapArtworksNormal(artworks) {
  const renderState = new RenderState(DEFAULT_RENDER_STATE);
  return mapArtworks(artworks, renderState);
}

module.exports = {
  mapArtworksOutline,
  mapArtworksNormal,
};
