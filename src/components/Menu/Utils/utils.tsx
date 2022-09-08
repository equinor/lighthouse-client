import { AppManifest } from '@equinor/lighthouse-portal-client';

export function filterByValue<T extends Record<PropertyKey, unknown>, K extends keyof T>(
    list: Record<string, T[]>,
    value: string,
    key: K
): Record<string, T[]> {
    let filteredList: Record<string, T[]> = {};
    Object.keys(list).forEach((listKey) => {
        if (listKey.toLowerCase().includes(value.toLowerCase())) {
            filteredList = { ...filteredList, [listKey]: list[listKey] };
        } else {
            const filteredItems = list[listKey].filter((item) => {
                if (value === '') return true;
                const valueInKey = item[key];
                let hasValue = false;
                if (typeof valueInKey === 'string') {
                    hasValue = valueInKey.toLowerCase().includes(value.toLowerCase());
                }
                if (!hasValue) hasValue = objectContainsValue(item, value);
                return hasValue;
            });
            if (filteredItems.length > 0) {
                filteredList = { ...filteredList, [listKey]: filteredItems };
            }
        }
    });
    return filteredList;
}

export function objectContainsValue<T extends Record<PropertyKey, unknown>>(
    object: T,
    value: string
): boolean {
    let contains = false;
    Object.keys(object).map((key) => {
        const item = object[key];
        if (Array.isArray(item) && item.length > 0) {
            if (typeof item[0] === 'string') {
                contains = item.reduce((hasItem: boolean, item: string) => {
                    if (hasItem) return hasItem;
                    hasItem = item.toLowerCase().includes(value.toLowerCase());
                    return hasItem;
                }, false);
            }
        }
    });
    return contains;
}

export function groupeByKey<T extends Record<PropertyKey, unknown>, K extends keyof T>(
    list: T[],
    key: K
) {
    return list.reduce((acc: Record<string, T[]>, item: T) => {
        const entry = item[key];
        if (Array.isArray(entry)) {
            entry.forEach((groupeKey) => {
                acc[groupeKey] = acc[groupeKey] || [];
                acc[groupeKey].push(item);
            });
        } else {
            acc[String(entry)] = acc[String(entry)] || [];
            acc[String(entry)].push(item);
        }
        return acc;
    }, {} as Record<string, T[]>);
}

export function getURL(item: AppManifest, key: string): string {
    return item.shortName === '/' ? '/' : `${key}/${item.shortName}`;
}
