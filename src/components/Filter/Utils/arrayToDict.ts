/**
 * Generic Function for converting an array to a dictionary / record.
 * The key provided needs to be present in the object provided.
 * if two objects have the same kay they will be over written.
 * @param {T[]} arr The array that will be converted.
 * @param {K} key used as identifier in the dictionary.
 * @return {*}  {Record<string, T>}
 */

export type Dict<T> = Record<keyof T, T>;

export function arrayToDict<T, K extends keyof T>(arr: T[], key: K): Dict<T> {
    return arr.reduce((a, i) => {
        a[i[key.toString()]] || (a[i[key.toString()]] = i);
        return a;
    }, {} as Dict<T>);
}
