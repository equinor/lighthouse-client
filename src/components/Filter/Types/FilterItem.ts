export interface FilterItem {
    value: string;
    type: string;
    checked: boolean;
}

export type FilerItemCount = (key: string) => number;

export type FilterItemCheck = (
    filterItem: FilterItem,
    singleClick?: boolean
) => void;

export type FilterGroupe = {
    all: boolean;
    type: string;
    value: Record<string, FilterItem>;
};
export type FilterData = Record<string, FilterGroupe>;

export interface FilterDataOptions<T, K extends keyof T> {
    excludeKeys?: K[];
    typeMap?: Record<K, string>;
    groupeValue?: Record<K, (item: T) => string>;
}
