export type SearchOption<T> = {
    name: string;
    /** Takes in an item and returns the search value */
    valueFormatter: (item: T) => string;
};
