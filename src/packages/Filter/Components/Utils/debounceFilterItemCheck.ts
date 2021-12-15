import { FilterItem, FilterItemCheck } from "../../Types/FilterItem";

export function debounceFilterItemCheck(filterItemCheck: FilterItemCheck, delay: number) {
    let id: NodeJS.Timeout;
    return (filterItem: FilterItem | FilterItem[], singleClick?: boolean | undefined) => {
        if (id) clearTimeout(id);
        id = setTimeout(() => {
            filterItemCheck(filterItem, singleClick)
        }, delay)
    }
}