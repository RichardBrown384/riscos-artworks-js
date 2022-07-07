const ArtworksViewError = require('../exceptions/artworks-view-error');

const STRING_LENGTH_LIMIT = 2048;

class ArtworksView {
  constructor(buffer) {
    this.view = new DataView(buffer);
    this.length = buffer.byteLength;
    this.position = 0;
  }

  getLength() {
    return this.length;
  }

  getPosition() {
    return this.position;
  }

  setPosition(v) {
    this.position = v;
  }

  check(condition, message, data = {}) {
    if (!condition) {
      throw new ArtworksViewError(this.getPosition(), data, message);
    }
  }

  fail(message, data = {}) {
    this.check(false, message, data);
  }

  checkAlignment(message, data = {}) {
    this.check(this.getPosition() % 4 === 0, message, data);
  }

  checkPositionAndSize(n) {
    this.check(this.position >= 0, 'reading off the start of a file');
    this.check(this.position <= this.getLength() - n, 'reading off the end of the file');
  }

  checkPointer(pointer) {
    const { position, previous, next } = pointer;
    this.check(previous <= 0, 'positive previous pointer', pointer);
    this.check(next >= 0, 'negative next pointer', pointer);
    this.check(position + next < this.getLength(), 'next pointer would overrun', pointer);
  }

  readUint8() {
    this.checkPositionAndSize(1);
    const b = this.view.getUint8(this.position);
    this.position += 1;
    return b;
  }

  readUint32() {
    this.checkAlignment('misaligned uint');
    this.checkPositionAndSize(4);
    const v = this.view.getUint32(this.position, true);
    this.position += 4;
    return v;
  }

  readInt32() {
    this.checkAlignment('misaligned int');
    this.checkPositionAndSize(4);
    const v = this.view.getInt32(this.position, true);
    this.position += 4;
    return v;
  }

  readStringFully(n) {
    this.checkAlignment('misaligned string');
    const chars = [];
    for (let i = 0, terminated = false; i < n; i = 1 + i) {
      const c = this.readUint8();
      if (c === 0) {
        terminated = true;
      } else if (!terminated) {
        chars.push(c);
      }
    }
    return String.fromCharCode(...chars);
  }

  readString(n = STRING_LENGTH_LIMIT) {
    this.checkAlignment('misaligned string');
    const chars = [];
    for (let i = 0; i < n; i = 1 + i) {
      const c = this.readUint8();
      if (c === 0) {
        break;
      }
      chars.push(c);
    }
    return String.fromCharCode(...chars);
  }
}

module.exports = ArtworksView;
