export const sortByNumber = (a: string, b: string): number =>
    a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
