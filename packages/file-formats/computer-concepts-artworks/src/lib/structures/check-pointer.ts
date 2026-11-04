import { check } from '@rbrown/check';

import { FilePointer } from '../types/index.js';

function checkWithPointer(
  condition: boolean,
  message: string,
  pointer: FilePointer,
): asserts condition {
  check(condition, `${message} ${JSON.stringify(pointer)}`);
}

export function checkPointer(size: number, pointer: FilePointer): void {
  const { position, previous, next } = pointer;
  checkWithPointer(previous <= 0, 'positive previous pointer', pointer);
  checkWithPointer(next >= 0, 'negative next pointer', pointer);
  checkWithPointer(
    position + next < size,
    'next pointer would overrun',
    pointer,
  );
  checkWithPointer(
    position - previous >= 0,
    'previous pointer would underrun',
    pointer,
  );
}
