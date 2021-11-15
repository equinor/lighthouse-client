import { FilterData, FilterItem } from '../Types/FilterItem';
import { parseGroupValueFunctions } from '../Utils/optionParse';

async function InternalFilter<T>(
    data: T[],
    filterItems: FilterItem[],
    groupValue?: Record<string, (item: T) => string>
): Promise<T[]> {
    const filterItem = filterItems[0];
    if (!filterItem) return data;

    const filteredData = data.filter((i) => {
        const getValue =
            groupValue &&
            typeof groupValue[filterItem.type] === 'function' &&
            groupValue[filterItem.type];
        return getValue
            ? getValue(i) !== filterItem.value
            : i[filterItem.type] !== filterItem.value;
    });

    filterItems.shift();

    if (filterItems.length !== 0 && filteredData.length > 0) {
        return await InternalFilter(filteredData, filterItems, groupValue);
    }
    return filteredData;
}

export async function filter<T>(
    data: T[],
    filter: FilterData,
    groupValue?: string
): Promise<T[]> {
    if (data.length === 0) return [];

    const filterItems = Object.values(filter)
        .map((item) => {
            const items: FilterItem[] = [];

            Object.keys(item.value).forEach((itemKey) => {
                if (!item.value[itemKey].checked) {
                    items.push(item.value[itemKey]);
                }
            });

            return items;
        })
        .flat();

    const groupValueFunctions = parseGroupValueFunctions(groupValue);
    const filteredData = [
        ...(await InternalFilter(data, filterItems, groupValueFunctions))
    ];
    return filteredData.length === 0 ? data : filteredData;
}
