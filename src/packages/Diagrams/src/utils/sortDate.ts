/**
 *
 *
 * @export
 * @template T
 * @param {T[]} dataItem
 * @param {keyof T} key
 * @return {*}
 */
export function sortDate<T>(dataItem: T[], key: keyof T) {
    return dataItem.sort((a: T, b: T) => {
        return new Date(a[key as string]).getTime() - new Date(b[key as string]).getTime();
    });
}
