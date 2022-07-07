class List {
  constructor() {
    this.list = [];
  }

  static builder() {
    return new List();
  }

  static of(...v) {
    const builder = List.builder();
    for (let i = 0; i < v.length; i += 1) {
      builder.push(v[i]);
    }
    return builder.build();
  }

  push(item) {
    this.list.push(item);
    return this;
  }

  build() {
    return this.list;
  }
}

module.exports = List;
