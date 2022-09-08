export const defaultSortFunction = (a: string, b: string): number => a.localeCompare(b);

export const isRecordWithKeys = (item: unknown): item is Record<PropertyKey, unknown> => {
    return typeof item === 'object' && item !== null && Object.keys(item).length !== 0
        ? true
        : false;
};

export const hasChildKey = <T extends unknown>(child: T, key: unknown): key is keyof T => {
    return child?.[key as keyof T] !== undefined ? true : false;
};
