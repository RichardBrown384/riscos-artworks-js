/*
ZLIB FORMAT:
https://en.wikipedia.org/wiki/Zlib

Layout:
  [2-byte header]
  [dictid] (not used)
  [deflate stream]
  [4-byte Adler-32 checksum]

HEADER (2 bytes)

  CMF (1 byte)
    Bits 0–3: CM (compression method)
      - must be 8 (DEFLATE)

    Bits 4–7: CINFO (window size)
      - log2(window) - 8
      - typically 7 = 32 KiB window

  FLG (1 byte)
    Bits 0–4: FCHECK
      - chosen so that (CMF << 8 | FLG) % 31 == 0

    Bit 5: FDICT
      - 0 = no preset dictionary (used here)

    Bits 6–7: FLEVEL
      - compression hint (not required for decompression)

OPTIONAL DICTID (4 bytes)
  Present only if FDICT = 1.
  Not used in this implementation.

DEFLATE STREAM
  Raw DEFLATE data.
  In this implementation: only "stored" blocks (no compression),

TRAILER (4 bytes)
  Adler-32 checksum of the original uncompressed input.
*/

import { deflate } from './deflate.js';
import { adler32 } from './adler-32.js';
import { BinaryWriter } from '@rbrown/io';

const CMF = 0x78;
const FLG = 0x9c;

const BYTES_HEADER = 2;
const BYTES_ADLER_32 = 4;

export function zlibFromArray(array: Uint8Array): Uint8Array {
  const deflateStream = deflate(array);
  const adler = adler32(array);

  const size = BYTES_HEADER + deflateStream.byteLength + BYTES_ADLER_32;

  const writer = new BinaryWriter(size, false); // Network byte order
  writer.u8(CMF);
  writer.u8(FLG);
  writer.u8a(deflateStream);
  writer.u32(adler);

  return writer.written();
}
