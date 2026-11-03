const CRC_TABLE = makeCrcTable();

function makeCrcTable(): Uint32Array<ArrayBuffer> {
  const table = new Uint32Array(256);
  const polynomial = 0xedb88320;
  for (let n = 0; n < table.length; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      if (c & 1) {
        c = (c >>> 1) ^ polynomial;
      } else {
        c = c >>> 1;
      }
    }
    table[n] = c >>> 0;
  }
  return table;
}

function updateCrc(crc: number, buf: Uint8Array): number {
  let c = crc >>> 0;
  for (let n = 0; n < buf.byteLength; n++) {
    c = CRC_TABLE[(c ^ buf[n]) & 0xff] ^ (c >>> 8);
  }
  return c >>> 0;
}

export function crc(buf: Uint8Array): number {
  return (updateCrc(0xffff_ffff, buf) ^ 0xffff_ffff) >>> 0;
}
