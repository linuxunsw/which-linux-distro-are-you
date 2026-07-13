/**
 * Return a shuffled version of the given array.
 * @param array array to shuffle
 */
export function shuffled<T>(array: T[]): T[] {
  // Shallow copy
  array = [...array];

  // Source - https://stackoverflow.com/a/2450976
  // Posted by ChristopheD, modified by community. See post 'Timeline' for change history
  // Retrieved 2026-07-14, License - CC BY-SA 4.0
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}

/**
 * The lack of basic utility functions in the JS standard library infuriates me.
 *
 * We need this on the web, so cannot rely on `node:assert`.
 */
export function assert(value: unknown, msg = ''): asserts value {
  if (!value) {
    throw new Error(`Assertion failed: ${msg}`);
  }
}
