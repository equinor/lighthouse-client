export interface FilterItem {
    value: string;
    type: string;
    checked: boolean;
    count: number;
    show: boolean;
}

export type FilerItemCount = (key: string) => number;

export type FilterItemCheck = (
    filterItem: FilterItem,
    singleClick?: boolean
) => void;
