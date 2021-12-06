export interface TableVisualOptions<T> {
    initialGroup: keyof T;
    title?: string;
    groups?: (keyof T)[];
}
