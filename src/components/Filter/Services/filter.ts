import { FilterData, FilterDataOptions, FilterItem } from '../Types/FilterItem';

function InternalFilter<T>(
    data: T[],
    filterItems: FilterItem[],
    options?: FilterDataOptions<T>
): T[] {
    const filterItem = filterItems[0];
    if (!filterItem) return data;

    const filteredData = data.filter((i) => {
        const getValue =
            options?.groupValue &&
            typeof options.groupValue[filterItem.type] === 'function' &&
            options.groupValue[filterItem.type];
        return getValue
            ? getValue(i) !== filterItem.value
            : i[filterItem.type] !== filterItem.value;
    });

    filterItems.shift();

    if (filterItems.length !== 0 && filteredData.length > 0) {
        return InternalFilter(filteredData, filterItems, options);
    }
    return filteredData;
}

export function filter<T>(
    data: T[],
    filter: FilterData,
    options?: FilterDataOptions<T>
): T[] {
    if (data.length === 0) return [];
    const filterItems = Object.keys(filter)
        .map((filterKey) => {
            const items: FilterItem[] = [];

            Object.keys(filter[filterKey].value).forEach((itemKey) => {
                if (!filter[filterKey].value[itemKey].checked) {
                    items.push(filter[filterKey].value[itemKey]);
                }
            });

            return items;
        })
        .flat();

    const filteredData = [...InternalFilter(data, filterItems, options)];
    return filteredData.length === 0 ? data : filteredData;
}
