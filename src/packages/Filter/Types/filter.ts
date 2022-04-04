export type FilterOptions<T> = FilterConfiguration<T>[];

export interface FilterConfiguration<T> {
    name: string;
    /** Takes in an item and returns the filter value */
    valueFormatter: (item: T) => FilterValueType | FilterValueType[];
    /** Should the filter be active in the pane on mount */
    defaultHidden?: boolean;
    /**
     * Insert a list of values to be default filtered
     * Case insensitive
     */
    defaultUncheckedValues?: FilterValueType[];
    /** Sort the list of values in the filtergroup, defaults to alphanumeric */
    sort?: (values: FilterValueType[]) => FilterValueType[];
    customValueRender?: (value: FilterValueType) => JSX.Element;
}

export type FilterValueType = string | number | null;
