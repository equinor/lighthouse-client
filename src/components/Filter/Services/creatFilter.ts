import { FilterItem } from '../Types/FilterItem';

/**
 * Finds all object keys to use as column headers in filtering
 * @param data
 * @param excludeKeys
 * @returns Filter group names
 */
export function createFilterGroups<T>(data: T, excludeKeys?: (keyof T)[]): string[] {
    console.time('CreateFilterGroups');
    const filterGroups: string[] = [];
    Object.keys(data).forEach((filterGroupKey) => {
        if (excludeKeys) {
            if (!excludeKeys.includes(filterGroupKey as keyof T)) {
                filterGroups.push(filterGroupKey);
            }
        } else {
            filterGroups.push(filterGroupKey);
        }
    });
    console.timeEnd('CreateFilterGroups');
    return filterGroups;
}

/**
 * Finds all distinct values in the dataset ordered by keys
 * @param data
 * @param filterGroups
 * @returns all distinct value
 */
export function createFilterItems<T>(
    data: T[],
    filterGroups: string[],
    groupValue?: Record<string, (item: T) => string> | undefined
): Map<string, FilterItem[]> {
    console.time('CreateFilterItems');
    const filters = new Map<string, FilterItem[]>();

    //iterate over dataset and make a map over all the filtegroups, map structure, string, filterItem[]. where string is name of filterGroup Remember to ignore excludeKeys from options

    filterGroups.map((x) => filters.set(x, []));

    data.forEach((element) => {
        filterGroups.map((objectKey) => {
            const existingFilter = filters.get(objectKey);
            if (!existingFilter) return;

            const currentValue =
                groupValue && groupValue[objectKey]
                    ? groupValue[objectKey](element)
                    : element[objectKey];

            // let currentValue = element[objectKey];
            // if (currentValue === null) {
            //     currentValue = 'Blank';
            // }

            const index = existingFilter.findIndex((existing) => existing.value === currentValue);
            if (index !== -1) {
                /**
                 * Item already exists
                 */
                const item = existingFilter[index];
                existingFilter[index] = { ...item, count: item.count + 1 };
            } else {
                /**
                 * Item doesnt exist
                 */
                existingFilter.push({
                    checked: true,
                    count: 1,
                    filterGroupName: objectKey,
                    value: currentValue,
                });
            }

            filters.set(objectKey, existingFilter);
        });
    });
    console.timeEnd('CreateFilterItems');

    return filters;
}
