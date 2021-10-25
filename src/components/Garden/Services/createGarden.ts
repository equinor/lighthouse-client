export type Garden<T> = Record<string, T[]>;

export function createGarden<T>(arr: T[], key: keyof T): Garden<T> {
    if (arr.length === 0) return {};
    return arr.reduce((a, i) => {
        a[i[key.toString()]] || (a[i[key.toString()]] = []);
        if (Array.isArray(a[i[key.toString()]])) a[i[key.toString()]].push(i);
        return a;
    }, {} as Record<string, T[]>);
}
