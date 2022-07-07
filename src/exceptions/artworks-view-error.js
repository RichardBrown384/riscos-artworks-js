class ArtworksViewError extends Error {
  constructor(position, data, ...options) {
    super(...options);
    this.name = 'ArtworksError';
    this.position = position;
    this.data = data;
  }
}

module.exports = ArtworksViewError;
