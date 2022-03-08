/**
 * Helper to make exhaustive switch cases a compiler error if they are no longer exhaustive.
 *
 * https://www.typescriptlang.org/docs/handbook/unions-and-intersections.html#union-exhaustiveness-checking
 *
 * @example
 * const a : 'A' | 'B'
 * switch (a){
 *  case 'A':
 *      return "Cool";
 *      break;
 *  case 'B':
 *      return "Hot";
 *      break;
 *  default:
 *      return assertNever(a); // This will be a compile time error if 'a' is expanded, and a runtime error if invoked.
 * }
 * @param {never} x case that should never happen
 */
export function assertNever(x: never): never {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions -- This should never happen, but if it does this helps us find why.
    throw new Error(`Unexpected object: ${x}`);
}
