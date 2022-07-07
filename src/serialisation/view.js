const ArtworksViewError = require('../exceptions/artworks-view-error');

const STRING_LENGTH_LIMIT = 2048;

class ArtworksView {
  constructor(buffer) {
    this.view = new DataView(buffer);
    this.length = buffer.byteLength;
    this.position = 0;
    this.stack = [];
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

  push(p) {
    this.stack.push(this.position);
    this.position = p;
  }

  pop() {
    this.position = this.stack.pop();
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
    this.check(position - previous >= 0, 'previous pointer would underrun', pointer);
  }

  readUint8() {
    this.checkPositionAndSize(1);
    const b = this.view.getUint8(this.position);
    this.position += 1;
    return b;
  }

  writeUint8(v) {
    this.checkPositionAndSize(1);
    this.view.setUint8(this.position, v);
    this.position += 1;
  }

  writeUint8At(position, v) {
    this.push(position);
    this.writeUint8(v);
    this.pop();
  }

  readUint32() {
    this.checkAlignment('misaligned uint');
    this.checkPositionAndSize(4);
    const v = this.view.getUint32(this.position, true);
    this.position += 4;
    return v;
  }

  writeUint32(v) {
    this.checkPositionAndSize(4);
    this.view.setUint32(this.position, v, true);
    this.position += 4;
  }

  writeUint32At(position, v) {
    this.push(position);
    this.writeUint32(v);
    this.pop();
  }

  readInt32() {
    this.checkAlignment('misaligned int');
    this.checkPositionAndSize(4);
    const v = this.view.getInt32(this.position, true);
    this.position += 4;
    return v;
  }

  writeInt32(v) {
    this.checkPositionAndSize(4);
    this.view.setInt32(this.position, v, true);
    this.position += 4;
  }

  writeInt32At(position, v) {
    this.push(position);
    this.writeInt32(v);
    this.pop();
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

  writeString(string, length) {
    this.check(string.length <= length, 'not enough space to write the string');
    this.checkAlignment();
    this.push(this.position);
    for (let i = 0; i < string.length; i += 1) {
      this.writeUint8(string.charCodeAt(i));
    }
    this.pop();
    this.position += length;
  }

  writeStringAt(position, string, length) {
    this.push(position);
    this.writeString(string, length);
    this.pop();
  }
}

module.exports = ArtworksView;
