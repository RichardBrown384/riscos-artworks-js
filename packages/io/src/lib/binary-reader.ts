export class BinaryReader {
  private static readonly decoder = new TextDecoder('iso-8859-1');

  private readonly buffer: ArrayBuffer;
  private readonly view: DataView;
  private readonly len: number;
  private pos: number;

  constructor(
    buffer: ArrayBuffer,
    byteOffset: number = 0,
    byteLength: number = buffer.byteLength - byteOffset,
  ) {
    this.buffer = buffer;
    this.view = new DataView(buffer, byteOffset, byteLength);
    this.len = byteLength;
    this.pos = 0;
  }

  // Internal
  private check(size: number): void {
    if (size < 0) {
      throw new RangeError('Invalid read size');
    }
    if (this.pos + size > this.len) {
      throw new RangeError('Read past end of buffer');
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

  remaining(): number {
    return this.len - this.pos;
  }

  length(): number {
    return this.len;
  }

  aligned(size: number, message: string): void {
    if (this.pos % size !== 0) {
      throw new Error(message);
    }
  }

  // Subreader
  subreader(length: number): BinaryReader {
    this.check(length);
    return new BinaryReader(
      this.buffer,
      this.view.byteOffset + this.pos,
      length,
    );
  }

  // Unsigned numbers
  u8(): number {
    this.check(1);
    return this.view.getUint8(this.pos++);
  }

  u16(): number {
    this.check(2);
    const v = this.view.getUint16(this.pos, true);
    this.pos += 2;
    return v;
  }

  u32(): number {
    this.check(4);
    const v = this.view.getUint32(this.pos, true);
    this.pos += 4;
    return v;
  }

  // Signed numbers
  i8(): number {
    this.check(1);
    return this.view.getInt8(this.pos++);
  }

  i16(): number {
    this.check(2);
    const v = this.view.getInt16(this.pos, true);
    this.pos += 2;
    return v;
  }

  i32(): number {
    this.check(4);
    const v = this.view.getInt32(this.pos, true);
    this.pos += 4;
    return v;
  }

  i32At(position: number): number {
    const pos = this.tell();
    this.seek(position);
    const v = this.i32();
    this.seek(pos);
    return v;
  }

  // Arrays
  u8a(length: number): Uint8Array<ArrayBuffer> {
    this.check(length);
    const array = new Uint8Array(
      this.buffer,
      this.view.byteOffset + this.pos,
      length,
    );
    this.pos += length;
    return array;
  }

  // Strings

  // This variant is used where a null terminated string is expected to reside
  // within a fixed number of bytes inside a C struct e.g. a layer or group name.
  string(length: number): string {
    this.aligned(4, 'misaligned string');
    const bytes = this.u8a(length);
    const terminator = bytes.indexOf(0);
    return BinaryReader.decoder.decode(
      terminator === -1 ? bytes : bytes.subarray(0, terminator),
    );
  }

  cstring(): string {
    this.aligned(4, 'misaligned string');
    const bytes: number[] = [];
    for (;;) {
      const byte = this.u8();
      if (byte === 0) {
        break;
      }
      bytes.push(byte);
    }
    return BinaryReader.decoder.decode(new Uint8Array(bytes));
  }

  // Legacy apis

  // Used by artworks to read palette entries and header identifiers
  // Used by artworks to read save location, font names, and file info
  // How strings are represented in these records isn't really understood
  boundedCString(maxLength = 2048) {
    this.aligned(4, 'misaligned string');
    const bytes: number[] = [];
    for (let i = 0; i < maxLength; i++) {
      const byte = this.u8();
      if (byte === 0) {
        break;
      }
      bytes.push(byte);
    }
    return BinaryReader.decoder.decode(new Uint8Array(bytes));
  }
}
