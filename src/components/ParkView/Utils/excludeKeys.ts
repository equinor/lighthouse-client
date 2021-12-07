export function getExcludeKeys<T>(data: T[], percentage?: number): string[] {
    const keys: string[] = [];

    const uniqueItems = data.reduce((items, item) => {
        Object.keys(item).forEach((key) => {
            if (item[key]) {
                items[key] = items[key] || new Set(item[key].toString());
                items[key].add(item[key]);
            }
        });

        return items;
    }, {} as Record<string, Set<unknown>>);

    const max = data.length;

    Object.keys(uniqueItems).forEach((key) => {
        if (percentage && (uniqueItems[key].size / max) * 100 > percentage) {
            keys.push(key);
            return;
        }

        if (uniqueItems[key].size === max) {
            keys.push(key);
        }
    });
    return keys;
}
