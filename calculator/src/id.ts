/**
 * Generates safe random identifiers.
 * The function is copied from the [nanoid](https://github.com/ai/nanoid).
 */
export function createId<Id extends string>(size: number = 21): Id {
  // crypto module is supported by almost all JS environments,
  // so are safe to use it assuming we do not depend on any specific environment.
  return <Id>(
    crypto
      .getRandomValues(new Uint8Array(size))
      .reduce((id: string, byte: number): string => {
        // It is incorrect to use bytes exceeding the alphabet size.
        // The following mask reduces the random byte in the 0-255 value
        // range to the 0-63 value range. Therefore, adding hacks, such
        // as empty string fallback or magic numbers, is unnecessary because
        // the bitmask trims bytes down to the alphabet size.
        byte &= 63;
        if (byte < 36) {
          // `0-9a-z`
          id += byte.toString(36);
        } else if (byte < 62) {
          // `A-Z`
          id += (byte - 26).toString(36).toUpperCase();
        } else if (byte > 62) {
          id += "-";
        } else {
          id += "_";
        }
        return id;
      }, "")
  );
}
