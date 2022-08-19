function createSingletonLists(record) {
  return {
    children: [record],
  };
}

function rotateSiblings(siblings = []) {
  const singletons = [];
  for (let i = 0; i < siblings.length; i += 1) {
    const record = siblings[i];
    singletons.push(createSingletonLists(record));
  }
  if (singletons.length > 1) {
    const last = singletons.pop();
    const penultimate = singletons.pop();
    const { children, ...data } = penultimate.children[0];
    singletons.push(createSingletonLists({
      ...data,
      children: [last, ...children],
    }));
  }
  return singletons.reverse();
}

class ArtworksRotator {
  rotateArtworks({ records, ...data }) {
    return {
      ...data,
      records: this.rotateLists(records),
    };
  }

  rotateLists(lists = []) {
    const result = [];
    for (let i = 0; i < lists.length; i += 1) {
      const { children, ...data } = lists[i];
      result.push({
        ...data,
        children: this.rotateList(children),
      });
    }
    return result;
  }

  rotateList(list = []) {
    if (list.length === 0) {
      return list;
    }
    const rotated = this.rotateSubLists(list);
    const [{ children, ...data }, ...siblings] = rotated;
    return [{
      ...data,
      children: [...rotateSiblings(siblings), ...children],
    }];
  }

  rotateSubLists(list) {
    const result = [];
    for (let i = 0; i < list.length; i += 1) {
      const { children, ...data } = list[i];
      result.push({
        ...data,
        children: this.rotateLists(children),
      });
    }
    return result;
  }
}

function rotateArtworks(artworks) {
  return new ArtworksRotator().rotateArtworks(artworks);
}

module.exports = rotateArtworks;
