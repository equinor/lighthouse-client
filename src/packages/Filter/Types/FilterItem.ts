import React from 'react';

export interface FilterItem {
    value: string;
    type: string;
    checked: boolean;
}

export type FilerItemCount = (key: string) => number;

export type FilterItemCheck = (
    filterItem: FilterItem | FilterItem[],
    singleClick?: boolean
) => void;

export type FilterGroup = {
    type: string;
    value: Record<string, FilterItem>;
};
export type FilterData = Record<string, FilterGroup>;

export interface FilterOptions<T> {
    excludeKeys?: (keyof T)[];
    typeMap?: Partial<Record<keyof T, string>>;
    groupValue?: Record<string, (item: T) => string>;
    customRender?: Record<keyof T | string, React.FC<T>>;
    initialFilters?: InitialFilter[];
}

export interface InitialFilter {
    key: string;
    valueKey: string;
}
