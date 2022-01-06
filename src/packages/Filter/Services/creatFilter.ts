import { FilterData, FilterOptions } from '../Types/FilterItem';

const getObjectValue = <T>(item: T, key: string): string => item[key];

/**
 * Creates a object representing the det tilter data based on the objects own properties.
 */
export function createFilterData<T>(dataArray: T[], options?: FilterOptions<T>): FilterData {
    if (dataArray.length === 0) return {};

    return dataArray.reduce((filterData, item) => {
        /**Adding the custom groupeValues configured if present to dataItem */
        const dataItem = options?.groupValue ? { ...item, ...options.groupValue } : item;

        Object.keys(dataItem).forEach((typeKey: string) => {
            if (
                options?.excludeKeys?.includes(typeKey as keyof T) ||
                typeof dataItem[typeKey] === 'object'
            )
                return filterData;

            let valueKey: string = getObjectValue(dataItem, typeKey);

            if (options?.typeMap && Object.keys(options.typeMap).includes(typeKey)) {
                typeKey = options.typeMap[typeKey];
            }

            const filterObject =
                filterData[typeKey] || (filterData[typeKey] = { value: {}, type: typeKey });

            if (options?.groupValue && typeof options.groupValue[typeKey] === 'function') {
                valueKey = options.groupValue[typeKey](dataItem);
            }

            filterObject.value[valueKey] = {
                value: valueKey,
                checked: true,
                type: typeKey,
            };
        });
        return filterData;
    }, {} as FilterData);
}
