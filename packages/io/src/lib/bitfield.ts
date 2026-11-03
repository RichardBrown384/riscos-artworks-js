import { check } from '@rbrown/check';

export class BitField {
  readonly value: number;

  constructor(value: number) {
    this.value = value >>> 0;
  }

  isSet(bit: number): boolean {
    return ((this.value >>> bit) & 1) === 1;
  }

  isClear(bit: number): boolean {
    return ((this.value >>> bit) & 1) === 0;
  }

  extract(startBit: number, bitCount: number): number {
    check(bitCount >= 1, 'bitCount must be positive');
    check(bitCount <= 32, 'bitCount exceeds 32');

    check(startBit >= 0, 'startBit negative');
    check(startBit <= 31, 'startBit exceeds 31');

    check(startBit + bitCount <= 32, 'bit range exceeds 32-bit value');

    if (bitCount === 32) {
      return this.value;
    }

    const mask = (1 << bitCount) - 1;

    return (this.value >>> startBit) & mask;
  }
}
