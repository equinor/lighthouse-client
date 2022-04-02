import { FilterGroup } from '../Hooks/useFilterApi';
import { FilterOptions, FilterValueType } from '../Types';

export function generateFilterValues<T>(
    filterConfiguration: FilterOptions<T>,
    data: T[]
): FilterGroup[] {
    if (!data || data.length == 0) return [];
    // Initialize all filter groups
    const filterGroups: FilterGroup[] = filterConfiguration.map(
        ({ name }): FilterGroup => ({ name: name, values: [] })
    );

    /** Iterate all values */
    data.forEach((item) =>
        filterConfiguration.forEach(({ name, valueFormatter }) => {
            const filterGroup = filterGroups.find(
                ({ name: filterGroupName }) => name === filterGroupName
            );
            /** Cant happen but ts */
            if (!filterGroup) return;
            const value = valueFormatter(item);

            if (Array.isArray(value)) {
                if (value.length === 0) {
                    /** Empty arrays are parsed as null */
                    filterGroup.values = [
                        ...filterGroup.values.filter((value) => value !== null),
                        null,
                    ];
                } else {
                    filterGroup.values = [
                        ...filterGroup.values.filter((oldValue) => !value.includes(oldValue)),
                        ...value,
                    ];
                }
            } else {
                const singleValue = handlePossiblyEmptyString(value);
                /** Append value and prevent duplicates */
                filterGroup.values = [
                    ...filterGroup.values.filter((oldValue) => oldValue !== singleValue),
                    singleValue,
                ];
            }
        })
    );
    console.log(filterGroups);
    return sortFilterGroups(filterGroups, filterConfiguration);
}

/**
 * Returns null for empty string
 * @param value
 * @returns
 */
function handlePossiblyEmptyString(value: FilterValueType): FilterValueType {
    if (typeof value !== 'string') return value;

    return value.length === 0 ? null : value;
}

/**
 * Sorts the filter items alphanumeric.
 * PITFALL: Case sensitive sorting
 * A > T > a
 * @param groups
 * @returns
 */
function sortFilterGroups<T = unknown>(
    groups: FilterGroup[],
    filterConfig: FilterOptions<T>
): FilterGroup[] {
    groups.forEach(({ values, name }) => {
        const customSort = filterConfig.find(({ name: configName }) => name === configName)?.sort;

        if (customSort) {
            customSort(values);
        } else {
            values.sort();
        }
    });
    return groups;
}
