export function sortByKey<T>(
    list: T[],
    key: keyof T,
    direction: boolean
) {
    if (key === '') return list;
    return list.sort((a, b) => {
        if (direction) {
            if (a[key] < b[key]) return -1;
            if (a[key] > b[key]) return 1;
        } else {
            if (a[key] < b[key]) return 1;
            if (a[key] > b[key]) return -1;
        }
        return 0;
    });
}
