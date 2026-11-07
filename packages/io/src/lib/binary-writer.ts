export class BinaryWriter {
  private static readonly encoder = new TextEncoder();

  private readonly buffer: ArrayBuffer;
  private readonly view: DataView;
  private readonly arrayView: Uint8Array;
  private readonly littleEndian: boolean;
  private readonly len: number;
  private maxWritten: number;
  private pos: number;

  constructor(size: number, littleEndian: boolean = true) {
    this.buffer = new ArrayBuffer(size);
    this.view = new DataView(this.buffer);
    this.arrayView = new Uint8Array(this.buffer);
    this.littleEndian = littleEndian;
    this.len = size;
    this.maxWritten = 0;
    this.pos = 0;
  }

  // Internal
  private check(size: number): void {
    if (this.pos + size > this.len) {
      throw new RangeError('Write past end of buffer');
    }
  }

  private advance(size: number): void {
    this.pos += size;
    if (this.pos > this.maxWritten) {
      this.maxWritten = this.pos;
    }
  }

  // Positions
  tell(): number {
    return this.pos;
  }

  seek(position: number): void {
    if (position < 0 || position > this.len) {
      throw new RangeError('Invalid position');
    }
    this.pos = position;
  }

  skip(bytes: number): void {
    this.seek(this.pos + bytes);
  }

  length(): number {
    return this.len;
  }

  aligned(size: number, message: string): void {
    if (this.pos % size !== 0) {
      throw new Error(message);
    }
  }

  // Unsigned numbers
  u8(v: number): void {
    this.check(1);
    this.view.setUint8(this.pos, v);
    this.advance(1);
  }

  u16(v: number): void {
    this.check(2);
    this.view.setUint16(this.pos, v >>> 0, this.littleEndian);
    this.advance(2);
  }

  u32(v: number): void {
    this.check(4);
    this.view.setUint32(this.pos, v >>> 0, this.littleEndian);
    this.advance(4);
  }

  // Signed numbers
  i8(v: number): void {
    this.check(1);
    this.view.setInt8(this.pos, v);
    this.advance(1);
  }

  i16(v: number): void {
    this.check(2);
    this.view.setInt16(this.pos, v >>> 0, this.littleEndian);
    this.advance(2);
  }

  i32(v: number): void {
    this.check(4);
    this.view.setInt32(this.pos, v >>> 0, this.littleEndian);
    this.advance(4);
  }

  i32At(position: number, value: number): void {
    const pos = this.tell();
    this.seek(position);
    this.i32(value);
    this.seek(pos);
  }

  u8a(v: Uint8Array): void {
    this.check(v.byteLength);
    this.arrayView.set(v, this.pos);
    this.advance(v.byteLength);
  }

  raw(): Uint8Array<ArrayBuffer> {
    return new Uint8Array(this.buffer, 0, this.len);
  }

  written(): Uint8Array<ArrayBuffer> {
    return new Uint8Array(this.buffer, 0, this.maxWritten);
  }

  // Strings
  string(v: string): void {
    this.u8a(BinaryWriter.encoder.encode(v));
  }

  // Legacy apis

  // Used by artworks to write out the file identifiers and layer names
  // If possible, pad the space with zeroes
  paddedCString(string: string, length: number): void {
    this.aligned(4, 'misaligned string');
    const array = new Uint8Array(length);
    array.set(BinaryWriter.encoder.encode(string).subarray(0, length));
    this.u8a(array);
  }
}
