import { FilterData, FilterOptions } from '../Types/FilterItem';

const DEFAULT_VALUE = '(Blank)';

const getObjectValue = <T>(item: T, key: string): string =>
    item[key] && item[key].length > 0 ? item[key] : DEFAULT_VALUE;

/**
 * Creates a object representing the det tilter data based on the objects own properties.
 */
export function createFilterData<T>(dataArray: T[], options?: FilterOptions<T>): FilterData {
    if (!dataArray || dataArray.length === 0) return {};

    const filterData = dataArray.reduce((filterData, item) => {
        /**Adding the custom groupeValues configured if present to dataItem */
        const dataItem = options?.valueFormatter ? { ...item, ...options.valueFormatter } : item;

        Object.keys(dataItem).forEach((typeKey: string) => {
            if (
                options?.excludeKeys?.includes(typeKey as keyof T) ||
                typeof dataItem[typeKey] === 'object'
            )
                return filterData;

            let valueKey: string = getObjectValue(dataItem, typeKey);

            if (options?.headerNames && Object.keys(options.headerNames).includes(typeKey)) {
                typeKey = options.headerNames[typeKey];
            }

            const filterObject =
                filterData[typeKey] || (filterData[typeKey] = { value: {}, type: typeKey });

            if (options?.valueFormatter && typeof options.valueFormatter[typeKey] === 'function') {
                valueKey = options.valueFormatter[typeKey](dataItem);
            }

            filterObject.value[valueKey] = {
                value: valueKey,
                checked: true,
                type: typeKey,
            };
        });
        return filterData;
    }, {} as FilterData);

    /** Add default toggled off filters */
    options?.defaultUncheckedValues?.forEach(
        (filterGroup) =>
        (filterData[filterGroup.type].value = {
            ...filterData[filterGroup.type].value,
            ...filterGroup.value,
        })
    );

    return filterData;
}
