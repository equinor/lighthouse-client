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
    headerNames?: Partial<Record<keyof T, string>>;
    /** Function to transform value */
    valueFormatter?: Record<string, (item: T) => string>;
    customRender?: Record<keyof T | string, React.FC<T>>;
    /**
     * Filter sections to initially be toggled on
     */
    defaultActiveFilters?: string[];
    /**
     * Values to exclude by default
     * Checked defaults to true
     */
    initialFilters?: FilterGroup[];
}
