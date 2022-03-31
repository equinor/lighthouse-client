// import { FilterData, FilterConfiguration, FilterItem } from '../Types/FilterItem';

// interface CheckItem {
//     [key: string]: FilterConfiguration;
// }

// export function checkItem(
//     filterDataState: FilterData,
//     filterItem: FilterItem | FilterItem[],
//     singleClick?: boolean
// ): CheckItem {
//     const items = Array.isArray(filterItem) ? filterItem : [filterItem];

//     if (singleClick && items.length === 1) {
//         items.forEach((item) => {
//             Object.keys(filterDataState[item.type].value).forEach((key) => {
//                 filterDataState[item.type].value[key].checked =
//                     key === item.value.toString() ? true : false;
//             });
//         });
//     } else if (singleClick && items.length > 1) {
//         const type = items[0].type;

//         if (isAll(items, filterDataState, items[0])) {
//             const isAllTrue = Object.keys(filterDataState[type].value).every(
//                 (key) => filterDataState[type].value[key].checked
//             );

//             items.forEach((item) => {
//                 filterDataState[type].value[item.value].checked = isAllTrue ? false : true;
//             });
//         } else {
//             filterDataState = setItemsActive(filterDataState, type, items);
//         }
//     } else {
//         items.forEach((item) => {
//             filterDataState[item.type].value[item.value].checked =
//                 !filterDataState[item.type].value[item.value].checked;
//         });
//     }

//     return { ...filterDataState };
// }

// function setItemsActive(
//     filterDataState: FilterData,
//     type: string,
//     _filterItems: FilterItem[]
// ): FilterData {
//     Object.keys(filterDataState[type].value).forEach(
//         (key) => (filterDataState[type].value[key].checked = false)
//     );

//     _filterItems.forEach((item) => {
//         filterDataState[type].value[item.value].checked = true;
//     });

//     return filterDataState;
// }

// function isAll(_filterItems: FilterItem[], filterDataState: FilterData, item: FilterItem): boolean {
//     return _filterItems.length === Object.keys(filterDataState[item.type].value).length;
// }
