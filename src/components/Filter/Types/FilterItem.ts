export interface FilterItem {
    //Dont think we need that
    //type: string;
    value: string;
    filterGroupName: string;
    checked: boolean;
    count: number;
}
export type FilterGroup = Map<string, FilterItem>;
export type FilterData = Map<string, FilterGroup>;

export interface FilterDataOptions<T> {
    excludeKeys?: (keyof T)[];
    typeMap?: Partial<Record<keyof T, string>>;
    groupValue?: Record<string, (item: T) => string>;
}

export type HandleFilterClick = (filterItem: FilterItem, clickedOn: 'box' | 'label') => void;

// export type FilterItemCheck = (
//     filterItem: FilterItem | FilterItem[],
//     singleClick?: boolean,
//     oldFilteredData?: unknown[],
//     oldRejectedData?: unknown[],
//     oldFilterKeys?: Map<string, string[]>
// ) => void;

// export interface FilterActionGroup {
//     action: 'Checked' | 'Unchecked';
//     items: FilterItem[];
// }

//export type FilerItemCount = (key: string) => number;

// export type FilterGroup = {
//     all: boolean;
//     type: string;
//     value: Record<string, FilterItem>;
// };
