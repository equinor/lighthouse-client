// import { FilterItem, FilterItemCheck } from '../../Types/FilterItem';

// type DebounceFilter = (
//     filterItem: FilterItem | FilterItem[],
//     singleClick?: boolean | undefined
// ) => void;

// export function debounceFilterItemCheck(
//     filterItemCheck: FilterItemCheck,
//     delay: number
// ): DebounceFilter {
//     let id: NodeJS.Timeout;
//     return (filterItem: FilterItem | FilterItem[], singleClick?: boolean | undefined) => {
//         if (id) clearTimeout(id);
//         id = setTimeout(() => {
//             filterItemCheck(filterItem, singleClick);
//         }, delay);
//     };
// }
