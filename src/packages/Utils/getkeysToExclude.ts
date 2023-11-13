export function getExcludeKeys<T extends Record<PropertyKey, unknown>>(
    data: T[],
    percentage?: number
): string[] {
    const keys: string[] = [];

    const uniqueItems = data.reduce((items, item) => {
        Object.keys(item).forEach((key) => {
            const entry = item[key];
            items[key] = items[key] || new Set(Array.isArray(entry) ? entry : [entry]);
            items[key].add(item[key]);
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
