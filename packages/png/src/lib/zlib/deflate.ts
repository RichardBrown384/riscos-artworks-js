/*
DEFLATE block format:

https://en.wikipedia.org/wiki/Deflate#Block_structure

Each block begins with a 3-bit header:

  BFINAL (1 bit)
    - 1 if this is the last block
    - 0 otherwise

  BTYPE (2 bits)
    - 00 = Stored (no compression)
    - 01 = Static Huffman (not used here)
    - 10 = Dynamic Huffman (not used here)
    - 11 = Reserved / invalid

For simplicity, we only use BTYPE = 00 (stored blocks) and write the original data.

This means each block is encoded as:
  - 3-bit header padded to the next byte boundary
  - 16-bit LEN  (number of raw bytes in block)
  - 16-bit NLEN (one's complement of LEN)
  - LEN bytes of literal data (uncompressed)

Each stored block can contain up to 65,535 bytes.
*/

import { BinaryWriter } from '@rbrown/io';

const MAX_BLOCK_SIZE = 65_535;

export function deflate(array: Uint8Array): Uint8Array {
  const length = array.byteLength;

  // ensure at least one block (required for zero-length input)
  const blockCount = Math.max(
    Math.floor((length + MAX_BLOCK_SIZE - 1) / MAX_BLOCK_SIZE),
    1,
  );

  const out = new BinaryWriter(length + 5 * blockCount);

  for (let i = 0; i < blockCount; i++) {
    const start = i * MAX_BLOCK_SIZE;
    const size = Math.min(MAX_BLOCK_SIZE, length - start);
    const isLast = i === blockCount - 1;

    out.u8(isLast ? 1 : 0);
    out.u16(size);
    out.u16(~size);
    out.u8a(array.subarray(start, start + size));
  }

  return out.written();
}
