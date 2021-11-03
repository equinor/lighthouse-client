/**
 * A safety function that will allays return an array.
 */
export function validArray<T>(arr: unknown): T[] {
    return Array.isArray(arr) && arr.length > 0 ? arr : ([] as T[]);
}

export function isArray(arr: unknown): boolean {
    return Array.isArray(arr) && typeof arr !== 'string';
}
