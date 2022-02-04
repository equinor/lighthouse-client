/**
 * Sort A dataList by date by providing the key of an date field.
 */
export function sortDateByKey<T extends unknown>(dataItem: T[], key: keyof T): T[] {
    const sorted = dataItem.sort((a: T, b: T) => {
        return new Date(a[key as string]).getTime() - new Date(b[key as string]).getTime();
    });
    return sorted;
}

export function sorting<T extends any>(dataItem: T[], key: keyof T, dateAccessor: string) {
    const sort = dataItem.sort((a, b) => {
        return (
            convertToDate((a[key] as any).flatMap((dates) => dates[dateAccessor])[0]).getTime() -
            convertToDate((b[key] as any).flatMap((dates) => dates[dateAccessor])[0]).getTime()
        );
    });

    return sort;
}

export function convertToDate(datestring: string) {
    const d = datestring.replaceAll('.', '/').split('/');
    const newDate = new Date(d[2] + '/' + d[1] + '/' + d[0]);
    return newDate;
}
