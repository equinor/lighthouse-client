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

export type FilterGroup = {
    all: boolean;
    type: string;
    value: Record<string, FilterItem>;
};
export type FilterData = Record<string, FilterGroup>;

export interface FilterDataOptions<T> {
    excludeKeys?: (keyof T)[];
    typeMap?: Record<keyof T, string>;
    groupeValue?: Record<keyof T, (item: T) => string>;
}
