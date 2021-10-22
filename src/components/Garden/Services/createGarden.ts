type Garden<T> = Record<string, T[]>;

export function createGarden<T, K extends keyof T>(
    arr: T[],
    key: K
): Garden<T> {
    return arr.reduce((a, i) => {
        a[i[key.toString()]] || (a[i[key.toString()]] = []);
        if (Array.isArray(a[i[key.toString()]])) a[i[key.toString()]].push(i);
        return a;
    }, {} as Record<K, T[]>);
}
