/*
Adler-32 checksum (zlib):

https://en.wikipedia.org/wiki/Adler-32

We track two running values while iterating bytes:

  A = sum of all bytes + 1
  B = sum of A after each byte update

So B effectively accumulates a running total of A,
which makes earlier bytes contribute more weight.

Both A and B are kept modulo 65521 (largest prime < 2^16).

Final checksum packs them as:
  Adler-32 = (B << 16) | A
            = B * 65536 + A
*/

const MOD_ADLER_32 = 65521;

export function adler32(array: Uint8Array): number {
  let a = 1;
  let b = 0;
  for (const v of array) {
    a = (a + v) % MOD_ADLER_32;
    b = (a + b) % MOD_ADLER_32;
  }
  return ((b << 16) | a) >>> 0;
}
