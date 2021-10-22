import { FilterData, FilterItem } from '../Types/FilterItem';

export function checkItem(
    filterDataState: FilterData,
    filterItem: FilterItem,
    singleClick?: boolean
) {
    if (singleClick) {
        Object.keys(filterDataState[filterItem.type].value).forEach((key) => {
            filterDataState[filterItem.type].value[key].checked =
                key === filterItem.value ? true : false;
        });
    } else {
        filterDataState[filterItem.type].value[filterItem.value].checked =
            !filterDataState[filterItem.type].value[filterItem.value].checked;
    }
    return { ...filterDataState };
}
