/**
 *
 *
 * @export
 * @template T
 * @param {Record<keyof T, T>} dict
 * @return {*}  {T[]}
 */
export function dictToArray<T>(dict: Record<string, T>): T[] {
    return Object.keys(dict).map((k) => dict[k]);
}
