export interface FilterItem {
    value: string;
    filterGroupName: string;
    checked: boolean;
    count: number;
}

export interface FilterActionGroup {
    action: 'Checked' | 'Unchecked';
    type: string;
    items: string[];
}

// export interface FilterDataOptions<T> {
//     excludeKeys?: (keyof T)[];
//     typeMap?: Partial<Record<keyof T, string>>;
//     groupValue?: Record<string, (item: T) => string>;
//     calculatedFilter?: Record<string, (item: T) => string>;
// }

export type HandleFilterClick = (filterItem: FilterItem, clickedOn: 'box' | 'label') => void;
