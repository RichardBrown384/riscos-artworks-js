function makeSingletonLists(record) {
  return {
    children: [record],
  };
}

function unmakeSingletonLists(singletonLists) {
  return singletonLists.children[0];
}

function makeSingletonList(list) {
  const result = [...list];
  while (result.length > 1) {
    const last = result.pop();
    const penultimate = result.pop();
    const { children, ...data } = penultimate;
    result.push({
      ...data,
      children: [makeSingletonLists(last), ...children],
    });
  }
  return result;
}

function unmakeSingletonList(list) {
  const result = [...list];
  for (;;) {
    const last = result.pop();
    const { children, ...data } = last;
    const [first, ...siblings] = children;
    result.push({
      ...data,
      children: siblings,
    });
    if (!first) {
      break;
    }
    result.push(unmakeSingletonLists(first));
  }
  return result;
}

class ArtworksListTransformer {
  constructor(listOperation) {
    this.listTransformation = listOperation;
  }

  transform({ records, ...data }) {
    return {
      ...data,
      records: this.transformLists(records),
    };
  }

  transformLists(lists = []) {
    const result = [];
    for (let i = 0; i < lists.length; i += 1) {
      const { children, ...data } = lists[i];
      result.push({
        ...data,
        children: this.transformList(children),
      });
    }
    return result;
  }

  transformList(list = []) {
    if (list.length === 0) {
      return list;
    }
    return this.transformSubLists(this.listTransformation(list));
  }

  transformSubLists(list) {
    const result = [];
    for (let i = 0; i < list.length; i += 1) {
      const { children, ...data } = list[i];
      result.push({
        ...data,
        children: this.transformLists(children),
      });
    }
    return result;
  }
}

function transform(artworks, listTransformation) {
  return new ArtworksListTransformer(listTransformation).transform(artworks);
}

module.exports = {
  denormalise(artworks) {
    return transform(artworks, makeSingletonList);
  },
  normalise(artworks) {
    return transform(artworks, unmakeSingletonList);
  },
};
