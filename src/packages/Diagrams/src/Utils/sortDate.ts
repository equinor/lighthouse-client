/**
 * Sort A dataList by date by providing the key of an date field.
 */
export function sortDateByKey<T>(dataItem: T[], key: keyof T): T[] {
    return dataItem.sort((a: T, b: T) => {
        return new Date(a[key as string]).getTime() - new Date(b[key as string]).getTime();
    });
}
