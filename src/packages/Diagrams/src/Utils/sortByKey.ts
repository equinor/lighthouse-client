/**
 *
 *
 * @export
 * @template T
 * @param {T[]} dataItem
 * @param {keyof T} key
 * @param {boolean} [accenting=true]
 * @return {*}
 */
export function sortByKey<T>(dataItem: T[], key: keyof T, accenting = true): T[] {
    return dataItem.sort((a: T, b: T) => {
        if (accenting) {
            return a[key as string] - b[key as string];
        }
        return b[key as string] - a[key as string];
    });
}
