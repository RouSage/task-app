/**
 * Checks whether array A includes every value from array B
 */
const checkIfIncludes = (a: string[], b: string[]) =>
  b.every((value) => a.includes(value));

export default checkIfIncludes;
