export function getPercentageNum<T, K extends keyof T>(data: T[], key: K, value: T[K]): number {
    return Math.round((data.filter((i) => i[key] === value).length / data.length) * 100);
}

export function getPercentage<T, K extends keyof T>(data: T[], key: K, value: T[K]): string {
    return (
        Math.round((data.filter((i) => i[key] === value).length / data.length) * 100).toString() +
        '%'
    );
}
export function getDatePercentage<T, K extends keyof T>(data: T[], key: K): string {
    return Math.round((data.filter((i) => i[key]).length / data.length) * 100).toString() + '%';
}
