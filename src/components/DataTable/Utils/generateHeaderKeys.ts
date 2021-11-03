export interface HeaderData {
    key: string;
    title: string;
}

export function generateDefaultHeader<T extends Object>(
    headerItem: Exclude<T, Function | string | number>
): HeaderData[] {
    return Object.keys(headerItem).map((headerKey) => ({
        key: headerKey,
        title: headerKey
    }));
}
