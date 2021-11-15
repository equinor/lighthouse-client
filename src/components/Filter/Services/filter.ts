import JSONfn from 'json-fn';
import { FilterData, FilterItem } from '../Types/FilterItem';
import { GrouperFunctions, ProxyFunction } from './filterApi';

async function InternalFilter<T>(
    data: T[],
    filterItems: FilterItem[],
    groupValue?: Record<string, (item: T) => string>
    // options?: FilterDataOptions<T>
): Promise<T[]> {
    const filterItem = filterItems[0];
    if (!filterItem) return data;

    // const filteredData: T[] = [];
    // for await (let item of data) {
    //     // const item = data[index];

    //     const getValue =
    //         groupValue &&
    //         typeof groupValue[filterItem.type] === 'function' &&
    //         groupValue[filterItem.type];

    //     if (getValue && (await getValue(item)) !== filterItem.value)
    //         filteredData.push(item);

    //     if (item[filterItem.type] !== filterItem.value) filteredData.push(item);
    // }

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

function createGroupValueFunctionMap(
    groupValue: ProxyFunction[],
    groupValueMap?: string[]
): GrouperFunctions {
    return (
        groupValueMap?.reduce((acc, key: string, index: number) => {
            acc[key] = groupValue[index];
            return acc;
        }, {}) || {}
    );
}

export async function filter<T>(
    data: T[],
    filter: FilterData,
    options?: string,
    groupValueMap?: string[]
    // ...groupValue: ProxyFunction[]
): Promise<T[]> {
    if (data.length === 0) return [];
    const fns = options && JSONfn.parse(options);
    // const opt = createGroupValueFunctionMap(fns, groupValueMap);

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

    // const groups = await createGroupValueFunctionMap(groupValue, groupValueMap);
    // console.log(groups);
    const filteredData = [...(await InternalFilter(data, filterItems, fns))];
    return filteredData.length === 0 ? data : filteredData;
}
