export function check(condition: boolean, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

export function checkIf(guard: boolean, condition: boolean, message: string) {
  if (guard) {
    check(condition, message);
  }
}

export function makeCheckEnumValue<
  const T extends Record<string, number | string>,
>(
  enumObject: T,
): (value: unknown, message: string) => asserts value is T[keyof T] {
  type Value = T[keyof T];

  const values = new Set<Value>(Object.values(enumObject) as Value[]);

  return function checkEnumValue(
    value: unknown,
    message: string,
  ): asserts value is Value {
    check(values.has(value as Value), `${message}: ${String(value)}`);
  };
}
